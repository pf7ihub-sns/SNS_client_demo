import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Search, Bell, User } from 'lucide-react';
import { products, domains } from '../../data/mockData';

export default function TopNavigation() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

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

  return (
    <header className="top-nav">
      <div className="top-nav-left">
        {renderBreadcrumbs()}
      </div>
      
      <div className="top-nav-right">
        <div className="global-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Quick search..." className="search-input" />
          <span className="search-shortcut">⌘K</span>
        </div>
        
        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        <button className="profile-button">
          <div className="avatar">
            <User size={18} />
          </div>
          <span>Client View</span>
        </button>
      </div>
    </header>
  );
}
