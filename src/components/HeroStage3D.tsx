import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAtmosphere } from '../context/AtmosphereContext';

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uMouse;
  uniform float uVelocity;
  uniform float uScroll;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vElevation;

  // Compact 3D trigonometric wave-simplex hybrid field ("The Digital Trail")
  float trailField(vec3 p, float t) {
    float n1 = sin(p.x * 2.1 + t * 0.9) * cos(p.y * 2.3 - t * 0.7) * sin(p.z * 2.0 + t * 0.8);
    float n2 = sin((p.x + p.y) * 4.2 - t * 1.3) * 0.45;
    float n3 = cos((p.y - p.z) * 6.4 + t * 1.7) * 0.22;
    return n1 + n2 + n3;
  }

  void main() {
    float t = uTime * uSpeed;
    vec3 pos = position;

    // Twist sculpture subtly with scroll depth
    float angle = pos.y * (0.45 + uScroll * 1.15) + t * 0.18;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xz = rot * pos.xz;

    // Pointer proximity ripple
    vec2 pointerDelta = pos.xy - uMouse * 1.6;
    float pointerRipple = exp(-dot(pointerDelta, pointerDelta) * 1.35) * (0.22 + uVelocity * 0.42);
    float rippleWave = sin(length(pointerDelta) * 10.0 - t * 4.2) * pointerRipple;

    float disp = trailField(pos, t) * (0.28 + uVelocity * 0.18) + rippleWave;
    vec3 displaced = pos + normal * disp;

    // Approximate perturbed normal via finite difference for liquid-metal refraction
    float eps = 0.03;
    float dx = trailField(pos + vec3(eps, 0.0, 0.0), t) - trailField(pos - vec3(eps, 0.0, 0.0), t);
    float dy = trailField(pos + vec3(0.0, eps, 0.0), t) - trailField(pos - vec3(0.0, eps, 0.0), t);
    float dz = trailField(pos + vec3(0.0, 0.0, eps), t) - trailField(pos - vec3(0.0, 0.0, eps), t);
    vec3 perturbedNormal = normalize(normal - vec3(dx, dy, dz) * 1.8);

    vElevation = disp;
    vNormal = normalize(normalMatrix * perturbedNormal);
    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
    vWorldPos = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uBaseDark;
  uniform float uIsLight;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vElevation;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);

    // Fresnel rim reflection
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.8);

    // Key & fill lights for molten liquid-metal specular highlights
    vec3 L1 = normalize(vec3(2.4, 3.0, 2.8));
    vec3 L2 = normalize(vec3(-2.6, -1.8, 2.0));
    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);

    float diff1 = max(dot(N, L1), 0.0);
    float diff2 = max(dot(N, L2), 0.0);
    float spec1 = pow(max(dot(N, H1), 0.0), 48.0);
    float spec2 = pow(max(dot(N, H2), 0.0), 28.0);

    // Topological contour bands
    float contour = smoothstep(0.42, 0.5, abs(fract(vElevation * 7.5 - uTime * 0.12) - 0.5));

    vec3 core = mix(uBaseDark, uColorA * 0.42, clamp(vElevation * 1.5 + 0.45, 0.0, 1.0));
    vec3 col = core;
    col += uColorA * (diff1 * 0.62 + spec1 * 1.15);
    col += uColorB * (diff2 * 0.44 + spec2 * 0.72 + fresnel * 0.88);
    col += mix(uColorA, uColorB, 0.5) * (1.0 - contour) * 0.14;

    if (uIsLight > 0.5) {
      col = mix(vec3(0.92, 0.94, 0.97), col, 0.82);
    }

    gl_FragColor = vec4(col, 0.96);
  }
