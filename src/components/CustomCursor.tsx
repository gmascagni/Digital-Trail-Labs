import { useEffect, useRef, useState } from 'react';

/**
 * Magnetic contextual cursor ring + telemetry verb badge ("DRAG", "BREW", "STEEP", "INSPECT", "REMIX").
 * Automatically disables on touch devices and prefers-reduced-motion.
 */
export function CustomCursor({
  onCoordinates,
}: {
  onCoordinates?: (x: number, y: number, velocity: number) => void;
}) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let prevX = targetX;
    let prevY = targetY;
    let rafId = 0;

    const handleMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      document.documentElement.style.setProperty('--pointer-x', `${targetX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${targetY}px`);

      const vx = targetX - prevX;
      const vy = targetY - prevY;
      const speed = Math.min(100, Math.hypot(vx, vy));
      prevX = targetX;
      prevY = targetY;
      onCoordinates?.(Math.round(targetX), Math.round(targetY), Math.round(speed));

      const targetEl = (e.target as HTMLElement | null)?.closest?.('[data-cursor]');
      const nextLabel = targetEl?.getAttribute('data-cursor') ?? '';
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.cancelAnimationFrame(rafId);
    };
  }, [onCoordinates]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-200 ${
        label
          ? 'h-11 px-3.5 border-[var(--accent-primary)] bg-[var(--bg-elevated)]/90 shadow-lg backdrop-blur-md'
          : 'h-7 w-7 border-[var(--accent-primary)]/55 bg-transparent'
      }`}
      style={{ willChange: 'transform' }}
    >
      {label ? (
        <span className="dtl-telemetry font-semibold text-[var(--accent-primary)]">{label}</span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-telemetry)]" />
      )}
    </div>
  );
}
