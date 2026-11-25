import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Crosshair, Eye, Play, Wind } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';
import { playDetentClick } from '../utils/tactileAudio';

interface CartridgeLoad {
  id: string;
  label: string;
  mvFps: number;
  bcG7: number;
  bulletGr: number;
}

const LOADS: CartridgeLoad[] = [
  { id: '65cm', label: '6.5 Creedmoor · 140gr ELD-M', mvFps: 2710, bcG7: 0.326, bulletGr: 140 },
  { id: '308w', label: '.308 Win · 175gr SMK', mvFps: 2600, bcG7: 0.243, bulletGr: 175 },
  { id: '300prc', label: '.300 PRC · 225gr ELD-M', mvFps: 2810, bcG7: 0.391, bulletGr: 225 },
];

/**
 * Fast analytical G7-calibrated ballistic drop & 3-zone wind drift approximation
 * (100 yd zero, standard ICAO 59°F / 29.92 inHg sea-level baseline) returning MILs, ToF, & Mach.
 */
function solveBallistics(load: CartridgeLoad, rangeYd: number, windMph: number) {
  const tZero = 300 / (load.mvFps * 0.94);
  const dragFactor = 1 + (rangeYd / 1000) * (0.145 / load.bcG7);
  const avgVel = load.mvFps / dragFactor;
  const tof = (rangeYd * 3) / avgVel;
  const remainingFps = Math.round(load.mvFps / (1 + (rangeYd / 1000) * (0.29 / load.bcG7)));
  const mach = (remainingFps / 1116.4).toFixed(2);

  // Gravity drop relative to 100yd sight line -> convert inches to MRAD (1 MIL = 3.6" per 100yd)
  const rawDropIn = 0.5 * 386.09 * (tof * tof - tZero * tZero * (rangeYd / 100));
  const dropMil = Math.max(0, rawDropIn / ((rangeYd / 100) * 3.6));

  // Lag-time crosswind drift (3-zone weighted effective wind)
  const vacuumTof = (rangeYd * 3) / load.mvFps;
  const lagTime = Math.max(0, tof - vacuumTof);
  const windIn = windMph * 17.6 * lagTime;
  const windMil = windIn / ((rangeYd / 100) * 3.6);

  // Kinetic energy (ft-lbs)
  const energyFtLbs = Math.round((load.bulletGr * remainingFps * remainingFps) / 450437);

  return {
    dropMil: Number(dropMil.toFixed(1)),
    clicksMil: Math.round(dropMil * 10),
    windMil: Number(windMil.toFixed(1)),
    tof: tof.toFixed(2),
    remainingFps,
    mach,
    energyFtLbs,
  };
}

