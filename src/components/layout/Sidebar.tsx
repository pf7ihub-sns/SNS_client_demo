import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, ChevronRight, Menu, Lock, Store } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu size={24} />
      </button>

      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="brand-logo" onClick={() => setIsMobileOpen(false)}>
            <img src="/logo.png" alt="SNS Square Logo" className="site-logo" style={{ maxHeight: '40px', width: 'auto' }} />
            <div className="brand-text">
              <h2>SNS Square</h2>
              <span>Solution Hub</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-heading">Platform</h3>
            <Link
              to="/"
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <LayoutDashboard size={20} />
              <span>Home</span>
            </Link>
          </div>

          <div className="nav-section">
            <h3 className="nav-heading">Solutions</h3>

            <Link
              to="/domain/compliance"
              className={`nav-item ${isActive('/domain/compliance') ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <ShieldCheck size={20} />
              <span>Compliance</span>
              {isActive('/domain/compliance') && <ChevronRight size={16} className="ml-auto" />}
            </Link>

            <Link
              to="/domain/security"
              className={`nav-item ${isActive('/domain/security') ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Lock size={20} />
              <span>Infosec</span>
              {isActive('/domain/security') && <ChevronRight size={16} className="ml-auto" />}
            </Link>

            <Link
              to="/domain/retail"
              className={`nav-item ${isActive('/domain/retail') ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Store size={20} />
              <span>Retail</span>
              {isActive('/domain/retail') && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="version-info">v1.0.0</div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
