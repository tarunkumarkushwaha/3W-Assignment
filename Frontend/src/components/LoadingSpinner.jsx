import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  const { accessToken, userName, dark, backendURL } = useSelector((state) => state.AUTH);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
      gap: '20px',
      backgroundColor: dark ? '#0f172a' : '#f8fafc',
      transition: 'background-color 0.3s ease',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '50%',
        backgroundColor: dark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
      }}>
        <CircularProgress
          size={50}
          thickness={4.5}
          style={{ color: '#2563eb' }}
        />
      </div>

      <p style={{
        color: dark ? '#cbd5e1' : '#475569',
        fontSize: '15px',
        fontWeight: '600',
        letterSpacing: '0.2px',
        margin: 0,
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}>
        {text || "Loading your feed..."}
      </p>

      <style>
        {`
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
