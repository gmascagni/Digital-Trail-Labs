/**
 * ============================================================================
 * DIGITAL TRAIL LABS (DTL // v2.6) — MULTIMODAL ASSET_MANIFEST
 * ============================================================================
 * Ready-to-run prompts for upgrading procedural PBR maps, studio mockups, and
 * macro fluid video loops via Google's multimodal AI suite (`@google/genai`):
 * - Nano Banana Pro (`gemini-3-pro-image`): Normal/roughness maps for the 3D
 *   liquid-metal topological mesh + isometric hardware product renders.
 * - Veo / Omni Flash (`gemini-omni-1.2-flash`): Seamless 4K slow-motion loop
 *   of golden espresso crema morphing into swirling botanical tea infusion.
 * Full structured manifest exported from `./config/assetManifest.ts`.
 * ============================================================================
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ASSET_MANIFEST } from './config/assetManifest';
import { App } from './App';
import './index.css';

// Expose multimodal asset manifest for runtime creative pipeline inspection
(window as unknown as { __DTL_ASSET_MANIFEST__?: typeof ASSET_MANIFEST }).__DTL_ASSET_MANIFEST__ =
  ASSET_MANIFEST;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
