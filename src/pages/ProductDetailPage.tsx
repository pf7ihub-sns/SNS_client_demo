import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Navigate } from 'react-router-dom';
import { PlayCircle, ExternalLink, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { products } from '../data/mockData';
import './pages.css';

export default function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = products.find((p) => p.slug === productSlug);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="product-showcase-page">
      {/* 1. HERO SECTION */}
      <section className="showcase-hero">
        <div className="showcase-hero-content">
          <div className="showcase-category">{product.domainId.toUpperCase()} / {product.category.toUpperCase()}</div>
          <h1 className="showcase-title">{product.name}</h1>
          <p className="showcase-short-desc">{product.shortDescription}</p>
          <p className="showcase-long-desc">{product.description}</p>
          

        </div>
        
        <div className="showcase-hero-visual">
          {product.heroImageUrl ? (
             <img src={product.heroImageUrl} alt={`${product.name} Interface`} className="hero-product-image" />
          ) : (
             <div className="hero-product-placeholder">
               <span>[ {product.name} UI Placeholder ]</span>
             </div>
          )}
        </div>
      </section>

      {/* 2. CHALLENGE / EDITORIAL SECTION */}
      <section className="showcase-editorial">
        <div className="editorial-container">
          <div className="editorial-title-col">
            <h2>The Modern {product.category} Challenge</h2>
          </div>
          <div className="editorial-text-col">
            <p className="editorial-problem">{product.problem}</p>
            <p className="editorial-solution">{product.solution}</p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT EXPERIENCE (VISUAL STORYTELLING) */}
      {product.visualSections && product.visualSections.length > 0 && (
        <section className="showcase-storytelling">
          <div className="storytelling-header">
            <h2>See {product.name} in Action</h2>
          </div>
          
          <div className="storytelling-sections">
            {product.visualSections.map((section, idx) => (
              <div key={idx} className={`story-section layout-${section.layout}`}>
                <div className="story-content">
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
                <div className="story-visual">
                  {section.imageUrl ? (
                    <img src={section.imageUrl} alt={section.title} className="story-image" />
                  ) : (
                    <div className="story-placeholder">
                      <span>[ Product UI: {section.title} ]</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. KEY CAPABILITIES */}
      <section className="showcase-capabilities">
        <div className="section-container">
          <h2 className="section-title">Key Capabilities</h2>
          <div className="capabilities-grid-compact">
            {product.capabilities.map((cap, idx) => (
              <div key={idx} className="capability-card-compact">
                <CheckCircle2 size={20} className="text-accent" />
                <div>
                  <h4 className="cap-title">{cap.title}</h4>
                  <p className="cap-desc">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OPERATIONAL WORKFLOW (Moved to Modal) */}





      {/* 8. BUSINESS VALUE & CLOSING CTA */}
      <section className="showcase-closing">
        <div className="closing-container">
          <h2 className="closing-title">Built for Faster, Smarter {product.domainId.charAt(0).toUpperCase() + product.domainId.slice(1)}</h2>
          
          {product.businessOutcomes && (
            <div className="business-outcomes-grid">
              {product.businessOutcomes.map((outcome, idx) => (
                <div key={idx} className="outcome-card">
                  {outcome.metric && <span className="outcome-metric">{outcome.metric}</span>}
                  <span className="outcome-label">{outcome.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="closing-cta-box">
            <h3>Ready to transform your operations?</h3>
            <p>See how {product.name} can help your organization mitigate risk and maintain continuous compliance.</p>
            <div className="closing-actions">
              {product.demoUrl && (
                <button onClick={() => setIsVideoModalOpen(true)} className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlayCircle size={18} />
                  Watch Demo Video
                </button>
              )}
              {product.siteUrl ? (
                <a href={product.siteUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary-light" style={{ textDecoration: 'none' }}>
                  Visit Website <ExternalLink size={18} />
                </a>
              ) : (
                <button className="btn-secondary-light">
                  Visit Website <ExternalLink size={18} />
                </button>
              )}
              {product.workflowSteps && product.workflowSteps.length > 0 && (
                <button 
                  className="btn-secondary-light" 
                  onClick={() => setIsWorkflowModalOpen(true)}
                >
                  View Workflow
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW MODAL */}
      {isWorkflowModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="modal-overlay" onClick={() => setIsWorkflowModalOpen(false)} style={{ zIndex: 99999, padding: 0, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.9)' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <button className="modal-close" onClick={() => setIsWorkflowModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '32px', background: '#064ee3', color: 'white', border: 'none', cursor: 'pointer', padding: '12px 20px', borderRadius: '8px', zIndex: 100000, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <X size={20} /> Close Workflow
            </button>
            {product.workflowImageUrl ? (
              <img 
                src={product.workflowImageUrl} 
                alt={`${product.name} Workflow`} 
                style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 0 40px rgba(0,0,0,0.5)', background: 'white' }} 
              />
            ) : (
              <div className="workflow-diagram-visual" style={{ padding: '40px', width: '100%', maxWidth: '1200px', margin: 'auto', background: 'white', borderRadius: '12px' }}>
                <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>Operational Workflow</h2>
                {product.workflowSteps.map((step, idx) => (
                  <div key={idx} className="workflow-node-wrapper">
                    <div className="workflow-node">
                      <span className="node-icon">{idx + 1}</span>
                      <span className="node-text">{step}</span>
                    </div>
                    {idx < product.workflowSteps.length - 1 && (
                      <div className="workflow-arrow">↓</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* VIDEO MODAL */}
      {isVideoModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="modal-overlay" onClick={() => setIsVideoModalOpen(false)} style={{ zIndex: 99999, padding: 0, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.9)' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <button className="modal-close" onClick={() => setIsVideoModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '32px', background: '#064ee3', color: 'white', border: 'none', cursor: 'pointer', padding: '12px 20px', borderRadius: '8px', zIndex: 100000, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <X size={20} /> Close Video
            </button>
            <video 
              src={product.demoUrl} 
              autoPlay 
              controls 
              style={{ maxWidth: '90vw', maxHeight: '90vh', width: '100%', borderRadius: '8px', boxShadow: '0 0 40px rgba(0,0,0,0.5)', background: 'black' }} 
            />
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
