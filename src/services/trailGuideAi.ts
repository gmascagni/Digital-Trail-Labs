import { GoogleGenAI } from '@google/genai';

/**
 * TrailGuide AI Service — Powered by @google/genai (Interactions API v1).
 * Uses `gemini-4-hydrogen` (current frontier low-latency multimodal/agentic model,
 * substituting deprecated/preview Flash aliases) with structured JSON schema output
 * for live theme morphing, plus a rich instant local fallback engine when no key is set.
 */

export const GEMINI_KEY_STORAGE = 'dtl_gemini_api_key';
export const TRAILGUIDE_MODEL = 'gemini-4-hydrogen';

export interface RemixedThemePayload {
  themeName: string;
  bgPrimary: string;
  accentPrimary: string;
  accentTelemetry: string;
  shaderSpeed: number;
  poeticTagline: string;
}

const THEME_JSON_SCHEMA = {
  type: 'object',
  properties: {
    themeName: {
      type: 'string',
      description: 'Evocative 2-3 word studio atmosphere name.',
    },
    bgPrimary: {
      type: 'string',
      description: '6-digit hex background color (e.g. #08090C or #0B1020) ensuring strong contrast with light text.',
    },
    accentPrimary: {
      type: 'string',
      description: '6-digit hex primary luminous accent color (e.g. #F59E0B).',
    },
    accentTelemetry: {
      type: 'string',
      description: '6-digit hex secondary telemetry highlight color (e.g. #22D3EE).',
    },
    shaderSpeed: {
      type: 'number',
      description: 'Liquid-metal WebGL shader speed multiplier between 0.35 and 2.4.',
    },
    poeticTagline: {
      type: 'string',
      description: 'Crisp, poetic 8-14 word tagline matching the studio vibe.',
    },
  },
  required: [
    'themeName',
    'bgPrimary',
    'accentPrimary',
    'accentTelemetry',
    'shaderSpeed',
    'poeticTagline',
  ],
};

const STUDIO_CONTEXT = `You are TrailGuide AI, the embedded Creative Director & Principal AI Architect concierge for Digital Trail Labs (digitaltraillabs.com), founded by Georgio Mascagni in Atlanta, GA.
Studio Identity:
- Bridges 25+ years of Fortune 500 IT Platform Leadership (IT CRM Platform Director at Equifax governing 7,500+ Salesforce users across 15 orgs, AI Champion, Google Certified AI Professional 2026) with avant-garde, AI-native software execution.
- Flagship Consumer Craft: The Brew App (thebrew.app — coffee extraction, OCR bag scanner, Firebase) and Loose-Leaf (loose-leaf.thebrew.app — specialty tea thermodynamics & steep curves).
- Flagship AI, Security & Mobile: TrailVault Enterprise (air-gapped zero-egress RAG appliance with local Ollama, Qdrant, BM25, NIST 800-88 cryptographic erase), AgentBridge (autonomous multi-agent swarm with Orion Coordinator, Echo Researcher, Atlas Executor live on Telegram chat), Gunnies Ballistics (native Kotlin + Jetpack Compose 3-DOF+ RK4 solver & Bushnell BLE sync), MTB Trail Status (React 19 + Gemini API + Maps), RC Wind Weather, and RC Power Bench Pro.
Keep responses crisp, authoritative, technical, and inspiring (under 170 words). Use clean bullet points where helpful.`;

export function getSavedApiKey(): string {
  try {
    return localStorage.getItem(GEMINI_KEY_STORAGE)?.trim() ?? '';
  } catch {
    return '';
  }
}

export function saveApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GEMINI_KEY_STORAGE);
    }
  } catch {
    // Ignore storage errors
  }
}

