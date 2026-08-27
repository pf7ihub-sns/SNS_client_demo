import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  workflowImageUrl?: string;
  workflowSteps?: string[];
}

export default function WorkflowModal({ isOpen, onClose, productName, workflowImageUrl, workflowSteps }: WorkflowModalProps) {
  const [zoom, setZoom] = useState(1);

  // Reset zoom when modal opens or closes
  useEffect(() => {
    setZoom(1);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleZoomReset = () => setZoom(1);

  return createPortal(
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      style={{ 
        position: 'fixed', 
        top: 0, left: 0, right: 0, bottom: 0, 
        zIndex: 99999, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          width: '100vw', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header Area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', zIndex: 10 }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em', opacity: 0.9 }}>
            {productName} — Operational Workflow
          </h2>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Zoom Controls */}
            <div style={{ 
              display: 'flex', 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px', 
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(4px)'
            }}>
              <button 
                onClick={handleZoomOut} 
                style={{ background: 'transparent', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                title="Zoom Out"
              >
                <ZoomOut size={18} />
              </button>
              <button 
                onClick={handleZoomReset} 
                style={{ background: 'transparent', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.2)', borderRight: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '12px', fontWeight: 600, width: '50px' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                title="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button 
                onClick={handleZoomIn} 
                style={{ background: 'transparent', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                title="Zoom In"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Close Button */}
            <button 
              className="modal-close" 
              onClick={onClose} 
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                color: 'white', 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                cursor: 'pointer', 
                padding: '10px 16px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontWeight: 500, 
                transition: 'all 0.2s',
                backdropFilter: 'blur(4px)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <X size={18} /> Close Workflow
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 32px 48px', overflow: 'auto' }}>
          <div style={{ 
            transform: `scale(${zoom})`, 
            transformOrigin: 'center center',
            transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}>
            {workflowImageUrl ? (
              <img 
                src={workflowImageUrl} 
                alt={`${productName} Workflow`} 
                style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 0 40px rgba(0,0,0,0.5)', background: 'white' }} 
                draggable={false}
              />
            ) : (
              <div className="workflow-diagram-visual" style={{ padding: '40px', width: '100%', maxWidth: '1200px', margin: 'auto', background: 'white', borderRadius: '12px', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
                <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>Operational Workflow</h2>
                {workflowSteps?.map((step, idx) => (
                  <div key={idx} className="workflow-node-wrapper">
                    <div className="workflow-node">
                      <span className="node-icon">{idx + 1}</span>
                      <span className="node-text">{step}</span>
                    </div>
                    {idx < workflowSteps.length - 1 && (
                      <div className="workflow-arrow">↓</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
