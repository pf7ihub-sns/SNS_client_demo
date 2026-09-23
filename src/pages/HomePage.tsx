import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Lock, Store, Landmark } from 'lucide-react';
import './pages.css';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering now happens in-page automatically as the user types in searchQuery
  };

  const query = searchQuery.toLowerCase().trim();
  const showCompliance = !query || 'compliance'.includes(query);
  const showInfosec = !query || 'infosec'.includes(query) || 'security'.includes(query);
  const showRetail = !query || 'retail'.includes(query);
  const showFinance = !query || 'finance'.includes(query);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">

          <h1 className="hero-title">SNS Square Solution Hub</h1>
          <p className="hero-subtitle">
            Discover intelligent enterprise solutions designed to solve complex business,
            compliance, and technology challenges.
          </p>

          <div className="hero-search-container">
            <form className="hero-search" onSubmit={handleSearch}>
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by Solution Domain (e.g., Compliance, Retail, Finance)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary">Search</button>
            </form>
          </div>
        </div>

        <div className="hero-visual" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/logo.png" alt="SNS Square Solution Hub" style={{ maxWidth: '300px', height: 'auto' }} />
        </div>
      </section>

      <section className="featured-domains">
        <div className="section-header">
          <h2>Solution Domains</h2>
          <p>Explore our specialized technology practices</p>
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
          
          {!showCompliance && !showInfosec && !showRetail && !showFinance && (
            <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p>No solution domains found for "{searchQuery}".</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
