import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/products/ai-soc';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginMode) {
      if (!email || !password) {
        setError('Please enter a valid email address and password.');
        return;
      }
    } else {
      if (!firstName || !email || !password || !confirmPassword) {
        setError('Please fill out all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        await register(email, `${firstName} ${lastName}`.trim(), password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="global-visual">
        <div className="abstract-shape shape-1"></div>
        <div className="abstract-shape shape-2"></div>
      </div>
      
      <div className="login-card" style={{ zIndex: 1 }}>
        {/* Left Branding Panel */}
        <div className="login-left-brand">
          <div className="brand-content-center">
            <img src="/logo.png" alt="SNS Square Logo" className="brand-logo" />
            <h1 className="brand-title">SNS Square Solution Hub</h1>
            <p className="brand-subtitle">Explore Enterprise Solutions. Experience Innovation.</p>
            
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLoginMode ? 'active' : ''}`}
                onClick={() => { setIsLoginMode(true); setError(''); }}
              >
                LOG IN
              </button>
              <button 
                className={`auth-tab ${!isLoginMode ? 'active' : ''}`}
                onClick={() => { setIsLoginMode(false); setError(''); }}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Form Panel */}
        <div className="login-right-form">
          <div className="login-form-container">
            <div className="login-header">
              <h2>Let's get started!</h2>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLoginMode && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name <span className="required-asterisk">*</span></label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email ID <span className="required-asterisk">*</span></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>



              {isLoginMode ? (
                <div className="form-group">
                  <label htmlFor="password">Password <span className="required-asterisk">*</span></label>
                  <div className="input-with-icon">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                    <button type="button" className="input-action-icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password <span className="required-asterisk">*</span></label>
                    <div className="input-with-icon">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        disabled={isLoading}
                      />
                      <button type="button" className="input-action-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Re-enter Password <span className="required-asterisk">*</span></label>
                    <div className="input-with-icon">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        disabled={isLoading}
                      />
                      <button type="button" className="input-action-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <label className="form-checkbox">
                  <input type="checkbox" />
                  Check to Subscribe to our newsletter
                </label>
              )}

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                className="login-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </button>
              
              <p className="terms-text">
                By continuing, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
