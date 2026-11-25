# Digital Trail Labs (`digitaltraillabs.com`)

Official portfolio and software studio website for **Digital Trail Labs**, founded by **Georgio Mascagni** — bridging Fortune 500 IT leadership with AI-native software execution.

## Features

- **Studio Landing Page**: Impact metrics, Autonomous Multi-Agent (Telegram) capability spotlight, featured flagship builds, and a filterable catalog of 14 applications.
- **Individual Application Pages (`/apps/<slug>`)**: Dedicated product recap pages covering the problem solved, architecture, technical stack, key capabilities, live demo links, and enterprise relevance.
- **Founder & Executive Resume (`/founder`)**: Full career timeline, Equifax AI & Salesforce platform playbook, certifications, LinkedIn/GitHub links, and print-to-PDF support.
- **Dark & Light Mode Toggle**: Respects OS preference by default (`color-scheme: light dark` + `light-dark()`) with instant manual toggling and zero flash on load.
- **Static SEO Routes for GitHub Pages**: Post-build script generates static HTML routes for every `/apps/<slug>` and `/founder`, plus `404.html`, `sitemap.xml`, `robots.txt`, and `CNAME` (`digitaltraillabs.com`).

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to `digitaltraillabs.com` on GitHub Pages

1. Push this repository to `https://github.com/gmascagni/Digital-Trail-Labs` on the `main` branch.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Under **Custom domain**, enter `digitaltraillabs.com` (already included in `public/CNAME`) and enable **Enforce HTTPS**.
4. At your DNS registrar for `digitaltraillabs.com`, configure:
   - **A records** for `@` pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record** for `www` pointing to `gmascagni.github.io`.
