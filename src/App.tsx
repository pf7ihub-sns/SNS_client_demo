
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import DomainCatalogPage from './pages/DomainCatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/domain/:domainId" element={<DomainCatalogPage />} />
          <Route path="/product/:productSlug" element={<ProductDetailPage />} />
          {/* Catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
