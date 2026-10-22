import { ArrowDown, ArrowUpRight, CheckCircle2, Image, LogIn } from 'lucide-react';
import { okrion } from '../data/okrion';
import './pages.css';

export default function OkrionPage() {
  return (
    <div className="product-showcase-page okrion-page">
      <section className="showcase-hero">
        <div className="showcase-hero-content">
          <div className="showcase-category">PRODUCTS / ACADEMIC GOAL MANAGEMENT</div>
          <h1 className="showcase-title okrion-title">
            <img src="/images/okrion/okrionlogo.svg" alt="OKRion" width={198} height={57} />
          </h1>
          <p className="showcase-short-desc">{okrion.description}</p>
          <div className="detail-actions-row">
            <a href="#try-okrion" className="btn-primary-action">
              Try OKRion <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a href={okrion.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary-action">
              Learn more <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="showcase-hero-visual">
          {okrion.heroImageUrl ? (
            <img src={okrion.heroImageUrl} alt="OKRion product preview" className="hero-product-image okrion-product-image" />
          ) : (
            <div className="okrion-preview-placeholder">
              <Image size={36} strokeWidth={1.5} aria-hidden="true" />
              <span>OKRion product preview</span>
              <p>Image coming soon</p>
            </div>
          )}
        </div>
      </section>

      <section id="try-okrion" className="okrion-demo-section" aria-labelledby="okrion-demo-title">
        <div className="section-header">
          <div className="showcase-category">EXPLORE BY ROLE</div>
          <h2 id="okrion-demo-title">Try OKRion</h2>
          <p>
            Find the experience that fits your role.
            {okrion.roles.every((role) => !role.loginUrl) && ' Demo access will be available soon.'}
          </p>
        </div>
        <div className="product-grid">
          {okrion.roles.map((role) => (
            <article className="okrion-role-card" key={role.id}>
              <div className="okrion-role-heading">
                <h3>{role.name}</h3>
                {!role.loginUrl && <span className="okrion-coming-soon">Coming soon</span>}
              </div>
              <p>{role.description}</p>
              {role.loginUrl ? (
                <a
                  href={role.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-action okrion-role-action"
                  data-role-id={role.productRoleId ?? role.id}
                >
                  <LogIn size={16} aria-hidden="true" /> Try as {role.name}
                </a>
              ) : (
                <button
                  type="button"
                  className="btn-primary-action okrion-role-action"
                  data-role-id={role.productRoleId ?? role.id}
                  disabled
                  aria-describedby={`okrion-${role.id}-availability`}
                >
                  <LogIn size={16} aria-hidden="true" /> Try as {role.name}
                </button>
              )}
              {!role.loginUrl && (
                <span id={`okrion-${role.id}-availability`} className="okrion-role-availability">
                  Demo login coming soon
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="showcase-capabilities" aria-labelledby="okrion-capabilities-title">
        <h2 id="okrion-capabilities-title" className="detail-section-title">Key Capabilities</h2>
        <div className="capabilities-grid-compact">
          {okrion.capabilities.map((capability) => (
            <div className="capability-card-compact" key={capability}>
              <CheckCircle2 size={18} className="okrion-capability-icon" aria-hidden="true" />
              <h3 className="cap-title">{capability}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="showcase-editorial" aria-labelledby="okrion-description-title">
        <div className="editorial-container">
          <div className="editorial-title-col">
            <h2 id="okrion-description-title">Description</h2>
            <p className="editorial-subtitle">Goals, evidence & academic progress</p>
          </div>
          <div className="editorial-text-col">
            <ul className="description-bullet-list">
              {okrion.descriptionPoints.map((point) => (
                <li className="description-bullet-item" key={point}>{point}</li>
              ))}
            </ul>
            <a href={okrion.websiteUrl} target="_blank" rel="noopener noreferrer" className="okrion-website-link">
              Discover more at okrion.ai <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