export function GunniesSandboxCard({ compact = false }: { compact?: boolean }) {
  const rangeSliderId = useId();
  const windSliderId = useId();
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const windRef = useRef<HTMLInputElement | null>(null);
  const { soundEnabled } = useAtmosphere();

  const [loadIdx, setLoadIdx] = useState<number>(0);
  const [rangeYd, setRangeYd] = useState<number>(600);
  const [windMph, setWindMph] = useState<number>(10);
  const [dialMode, setDialMode] = useState<boolean>(false); // false = HOLD ALL, true = DIAL ELEV + HOLD WIND
  const [illuminated, setIlluminated] = useState<boolean>(true);

  const activeLoad = LOADS[loadIdx] ?? LOADS[0]!;
  const sol = useMemo(
    () => solveBallistics(activeLoad, rangeYd, windMph),
    [activeLoad, rangeYd, windMph],
  );

  // Sync CSS custom properties on both native range sliders (Modern Web Guidance `slider`)
  useEffect(() => {
    if (rangeRef.current) {
      rangeRef.current.style.setProperty('--attr-min', '100');
      rangeRef.current.style.setProperty('--attr-max', '1000');
      rangeRef.current.style.setProperty('--control-value', String(rangeYd));
    }
  }, [rangeYd]);

  useEffect(() => {
    if (windRef.current) {
      windRef.current.style.setProperty('--attr-min', '0');
      windRef.current.style.setProperty('--attr-max', '20');
      windRef.current.style.setProperty('--control-value', String(windMph));
      windRef.current.style.setProperty('--slider-fill-color', 'var(--accent-telemetry)');
    }
  }, [windMph]);

  // SVG FFP Reticle coordinate math (center = 130, 92; 1 MIL = 11.5 SVG units)
  const milScale = 11.5;
  const centerX = 130;
  const centerY = 92;
  const holdY = dialMode ? centerY : Math.min(222, centerY + sol.dropMil * milScale);
  const holdX = Math.min(230, centerX + sol.windMil * milScale);

  // True-to-scale 18"x30" IPSC steel plate shrinks realistically with target range
  const targetScale = Math.max(0.28, Math.min(1.35, 420 / rangeYd));
  const reticleStroke = illuminated ? '#F43F5E' : '#E2E8F0';

  return (
    <article
      data-cursor="INSPECT"
      className="dtl-glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-12"
    >
      {/* Tactical crimson-amber subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #EF4444, #F59E0B, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="https://gmascagni.github.io/gunnies/assets/gunnies-icon-256.png"
            alt="Gunnies Ballistics icon"
            width={44}
            height={44}
            loading="lazy"
            className="h-11 w-11 rounded-2xl border border-amber-400/30 object-cover shadow-md"
          />
          <div>
            <span className="dtl-telemetry block text-[var(--accent-primary)]">
              FLAGSHIP 03 // ANDROID KOTLIN 3-DOF+ RK4 FIELD SOLVER &amp; BLE SYNC
            </span>
            <h3 className="font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-3xl">
              Gunnies Ballistics
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDialMode((d) => !d);
              playDetentClick(1.25, soundEnabled);
            }}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[11px] font-bold transition-colors ${
              dialMode
                ? 'bg-[var(--accent-primary)] text-slate-950'
                : 'dtl-surface-2 text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
            }`}
          >
            {dialMode ? 'MODE: DIAL ELEV · HOLD WIND' : 'MODE: HOLD ALL (CHRISTMAS TREE)'}
          </button>

          <button
            type="button"
            onClick={() => {
              setIlluminated((v) => !v);
              playDetentClick(0.95, soundEnabled);
            }}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold transition-colors ${
              illuminated
                ? 'border border-rose-500/50 bg-rose-500/15 text-rose-300'
                : 'dtl-surface-2 text-[var(--text-secondary)]'
            }`}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            {illuminated ? 'ILLUM RED FFP' : 'DAYLIGHT ETCH'}
          </button>
        </div>
      </div>

      <p className="relative z-10 mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
        Precision Android field solver with <strong>338+ factory profiles</strong>, live GPS weather,{' '}
        <strong>3-zone wind banding</strong>, illuminated true-scale FFP reticles, PRS stage cards,
        and Bushnell BLE laser rangefinder sync—100% offline capable. Dial range &amp; wind below to
        test the live FFP reticle holdover engine.
      </p>

      {/* Interactive Solver + Illuminated FFP Reticle Viewport */}
      <div className="relative z-10 mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left 5 cols: Illuminated True-to-Scale FFP Scope Viewport */}
        <div className="dtl-surface flex flex-col justify-between rounded-2xl p-4 lg:col-span-5">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
            <span>OPTIC // TRUE FFP MRAD TREE</span>
            <span className="text-[var(--accent-telemetry)]">
              TARGET {rangeYd} YD · WIND {windMph} MPH →
            </span>
          </div>

          <div className="relative mx-auto my-3 aspect-[260/236] w-full max-w-[310px] overflow-hidden rounded-full border-2 border-slate-700/80 bg-[radial-gradient(circle_at_50%_38%,#16212b_0%,#090d12_72%,#040608_100%)] shadow-[inset_0_0_36px_rgba(0,0,0,0.9)]">
            <svg viewBox="0 0 260 236" className="h-full w-full" aria-hidden="true">
              {/* Horizon / Distant Berm */}
              <path
                d="M0,92 Q68,84 130,90 T260,88 L260,236 L0,236 Z"
                fill="rgba(15, 23, 30, 0.72)"
              />

              {/* True-to-scale IPSC Steel Target Silhouette */}
              <g
                transform={`translate(${holdX}, ${holdY}) scale(${targetScale.toFixed(2)})`}
                style={{ transition: 'transform 120ms ease-out' }}
              >
                <path
                  d="M-6,-18 L6,-18 L6,-10 L13,-6 L13,16 L-13,16 L-13,-6 L-6,-10 Z"
                  fill="#94A3B8"
                  fillOpacity="0.35"
                  stroke="#E2E8F0"
                  strokeWidth="1.2"
                />
              </g>

              {/* Main Horizontal & Vertical Stadia */}
              <line
                x1="16"
                y1={centerY}
                x2="244"
                y2={centerY}
                stroke={reticleStroke}
                strokeWidth="0.9"
                strokeOpacity="0.85"
              />
              <line
                x1={centerX}
                y1="14"
                x2={centerX}
                y2="226"
                stroke={reticleStroke}
                strokeWidth="0.9"
                strokeOpacity="0.85"
              />

              {/* MIL Elevation Hashmarks + Christmas-Tree Wind Dots (1..10 MIL) */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mil) => {
                const y = centerY + mil * milScale;
                const isEven = mil % 2 === 0;
                return (
                  <g key={mil}>
                    <line
                      x1={centerX - (isEven ? 5 : 2.8)}
                      y1={y}
                      x2={centerX + (isEven ? 5 : 2.8)}
                      y2={y}
                      stroke={reticleStroke}
                      strokeWidth="0.85"
                    />
                    {isEven && (
                      <text
                        x={centerX - 11}
                        y={y + 2.5}
                        fill={reticleStroke}
                        fontSize="6.5"
                        fontFamily="JetBrains Mono, monospace"
                        textAnchor="end"
                        opacity="0.85"
                      >
                        {mil}
                      </text>
                    )}
                    {/* Christmas tree horizontal wind dots */}
                    {[1, 2, 3].map((w) => (
                      <g key={`${mil}-${w}`}>
                        <circle
                          cx={centerX + w * milScale}
                          cy={y}
                          r="0.95"
                          fill={reticleStroke}
                          opacity="0.65"
                        />
                        <circle
                          cx={centerX - w * milScale}
                          cy={y}
                          r="0.95"
                          fill={reticleStroke}
                          opacity="0.65"
                        />
                      </g>
                    ))}
                  </g>
                );
              })}

              {/* Horizontal Windage Hashmarks */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((w) => (
                <line
                  key={w}
                  x1={centerX + w * milScale}
                  y1={centerY - 3}
                  x2={centerX + w * milScale}
                  y2={centerY + 3}
                  stroke={reticleStroke}
                  strokeWidth="0.85"
                />
              ))}

              {/* Active Computed Ballistic Solution Hold Indicator */}
              <g
                transform={`translate(${holdX.toFixed(1)}, ${holdY.toFixed(1)})`}
                style={{ transition: 'transform 110ms ease-out' }}
              >
                <circle r="7.5" fill="none" stroke="#22D3EE" strokeWidth="1.2" strokeOpacity="0.9" />
                <circle r="2.2" fill="#F59E0B" />
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-[var(--accent-primary)] font-bold">
              ↑ {sol.dropMil.toFixed(1)} MIL ({sol.clicksMil} CLICKS)
            </span>
            <span className="text-[var(--accent-telemetry)] font-bold">
              → {sol.windMil.toFixed(1)} MIL WIND
            </span>
          </div>
        </div>

        {/* Right 7 cols: Cartridge Selector, Range/Wind Controls, Telemetry Strip & Video Preview */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-7">
          {/* Cartridge Load Pills */}
          <div className="dtl-surface rounded-2xl p-4 sm:p-5">
            <span className="dtl-telemetry block text-[10px] text-[var(--text-muted)]">
              FACTORY ARSENAL PROFILE (338+ PRELOADED RIGS)
            </span>
            <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Cartridge profile">
              {LOADS.map((load, idx) => (
                <button
                  key={load.id}
                  type="button"
                  onClick={() => {
                    setLoadIdx(idx);
                    playDetentClick(1.05, soundEnabled);
                  }}
                  className={`cursor-pointer rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
                    loadIdx === idx
                      ? 'bg-[var(--accent-primary)] text-slate-950 font-bold'
                      : 'dtl-surface-2 text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
                  }`}
                >
                  {load.label}
                </button>
              ))}
            </div>

            {/* Target Range & 3-Zone Crosswind Sliders */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <label htmlFor={rangeSliderId} className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-main)]">
                    <Crosshair className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                    TARGET RANGE
                  </label>
                  <span className="font-bold text-[var(--accent-primary)]">{rangeYd} YDS</span>
                </div>
                <input
                  ref={rangeRef}
                  id={rangeSliderId}
                  type="range"
                  min={100}
                  max={1000}
                  step={25}
                  value={rangeYd}
                  aria-valuetext={`${rangeYd} yards — ${sol.dropMil} MIL elevation`}
                  onChange={(e) => {
                    setRangeYd(Number(e.target.value));
                    playDetentClick(0.95, soundEnabled);
                  }}
                  className="dtl-range mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <label htmlFor={windSliderId} className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-main)]">
                    <Wind className="h-3.5 w-3.5 text-[var(--accent-telemetry)]" aria-hidden="true" />
                    3-ZONE CROSSWIND
                  </label>
                  <span className="font-bold text-[var(--accent-telemetry)]">{windMph} MPH (90°)</span>
                </div>
                <input
                  ref={windRef}
                  id={windSliderId}
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={windMph}
                  aria-valuetext={`${windMph} miles per hour crosswind — ${sol.windMil} MIL drift`}
                  onChange={(e) => {
                    setWindMph(Number(e.target.value));
                    playDetentClick(1.1, soundEnabled);
                  }}
                  className="dtl-range mt-1"
                />
              </div>
            </div>

            {/* Live 4-Metric Solver HUD */}
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="dtl-surface-2 rounded-xl p-2.5">
                <span className="font-mono text-[9px] uppercase text-[var(--text-muted)]">VELOCITY</span>
                <p className="font-mono text-sm font-bold text-[var(--text-main)]">{sol.remainingFps} fps</p>
              </div>
              <div className="dtl-surface-2 rounded-xl p-2.5">
                <span className="font-mono text-[9px] uppercase text-[var(--text-muted)]">MACH / TRANSONIC</span>
                <p
                  className={`font-mono text-sm font-bold ${
                    Number(sol.mach) < 1.2 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  Mach {sol.mach}
                </p>
              </div>
              <div className="dtl-surface-2 rounded-xl p-2.5">
                <span className="font-mono text-[9px] uppercase text-[var(--text-muted)]">TIME OF FLIGHT</span>
                <p className="font-mono text-sm font-bold text-[var(--text-main)]">{sol.tof} s</p>
              </div>
              <div className="dtl-surface-2 rounded-xl p-2.5">
                <span className="font-mono text-[9px] uppercase text-[var(--text-muted)]">ENERGY ON TARGET</span>
                <p className="font-mono text-sm font-bold text-[var(--text-main)]">{sol.energyFtLbs} ft·lb</p>
              </div>
            </div>
          </div>

          {/* Live Rebuilt Gunnies Site Banner + Walkthrough Teaser */}
          {!compact && (
            <div className="dtl-surface flex flex-col justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3.5">
                <a
                  href="https://gmascagni.github.io/gunnies/#demo"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block h-16 w-28 shrink-0 overflow-hidden rounded-xl border border-[var(--border-specular)]"
                >
                  <img
                    src="https://gmascagni.github.io/gunnies/assets/poster-16x9.webp"
                    alt="Gunnies Ballistics HD walkthrough preview"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-primary)] text-slate-950 shadow">
                      <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    </span>
                  </span>
                </a>
                <div>
                  <span className="dtl-telemetry block text-[10px] text-[var(--accent-telemetry)]">
                    NEW PRODUCT SITE &amp; 6-SCENE HD TOUR
                  </span>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                    Explore the interactive 0:55 walkthrough, PRS Stage Cards, and DOPE tables on
                    the live Gunnies Ballistics showcase.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                <a
                  href="https://gmascagni.github.io/gunnies/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)] px-4 py-2 font-mono text-xs font-bold text-slate-950 transition-transform hover:scale-105"
                >
                  LAUNCH GUNNIES SITE
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <Link
                  to="/apps/gunnies-ballistics"
                  className="dtl-surface-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
                >
                  APP DOSSIER →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
