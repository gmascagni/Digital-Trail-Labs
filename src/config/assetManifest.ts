/**
 * ============================================================================
 * DIGITAL TRAIL LABS — MULTIMODAL ASSET_MANIFEST (DTL // v2.6)
 * ============================================================================
 * Ready-to-run generation prompts for upgrading procedural textures, PBR maps,
 * isometric studio mockups, and macro fluid loops using Google's multimodal AI
 * suite (@google/genai SDK >= 3.2.0).
 *
 * Current SDK Model Identifiers:
 * - Image Generation (Nano Banana Pro): "gemini-3-pro-image"
 * - Fast Image Iteration (Nano Banana 2.1): "gemini-nano-banana-2.1"
 * - Generative Video Loops (Veo / Omni Flash): "gemini-omni-1.2-flash"
 * ============================================================================
 */

export const ASSET_MANIFEST = {
  version: 'DTL // v2.6',
  imageGeneration: {
    model: 'gemini-3-pro-image',
    assets: [
      {
        id: 'hero-liquid-metal-normal-roughness',
        target: 'HeroStage3D PBR displacement & micro-anisotropy normal/roughness maps',
        prompt:
          'Seamless tileable 4K PBR normal and roughness texture map of brushed volcanic obsidian and molten bronze-gold topological contour ridges, micro-machined CNC concentric elevation lines, subtle anisotropic metallic sheen, zero seams, flat orthographic top-down studio lighting.',
      },
      {
        id: 'the-brew-app-isometric-mockup',
        target: 'BrewSandboxCard optional high-DPI hardware studio render',
        prompt:
          'Ultra-crisp isometric product photography of a matte anodized obsidian smartphone resting beside a precision gooseneck copper kettle and glass V60 pour-over carafe, screen glowing with molten amber (#F59E0B) extraction telemetry waveforms and cyan (#22D3EE) bloom curves, dramatic rim lighting on warm espresso-bronze slate (#161311), 85mm macro lens.',
      },
      {
        id: 'loose-leaf-botanical-vessel',
        target: 'LooseLeafSandboxCard artisanal tea infusion visual asset',
        prompt:
          'Editorial macro studio still life of a hand-blown borosilicate glass gaiwan steeping emerald-gold high-mountain oolong leaves, refractive liquid caustics on dark volcanic stone (#08090C), subtle rising steam, crisp alabaster specular highlights, Awwwards luxury minimalism.',
      },
    ],
  },
  videoLoops: {
    // Ready for Veo studio pipelines or @google/genai "gemini-omni-1.2-flash"
    model: 'gemini-omni-1.2-flash',
    assets: [
      {
        id: 'macro-crema-botanical-loop',
        durationSeconds: 10,
        target: 'Refractive Bento backdrop & Hero ambient video texture plane',
        prompt:
          'Seamless 4K 120fps macro slow-motion loop transitioning smoothly from rich tiger-striped golden espresso crema swirling in dark obsidian glass into luminous emerald-amber botanical tea leaves unfurling in crystal-clear hot water, dramatic studio rim lighting, zero camera shake, shallow depth of field.',
      },
    ],
  },
} as const;
