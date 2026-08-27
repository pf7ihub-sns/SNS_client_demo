import { useState, useEffect } from 'react';

import { useParams, Navigate, useLocation } from 'react-router-dom';
import { PlayCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { products } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import RestrictedAccessModal from '../components/auth/RestrictedAccessModal';
import DemoVideoModal from '../components/ui/DemoVideoModal';
import WorkflowModal from '../components/ui/WorkflowModal';
import './pages.css';

export default function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = products.find((p) => p.slug === productSlug);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const { isInternal } = useAuth();
  const [restrictedResource, setRestrictedResource] = useState<string | null>(null);
  
  const location = useLocation();


  useEffect(() => {
    if (location.state?.scrollTo === 'demo-video') {
      if (isInternal) {
        setIsVideoModalOpen(true);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state, isInternal]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const handleWatchDemo = () => {
    if (isInternal) {
      setIsVideoModalOpen(true);
    } else {
      setRestrictedResource('Demo Video');
    }
  };

  const handleViewWorkflow = () => {
    if (isInternal) {
      setIsWorkflowModalOpen(true);
    } else {
      setRestrictedResource('Detailed Workflow');
    }
  };

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
                <button onClick={handleWatchDemo} className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlayCircle size={18} />
                  Watch Demo Video {!isInternal && <span style={{ fontSize: '10px', marginLeft: '4px' }}>🔒</span>}
                </button>
              )}
              {product.siteUrl ? (
                <button onClick={(e) => {
                  if (!isInternal) {
                    e.preventDefault();
                    setRestrictedResource('Live Demo');
                  } else {
                    window.open(product.siteUrl, '_blank', 'noopener,noreferrer');
                  }
                }} className="btn-secondary-light" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Visit Website <ExternalLink size={18} /> {!isInternal && <span style={{ fontSize: '10px', marginLeft: '4px' }}>🔒</span>}
                </button>
              ) : (
                <button className="btn-secondary-light" onClick={() => !isInternal && setRestrictedResource('Live Demo')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Visit Website <ExternalLink size={18} /> {!isInternal && <span style={{ fontSize: '10px', marginLeft: '4px' }}>🔒</span>}
                </button>
              )}
              {product.workflowSteps && product.workflowSteps.length > 0 && (
                <button 
                  className="btn-secondary-light" 
                  onClick={handleViewWorkflow}
                >
                  View Workflow {!isInternal && <span style={{ fontSize: '10px', marginLeft: '4px' }}>🔒</span>}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW MODAL */}
      <WorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        productName={product.name}
        workflowImageUrl={product.workflowImageUrl}
        workflowSteps={product.workflowSteps}
      />

      {/* VIDEO MODAL */}
      <DemoVideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        title={product.name} 
        videoUrl={product.demoUrl || ''} 
        provider={product.demoUrl?.includes('drive.google.com') ? 'google-drive' : 'native'} 
      />
      
      {/* RESTRICTED ACCESS MODAL */}
      <RestrictedAccessModal 
        isOpen={!!restrictedResource} 
        onClose={() => setRestrictedResource(null)} 
        resourceName={restrictedResource || undefined}
      />
    </div>
  );
}
