import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AppDetailPage } from './pages/AppDetailPage';
import { FounderPage } from './pages/FounderPage';
import { getAppBySlug } from './data/apps';

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (pathname === '/founder') {
      document.title = 'Georgio Mascagni — Founder & Executive Resume | Digital Trail Labs';
    } else if (pathname.startsWith('/apps/')) {
      const slug = pathname.replace('/apps/', '').replace(/\/$/, '');
      const app = getAppBySlug(slug);
      document.title = app
        ? `${app.name} — Digital Trail Labs`
        : 'Application — Digital Trail Labs';
    } else {
      document.title = 'Digital Trail Labs — Enterprise AI & Applied Software Studio';
    }
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps/:slug" element={<AppDetailPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