// Local deterministic fallback vibes when no API key is configured
const FALLBACK_VIBES: Array<{ keywords: string[]; payload: RemixedThemePayload }> = [
  {
    keywords: ['cyber', 'neon', 'tokyo', 'synth', 'night'],
    payload: {
      themeName: 'Shibuya Telemetry',
      bgPrimary: '#070612',
      accentPrimary: '#F43F5E',
      accentTelemetry: '#22D3EE',
      shaderSpeed: 1.75,
      poeticTagline: 'Rain-slicked neon optics, high-frequency telemetry, and midnight espresso.',
    },
  },
  {
    keywords: ['matcha', 'tea', 'kyoto', 'zen', 'forest', 'green', 'botanical'],
    payload: {
      themeName: 'Kyoto Moss Sanctuary',
      bgPrimary: '#060F0B',
      accentPrimary: '#4ADE80',
      accentTelemetry: '#FDE047',
      shaderSpeed: 0.62,
      poeticTagline: 'Ceremonial stone-milled jade, quiet cedar steam, and unhurried precision.',
    },
  },
  {
    keywords: ['space', 'orbital', 'cobalt', 'deep', 'ocean', 'arctic', 'ice'],
    payload: {
      themeName: 'Orbital Cryo-Deck',
      bgPrimary: '#050B16',
      accentPrimary: '#38BDF8',
      accentTelemetry: '#A78BFA',
      shaderSpeed: 1.15,
      poeticTagline: 'Zero-gravity avionics, orbital horizon refraction, and sub-kelvin clarity.',
    },
  },
  {
    keywords: ['copper', 'desert', 'dune', 'mars', 'solar', 'warm', 'gold'],
    payload: {
      themeName: 'Solar Anodized Bronze',
      bgPrimary: '#110906',
      accentPrimary: '#F59E0B',
      accentTelemetry: '#FB7185',
      shaderSpeed: 1.38,
      poeticTagline: 'Molten copper heliostats, desert thermal currents, and tactile alloy craft.',
    },
  },
];

export async function remixStudioVibe(prompt: string): Promise<{
  payload: RemixedThemePayload;
  source: 'gemini' | 'local';
}> {
  const apiKey = getSavedApiKey();

  if (apiKey) {
    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create({
      model: TRAILGUIDE_MODEL,
      system_instruction:
        'Generate a cohesive, WCAG-contrast-safe dark or light luxury digital product studio color palette and WebGL shader speed matching the requested vibe. Return strictly valid JSON.',
      input: `Create a Digital Trail Labs studio theme for this vibe: "${prompt}"`,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: THEME_JSON_SCHEMA,
      },
      store: false,
    });

    const parsed = JSON.parse(interaction.output_text ?? '{}') as RemixedThemePayload;
    if (parsed.themeName && parsed.bgPrimary && parsed.accentPrimary && parsed.accentTelemetry) {
      return { payload: parsed, source: 'gemini' };
    }
  }

  // Intelligent local synthesis fallback
  const lower = prompt.toLowerCase();
  const matched = FALLBACK_VIBES.find((v) => v.keywords.some((k) => lower.includes(k)));
  if (matched) {
    return { payload: matched.payload, source: 'local' };
  }

  // Hash prompt into a curated harmonious high-contrast dark studio palette
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    hash = (hash * 31 + prompt.charCodeAt(i)) >>> 0;
  }
  const palettes: RemixedThemePayload[] = [
    {
      themeName: prompt.trim().slice(0, 24) || 'Velvet Titanium',
      bgPrimary: '#09080F',
      accentPrimary: '#C084FC',
      accentTelemetry: '#2DD4BF',
      shaderSpeed: 1.3,
      poeticTagline: `Bespoke "${prompt.trim().slice(0, 28) || 'Studio'}" telemetry sculpted in refractive glass.`,
    },
    {
      themeName: prompt.trim().slice(0, 24) || 'Crimson Forge',
      bgPrimary: '#0D0709',
      accentPrimary: '#FB923C',
      accentTelemetry: '#38BDF8',
      shaderSpeed: 1.45,
      poeticTagline: `Kinetic "${prompt.trim().slice(0, 28) || 'Atelier'}" lightwaves calibrated for tactile precision.`,
    },
  ];
  return { payload: palettes[hash % palettes.length]!, source: 'local' };
}