`;

/**
 * Full-viewport Three.js WebGL liquid-metallic topological sculpture ("The Digital Trail")
 * with automatic 2D HTML5 Canvas fallback if WebGL is unavailable.
 */
export function HeroStage3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme, setFps } = useAtmosphere();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isVisible = true;
    let rafId = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 },
    );
    observer.observe(container);

    // Attempt WebGL initialization; gracefully fall back to 2D topological canvas if unavailable
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      renderer = null;
    }

    if (!renderer) {
      // Graceful 2D Canvas topological fallback
      const canvas = document.createElement('canvas');
      canvas.className = 'h-full w-full block';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      const resize2d = () => {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      };
      resize2d();
      window.addEventListener('resize', resize2d);

      let t = 0;
      const drawFallback = () => {
        if (ctx && isVisible) {
          t += reducedMotion ? 0.004 : 0.018 * themeRef.current.shaderSpeed;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < 14; i++) {
            ctx.beginPath();
            ctx.strokeStyle = i % 2 === 0 ? themeRef.current.shaderHueA : themeRef.current.shaderHueB;
            ctx.globalAlpha = 0.16;
            ctx.lineWidth = 1.4;
            for (let x = 0; x <= canvas.width; x += 18) {
              const y =
                canvas.height * 0.5 +
                Math.sin(x * 0.004 + t + i * 0.35) * (45 + i * 8) +
                Math.cos(x * 0.009 - t * 0.7) * 24;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
        }
        rafId = window.requestAnimationFrame(drawFallback);
      };
      rafId = window.requestAnimationFrame(drawFallback);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', resize2d);
        window.cancelAnimationFrame(rafId);
        canvas.remove();
      };
    }

    // Three.js WebGL Generative Stage
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.className = 'h-full w-full block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      100,
    );
    camera.position.set(0, 0, 5.2);

    // Core Liquid-Metallic Topological Sculpture
    const geometry = new THREE.IcosahedronGeometry(1.42, 48);
    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: themeRef.current.shaderSpeed },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uVelocity: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color(themeRef.current.shaderHueA) },
      uColorB: { value: new THREE.Color(themeRef.current.shaderHueB) },
      uBaseDark: { value: new THREE.Color(themeRef.current.bgElevated) },
      uIsLight: { value: themeRef.current.isLight ? 1.0 : 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
    });

    const sculpture = new THREE.Mesh(geometry, material);
    // Position slightly to the right on wide viewports so left-aligned hero typography breathes cleanly
    sculpture.position.set(container.clientWidth >= 1024 ? 1.05 : 0, 0.05, 0);
    scene.add(sculpture);

    // Orbital Telemetry Halo Ring
    const ringGeo = new THREE.TorusGeometry(2.18, 0.008, 12, 160);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(themeRef.current.shaderHueB),
      transparent: true,
      opacity: 0.26,
    });
    const haloRing = new THREE.Mesh(ringGeo, ringMat);
    haloRing.rotation.x = Math.PI * 0.36;
    haloRing.rotation.y = -Math.PI * 0.14;
    haloRing.position.copy(sculpture.position);
    scene.add(haloRing);

    // Ambient Telemetry Dust Field
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5 - 0.8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(themeRef.current.shaderHueA),
      size: 0.026,
      transparent: true,
      opacity: 0.48,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer & Scroll tracking
    const targetMouse = new THREE.Vector2(0, 0);
    const prevMouse = new THREE.Vector2(0, 0);
    let targetVelocity = 0;
    let scrollProgress = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
      targetVelocity = Math.min(1.4, Math.hypot(nx - prevMouse.x, ny - prevMouse.y) * 6.5);
      prevMouse.set(nx, ny);
      targetMouse.set(nx, ny);
    };

    const onScroll = () => {
      scrollProgress = Math.min(1.5, window.scrollY / Math.max(1, window.innerHeight));
    };

    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const offsetX = w >= 1024 ? 1.05 : 0;
      sculpture.position.x = offsetX;
      haloRing.position.x = offsetX;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameCounter = 0;
    let fpsAccumulator = 0;
    const targetColorA = new THREE.Color();
    const targetColorB = new THREE.Color();
    const targetBase = new THREE.Color();

    const animate = () => {
      const delta = Math.min(0.05, clock.getDelta());

      if (isVisible && renderer) {
        // FPS Telemetry measurement (sampled every 0.5s)
        frameCounter += 1;
        fpsAccumulator += delta;
        if (fpsAccumulator >= 0.5) {
          setFps(Math.min(120, Math.max(24, Math.round(frameCounter / fpsAccumulator))));
          frameCounter = 0;
          fpsAccumulator = 0;
        }

        const motionScale = reducedMotion ? 0.12 : 1.0;
        uniforms.uTime.value += delta * motionScale;
        uniforms.uSpeed.value += (themeRef.current.shaderSpeed - uniforms.uSpeed.value) * 0.06;

        // Smoothly morph shader colors when Atmosphere Switcher or AI Concierge updates theme
        targetColorA.set(themeRef.current.shaderHueA);
        targetColorB.set(themeRef.current.shaderHueB);
        targetBase.set(themeRef.current.bgElevated);
        uniforms.uColorA.value.lerp(targetColorA, 0.08);
        uniforms.uColorB.value.lerp(targetColorB, 0.08);
        uniforms.uBaseDark.value.lerp(targetBase, 0.08);
        uniforms.uIsLight.value += ((themeRef.current.isLight ? 1.0 : 0.0) - uniforms.uIsLight.value) * 0.08;

        ringMat.color.copy(uniforms.uColorB.value);
        particleMat.color.copy(uniforms.uColorA.value);

        uniforms.uMouse.value.lerp(targetMouse, 0.08);
        targetVelocity *= 0.92;
        uniforms.uVelocity.value += (targetVelocity - uniforms.uVelocity.value) * 0.14;
        uniforms.uScroll.value += (scrollProgress - uniforms.uScroll.value) * 0.08;

        sculpture.rotation.y += delta * 0.16 * motionScale;
        sculpture.rotation.x = uniforms.uMouse.value.y * 0.24;
        haloRing.rotation.z += delta * 0.09 * motionScale;
        particles.rotation.y -= delta * 0.03 * motionScale;

        renderer.render(scene, camera);
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [setFps]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    />
  );
}
