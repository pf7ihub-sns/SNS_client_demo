import { useState, useEffect } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { PlayCircle, ExternalLink, CheckCircle2, FolderOpen } from 'lucide-react';
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
    if (!isInternal) {
      setRestrictedResource('Demo Video');
      return;
    }
    if (product?.demoUrl) {
      setIsVideoModalOpen(true);
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
          
          <div className="detail-actions-row">
            {product.demoUrl !== undefined && (
              <button onClick={handleWatchDemo} className="btn-primary-action">
                <PlayCircle size={18} />
                <span>Watch Demo Video</span> {!isInternal && <span className="lock-indicator">🔒</span>}
              </button>
            )}
            {product.siteUrl !== undefined && (
              <button 
                onClick={(e) => {
                  if (!isInternal) {
                    e.preventDefault();
                    setRestrictedResource('Live Demo');
                  } else if (product.siteUrl) {
                    window.open(product.siteUrl, '_blank', 'noopener,noreferrer');
                  }
                }} 
                className="btn-primary-action"
              >
                <span>Visit Website</span> <ExternalLink size={16} /> {!isInternal && <span className="lock-indicator">🔒</span>}
              </button>
            )}
            {product.resourcesUrl && (
              <a
                href={product.resourcesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-action"
              >
                <FolderOpen size={18} />
                <span>View Resources</span>
              </a>
            )}
            {product.workflowSteps && product.workflowSteps.length > 0 && (
              <button 
                className="btn-secondary-action" 
                onClick={handleViewWorkflow}
              >
                <span>View Workflow</span> {!isInternal && <span className="lock-indicator">🔒</span>}
              </button>
            )}
          </div>
        </div>
        
        <div className="showcase-hero-visual">
          {product.heroImageUrl ? (
             <img
               src={product.heroImageUrl}
               alt={`${product.name} Interface`}
               className="hero-product-image"
               style={product.slug === 'ai-ecommerce-return-refund-reverse-logistics-chatbot' ? { maxHeight: '420px' } : undefined}
             />
          ) : (
             <div className="hero-product-placeholder">
               <span>[ {product.name} UI Placeholder ]</span>
             </div>
          )}
        </div>
      </section>

      {/* 2. KEY CAPABILITIES */}
      <section className="showcase-capabilities">
        <div className="section-container">
          <h2 className="detail-section-title">Key Capabilities</h2>
          <div className="capabilities-grid-compact">
            {product.keyCapabilities.map((cap, idx) => (
              <div key={idx} className="capability-card-compact">
                <CheckCircle2 size={18} style={{ color: 'var(--color-brand-blue)', flexShrink: 0, marginTop: '2px' }} />
                <h4 className="cap-title">{cap}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DESCRIPTION */}
      <section className="showcase-editorial">
        <div className="editorial-container">
          <div className="editorial-title-col">
            <h2>Description</h2>
            <p className="editorial-subtitle">Overview & Specifications</p>
          </div>
          <div className="editorial-text-col">
            <ul className="description-bullet-list">
              {product.descriptionPoints.map((point, idx) => (
                <li key={idx} className="description-bullet-item">{point}</li>
              ))}
            </ul>
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
