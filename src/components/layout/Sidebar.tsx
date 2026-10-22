import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  Lock, 
  Store, 
  Landmark, 
  ClipboardCheck, 
  Phone, 
  Layers, 
  Package, 
  Target,
  Boxes
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(true);
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  const isActive = (path: string) => location.pathname.startsWith(path);
  const isSolutionsActive = location.pathname.startsWith('/domain');
  const isProductsActive = location.pathname.startsWith('/products');

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
            <button
              type="button"
              className={`nav-dropdown-toggle ${isSolutionsOpen ? 'open' : ''} ${isSolutionsActive ? 'parent-active' : ''}`}
              onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              aria-expanded={isSolutionsOpen}
            >
              <Layers size={20} />
              <span>Solutions</span>
              <ChevronDown size={16} className="chevron-icon" />
            </button>

            <div className={`nav-submenu ${isSolutionsOpen ? 'expanded' : 'collapsed'}`}>
              <Link
                to="/domain/compliance"
                className={`nav-item ${isActive('/domain/compliance') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <ShieldCheck size={18} />
                <span>Compliance</span>
                {isActive('/domain/compliance') && <ChevronRight size={14} className="ml-auto" />}
              </Link>

              <Link
                to="/domain/security"
                className={`nav-item ${isActive('/domain/security') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Lock size={18} />
                <span>Infosec</span>
                {isActive('/domain/security') && <ChevronRight size={14} className="ml-auto" />}
              </Link>

              <Link
                to="/domain/retail"
                className={`nav-item ${isActive('/domain/retail') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Store size={18} />
                <span>Retail</span>
                {isActive('/domain/retail') && <ChevronRight size={14} className="ml-auto" />}
              </Link>

              <Link
                to="/domain/finance"
                className={`nav-item ${isActive('/domain/finance') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Landmark size={18} />
                <span>Finance</span>
                {isActive('/domain/finance') && <ChevronRight size={14} className="ml-auto" />}
              </Link>

              <Link
                to="/domain/insurance"
                className={`nav-item ${isActive('/domain/insurance') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <ClipboardCheck size={18} />
                <span>Insurance</span>
                {isActive('/domain/insurance') && <ChevronRight size={14} className="ml-auto" />}
              </Link>

              <Link
                to="/domain/telecom"
                className={`nav-item ${isActive('/domain/telecom') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Phone size={18} />
                <span>Telecom</span>
                {isActive('/domain/telecom') && <ChevronRight size={14} className="ml-auto" />}
              </Link>

              <Link
                to="/domain/supply-chain"
                className={`nav-item ${isActive('/domain/supply-chain') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Boxes size={18} />
                <span>Supply Chain</span>
                {isActive('/domain/supply-chain') && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            </div>
          </div>

          <div className="nav-section">
            <button
              type="button"
              className={`nav-dropdown-toggle ${isProductsOpen ? 'open' : ''} ${isProductsActive ? 'parent-active' : ''}`}
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              aria-expanded={isProductsOpen}
            >
              <Package size={20} />
              <span>Products</span>
              <ChevronDown size={16} className="chevron-icon" />
            </button>

            <div className={`nav-submenu ${isProductsOpen ? 'expanded' : 'collapsed'}`}>
              <Link
                to="/products/okrion"
                className={`nav-item ${isActive('/products/okrion') ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Target size={18} />
                <span>OKRion</span>
                {isActive('/products/okrion') && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            </div>
          </div>
        </nav>
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
