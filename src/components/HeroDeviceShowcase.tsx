import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Coffee,
  Crosshair,
  Lock,
  Send,
  ShieldCheck,
} from 'lucide-react';

interface ShowcaseSlide {
  id: 'gunnies' | 'brew' | 'trailvault' | 'agentbridge';
  label: string;
  badge: string;
  urlDisplay: string;
  appSlug: string;
  externalUrl?: string;
}

const SLIDES: ShowcaseSlide[] = [
  {
    id: 'gunnies',
    label: 'Gunnies Ballistics',
    badge: 'Native Android · Kotlin & BLE',
    urlDisplay: 'gmascagni.github.io/gunnies',
    appSlug: 'gunnies-ballistics',
    externalUrl: 'https://gmascagni.github.io/gunnies/',
  },
  {
    id: 'brew',
    label: 'The Brew App',
    badge: 'Consumer Web · OCR & Firebase',
    urlDisplay: 'thebrew.app',
    appSlug: 'the-brew-app',
    externalUrl: 'https://thebrew.app',
  },
  {
    id: 'trailvault',
    label: 'TrailVault™ Enterprise',
    badge: 'Air-Gapped AI · Local RAG',
    urlDisplay: 'gmascagni.github.io/airgap',
    appSlug: 'trailvault-enterprise',
    externalUrl: 'https://gmascagni.github.io/airgap/',
  },
  {
    id: 'agentbridge',
    label: 'AgentBridge Swarm',
    badge: 'Autonomous Agents · Telegram',
    urlDisplay: 't.me/AgentBridge · Multi-Agent Hub',
    appSlug: 'agentbridge-autonomous-hub',
  },
];

