import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Store, 
  Landmark, 
  ClipboardCheck, 
  Phone, 
  Target, 
  Layers, 
  Package, 
  Sparkles 
} from 'lucide-react';
import './pages.css';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'solutions' | 'products'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const query = searchQuery.toLowerCase().trim();
  const showCompliance = !query || 'compliance'.includes(query);
  const showInfosec = !query || 'infosec'.includes(query) || 'security'.includes(query);
  const showRetail = !query || 'retail'.includes(query);
  const showFinance = !query || 'finance'.includes(query);
  const showInsurance = !query || 'insurance'.includes(query);
  const showTelecom = !query || 'telecom'.includes(query);

  const solutionMatches = [
    showCompliance,
    showInfosec,
    showRetail,
    showFinance,
    showInsurance,
    showTelecom
  ].filter(Boolean).length;

  const showOkrion = !query || 'okrion'.includes(query) || 'product'.includes(query) || 'okr'.includes(query) || 'strategy'.includes(query);
  const productMatches = showOkrion ? 1 : 0;
  const totalMatches = solutionMatches + productMatches;

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SNS Square Solution Hub</h1>
          <p className="hero-subtitle">
            Discover intelligent enterprise solutions and standalone products designed to solve complex business,
            compliance, and technology challenges.
          </p>

          <div className="hero-search-container">
            <form className="hero-search" onSubmit={handleSearch}>
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search solutions & products" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary">Search</button>
            </form>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-logo-wrapper">
            <img src="/logo.png" alt="SNS Square Solution Hub" className="hero-logo" />
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="home-filter-tabs">
        <button
          type="button"
          className={`home-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <Sparkles size={16} />
          <span>All Offerings</span>
          <span className="home-tab-count">{totalMatches}</span>
        </button>

        <button
          type="button"
          className={`home-tab-btn ${activeTab === 'solutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          <Layers size={16} />
          <span>Solutions</span>
          <span className="home-tab-count">{solutionMatches}</span>
        </button>

        <button
          type="button"
          className={`home-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={16} />
          <span>Products</span>
          <span className="home-tab-count">{productMatches}</span>
        </button>
      </div>

      {/* PRODUCTS SECTION */}
      {(activeTab === 'all' || activeTab === 'products') && (
        <section className="featured-domains">
          <div className="section-header">
            <h2>Enterprise Products</h2>
            <p>Standalone enterprise platforms engineered for organizational execution and performance</p>
          </div>

          <div className="domain-grid">
            {showOkrion && (
              <Link to="/products/okrion" className="domain-card featured">
                <div className="domain-icon-wrapper">
                  <Target size={32} />
                </div>
                <h3>OKRion</h3>
                <p>Intelligent OKR platform for strategic alignment, automated check-ins, and performance execution.</p>
                <div className="domain-link">
                  Explore Product <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {!showOkrion && (
              <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--color-border)' }}>
                <p style={{ color: 'var(--color-secondary-text)', margin: 0 }}>No products found matching "{searchQuery}".</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SOLUTION DOMAINS SECTION */}
      {(activeTab === 'all' || activeTab === 'solutions') && (
        <section className="featured-domains">
          <div className="section-header">
            <h2>Solution Domains</h2>
            <p>Explore our specialized technology practices and domain-specific AI solutions</p>
          </div>

          <div className="domain-grid">
            {showCompliance && (
              <Link to="/domain/compliance" className="domain-card featured">
                <div className="domain-icon-wrapper">
                  <ShieldCheck size={32} />
                </div>
                <h3>Compliance</h3>
                <p>Regulatory tracking, risk management, and data governance solutions.</p>
                <div className="domain-link">
                  Explore Domain <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {showInfosec && (
              <Link to="/domain/security" className="domain-card featured">
                <div className="domain-icon-wrapper">
                  <Lock size={32} />
                </div>
                <h3>Infosec</h3>
                <p>Enterprise-grade Security Solutions to protect your critical assets.</p>
                <div className="domain-link">
                  Explore Domain <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {showRetail && (
              <Link to="/domain/retail" className="domain-card featured">
                <div className="domain-icon-wrapper">
                  <Store size={32} />
                </div>
                <h3>Retail</h3>
                <p>Innovative solutions tailored for modern retail businesses.</p>
                <div className="domain-link">
                  Explore Domain <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {showFinance && (
              <Link to="/domain/finance" className="domain-card featured">
                <div className="domain-icon-wrapper">
                  <Landmark size={32} />
                </div>
                <h3>Finance</h3>
                <p>Solutions for financial operations, risk, and reporting.</p>
                <div className="domain-link">
                  Explore Domain <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {showInsurance && (
              <Link to="/domain/insurance" className="domain-card featured">
                <div className="domain-icon-wrapper">
                  <ClipboardCheck size={32} />
                </div>
                <h3>Insurance</h3>
                <p>AI solutions for claim rejections, validation, routing, and customer support.</p>
                <div className="domain-link">
                  Explore Domain <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {showTelecom && (
              <Link to="/domain/telecom" className="domain-card featured">
                <div className="domain-icon-wrapper">
                  <Phone size={32} />
                </div>
                <h3>Telecom</h3>
                <p>AI-powered solutions for telecom billing, usage monitoring, and revenue assurance.</p>
                <div className="domain-link">
                  Explore Domain <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {solutionMatches === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--color-border)' }}>
                <p style={{ color: 'var(--color-secondary-text)', margin: 0 }}>No solution domains found for "{searchQuery}".</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* GLOBAL EMPTY STATE */}
      {totalMatches === 0 && (
        <div style={{ padding: '3rem 2rem', textAlign: 'center', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--color-border)' }}>
          <p style={{ color: 'var(--color-secondary-text)', fontSize: '1.05rem', margin: 0 }}>
            No solutions or products found for "{searchQuery}".
          </p>
        </div>
      )}
    </div>
  );
}
