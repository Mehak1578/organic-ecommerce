import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../config/api';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const token = searchParams.get('token');

      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        localStorage.setItem('token', token);

        const response = await authAPI.getMe();
        const user = response.user;

        if (!user) {
          throw new Error('Missing user');
        }

        if (cancelled) {
          return;
        }

        localStorage.setItem('user', JSON.stringify(user));

        if (updateUser) {
          updateUser(user);
        }

        if (setIsAuthenticated) {
          setIsAuthenticated(true);
        }

        navigate('/', { replace: true });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (!cancelled) {
          navigate('/login', { replace: true });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [searchParams, navigate, updateUser, setIsAuthenticated]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem', color: '#333' }}>Completing sign in...</p>
      </div>
    </div>
  );
}

export default AuthCallback;