export function HeroDeviceShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const current = SLIDES[activeIndex] ?? SLIDES[0]!;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full"
    >
      {/* Subtle soft glow behind device frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-35 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 65% 40%, rgba(56, 189, 248, 0.25), rgba(16, 185, 129, 0.14), transparent 72%)',
        }}
      />

      {/* Primary Desktop Browser Frame */}
      <div className="dtl-surface relative overflow-hidden rounded-2xl border border-[var(--border-strong)] shadow-2xl">
        {/* Browser Chrome Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-specular)] bg-[var(--bg-primary)]/70 px-3.5 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="dtl-surface-2 flex max-w-xs items-center gap-1.5 truncate rounded-md px-3 py-1 font-mono text-[11px] text-[var(--text-muted)]">
              <Lock className="h-3 w-3 shrink-0 text-emerald-400" aria-hidden="true" />
              <span className="truncate">{current.urlDisplay}</span>
            </div>
          </div>

          <Link
            to={`/apps/${current.appSlug}`}
            className="shrink-0 text-[11px] font-semibold text-[var(--accent-primary)] hover:underline"
          >
            Recap →
          </Link>
        </div>

        {/* Viewport Stage (16:10) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#090D16]">
          {/* SLIDE 1: GUNNIES BALLISTICS (Real Desktop Hero + Real Android Phone UI Overlay) */}
          {current.id === 'gunnies' && (
            <div className="relative h-full w-full">
              <img
                src="https://gmascagni.github.io/gunnies/assets/poster-16x9.webp"
                alt="Gunnies Ballistics Android precision solver on shooting bench"
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090D16]/85 via-[#090D16]/35 to-transparent" />

              <div className="absolute bottom-4 left-4 right-36 sm:bottom-5 sm:left-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-300 border border-amber-400/30">
                  <Crosshair className="h-3 w-3" aria-hidden="true" />
                  338+ Factory Profiles · 100% Offline
                </span>
                <p className="mt-2 font-[var(--font-grotesk)] text-lg font-bold leading-tight text-white sm:text-xl">
                  Gunnies Ballistics for Android
                </p>
                <p className="mt-1 hidden text-xs text-slate-300 sm:block">
                  3-DOF+ RK4 solver, 3-zone wind, true FFP reticles &amp; Bushnell BLE sync.
                </p>
              </div>

              {/* Overlapping Android Handset Frame */}
              <div className="absolute -bottom-3 right-3 w-[31%] max-w-[148px] overflow-hidden rounded-t-2xl border-2 border-slate-600/90 bg-black shadow-2xl sm:right-5">
                <img
                  src="https://gmascagni.github.io/gunnies/assets/ui-solver.webp"
                  alt="Gunnies Ballistics mobile Solver HUD screen"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* SLIDE 2: THE BREW APP (Real Production Preview + Mobile Extraction Card) */}
          {current.id === 'brew' && (
            <div className="relative h-full w-full">
              <img
                src="https://thebrew.app/og-preview.jpg"
                alt="The Brew App specialty coffee platform"
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/90 via-[#090D16]/35 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
                    <Coffee className="h-3 w-3" aria-hidden="true" />
                    OCR Bag Scanner · Brew Guides
                  </span>
                  <p className="mt-2 font-[var(--font-grotesk)] text-lg font-bold text-white sm:text-xl">
                    The Brew App (thebrew.app)
                  </p>
                  <p className="mt-0.5 hidden text-xs text-slate-300 sm:block">
                    Camera OCR &amp; barcode coffee bag recognition, dial-in ratios, and automated QA.
                  </p>
                </div>

                {/* Compact Mobile Extraction Card */}
                <div className="hidden shrink-0 rounded-xl border border-white/15 bg-slate-950/85 p-3 backdrop-blur-md sm:block">
                  <p className="font-mono text-[10px] text-amber-400">V60 POUR-OVER</p>
                  <p className="mt-0.5 font-[var(--font-grotesk)] text-base font-bold text-white">
                    1:16 · 288 ml
                  </p>
                  <p className="font-mono text-[10px] text-emerald-400">Tesseract OCR Ready</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: TRAILVAULT ENTERPRISE (Air-Gapped Enclave Appliance UI) */}
          {current.id === 'trailvault' && (
            <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#09151A] p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  AIR-GAPPED ENCLAVE · ZERO EGRESS
                </span>
                <span className="font-mono text-[10px] text-sky-300">NIST SP 800-88 VERIFIED</span>
              </div>

              <div className="my-auto grid gap-3 sm:grid-cols-12">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/85 p-3.5 sm:col-span-7">
                  <p className="font-mono text-[10px] text-slate-400">LOCAL HYBRID RAG QUERY</p>
                  <p className="mt-1 text-xs font-semibold text-white">
                    &ldquo;Locate MIL-STD torque &amp; seal tolerances for primary valve assembly&rdquo;
                  </p>
                  <div className="mt-2.5 space-y-1.5 border-t border-slate-800 pt-2 text-[11px] text-slate-300">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                      <span>Grounded citation: Manual Rev 4.2 · Section 8.4</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-sky-400" aria-hidden="true" />
                      <span>Qdrant Vector + BM25 Lexical · Local Ollama GPU</span>
                    </p>
                  </div>
                </div>

                <div className="hidden flex-col justify-between rounded-xl border border-slate-700/70 bg-slate-950/80 p-3.5 sm:flex sm:col-span-5">
                  <div>
                    <p className="font-mono text-[10px] text-slate-400">SECURITY POSTURE</p>
                    <p className="mt-1 font-mono text-xs font-bold text-emerald-400">127.0.0.1 LOOPBACK</p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Offline ONNX embeddings &amp; BitLocker XTS-AES encryption.
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-amber-300">CIS-Hardened Docker + NVMe</span>
                </div>
              </div>

              <p className="font-[var(--font-grotesk)] text-sm font-bold text-white sm:text-base">
                TrailVault™ Enterprise — Disconnected Document Intelligence
              </p>
            </div>
          )}

          {/* SLIDE 4: AGENTBRIDGE AUTONOMOUS TELEGRAM SWARM */}
          {current.id === 'agentbridge' && (
            <div className="grid h-full w-full grid-cols-12 gap-3 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0D1F22] p-4 sm:p-5">
              {/* Left: Swarm Hierarchy */}
              <div className="col-span-12 flex flex-col justify-between sm:col-span-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-sky-300">
                    <Bot className="h-3 w-3" aria-hidden="true" />
                    Python 3.12 Multi-Agent Hub
                  </span>
                  <p className="mt-2 font-[var(--font-grotesk)] text-base font-bold text-white sm:text-lg">
                    AgentBridge Orchestrator
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    Command specialized autonomous agents directly from Telegram, WhatsApp, or Web.
                  </p>
                </div>

                <div className="mt-3 space-y-1.5 font-mono text-[10px]">
                  <div className="rounded-lg border border-slate-700/80 bg-slate-900/80 px-2.5 py-1.5 text-amber-300">
                    Orion (Coordinator) → Intent &amp; Routing
                  </div>
                  <div className="rounded-lg border border-slate-700/80 bg-slate-900/80 px-2.5 py-1.5 text-sky-300">
                    Echo (@researcher) → Live Web Synthesis
                  </div>
                  <div className="rounded-lg border border-slate-700/80 bg-slate-900/80 px-2.5 py-1.5 text-emerald-300">
                    Atlas (@executor) → Notes, Logs &amp; Calendar
                  </div>
                </div>
              </div>

              {/* Right: Mobile Telegram Chat Preview */}
              <div className="hidden flex-col justify-between rounded-2xl border border-slate-700/90 bg-[#0E1621] p-3 shadow-xl sm:col-span-6 sm:flex">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-semibold text-white">Telegram · AgentBridge</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>

                <div className="my-auto space-y-2 py-2 text-[11px]">
                  <div className="ml-auto max-w-[88%] rounded-xl rounded-br-xs bg-sky-600 px-2.5 py-1.5 text-white">
                    @researcher summarize latest Salesforce release notes &amp; log action items
                  </div>
                  <div className="mr-auto max-w-[92%] rounded-xl rounded-bl-xs bg-slate-800 px-2.5 py-1.5 text-slate-200">
                    <span className="block font-mono text-[9px] text-emerald-400">Orion → Echo &amp; Atlas</span>
                    Synthesized 4 key platform updates and saved checklist to ops log.
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] text-slate-400">
                  <span>Message @AgentBridgeBot...</span>
                  <Send className="h-3 w-3 text-sky-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Caption Bar inside Browser Frame */}
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border-specular)] bg-[var(--bg-elevated)] px-4 py-2.5">
          <div className="min-w-0">
            <span className="block truncate text-xs font-bold text-[var(--text-main)]">
              {current.label}
            </span>
            <span className="block truncate text-[11px] text-[var(--text-muted)]">
              {current.badge}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {current.externalUrl && (
              <a
                href={current.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="dtl-surface-2 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
              >
                Live Site
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Interactive 4-App Selector Pills Below Device Frame */}
      <div
        role="tablist"
        aria-label="Featured application previews"
        className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {SLIDES.map((slide, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setActiveIndex(idx);
                setPaused(true);
              }}
              className={`cursor-pointer rounded-xl px-3 py-2 text-left transition-all ${
                active
                  ? 'border border-[var(--accent-primary)] bg-[var(--accent-soft)]'
                  : 'dtl-surface hover:border-[var(--accent-primary)]'
              }`}
            >
              <span
                className={`block truncate text-xs font-semibold ${
                  active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-main)]'
                }`}
              >
                {slide.label}
              </span>
              <span className="block truncate text-[10px] text-[var(--text-muted)]">
                {slide.badge.split('·')[0]?.trim()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