export async function askTrailGuide(
  mode: 'scope' | 'ask',
  prompt: string,
): Promise<{ answer: string; source: 'gemini' | 'local' }> {
  const apiKey = getSavedApiKey();

  if (apiKey) {
    const ai = new GoogleGenAI({ apiKey });
    const modeInstruction =
      mode === 'scope'
        ? `${STUDIO_CONTEXT}\nThe visitor is pitching a product idea. Return a crisp 4-part blueprint: 1) Product Thesis, 2) Frontend & Tactile UX Stack, 3) AI / Agentic Telemetry Layer, 4) Production & Governance Architecture.`
        : STUDIO_CONTEXT;

    const interaction = await ai.interactions.create({
      model: TRAILGUIDE_MODEL,
      system_instruction: modeInstruction,
      input: prompt,
      store: false,
    });

    if (interaction.output_text) {
      return { answer: interaction.output_text, source: 'gemini' };
    }
  }

  // Rich local architectural concierge fallback
  const q = prompt.toLowerCase();
  if (mode === 'scope') {
    return {
      source: 'local',
      answer: `**DTL // ARCHITECTURE BLUEPRINT — "${prompt.slice(0, 48)}"**
• **Frontend & Tactile Layer:** React 19 + TypeScript 5.8 + Vite + Tailwind v4 with custom SVG/WebGL micro-instrumentation, native \`<dialog>\` overlays, and zero-FOUC CSS variables.
• **AI & Agentic Core:** \`@google/genai\` (\`gemini-4-hydrogen\`) with strict JSON \`response_format\` schemas for deterministic UI state, paired with an **AgentBridge** Telegram/Webhook worker for async notifications.
• **Data & Offline Resilience:** Firebase/Firestore or Supabase with optimistic local caching and PWA Service Worker support for sub-50ms field responsiveness.
• **Enterprise Governance:** GitHub Actions CI/CD, static type + lint gates, SBOM tracking, and strict secret isolation.`,
    };
  }

  if (q.includes('telegram') || q.includes('agent')) {
    return {
      source: 'local',
      answer: `**AgentBridge — Autonomous Multi-Agent Swarm**
Digital Trail Labs builds role-specialized Python 3.12 agent hierarchies accessible directly from **Telegram**, WhatsApp, Web Chat, and CLI:
• **Orion (Coordinator):** Parses executive intent and routes tasks across specialists.
• **Echo (@researcher):** Executes live web synthesis and technical intelligence gathering.
• **Atlas (@executor):** Manages persistent operational notes, logs, and calendar workflows.`,
    };
  }

  if (q.includes('georgio') || q.includes('founder') || q.includes('resume') || q.includes('equifax')) {
    return {
      source: 'local',
      answer: `**Georgio Mascagni — Founder & IT CRM Platform Director**
• **Enterprise Scale:** 25+ years in enterprise IT (Equifax, Dell, BlackBerry, IBM); oversees **7,500+ Salesforce users across 15 production orgs** and global teams across the US, Costa Rica, and India.
• **AI Champion:** Google Certified AI Professional (2026) leading agentic L1/L2 support automation, AI-assisted CI/CD pipelines, and platform security governance—while shipping 14+ live apps at Digital Trail Labs.`,
    };
  }

  return {
    source: 'local',
    answer: `**Digital Trail Labs (DTL // v2.6)** merges Fortune 500 engineering governance with tactile, avant-garde product execution:
• **Consumer Craft:** *The Brew App* (\`thebrew.app\`) & *Loose-Leaf* (\`loose-leaf.thebrew.app\`) bring physics-calibrated timers, OCR scanners, and sensory UI to specialty coffee and tea.
• **Applied AI & Defense:** *TrailVault™ Enterprise* delivers zero-egress air-gapped RAG, while *AgentBridge* orchestrates autonomous Telegram agent swarms.
• *Tip:* Open **API Key Settings** above to connect a live Gemini key for real-time \`${TRAILGUIDE_MODEL}\` inference.`,
  };
}
