export type AppCategory =
  | 'AI & Autonomous Systems'
  | 'Geospatial & Outdoor'
  | 'Aviation & Telemetry'
  | 'Consumer & Specialty'
  | 'Mobile & Media';

export interface AppProject {
  slug: string;
  name: string;
  tagline: string;
  category: AppCategory;
  featured?: boolean;
  status: 'Live Production' | 'Enterprise Appliance' | 'Native Android' | 'Active Platform';
  primaryStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  accentFrom: string;
  accentTo: string;
  iconName:
    | 'shield'
    | 'bot'
    | 'crosshair'
    | 'mountain'
    | 'coffee'
    | 'leaf'
    | 'compass'
    | 'wind'
    | 'gauge'
    | 'scan'
    | 'plane'
    | 'wrench'
    | 'tv'
    | 'building';
  executiveRecap: string;
  problemStatement: string;
  architectureSummary: string;
  highlights: string[];
  enterpriseTakeaway: string;
}

export const APP_CATEGORIES: ('All' | AppCategory)[] = [
  'All',
  'AI & Autonomous Systems',
  'Geospatial & Outdoor',
  'Aviation & Telemetry',
  'Consumer & Specialty',
  'Mobile & Media',
];

export const APPS: AppProject[] = [
  {
    slug: 'trailvault-enterprise',
    name: 'TrailVault™ Enterprise ("IronTrail")',
    tagline: 'Zero-telemetry, air-gapped technical document intelligence appliance for defense & critical infrastructure.',
    category: 'AI & Autonomous Systems',
    featured: true,
    status: 'Enterprise Appliance',
    primaryStack: ['Python', 'Local Ollama', 'FastEmbed ONNX', 'Qdrant', 'BM25', 'Docker'],
    liveUrl: 'https://gmascagni.github.io/airgap/',
    repoUrl: 'https://github.com/gmascagni/airgap',
    accentFrom: '#0ea5e9',
    accentTo: '#10b981',
    iconName: 'shield',
    executiveRecap:
      'TrailVault™ Enterprise is a turnkey, physically disconnected document intelligence appliance built for defense, aerospace, semiconductor, nuclear, and industrial enclaves where cloud AI is strictly prohibited. It combines local GPU LLM inference, bundled ONNX neural embeddings, hybrid vector + sparse lexical retrieval, and hardware-level cryptographic erase into a zero-egress package.',
    problemStatement:
      'Regulated engineering and defense teams need modern RAG search over sensitive technical manuals and MIL-SPEC documentation without risking a single packet of external telemetry or cloud API leakage.',
    architectureSummary:
      'Dual-architecture delivery: a native Windows NVMe appliance (TrailVault.exe tray daemon + Python loopback server on 127.0.0.1:8000 + local Ollama GPU runtime + Qdrant + BM25Okapi + FastEmbed BAAI/bge-small-en-v1.5) alongside a CIS-hardened, non-root Docker Compose enclave stack with BitLocker 256-bit XTS-AES encryption and NIST SP 800-88 Rev 1 cryptographic erase.',
    highlights: [
      'Strict loopback enforcement (127.0.0.1) and offline process locks (HF_HUB_OFFLINE, TRANSFORMERS_OFFLINE, DO_NOT_TRACK) with fail-fast cache assertions.',
      'Hybrid deterministic retrieval combining Qdrant vector search, BM25Okapi lexical scoring, and MIL-SPEC part-number regex analyzers.',
      'CIS-hardened Linux Docker reference stack running non-root (10001:10001), no-new-privileges, internal-only bridge networking, and RBAC classification filters.',
      'Automated USB4 NVMe publishing pipeline, SBOM generation, and one-click NIST SP 800-88 Rev 1 cryptographic wipe.',
    ],
    enterpriseTakeaway:
      'Demonstrates security-first enterprise AI architecture—translating compliance controls (zero egress, RBAC, SBOM, cryptographic erase) directly into production code.',
  },
  {
    slug: 'agentbridge-autonomous-hub',
    name: 'AgentBridge — Autonomous Agent Hub',
    tagline: 'Multi-agent AI swarm orchestration with live Telegram Bot, WhatsApp, Web Chat, and CLI channels.',
    category: 'AI & Autonomous Systems',
    featured: true,
    status: 'Active Platform',
    primaryStack: ['Python', 'Telegram Bot API', 'Multi-Agent Swarm', 'Gemini / LLMs', 'WebSockets'],
    accentFrom: '#6366f1',
    accentTo: '#06b6d4',
    iconName: 'bot',
    executiveRecap:
      'AgentBridge is Digital Trail Labs’ modular autonomous agent orchestration platform. It deploys a coordinated hierarchy of specialized AI agents—accessible directly from your smartphone via Telegram chat, WhatsApp, a local web dashboard, or CLI—to execute research, automate workflows, and manage persistent operational records on demand.',
    problemStatement:
      'Most AI assistants are trapped in isolated browser tabs and require constant manual prompting. Teams need persistent, role-specialized autonomous agents they can message securely from everyday mobile channels like Telegram.',
    architectureSummary:
      'Built in Python 3.12 with a channel-agnostic adapter layer (--channel telegram, whatsapp, web, cli) routing messages to a three-tier agent swarm: Orion (Coordinator) decomposes intent and delegates subtasks to Echo (Researcher, equipped with web search and synthesis) and Atlas (Executor, managing notes, logs, calendar workflows, and task records).',
    highlights: [
      'Two-minute Telegram Bot integration enabling real-time smartphone command-and-control of autonomous agent swarms from anywhere.',
      'Role-based multi-agent delegation: Orion (Coordinator), Echo (@researcher), and Atlas (@executor) collaborate with structured tool calls.',
      'Multi-channel transport abstraction supporting Telegram, WhatsApp (Twilio/Webhooks), a live Web Chat UI, and local CLI without rewriting agent logic.',
      'Extensible tool ecosystem for automated research synthesis, persistent note/task storage, and calendar invite generation.',
    ],
    enterpriseTakeaway:
      'Directly mirrors enterprise L1/L2 support and DevOps agentic automation—showing how to architect safe, observable, multi-agent systems connected to real messaging channels.',
  },
  {
    slug: 'gunnies-ballistics',
    name: 'Gunnies Ballistics',
    tagline: 'Native Android Kotlin & Jetpack Compose 3-DOF+ RK4 ballistics solver with Bushnell BLE rangefinder sync.',
    category: 'Mobile & Media',
    featured: true,
    status: 'Native Android',
    primaryStack: ['Kotlin', 'Jetpack Compose', 'Bluetooth LE', 'RK4 Physics', 'Open-Meteo API'],
    repoUrl: 'https://github.com/gmascagni/gunnies',
    accentFrom: '#f59e0b',
    accentTo: '#ef4444',
    iconName: 'crosshair',
    executiveRecap:
      'A native Android precision ballistics solver and Bluetooth Low Energy (BLE) companion app for the Bushnell Bone Collector 1800 laser rangefinder. Engineered with Kotlin and Jetpack Compose for both standard handsets and foldable dual-column layouts (Samsung Galaxy Z Fold).',
    problemStatement:
      'Field precision computing requires deterministic physics, real-time atmospheric telemetry, and reliable hardware BLE synchronization—all usable under harsh outdoor or night-vision conditions without cloud dependency.',
    architectureSummary:
      'Implements a custom 3-DOF+ 4th-order Runge-Kutta (RK4) trajectory engine in Kotlin supporting G1/G7 drag curves, Coriolis/Eötvös effects, spin drift, and powder temperature sensitivity, paired with a custom BLE serialization layer (:DU, :DD, :BP, :AV protocols) and Open-Meteo GPS weather sync.',
    highlights: [
      'Custom O(N) single-pass DOPE range card generator, interactive trajectory drop chart, and bisection MV truing solver.',
      'Direct Bluetooth Low Energy (BLE) hardware integration serializing 34-field ballistic profiles and parsing live laser range/angle pings.',
      'Adaptive Jetpack Compose UI designed for foldables, featuring true-scale FFP/SFP reticles, pinch-to-zoom, and Field Dark / OLED Night Red / Daylight themes.',
      'Modular relational libraries for firearms, optics, ammunition, and suppressors with automatic MOA/MRAD unit matching.',
    ],
    enterpriseTakeaway:
      'Proves full-stack technical depth beyond web apps—delivering native Android mobile software, hardware BLE protocols, and numerical physics modeling.',
  },
  {
    slug: 'mtb-trail-status',
    name: 'MTB Trail Status',
    tagline: 'Full-stack real-time mountain biking trailhead status tracker powered by Gemini AI, Firebase, and Leaflet.',
    category: 'Geospatial & Outdoor',
    featured: true,
    status: 'Live Production',
    primaryStack: ['TypeScript', 'React 19', 'Gemini API', 'Firebase', 'Leaflet / Google Maps', 'Express'],
    liveUrl: 'https://gmascagni.github.io/MTB-Trail-Status/',
    repoUrl: 'https://github.com/gmascagni/MTB-Trail-Status',
    accentFrom: '#10b981',
    accentTo: '#0284c7',
    iconName: 'mountain',
    executiveRecap:
      'A modern, mountain-themed trailhead intelligence platform giving riders real-time open/closed trail status, geospatial mapping, GPS proximity lookup, and AI-assisted condition synthesis backed by Firebase and the Google Gemini API.',
    problemStatement:
      'Mountain bikers frequently drive 45+ minutes to trailheads only to discover weather closures or muddy conditions because status updates are fragmented across social feeds and park websites.',
    architectureSummary:
      'Full-stack TypeScript application pairing a React 19 + Tailwind CSS v4 frontend with an Express backend, Firebase Realtime/Firestore persistence, dual Leaflet & Google Maps rendering, and server-side @google/genai intelligence.',
    highlights: [
      'Consolidated flagship build unifying geolocation, interactive trail maps, and live status indicators in a responsive mobile-first UI.',
      'Server-side Google Gemini API integration for structured trail condition insights and smart status interpretation.',
      'Real-time Firebase backend with QR code sharing and camera/geolocation support for trailhead reporting.',
      'Clean TypeScript architecture built with Vite 6 and esbuild server bundling for fast production deployments.',
    ],
    enterpriseTakeaway:
      'Showcases end-to-end product iteration—evolving an early prototype into a full-stack TypeScript, Firebase, and Gemini-powered production application.',
  },
  {
    slug: 'the-brew-app',
    name: 'The Brew App (thebrew.app)',
    tagline: 'Specialty coffee brewing academy, OCR/barcode bag scanner, and interactive recipe studio.',
    category: 'Consumer & Specialty',
    status: 'Live Production',
    primaryStack: ['React 18', 'Vite', 'Firebase', 'Tesseract.js OCR', 'ZXing Barcode', 'Tailwind CSS'],
    liveUrl: 'https://thebrew.app',
    repoUrl: 'https://github.com/gmascagni/brewed',
    accentFrom: '#d97706',
    accentTo: '#92400e',
    iconName: 'coffee',
    executiveRecap:
      'A full-featured consumer web platform hosted at thebrew.app helping home baristas dial in pour-over, espresso, AeroPress, and French press recipes—complete with camera OCR/barcode coffee bag scanning, roaster directories, and automated coffee news aggregation.',
    problemStatement:
      'Home coffee enthusiasts struggle to translate roast profiles, grind sizes, and brew ratios across methods without juggling scattered blogs and calculators.',
    architectureSummary:
      'React + Vite + Tailwind CSS SPA with custom static prerendering (scripts/prerender.js) for SEO, Firebase/Firestore backend, client-side Tesseract.js OCR & ZXing/jsQR barcode scanning, automated build-time news fetching, and a Python QA & affiliate link verification suite.',
    highlights: [
      'In-browser camera scanner combining Tesseract.js OCR and ZXing barcode/QR recognition to identify coffee bags instantly.',
      'Automated build pipeline: records build metadata, fetches live coffee industry news, bundles with Vite, and prerenders SEO routes.',
      'Dedicated QA automation suite (Python QA runner + Node affiliate link health checker) enforcing release reliability.',
      'Production custom domain (thebrew.app) with sitemap, robots.txt, and Firestore security rules.',
    ],
    enterpriseTakeaway:
      'Reflects mature release engineering—bringing automated QA scripts, prerendered SEO, and Firebase governance to a live consumer product.',
  },
  {
    slug: 'loose-leaf',
    name: 'Loose Leaf Tea Guide',
    tagline: 'Interactive specialty tea brewing companion, temperature/steep timer, and barcode/QR explorer.',
    category: 'Consumer & Specialty',
    status: 'Live Production',
    primaryStack: ['React 18', 'Vite', 'Firebase', 'ZXing / jsQR', 'Tailwind CSS'],
    liveUrl: 'https://loose-leaf.thebrew.app',
    repoUrl: 'https://github.com/gmascagni/loose-leaf',
    accentFrom: '#16a34a',
    accentTo: '#0d9488',
    iconName: 'leaf',
    executiveRecap:
      'Sister platform to The Brew App hosted at loose-leaf.thebrew.app, delivering tailored steeping temperatures, infusion timers, audio alerts, and curated guides for green, oolong, white, black, and herbal loose-leaf teas.',
    problemStatement:
      'Delicate loose-leaf teas easily turn bitter when steeped at the wrong temperature or duration; tea drinkers need a fast, visual companion tailored to each cultivar.',
    architectureSummary:
      'Shares the proven React + Vite + Firebase + custom static prerendering architecture of thebrew.app, demonstrating reusable platform design across multiple vertical brands.',
    highlights: [
      'Curated tea ceremony and brewing method guides with visual ratios and audio-cued steep timers.',
      'Integrated barcode and QR scanning (ZXing, jsBarcode, jsQR) for quick tea logging and sharing.',
      'Deployed on a custom subdomain (loose-leaf.thebrew.app) with automated prerendering and SEO metadata.',
    ],
    enterpriseTakeaway:
      'Demonstrates multi-brand platform reuse—shipping a second production vertical rapidly by leveraging shared architecture and CI/CD patterns.',
  },
  {
    slug: '4x4-trail-locator',
    name: '4x4 TrailFinder & Overlanding Locator',
    tagline: 'Interactive 3D topographic map of 37+ Jeep Badge of Honor trails, recovery guides, and pitch/roll HUD.',
    category: 'Geospatial & Outdoor',
    status: 'Live Production',
    primaryStack: ['TypeScript', 'Vite', 'Leaflet', 'USGS Topo', 'Supabase'],
    liveUrl: 'https://gmascagni.github.io/4x4-trail-locator/',
    repoUrl: 'https://github.com/gmascagni/4x4-trail-locator',
    accentFrom: '#ea580c',
    accentTo: '#ca8a04',
    iconName: 'compass',
    executiveRecap:
      'An interactive expedition planner for off-roaders and overlanders featuring 37+ certified Jeep Badge of Honor trails across 18 states, USGS topographic/satellite layers, regional fabrication shop locators, survival gear checklists, and a real-time tactical inclinometer HUD.',
    problemStatement:
      'Off-road trail planning requires combining trail difficulty ratings, USFS seasonal closures, tire air-down calculations, recovery procedures, and nearby fabrication garages in one accessible field tool.',
    architectureSummary:
      'Built with TypeScript, Vite, Leaflet + USGS Topo/Satellite tile layers, and Supabase integration, with custom SVG telemetry components for the inclinometer and tire PSI calculator.',
    highlights: [
      'Instant GPS proximity lookup calculating exact distance and drive time to 37+ Jeep Badge of Honor trails.',
      'Color-coded 1–10 difficulty markers with official USFS park hotlines, fee breakdowns, and seasonal closure alerts.',
      'Real-time tactical 4x4 pitch & roll inclinometer HUD paired with terrain-specific tire air-down PSI recommendations.',
      '12 step-by-step recovery tutorials (kinetic rigging, GMRS comms, wilderness trauma) and multi-day overlanding gear checklists.',
    ],
    enterpriseTakeaway:
      'Shows strong UX synthesis—unifying geospatial data, safety workflows, and real-time device sensor HUDs into a cohesive application.',
  },
  {
    slug: 'rc-wind-weather',
    name: 'RC Wind Weather — Flight Telemetry Deck',
    tagline: 'Avionics-grade mobile wind & crosswind PWA with instant Go/No-Go flight verdicts for RC pilots.',
    category: 'Aviation & Telemetry',
    status: 'Live Production',
    primaryStack: ['React 19', 'Vite 8', 'Tailwind CSS 4', 'Capacitor Android', 'Open-Meteo API', 'PWA'],
    liveUrl: 'https://gmascagni.github.io/RC_Wind_Weather/',
    repoUrl: 'https://github.com/gmascagni/RC_Wind_Weather',
    accentFrom: '#0284c7',
    accentTo: '#6366f1',
    iconName: 'wind',
    executiveRecap:
      'An avionics-grade mobile weather and flight telemetry deck engineered for RC warbird pilots. It computes instant Go / Marginal / No-Go verdicts, resolves runway headwind vs. crosswind vectors on an interactive SVG compass, and runs offline as an installable PWA or Capacitor Android app.',
    problemStatement:
      'Standard weather apps report average wind speed but miss gust spread, runway crosswind components, and airframe-specific limits that determine whether a scale RC aircraft can safely fly.',
    architectureSummary:
      'Zero-bloat React 19 + Vite 8 + Tailwind CSS v4 architecture using pure inline SVG telemetry charts (no heavy charting libraries), Open-Meteo Forecast API, Oxlint static analysis, Service Worker offline caching, and Capacitor Android packaging.',
    highlights: [
      'Instant Go / Marginal / No-Go verdict engine tuned for Micro, Sport, 60-Class Warbird, and Giant Scale flight envelopes.',
      'Interactive SVG Wind Compass & configurable runway heading (000°–359°) calculating exact headwind, tailwind, and crosswind components.',
      '24-hour sustained vs. gust SVG envelope chart automatically highlighting the Best Flying Window.',
      'Sunlight-readable Daylight Boost mode, mph/kt/km/h unit switching, and offline-resilient Service Worker caching.',
    ],
    enterpriseTakeaway:
      'Highlights disciplined frontend engineering—zero unnecessary dependencies, Oxlint static quality gates, pure SVG data visualization, and PWA/Android readiness.',
  },
  {
    slug: 'rc-power-bench',
    name: 'RC Power Bench Pro',
    tagline: 'Physics-calibrated aerodynamic & electrical power system configurator for 39 WWII RC warbirds.',
    category: 'Aviation & Telemetry',
    status: 'Live Production',
    primaryStack: ['React 19', 'Vite', 'Physics Engine', 'Oxlint', 'Google Play Package'],
    liveUrl: 'https://gmascagni.github.io/rc-power-bench/',
    repoUrl: 'https://github.com/gmascagni/rc-power-bench',
    accentFrom: '#475569',
    accentTo: '#0ea5e9',
    iconName: 'gauge',
    executiveRecap:
      'A physics-calibrated power system configurator and thermal safety workbench for .50-Class, .60-Class, and Giant Scale RC warbird builders. Features 8 interactive cockpit widgets, analog CRT dial gauges, and a registry of 39 WWII airframes.',
    problemStatement:
      'Mismatching brushless motors, LiPo cell counts, ESCs, and multi-blade propellers causes overheating or underpowered flights. Builders need accurate electrical and aerodynamic modeling before buying hardware.',
    architectureSummary:
      'React 19 + Vite application powered by a calibrated physics engine implementing propeller power laws (P ∝ RPM³), current scaling (I ∝ V²·kV³), static thrust modeling across 2/3/4-blade and multi-engine setups, and dynamic 6S–12S voltage auto-tuning.',
    highlights: [
      'Interactive 8-widget cockpit workbench with analog CRT gauges for RPM, Amps, Volts, Watts, Efficiency, Motor Temp, and Thrust-to-Weight ratio.',
      'Auto-Match propeller optimizer and dynamic voltage auto-tuning across 6S, 8S, 10S, and 12S LiPo configurations.',
      '39 pre-configured WWII Warbird airframes (including multi-engine twins like B-25, Mosquito, and P-38) plus a Custom Aircraft Builder wizard.',
      'Packaged for both GitHub Pages web deployment and Google Play distribution.',
    ],
    enterpriseTakeaway:
      'Demonstrates domain-specific mathematical modeling and high-craft interactive instrumentation UI.',
  },
  {
    slug: 'powerball-scanner',
    name: 'Powerball Ticket OCR Scanner',
    tagline: 'Mobile-first camera OCR scanner and deterministic Powerball prize verification engine.',
    category: 'AI & Autonomous Systems',
    status: 'Live Production',
    primaryStack: ['JavaScript', 'Tesseract.js v5', 'Computer Vision OCR', 'Mobile Web Camera API'],
    liveUrl: 'https://gmascagni.github.io/powerball-scanner/',
    repoUrl: 'https://github.com/gmascagni/powerball-scanner',
    accentFrom: '#e11d48',
    accentTo: '#f59e0b',
    iconName: 'scan',
    executiveRecap:
      'A zero-backend, mobile-first computer vision web app that uses your smartphone camera and Tesseract.js v5 OCR to scan physical Powerball tickets, parse white-ball and Powerball rows into strict structured JSON, and instantly calculate prize tiers.',
    problemStatement:
      'Manually checking multi-line lottery tickets against winning numbers is tedious and error-prone, while existing apps require accounts or upload images to third-party servers.',
    architectureSummary:
      'Lightweight vanilla ES modular architecture separating camera/image preprocessing (`ocr-engine.js`), deterministic prize tier evaluation (`prize-evaluator.js`), and mobile-first UI (`app.js`), running 100% client-side in the browser.',
    highlights: [
      'On-device Tesseract.js v5 OCR pipeline processing camera captures or uploaded ticket photos privately in the browser.',
      'Modular separation of OCR extraction and deterministic prize evaluation with strict JSON schema output.',
      'Mobile-first viewport design optimized for one-handed iOS and Android camera capture.',
    ],
    enterpriseTakeaway:
      'Illustrates pragmatic AI engineering—pairing computer vision extraction with deterministic rule-based validation for 100% auditable results.',
  },
  {
    slug: 'wwii-fighter-archive',
    name: 'WWII Fighter Archive & Virtual Hangar',
    tagline: 'Dieselpunk historical aviation archive with 3D tactical wireframes, flight logs, and Tuskegee Airmen stories.',
    category: 'Aviation & Telemetry',
    status: 'Live Production',
    primaryStack: ['TypeScript', 'React', 'Vite', 'Gemini API', '3D Wireframe Views'],
    liveUrl: 'https://gmascagni.github.io/WWII-Fighter-Archive---Virtual-Hangar/',
    repoUrl: 'https://github.com/gmascagni/WWII-Fighter-Archive---Virtual-Hangar',
    accentFrom: '#78716c',
    accentTo: '#b45309',
    iconName: 'plane',
    executiveRecap:
      'An immersive, dieselpunk-styled interactive historical archive showcasing iconic WWII fighter aircraft and heroic pilot narratives—including the Tuskegee Airmen—complete with 3D tactical wireframe inspections, flight logs, and a virtual hangar fleet manager.',
    problemStatement:
      'Historical aviation archives are often static text encyclopedias that fail to convey aircraft engineering geometry, performance comparisons, and the human stories behind the cockpits.',
    architectureSummary:
      'TypeScript + Vite web application integrating curated historical datasets (`warbirds.json`), automated media verification scripts, 3D tactical wireframe visualizations, and Gemini AI-powered historical exploration.',
    highlights: [
      'Interactive 3D tactical wireframe views paired with authentic performance specifications and flight logs.',
      'Dedicated historical storytelling honoring legendary squadrons including the Tuskegee Airmen.',
      'Virtual Hangar fleet manager enabling side-by-side aircraft curation and Gemini-powered Q&A.',
    ],
    enterpriseTakeaway:
      'Demonstrates creative storytelling and Google AI Studio / Gemini API integration for rich educational experiences.',
  },
  {
    slug: 'armorers-workbench',
    name: 'Armorer’s Workbench & Technical Repo',
    tagline: 'FastAPI + hybrid local Ollama / cloud LLM technical manual viewer and schematic inspector.',
    category: 'AI & Autonomous Systems',
    status: 'Live Production',
    primaryStack: ['FastAPI', 'JavaScript', 'Ollama / LM Studio', 'Gemini / OpenAI', 'Canvas Pan & Zoom'],
    liveUrl: 'https://gmascagni.github.io/gunsmithing/',
    repoUrl: 'https://github.com/gmascagni/gunsmithing',
    accentFrom: '#334155',
    accentTo: '#0d9488',
    iconName: 'wrench',
    executiveRecap:
      'A multi-platform technical documentation repository and AI-assisted workbench built for historic firearms restorers and armorers—combining in-browser PDF manual viewing, interactive high-res schematic pan/zoom, diagnostic matrices, and a hybrid local/cloud LLM assistant.',
    problemStatement:
      'Technical restorers working on vintage and mechanical platforms need instant access to factory tolerances, exploded schematics, and stoppage diagnostics right at the bench—even offline.',
    architectureSummary:
      'FastAPI backend and mobile-responsive web workbench featuring a hybrid AI router that connects seamlessly to local LAN Ollama / LM Studio GPU rigs, cloud LLMs (Google Gemini, OpenAI, Groq, DeepSeek), or a 100% offline fallback knowledge engine.',
    highlights: [
      'Hybrid AI assistant architecture supporting local Ollama/LM Studio servers on LAN, cloud APIs, and offline fallback.',
      'Context-injected technical reasoning loading shop tolerances, spring tensions, and diagnostic matrices into prompts.',
      'Multi-mode viewer: in-browser PDF reader, multi-touch pinch-to-zoom schematic inspector, and QR Wi-Fi phone linking.',
    ],
    enterpriseTakeaway:
      'A blueprint for field-service technical documentation portals—combining hybrid local/cloud LLM routing with interactive schematic inspection.',
  },
  {
    slug: 'vlc-us-channel-guide',
    name: 'VLC US Channel Guide',
    tagline: '1,379 free, legal US broadcast TV channels in a cable-style EPG with 1-click VLC desktop launchers.',
    category: 'Mobile & Media',
    status: 'Live Production',
    primaryStack: ['JavaScript', 'Python', 'M3U8 / XSPF', 'GitHub Pages'],
    liveUrl: 'https://gmascagni.github.io/VLCtv/',
    repoUrl: 'https://github.com/gmascagni/VLCtv',
    accentFrom: '#2563eb',
    accentTo: '#7c3aed',
    iconName: 'tv',
    executiveRecap:
      'A high-performance web Electronic Program Guide (EPG) and desktop integration suite indexing 1,379 free, publicly broadcast US TV channels across News, Weather, Science (NASA TV), Movies, Sports, and Local Broadcasts—styled with brushed aluminum bezels and 1-click VLC playback.',
    problemStatement:
      'Public IPTV playlists contain thousands of raw stream URLs that are hard to browse, filter, and keep healthy without automated feed validation and a clean guide interface.',
    architectureSummary:
      'Python automation scripts (`check_and_update_feeds.py`, `generate_channel_guide.py`) validate live streams and build structured JSON/M3U8/XSPF feeds consumed by a zero-dependency GitHub Pages EPG web app and custom Windows protocol launchers.',
    highlights: [
      'Automated Python feed health checker and playlist generator maintaining 1,379 categorized public US channels.',
      'Dual layout toggling between traditional linear Cable TV EPG rows (CH 001+) and visual Card Grid view.',
      'One-click custom Windows protocol handler enabling direct "Open in VLC" streaming from any browser.',
    ],
    enterpriseTakeaway:
      'Shows end-to-end data pipeline automation—combining Python ingestion/health-checking with a snappy, zero-dependency frontend.',
  },
  {
    slug: 'airlift-squadron-hotel-finder',
    name: '458th Airlift Squadron Hotel Finder',
    tagline: 'Mobile-first Leaflet geospatial lodging finder built for military airlift squadron crew logistics.',
    category: 'Geospatial & Outdoor',
    status: 'Live Production',
    primaryStack: ['HTML5', 'CSS3', 'JavaScript', 'Leaflet Maps', 'Mobile Web App'],
    liveUrl: 'https://gmascagni.github.io/Air_Lift_Squad/',
    repoUrl: 'https://github.com/gmascagni/Air_Lift_Squad',
    accentFrom: '#00308f',
    accentTo: '#c8a000',
    iconName: 'building',
    executiveRecap:
      'A purpose-built, ultra-lightweight mobile web application created for the 458th Airlift Squadron to quickly locate, compare, and navigate to approved crew lodging options on an interactive Leaflet map.',
    problemStatement:
      'Traveling aircrew and squadron personnel need instant, zero-install access to vetted lodging locations on mobile devices without wrestling with bloated travel portals.',
    architectureSummary:
      'Single-file, zero-build-overhead mobile web app (iOS/Android home-screen ready) built with Leaflet.js, custom USAF-inspired design tokens, and safe-area viewport optimization.',
    highlights: [
      'Zero-dependency single-page deployment loading instantaneously over cellular connections.',
      'Interactive Leaflet map with custom squadron color palette and mobile touch optimization.',
      'Installable as an iOS/Android home-screen web app with full-bleed safe-area support.',
    ],
    enterpriseTakeaway:
      'Demonstrates right-sizing technology to the mission—delivering a fast, zero-maintenance operational utility in a single portable file.',
  },
];

export function getAppBySlug(slug: string): AppProject | undefined {
  return APPS.find((app) => app.slug === slug);
}
