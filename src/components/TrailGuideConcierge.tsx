import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Check,
  Command,
  Compass,
  KeyRound,
  Loader2,
  Palette,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';
import {
  askTrailGuide,
  getSavedApiKey,
  remixStudioVibe,
  saveApiKey,
  TRAILGUIDE_MODEL,
} from '../services/trailGuideAi';
import { playChimePulse, playDetentClick } from '../utils/tactileAudio';

const QUICK_VIBES = [
  'Shibuya Midnight Neon Espresso',
  'Kyoto Matcha Moss Sanctuary',
  'Orbital Deep-Space Telemetry',
  'Solar Anodized Copper Roastery',
];

export function TrailGuideConcierge() {
  const {
    conciergeOpen,
    setConciergeOpen,
    conciergeInitialTab,
    applyCustomTheme,
    theme,
    soundEnabled,
  } = useAtmosphere();

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [tab, setTab] = useState<'remix' | 'scope' | 'ask'>('remix');
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [sourceTag, setSourceTag] = useState<'gemini' | 'local' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [apiKeyDraft, setApiKeyDraft] = useState<string>(() => getSavedApiKey());
  const [hasLiveKey, setHasLiveKey] = useState<boolean>(() => Boolean(getSavedApiKey()));

  useEffect(() => {
    setTab(conciergeInitialTab);
  }, [conciergeInitialTab]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setConciergeOpen(!conciergeOpen);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [conciergeOpen, setConciergeOpen]);

  // Sync React open state with native <dialog>.showModal() + Safari light-dismiss fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (conciergeOpen && !dialog.open) {
      dialog.showModal();
      window.setTimeout(() => inputRef.current?.focus(), 30);
    } else if (!conciergeOpen && dialog.open) {
      dialog.close();
    }
  }, [conciergeOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      setConciergeOpen(false);
    };
    dialog.addEventListener('close', handleClose);

    // Mandatory fallback for browsers without native `closedBy` support (e.g. Safari)
    let removeClickFallback: (() => void) | undefined;
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const onBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const inside =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!inside) {
          dialog.close();
        }
      };
      dialog.addEventListener('click', onBackdropClick);
      removeClickFallback = () => dialog.removeEventListener('click', onBackdropClick);
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      removeClickFallback?.();
    };
  }, [setConciergeOpen]);

  const executePrompt = async (customInput?: string) => {
    const text = (customInput ?? prompt).trim();
    if (!text || loading) return;

    setLoading(true);
    setErrorMsg('');
    playDetentClick(1.1, soundEnabled);

    try {
      if (tab === 'remix') {
        const res = await remixStudioVibe(text);
        applyCustomTheme(res.payload);
        setSourceTag(res.source);
        setOutput(
          `Applied "${res.payload.themeName}" — BG ${res.payload.bgPrimary} · Accent ${res.payload.accentPrimary} · Telemetry ${res.payload.accentTelemetry} · Shader ${res.payload.shaderSpeed.toFixed(2)}x\n“${res.payload.poeticTagline}”`,
        );
        playChimePulse(soundEnabled);
      } else {
        const res = await askTrailGuide(tab, text);
        setSourceTag(res.source);
        setOutput(res.answer);
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? `Gemini API error: ${err.message}. Check your API key or clear it to use Demo Mode.`
          : 'Unexpected error communicating with TrailGuide AI.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Liquid Glass AI Dock */}
      <div className="fixed bottom-5 right-5 z-45">
        <button
          type="button"
          data-cursor="REMIX"
          onClick={() => setConciergeOpen(true)}
          className="dtl-glass group inline-flex cursor-pointer items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-semibold text-[var(--text-main)] shadow-2xl transition-transform hover:scale-105 hover:border-[var(--accent-primary)]"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)] text-slate-950">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="font-[var(--font-grotesk)] tracking-tight">TrailGuide AI</span>
          <kbd className="hidden rounded border border-[var(--border-specular)] bg-[var(--bg-primary)]/70 px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)] sm:inline-block">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Native Accessible Modal Dialog (Modern Web Guidance: dialog + light-dismiss-a-dialog) */}
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as Record<string, string>)}
        aria-labelledby="trailguide-title"
        className="m-auto w-[min(92vw,680px)] rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-0 text-[var(--text-main)] shadow-2xl backdrop:backdrop-blur-md"
      >
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-[var(--border-specular)] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                <Command className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h1
                  id="trailguide-title"
                  className="font-[var(--font-display)] text-lg font-extrabold tracking-tight text-[var(--text-main)]"
                >
                  TrailGuide AI Concierge
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {hasLiveKey
                    ? `LIVE GEMINI SDK // ${TRAILGUIDE_MODEL}`
                    : 'INSTANT STUDIO ENGINE // DEMO + LIVE KEY READY'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSettingsOpen((s) => !s)}
                className={`dtl-surface-2 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[11px] ${
                  hasLiveKey ? 'text-[var(--accent-telemetry)]' : 'text-[var(--text-secondary)]'
                } hover:border-[var(--accent-primary)]`}
              >
                <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{hasLiveKey ? 'KEY ACTIVE' : 'API KEY'}</span>
              </button>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close TrailGuide AI dialog"
                className="dtl-surface-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-secondary)] hover:border-[var(--accent-primary)]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Optional API Key Settings Drawer */}
          {settingsOpen && (
            <div className="dtl-surface-2 mt-4 rounded-2xl p-4">
              <label
                htmlFor="gemini-key-input"
                className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-primary)]"
              >
                Google Gemini API Key (Stored locally in browser)
              </label>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Paste a Gemini API key to switch from instant local studio synthesis to live{' '}
                <code>@google/genai</code> (<code>{TRAILGUIDE_MODEL}</code>) structured inference.
              </p>
              <div className="mt-2.5 flex gap-2">
                <input
                  id="gemini-key-input"
                  type="password"
                  value={apiKeyDraft}
                  onChange={(e) => setApiKeyDraft(e.target.value)}
                  placeholder="AIzaSy..."
                  className="dtl-surface flex-1 rounded-xl px-3 py-2 font-mono text-xs text-[var(--text-main)] focus:border-[var(--accent-primary)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    saveApiKey(apiKeyDraft);
                    setHasLiveKey(Boolean(apiKeyDraft.trim()));
                    setSettingsOpen(false);
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[var(--accent-primary)] px-3.5 py-2 font-mono text-xs font-bold text-slate-950"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  SAVE
                </button>
              </div>
            </div>
          )}

          {/* Mode Tabs */}
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Concierge modes">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'remix'}
              onClick={() => {
                setTab('remix');
                setOutput('');
              }}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors ${
                tab === 'remix'
                  ? 'bg-[var(--accent-primary)] text-slate-950'
                  : 'dtl-surface-2 text-[var(--text-secondary)]'
              }`}
            >
              <Palette className="h-3.5 w-3.5" aria-hidden="true" />
              Remix Studio Vibe
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'scope'}
              onClick={() => {
                setTab('scope');
                setOutput('');
              }}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors ${
                tab === 'scope'
                  ? 'bg-[var(--accent-primary)] text-slate-950'
                  : 'dtl-surface-2 text-[var(--text-secondary)]'
              }`}
            >
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Scope Product Idea
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'ask'}
              onClick={() => {
                setTab('ask');
                setOutput('');
              }}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors ${
                tab === 'ask'
                  ? 'bg-[var(--accent-primary)] text-slate-950'
                  : 'dtl-surface-2 text-[var(--text-secondary)]'
              }`}
            >
              <Bot className="h-3.5 w-3.5" aria-hidden="true" />
              Ask Studio &amp; Founder
            </button>
          </div>

          {/* Prompt Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void executePrompt();
            }}
            className="mt-4"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  tab === 'remix'
                    ? 'Describe an atmosphere (e.g., "Tokyo Cyberpunk Espresso" or "Kyoto Matcha Mist")...'
                    : tab === 'scope'
                      ? 'Describe an app or AI system to generate a DTL tech-stack blueprint...'
                      : 'Ask about Georgio Mascagni, AgentBridge Telegram swarms, TrailVault, or Brew ratios...'
                }
                aria-label="Prompt for TrailGuide AI"
                className="dtl-surface flex-1 rounded-2xl px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-2xl bg-[var(--accent-primary)] px-4 py-3 font-mono text-xs font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                <span>RUN</span>
              </button>
            </div>
          </form>

          {/* 1-Tap Quick Prompts */}
          {tab === 'remix' ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {QUICK_VIBES.map((vibe) => (
                <button
                  key={vibe}
                  type="button"
                  onClick={() => {
                    setPrompt(vibe);
                    void executePrompt(vibe);
                  }}
                  className="dtl-surface-2 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-main)]"
                >
                  ✦ {vibe}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(tab === 'scope'
                ? [
                    'Precision espresso refractometer mobile app with BLE sync',
                    'Enterprise Telegram DevOps release approval agent swarm',
                  ]
                : [
                    'How does AgentBridge orchestrate Telegram AI agents?',
                    'Tell me about Georgio Mascagni’s Equifax AI leadership',
                  ]
              ).map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => {
                    setPrompt(sample);
                    void executePrompt(sample);
                  }}
                  className="dtl-surface-2 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-main)]"
                >
                  → {sample}
                </button>
              ))}
            </div>
          )}

          {/* Output Console */}
          {(output || errorMsg) && (
            <div className="dtl-surface mt-4 rounded-2xl p-4">
              {errorMsg ? (
                <p className="text-xs text-rose-400">{errorMsg}</p>
              ) : (
                <>
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--accent-telemetry)]">
                    <span>
                      {sourceTag === 'gemini'
                        ? `GENERATED LIVE BY ${TRAILGUIDE_MODEL}`
                        : 'SYNTHESIZED BY LOCAL STUDIO ENGINE'}
                    </span>
                    <span>ACTIVE THEME: {theme.themeName}</span>
                  </div>
                  <p className="whitespace-pre-line text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {output}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
