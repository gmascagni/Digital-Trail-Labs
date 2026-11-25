import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Leaf, Thermometer } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';
import { playDetentClick } from '../utils/tactileAudio';

interface CultivarProfile {
  cultivar: string;
  origin: string;
  steepTime: string;
  colorTop: string;
  colorBottom: string;
  notes: string;
  sweetness: number;
  umami: number;
  tannin: number;
}

function getInfusionProfile(tempC: number): CultivarProfile {
  const norm = (tempC - 65) / 35; // 0..1
  const sweetness = Math.round(88 - Math.pow(norm - 0.32, 2) * 55);
  const umami = Math.round(92 - norm * 58);
  const tannin = Math.round(14 + Math.pow(norm, 1.65) * 78);

  if (tempC <= 74) {
    return {
      cultivar: 'Uji Gyokuro & Silver Needle',
      origin: 'Kyoto, Japan · Fujian',
      steepTime: '90s · 1st Infusion',
      colorTop: '#D9F99D',
      colorBottom: '#34D399',
      notes: 'High L-theanine marine umami, sweet springdew finish, zero bitterness.',
      sweetness,
      umami,
      tannin,
    };
  }
  if (tempC <= 84) {
    return {
      cultivar: 'West Lake Dragonwell (Longjing)',
      origin: 'Hangzhou, Zhejiang',
      steepTime: '120s · Glass Gaiwan',
      colorTop: '#A7F3D0',
      colorBottom: '#EAB308',
      notes: 'Toasted chestnut aroma, silky orchid sweetness, balanced catechins.',
      sweetness,
      umami,
      tannin,
    };
  }
  if (tempC <= 92) {
    return {
      cultivar: 'Alishan High-Mountain Oolong',
      origin: 'Chiayi, Taiwan · 1,400m',
      steepTime: '55s · Gongfu Flash',
      colorTop: '#FDE047',
      colorBottom: '#D97706',
      notes: 'Ripe apricot nectar, roasted honeyed florals, lingering alpine minerality.',
      sweetness,
      umami,
      tannin,
    };
  }
  return {
    cultivar: 'Imperial Assam & Aged Pu-erh',
    origin: 'Brahmaputra · Yunnan',
    steepTime: '180s · Full Boil',
    colorTop: '#F97316',
    colorBottom: '#7F1D1D',
    notes: 'Deep dark-cacao malt, aged camphor warmth, structured tannic backbone.',
    sweetness,
    umami,
    tannin,
  };
}

export function LooseLeafSandboxCard() {
  const sliderId = useId();
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const { soundEnabled } = useAtmosphere();
  const [tempC, setTempC] = useState<number>(86);

  const profile = useMemo(() => getInfusionProfile(tempC), [tempC]);
  const tempF = Math.round((tempC * 9) / 5 + 32);

  // Sync CSS custom properties on native range input per Modern Web Guidance (`slider`)
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.style.setProperty('--attr-min', '65');
    el.style.setProperty('--attr-max', '100');
    el.style.setProperty('--control-value', String(tempC));
    el.style.setProperty('--slider-fill-color', profile.colorBottom);
  }, [tempC, profile.colorBottom]);

  // Build SVG Bezier telemetry curves for Sweetness & Tannin
  const sweetEndY = 72 - profile.sweetness * 0.58;
  const tanninEndY = 72 - profile.tannin * 0.58;

  return (
    <article
      data-cursor="STEEP"
      className="dtl-glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-5"
    >
      {/* Dynamic botanical glow reacting to current infusion color */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-25 blur-3xl transition-colors duration-500"
        style={{
          background: `radial-gradient(circle, ${profile.colorTop}, transparent 70%)`,
        }}
      />

      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/20 text-emerald-300">
              <Leaf className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <span className="dtl-telemetry block text-[var(--accent-telemetry)]">
                FLAGSHIP 02 // BOTANICAL THERMODYNAMICS
              </span>
              <h3 className="font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--text-main)]">
                Loose-Leaf
              </h3>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-[var(--text-main)]">
            {tempC}°C <span className="text-[var(--text-muted)]">/ {tempF}°F</span>
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          Drag the thermal steep slider to observe real-time liquor chromaticity, cultivar pairing,
          and sweetness-to-tannin extraction kinetics.
        </p>

        {/* Infusion Liquor Vessel + Extraction Curve Visualizer */}
        <div className="dtl-surface mt-5 rounded-2xl p-4">
          <div className="grid grid-cols-12 items-center gap-3.5">
            {/* Live Color-Shifting Infusion Vessel */}
            <div className="col-span-5">
              <div
                className="relative flex h-28 flex-col justify-end overflow-hidden rounded-2xl border border-white/15 p-2.5 shadow-inner transition-all duration-300"
                style={{
                  background: `linear-gradient(180deg, rgba(8,9,12,0.55) 0%, ${profile.colorTop} 38%, ${profile.colorBottom} 100%)`,
                }}
              >
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-950/85 font-bold bg-white/75 backdrop-blur-xs rounded px-1.5 py-0.5 self-start">
                  {profile.steepTime}
                </span>
              </div>
            </div>

            {/* Extraction Kinetics SVG Graph */}
            <div className="col-span-7">
              <div className="rounded-xl border border-[var(--border-specular)] bg-[#07080B] p-2.5">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-emerald-300">SWEET {profile.sweetness}%</span>
                  <span className="text-amber-400">TANNIN {profile.tannin}%</span>
                </div>
                <svg viewBox="0 0 180 76" className="mt-1 h-16 w-full" aria-hidden="true">
                  <line x1="0" y1="70" x2="180" y2="70" stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
                  <path
                    d={`M 4 66 Q 78 ${sweetEndY - 12}, 176 ${sweetEndY}`}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 4 68 Q 92 66, 176 ${tanninEndY}`}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.2"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="font-mono text-[10px] text-slate-400 truncate">
                  UMAMI INDEX // {profile.umami}
                </p>
              </div>
            </div>
          </div>

          {/* Native Accessible Range Input */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor={sliderId}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[var(--text-main)]"
              >
                <Thermometer className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                WATER TEMPERATURE
              </label>
              <span className="font-mono text-[11px] text-[var(--accent-primary)]">
                {profile.cultivar}
              </span>
            </div>
            <input
              ref={sliderRef}
              id={sliderId}
              type="range"
              min={65}
              max={100}
              step={1}
              value={tempC}
              aria-valuetext={`${tempC} degrees Celsius (${tempF} Fahrenheit) — ${profile.cultivar}`}
              onChange={(e) => {
                const next = Number(e.target.value);
                setTempC(next);
                if (next % 3 === 0) {
                  playDetentClick(0.9 + ((next - 65) / 35) * 0.4, soundEnabled);
                }
              }}
              className="dtl-range mt-1"
            />
            <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
              {profile.notes}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-specular)] pt-4">
        <Link
          to="/apps/loose-leaf"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-telemetry)] hover:underline"
        >
          INSPECT ARCHITECTURE RECAP →
        </Link>
        <a
          href="https://loose-leaf.thebrew.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-main)]"
        >
          loose-leaf.thebrew.app
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
