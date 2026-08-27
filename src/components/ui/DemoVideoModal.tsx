import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
  provider: 'google-drive' | 'native' | 'youtube' | 'vimeo' | string;
}

export default function DemoVideoModal({ isOpen, onClose, title, videoUrl, provider }: DemoVideoModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsLoaded(false);
    }
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
          position: 'relative'
        }}
      >
        {/* Header Area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em', opacity: 0.9 }}>
            {title} — Demo Video
          </h2>
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
            <X size={18} /> Close Video
          </button>
        </div>

        {/* Video Area */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 32px 48px' }}>
          <div style={{ 
            position: 'relative',
            width: '100%',
            maxWidth: '1440px',
            aspectRatio: '16/9',
            background: 'black',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {!isLoaded && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderRadius: '50%', borderTopColor: 'rgba(255,255,255,0.8)', animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
                <p>Loading Video...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            
            {provider === 'google-drive' ? (
              <iframe 
                src={videoUrl} 
                allow="autoplay; fullscreen" 
                allowFullScreen 
                style={{ width: '100%', height: '100%', border: 'none', position: 'relative', zIndex: 1, opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                onLoad={() => setIsLoaded(true)}
              />
            ) : (
              <video 
                src={videoUrl} 
                autoPlay 
                controls 
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1, opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                onLoadedData={() => setIsLoaded(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
