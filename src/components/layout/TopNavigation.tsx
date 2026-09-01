import { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Bell, LogOut } from 'lucide-react';
import { products, domains } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function TopNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const pathParts = location.pathname.split('/').filter(Boolean);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate breadcrumbs based on path
  const renderBreadcrumbs = () => {
    if (pathParts.length === 0) return null;

    const breadcrumbs = [
      <Link key="home" to="/" className="breadcrumb-link">Home</Link>
    ];

    if (pathParts[0] === 'domain' && pathParts[1]) {
      const domain = domains.find(d => d.id === pathParts[1]);
      if (domain) {
        breadcrumbs.push(
          <ChevronRight key={`sep-1`} size={16} className="breadcrumb-separator" />,
          <Link key={`domain-${domain.id}`} to={`/domain/${domain.id}`} className={pathParts.length === 2 ? 'breadcrumb-current' : 'breadcrumb-link'}>
            {domain.name}
          </Link>
        );
      }
    }

    if (pathParts[0] === 'product' && pathParts[1]) {
      const product = products.find(p => p.slug === pathParts[1]);
      if (product) {
        const domain = domains.find(d => d.id === product.domainId);
        if (domain) {
           breadcrumbs.push(
            <ChevronRight key={`sep-2`} size={16} className="breadcrumb-separator" />,
            <Link key={`domain-${domain.id}`} to={`/domain/${domain.id}`} className="breadcrumb-link">
              {domain.name}
            </Link>
          );
        }
        
        breadcrumbs.push(
          <ChevronRight key={`sep-3`} size={16} className="breadcrumb-separator" />,
          <span key={`prod-${product.id}`} className="breadcrumb-current">{product.name}</span>
        );
      }
    }

    return <div className="breadcrumbs">{breadcrumbs}</div>;
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="top-nav">
      <div className="top-nav-left">
        {renderBreadcrumbs()}
      </div>
      
      <div className="top-nav-right">
        

        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        {isAuthenticated ? (
          <div className="profile-menu-container" ref={dropdownRef} style={{ position: 'relative' }}>
            <button className="profile-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className="avatar" style={{ background: '#0ea5e9', color: 'white' }}>
                {user?.name.charAt(0) || 'U'}
              </div>
              <span>{user?.name || 'Internal User'} ▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="profile-dropdown" style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '240px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                zIndex: 50,
                overflow: 'hidden'
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{user?.name}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{user?.email}</p>
                  {user?.role === 'internal' ? (
                    <div style={{ display: 'inline-block', marginTop: '8px', padding: '2px 8px', background: '#e0f2fe', color: '#0284c7', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                      Internal Access
                    </div>
                  ) : (
                    <div style={{ display: 'inline-block', marginTop: '8px', padding: '2px 8px', background: '#f1f5f9', color: '#64748b', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                      Guest Access
                    </div>
                  )}
                </div>
                <div style={{ padding: '8px' }}>
                  <button onClick={handleLogout} className="dropdown-item" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', color: '#ef4444', borderRadius: '6px' }}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link 
            to="/login" 
            state={{ from: location }}
            style={{ 
              textDecoration: 'none', 
              padding: '8px 16px', 
              backgroundColor: '#0f172a', 
              color: 'white', 
              borderRadius: '6px', 
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
