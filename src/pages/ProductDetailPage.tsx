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
      {/* 1. PRODUCT HEADER */}
      <section className="showcase-hero">
        <div className="showcase-hero-content">
          <div className="showcase-category">{product.domainId.toUpperCase()} / {product.category.toUpperCase()}</div>
          <h1 className="showcase-title">{product.name}</h1>
          <p className="showcase-short-desc">{product.shortDescription}</p>
          
          <div className="closing-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {product.demoUrl && (
              <button onClick={handleWatchDemo} className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', borderRadius: '6px', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
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
              }} className="btn-secondary-light" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', borderRadius: '6px', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: 500 }}>
                Visit Website <ExternalLink size={18} /> {!isInternal && <span style={{ fontSize: '10px', marginLeft: '4px' }}>🔒</span>}
              </button>
            ) : (
              <button className="btn-secondary-light" onClick={() => !isInternal && setRestrictedResource('Live Demo')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', borderRadius: '6px', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: 500 }}>
                Visit Website <ExternalLink size={18} /> {!isInternal && <span style={{ fontSize: '10px', marginLeft: '4px' }}>🔒</span>}
              </button>
            )}
            {product.workflowSteps && product.workflowSteps.length > 0 && (
              <button 
                className="btn-secondary-light" 
                onClick={handleViewWorkflow}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', borderRadius: '6px', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: 500 }}
              >
                View Workflow {!isInternal && <span style={{ fontSize: '10px', marginLeft: '4px' }}>🔒</span>}
              </button>
            )}
          </div>
        </div>
        
        <div className="showcase-hero-visual" style={{ marginTop: '2rem' }}>
          {product.heroImageUrl ? (
             <img src={product.heroImageUrl} alt={`${product.name} Interface`} className="hero-product-image" />
          ) : (
             <div className="hero-product-placeholder">
               <span>[ {product.name} UI Placeholder ]</span>
             </div>
          )}
        </div>
      </section>

      {/* 2. WHAT IS IT / WHAT IS IT ABOUT? */}
      <section className="showcase-editorial" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div className="editorial-container">
          <div className="editorial-title-col">
            <h2>What is it / What is it about?</h2>
          </div>
          <div className="editorial-text-col">
            <p className="editorial-problem" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
              {product.useCase}
            </p>
          </div>
        </div>
      </section>

      {/* 3. DESCRIPTION */}
      <section className="showcase-editorial" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <div className="editorial-container">
          <div className="editorial-title-col">
            <h2>Description</h2>
          </div>
          <div className="editorial-text-col">
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', paddingLeft: '1.5rem', margin: 0 }}>
              {product.descriptionPoints.map((point, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. KEY CAPABILITIES */}
      <section className="showcase-capabilities" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="section-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Key Capabilities</h2>
          <div className="capabilities-grid-compact" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {product.keyCapabilities.map((cap, idx) => (
              <div key={idx} className="capability-card-compact" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <CheckCircle2 size={20} className="text-accent" style={{ flexShrink: 0 }} />
                <h4 className="cap-title" style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{cap}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* WORKFLOW MODAL */}
      <WorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        productName={product.name}
        workflowImageUrl={product.workflowImageUrl}
        workflowSteps={product.workflowSteps || []}
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
