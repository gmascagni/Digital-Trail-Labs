import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { AppProject } from '../data/apps';
import { AppIcon } from './AppIcon';

export function TiltExperimentCard({ app }: { app: AppProject; index?: number }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  );
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 11;
    const rotateX = (0.5 - py) * 11;
    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
    setGlarePos({ x: Math.round(px * 100), y: Math.round(py * 100), active: true });
  };

  const handlePointerLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    setGlarePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <article
      ref={cardRef}
      data-cursor="INSPECT"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: transformStyle,
        transition: glarePos.active ? 'transform 80ms linear' : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
      className="dtl-glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 lg:col-span-4"
    >
      {/* Dynamic Specular Sheen Reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glarePos.active ? 0.22 : 0,
          background: `radial-gradient(320px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.65), transparent 65%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <AppIcon name={app.iconName} from={app.accentFrom} to={app.accentTo} />
          <span className="dtl-surface-2 rounded-full px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]">
            {app.status}
          </span>
        </div>

        <h3 className="mt-4 font-[var(--font-grotesk)] text-lg font-bold tracking-tight text-[var(--text-main)]">
          <Link to={`/apps/${app.slug}`} className="hover:text-[var(--accent-primary)]">
            {app.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{app.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {app.primaryStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="dtl-surface-2 rounded-md px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--border-specular)] pt-4">
        <Link
          to={`/apps/${app.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
        >
          Application Recap
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        {app.liveUrl && (
          <a
            href={app.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            Live
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
