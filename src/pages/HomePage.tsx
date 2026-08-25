import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import './pages.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge new mb-4" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            <span className="badge-dot"></span> New Compliance Solutions Added
          </div>
          <h1 className="hero-title">SNS Square Solution Hub</h1>
          <p className="hero-subtitle">
            Discover intelligent enterprise solutions designed to solve complex business,
            compliance, and technology challenges.
          </p>

          <div className="hero-search-container">
            <div className="hero-search">
              <Search size={20} className="search-icon" />
              <input type="text" placeholder="Search for products, domains, or capabilities..." />
              <button className="btn-primary">Search</button>
            </div>
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
          {/* We'll hardcode the primary one to highlight it */}
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

          <Link to="/domain/security" className="domain-card featured">
            <div className="domain-icon-wrapper">
              <Lock size={32} />
            </div>
            <h3>Security</h3>
            <p>Enterprise-grade Security Solutions to protect your critical assets.</p>
            <div className="domain-link">
              Explore Domain <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
