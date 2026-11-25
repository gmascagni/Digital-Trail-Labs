import { useRef, useState } from 'react';
import { Film, Play } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';
import { playDetentClick } from '../utils/tactileAudio';

const GUNNIES_CHAPTERS = [
  {
    num: '01',
    name: 'Arsenal Setup',
    seek: 0,
    thumb: 'https://gmascagni.github.io/gunnies/assets/scene-1.webp',
    caption: 'Independent rifles, scopes, ammo & suppressors from 338+ factory profiles.',
  },
  {
    num: '02',
    name: 'GPS & 3-Zone Wind',
    seek: 9.25,
    thumb: 'https://gmascagni.github.io/gunnies/assets/scene-2.webp',
    caption: 'One-tap GPS station pressure, density altitude & Near/Mid/Far wind banding.',
  },
  {
    num: '03',
    name: 'Solver HUD',
    seek: 19.0,
    thumb: 'https://gmascagni.github.io/gunnies/assets/scene-3.webp',
    caption: 'Real-time elevation clicks, wind holds, incline lock & transonic truing.',
  },
  {
    num: '04',
    name: 'True FFP Reticle',
    seek: 28.95,
    thumb: 'https://gmascagni.github.io/gunnies/assets/scene-4.webp',
    caption: 'Illuminated first focal plane reticle scaled to magnification.',
  },
  {
    num: '05',
    name: 'PRS Stage Card',
    seek: 36.8,
    thumb: 'https://gmascagni.github.io/gunnies/assets/scene-5.webp',
    caption: 'Multi-target match stage cards built for rapid on-the-clock transitions.',
  },
  {
    num: '06',
    name: 'DOPE Table',
    seek: 45.35,
    thumb: 'https://gmascagni.github.io/gunnies/assets/scene-6.webp',
    caption: 'Single-pass shareable DOPE range cards ready 100% offline.',
  },
];

export function GunniesWalkthroughCinema() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { soundEnabled } = useAtmosphere();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const jumpToChapter = (idx: number) => {
    const ch = GUNNIES_CHAPTERS[idx];
    if (!ch) return;
    setActiveIdx(idx);
    setHasStarted(true);
    playDetentClick(1.0 + idx * 0.05, soundEnabled);
    const v = videoRef.current;
    if (v) {
      v.currentTime = ch.seek;
      v.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const t = v.currentTime;
    let current = 0;
    for (let i = 0; i < GUNNIES_CHAPTERS.length; i++) {
      if (t >= GUNNIES_CHAPTERS[i]!.seek) {
        current = i;
      }
    }
    if (current !== activeIdx) {
      setActiveIdx(current);
    }
  };

  return (
    <section className="dtl-glass mt-8 overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Film className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          <h2 className="font-[var(--font-display)] text-xl font-extrabold text-[var(--text-main)]">
            Interactive 6-Scene HD App Walkthrough
          </h2>
        </div>
        <span className="dtl-telemetry rounded-full border border-[var(--border-specular)] px-3 py-1 text-[10px] text-[var(--accent-telemetry)]">
          OFFICIAL WALKTHROUGH · 0:55 HD
        </span>
      </div>

      {/* Video Player */}
      <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-black">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster="https://gmascagni.github.io/gunnies/assets/poster-16x9.webp"
          onPlay={() => setHasStarted(true)}
          onTimeUpdate={handleTimeUpdate}
          className="h-full w-full object-cover"
        >
          <source
            src="https://gmascagni.github.io/gunnies/media/gunnies-tutorial-16x9.mp4"
            type="video/mp4"
          />
        </video>

        {!hasStarted && (
          <button
            type="button"
            onClick={() => jumpToChapter(0)}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/35 transition-colors hover:bg-black/20"
            aria-label="Play Gunnies Ballistics HD walkthrough"
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-primary)] text-slate-950 shadow-2xl transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
            <span className="rounded-full bg-black/75 px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-white backdrop-blur-md">
              PLAY OFFICIAL WALKTHROUGH · 0:55
            </span>
          </button>
        )}
      </div>

      {/* Interactive Chapter Scrubber Strip */}
      <div
        role="group"
        aria-label="Jump to walkthrough scene"
        className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {GUNNIES_CHAPTERS.map((ch, idx) => {
          const active = activeIdx === idx;
          return (
            <button
              key={ch.num}
              type="button"
              onClick={() => jumpToChapter(idx)}
              className={`cursor-pointer rounded-xl p-2.5 text-left transition-all ${
                active
                  ? 'border border-[var(--accent-primary)] bg-[var(--accent-soft)]'
                  : 'dtl-surface hover:border-[var(--accent-primary)]'
              }`}
            >
              <span className="block font-mono text-[10px] font-bold text-[var(--accent-primary)]">
                CH {ch.num}
              </span>
              <span className="mt-0.5 block font-[var(--font-grotesk)] text-xs font-bold text-[var(--text-main)] truncate">
                {ch.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 6-Scene Visual Tour Cards */}
      <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {GUNNIES_CHAPTERS.map((ch, idx) => (
          <button
            key={ch.num}
            type="button"
            onClick={() => jumpToChapter(idx)}
            className="dtl-card group cursor-pointer overflow-hidden rounded-2xl text-left"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={ch.thumb}
                alt={ch.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-2.5 top-2.5 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--accent-primary)] backdrop-blur-xs">
                {ch.num} / 06
              </span>
            </div>
            <div className="p-3.5">
              <p className="font-[var(--font-display)] text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)]">
                {ch.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                {ch.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
