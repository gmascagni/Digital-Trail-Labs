import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const templatePath = path.join(distDir, 'index.html');
const appsSourcePath = path.resolve('src/data/apps.ts');
const BASE_URL = 'https://digitaltraillabs.com';

const template = fs.readFileSync(templatePath, 'utf-8');
const appsSource = fs.readFileSync(appsSourcePath, 'utf-8');

// Extract slug, name, and tagline from src/data/apps.ts
const entryRegex = /slug:\s*'([^']+)',[\s\S]*?name:\s*'([^']+)',[\s\S]*?tagline:\s*'([^']+)'/g;
const routes = [
  {
    path: 'founder',
    title: 'Georgio Mascagni — Founder & Executive Resume | Digital Trail Labs',
    description:
      'Executive profile and resume for Georgio Mascagni — IT CRM Platform Director at Equifax, AI Champion, and Founder of Digital Trail Labs.',
  },
];

let match;
while ((match = entryRegex.exec(appsSource)) !== null) {
  const [, slug, name, tagline] = match;
  routes.push({
    path: `apps/${slug}`,
    title: `${name} — Digital Trail Labs`,
    description: tagline,
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectMeta(html, { title, description, url }) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${safeDesc}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${url}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${safeTitle}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${safeDesc}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${url}" />`,
    );
}

for (const route of routes) {
  const routeDir = path.join(distDir, route.path);
  fs.mkdirSync(routeDir, { recursive: true });
  const url = `${BASE_URL}/${route.path}/`;
  const html = injectMeta(template, { ...route, url });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
}

// GitHub Pages SPA fallback
fs.copyFileSync(templatePath, path.join(distDir, '404.html'));

// Generate sitemap.xml and robots.txt
const allUrls = [`${BASE_URL}/`, ...routes.map((r) => `${BASE_URL}/${r.path}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
fs.writeFileSync(
  path.join(distDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`,
  'utf-8',
);

console.log(`Generated ${routes.length} static route HTML files, 404.html, sitemap.xml, and robots.txt.`);
