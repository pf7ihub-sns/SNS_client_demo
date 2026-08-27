import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface RestrictedAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName?: string;
}

export default function RestrictedAccessModal({ isOpen, onClose, resourceName = 'This resource' }: RestrictedAccessModalProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isOpen || typeof document === 'undefined') return null;

  const handleSignIn = () => {
    onClose();
    navigate('/login', { state: { from: location } });
  };

  return createPortal(
    <div 
      style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', 
        zIndex: 99999 
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          background: 'white', borderRadius: '12px', width: '100%', maxWidth: '420px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ background: '#f8fafc', padding: '24px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
          <div style={{ width: '48px', height: '48px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#0ea5e9' }}>
            <Lock size={24} />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: 600 }}>Internal Access</h3>
        </div>
        
        <div style={{ padding: '24px' }}>
          {isAuthenticated ? (
            <>
              <p style={{ margin: '0 0 24px 0', color: '#475569', lineHeight: 1.5, textAlign: 'center' }}>
                Your account does not have internal showcase access to view {resourceName}.
              </p>
              
              <button 
                onClick={onClose}
                style={{ width: '100%', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
              >
                Continue Exploring Solutions
              </button>
            </>
          ) : (
            <>
              <p style={{ margin: '0 0 24px 0', color: '#475569', lineHeight: 1.5, textAlign: 'center' }}>
                {resourceName} is available exclusively to authorized SNS Groups users.
                <br/><br/>
                Sign in with your SNS Groups account to continue.
              </p>
              
              <button 
                onClick={handleSignIn}
                style={{ width: '100%', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
              >
                Sign In
              </button>
              
              <button 
                onClick={onClose}
                style={{ width: '100%', padding: '12px', background: 'transparent', color: '#64748b', border: 'none', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', marginTop: '8px' }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
