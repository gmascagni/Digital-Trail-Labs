import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Coffee, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';
import { playChimePulse, playDetentClick } from '../utils/tactileAudio';

const RATIOS = [14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18];
const DOSES = [15, 18, 22];

export function BrewSandboxCard() {
  const { soundEnabled, setSoundEnabled } = useAtmosphere();
  const [ratioIndex, setRatioIndex] = useState<number>(4); // Default 1:16
  const [dose, setDose] = useState<number>(18);
  const [running, setRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [wavePhase, setWavePhase] = useState<number>(0);
  const dialRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<boolean>(false);

  const ratio = RATIOS[ratioIndex] ?? 16;
  const targetWater = Math.round(dose * ratio);
  const extractionYield = (18.4 + (ratio - 14) * 0.62 + Math.min(1.2, seconds / 150)).toFixed(1);

  // Timer & Bloom Chime
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        if (next === 35) {
          playChimePulse(soundEnabled);
        }
        if (next >= 180) {
          setRunning(false);
          playChimePulse(soundEnabled);
          return 180;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, soundEnabled]);

  // Real-time SVG liquid wave animation
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    let raf = 0;
    const step = () => {
      setWavePhase((p) => (p + (running ? 0.095 : 0.032)) % (Math.PI * 2));
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [running]);

  const stepRatio = (delta: number) => {
    setRatioIndex((prev) => {
      const next = Math.max(0, Math.min(RATIOS.length - 1, prev + delta));
      if (next !== prev) {
        playDetentClick(0.85 + next * 0.06, soundEnabled);
      }
      return next;
    });
  };

  // Pointer drag on rotary dial
  const handleDialPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDialPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angleDeg = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    // Map -140deg..+140deg arc to 0..8 index
    const normalized = Math.max(0, Math.min(1, (angleDeg + 140) / 280));
    const idx = Math.round(normalized * (RATIOS.length - 1));
    if (idx !== ratioIndex) {
      setRatioIndex(idx);
      playDetentClick(0.85 + idx * 0.06, soundEnabled);
    }
  };

  const handleDialPointerUp = () => {
    draggingRef.current = false;
  };

  // Compute SVG liquid wave path
  const fillPct = running || seconds > 0 ? Math.min(0.86, 0.24 + (seconds / 180) * 0.62) : 0.42 + (ratio - 14) * 0.06;
  const baseY = 120 - fillPct * 88;
  const amp = running ? 5.5 : 2.6;

  const buildWavePath = (phaseOffset: number, verticalOffset: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 220; x += 11) {
      const y =
        baseY +
        verticalOffset +
        Math.sin((x / 220) * Math.PI * 3 + wavePhase + phaseOffset) * amp;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return `M0,128 L${pts.join(' L')} L220,128 Z`;
  };

  const stageLabel =
    seconds === 0
      ? 'Ready to Brew'
      : seconds <= 35
        ? 'Phase 1 · Bloom'
        : seconds <= 125
          ? 'Phase 2 · Spiral Pour'
          : 'Phase 3 · Drawdown';

  const knobAngle = -120 + (ratioIndex / (RATIOS.length - 1)) * 240;

  return (
    <article
      data-cursor="BREW"
      className="dtl-glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-7"
    >
      {/* Ambient top-right glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }}
      />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Coffee className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                Specialty Coffee Platform
              </span>
              <h3 className="font-[var(--font-grotesk)] text-xl font-bold tracking-tight text-[var(--text-main)] sm:text-2xl">
                The Brew App
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playDetentClick(1.1, true);
            }}
            className="dtl-surface-2 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono text-[var(--text-secondary)] hover:border-[var(--accent-primary)]"
            aria-label={soundEnabled ? 'Mute tactile dial clicks' : 'Enable tactile dial clicks'}
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            )}
            <span>{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
          Specialty coffee extraction studio with Tesseract OCR bag scanning, roast-matched recipes,
          and tactile pour-over telemetry. Rotate the ratio dial or run a live bloom cycle below.
        </p>

        {/* Interactive Micro-Widget Sandbox */}
        <div className="dtl-surface mt-6 grid gap-5 rounded-2xl p-4 sm:grid-cols-12 sm:items-center sm:p-5">
          {/* Rotary Extraction Dial */}
          <div className="flex flex-col items-center sm:col-span-5">
            <div
              ref={dialRef}
              data-cursor="DRAG"
              role="slider"
              tabIndex={0}
              aria-label="Coffee to water extraction ratio"
              aria-valuemin={14}
              aria-valuemax={18}
              aria-valuenow={ratio}
              aria-valuetext={`1 to ${ratio} ratio`}
              onPointerDown={handleDialPointerDown}
              onPointerMove={handleDialPointerMove}
              onPointerUp={handleDialPointerUp}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  stepRatio(1);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  stepRatio(-1);
                }
              }}
              className="relative flex h-36 w-36 cursor-grab select-none items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-primary)] shadow-inner active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-[var(--accent-telemetry)]"
            >
              {/* Tick marks around bezel */}
              {RATIOS.map((r, idx) => {
                const deg = -120 + (idx / (RATIOS.length - 1)) * 240;
                const active = idx <= ratioIndex;
                return (
                  <span
                    key={r}
                    aria-hidden="true"
                    className="absolute h-2 w-0.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: active ? 'var(--accent-primary)' : 'rgba(148,163,184,0.28)',
                      transform: `rotate(${deg}deg) translateY(-60px)`,
                    }}
                  />
                );
              })}

              {/* Rotating indicator arm */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rounded-full border border-[var(--border-specular)] transition-transform duration-150"
                style={{ transform: `rotate(${knobAngle}deg)` }}
              >
                <span className="mx-auto mt-1.5 block h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_#F59E0B]" />
              </div>

              <div className="text-center">
                <span className="dtl-telemetry block text-[9px] text-[var(--text-muted)]">RATIO</span>
                <span className="font-[var(--font-grotesk)] text-2xl font-bold text-[var(--text-main)]">
                  1:{ratio}
                </span>
              </div>
            </div>

            {/* Fine-tune step buttons */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepRatio(-1)}
                className="dtl-surface-2 h-7 w-7 cursor-pointer rounded-lg font-mono text-xs font-bold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
                aria-label="Decrease brew ratio"
              >
                −
              </button>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">DRAG DIAL</span>
              <button
                type="button"
                onClick={() => stepRatio(1)}
                className="dtl-surface-2 h-7 w-7 cursor-pointer rounded-lg font-mono text-xs font-bold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
                aria-label="Increase brew ratio"
              >
                +
              </button>
            </div>
          </div>

          {/* Live SVG Wave Vessel + Bloom Controls */}
          <div className="flex flex-col justify-between gap-3.5 sm:col-span-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wider text-[var(--accent-telemetry)]">
                {stageLabel}
              </span>
              <span className="font-mono text-xs font-semibold text-[var(--text-main)]">
                {String(Math.floor(seconds / 60)).padStart(2, '0')}:
                {String(seconds % 60).padStart(2, '0')}
              </span>
            </div>

            {/* Carafe SVG Wave Physics */}
            <div className="relative h-28 w-full overflow-hidden rounded-xl border border-[var(--border-specular)] bg-[#07080B]">
              <svg
                viewBox="0 0 220 128"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="espressoLiquid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.92" />
                    <stop offset="45%" stopColor="#B45309" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#291509" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id="cremaWave" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
                <path d={buildWavePath(1.9, -3.5)} fill="url(#cremaWave)" />
                <path d={buildWavePath(0, 0)} fill="url(#espressoLiquid)" />
              </svg>

              <div className="pointer-events-none absolute inset-x-3 bottom-2.5 flex items-center justify-between font-mono text-[11px] text-amber-100">
                <span>DOSE {dose}g</span>
                <span>YIELD {targetWater}ml</span>
                <span>EY {extractionYield}%</span>
              </div>
            </div>

            {/* Dose Pills + Timer Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5" role="group" aria-label="Coffee dose in grams">
                {DOSES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDose(d);
                      playDetentClick(1.05, soundEnabled);
                    }}
                    className={`cursor-pointer rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                      dose === d
                        ? 'bg-amber-500 font-bold text-slate-950'
                        : 'dtl-surface-2 text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
                    }`}
                  >
                    {d}g
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playDetentClick(1.2, soundEnabled);
                    setRunning((r) => !r);
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[var(--accent-primary)] px-3 py-1.5 font-mono text-xs font-bold text-slate-950 transition-transform active:scale-95"
                >
                  {running ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                      PAUSE
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      {seconds > 0 ? 'RESUME' : 'BLOOM'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    setSeconds(0);
                    playDetentClick(0.8, soundEnabled);
                  }}
                  aria-label="Reset timer"
                  className="dtl-surface-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-secondary)] hover:border-[var(--accent-primary)]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-specular)] pt-4">
        <Link
          to="/apps/the-brew-app"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
        >
          Application Recap →
        </Link>
        <a
          href="https://thebrew.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-main)]"
        >
          thebrew.app
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
