import { Link } from 'react-router-dom';
import { Target, TrendingUp, Sparkles, ArrowRight, BarChart3, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import './pages.css';

export default function OkrionPage() {
  return (
    <div className="product-showcase-page">
      {/* 1. PRODUCT HERO */}
      <section className="showcase-hero">
        <div className="showcase-hero-content">
          <div className="showcase-category">PRODUCTS / STRATEGIC EXECUTION</div>
          <h1 className="showcase-title">OKRion</h1>
          <p className="showcase-short-desc">
            An intelligent enterprise OKR and strategy execution platform designed to align teams,
            track measurable key results in real time, and accelerate organizational performance.
          </p>

          <div className="detail-actions-row">
            <Link to="/" className="btn-primary-action">
              <span>Back to Home</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="hero-visual" style={{ textAlign: 'center' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(6, 78, 227, 0.08), rgba(24, 144, 255, 0.15))',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(6, 78, 227, 0.15)',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              minWidth: '260px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-brand-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 8px 24px -4px rgba(6, 78, 227, 0.35)'
              }}
            >
              <Target size={38} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--color-dark-text)' }}>
                OKRion Engine
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary-text)', margin: 0 }}>
                Strategic Goal Alignment & Execution
              </p>
            </div>
            <span className="status-badge active" style={{ marginTop: '0.25rem' }}>
              Active Product
            </span>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITIES SECTION */}
      <section style={{ marginTop: 'var(--spacing-6)' }}>
        <div className="section-header" style={{ marginBottom: 'var(--spacing-6)' }}>
          <h2>Key Capabilities</h2>
          <p>How OKRion drives strategy execution across enterprise teams</p>
        </div>

        <div className="product-grid">
          <div
            className="overview-card"
            style={{
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{ color: 'var(--color-brand-blue)', marginBottom: 'var(--spacing-3)' }}>
              <TrendingUp size={28} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>
              Goal Cascade & Alignment
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary-text)', lineHeight: 1.6 }}>
              Connect organizational top-level objectives directly to department initiatives and individual key results with bidirectional alignment.
            </p>
          </div>

          <div
            className="overview-card"
            style={{
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{ color: 'var(--color-brand-blue)', marginBottom: 'var(--spacing-3)' }}>
              <BarChart3 size={28} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>
              Automated Check-Ins
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary-text)', lineHeight: 1.6 }}>
              Real-time progress syncing and lightweight weekly check-in workflows eliminate status-reporting friction and keep goals up to date.
            </p>
          </div>

          <div
            className="overview-card"
            style={{
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{ color: 'var(--color-brand-blue)', marginBottom: 'var(--spacing-3)' }}>
              <Sparkles size={28} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>
              AI Predictive Insights
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary-text)', lineHeight: 1.6 }}>
              Smart diagnostics detect off-track initiatives early, suggesting corrective actions and dependencies before deadlines are missed.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTS BANNER */}
      <section
        style={{
          marginTop: 'var(--spacing-6)',
          padding: 'var(--spacing-8)',
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)'
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark-text)' }}>
          Enterprise-Ready Highlights
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--spacing-4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="var(--color-brand-blue)" />
            <span style={{ fontSize: '0.925rem', color: 'var(--color-text-main)' }}>Multi-tenant Role Based Access Control</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={20} color="var(--color-brand-blue)" />
            <span style={{ fontSize: '0.925rem', color: 'var(--color-text-main)' }}>SOC2 & ISO 27001 Security Standards</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={20} color="var(--color-brand-blue)" />
            <span style={{ fontSize: '0.925rem', color: 'var(--color-text-main)' }}>Integrates with Jira, Slack, and HRIS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
