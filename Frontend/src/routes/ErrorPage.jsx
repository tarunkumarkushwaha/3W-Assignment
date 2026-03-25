import { useSelector } from "react-redux";


const ErrorPage = () => {
  const { dark } = useSelector((state) => state.AUTH);
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: dark ? '#0f172a' : '#f8fafc', 
      padding: '20px',
      textAlign: 'center',
      transition: 'background-color 0.3s ease',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: '900',
        color: dark ? '#1e293b' : '#e2e8f0',
        lineHeight: '1',
        marginBottom: '-40px',
        userSelect: 'none'
      }}>
        404
      </div>

      <h1 style={{
        fontSize: '32px',
        fontWeight: '800',
        color: dark ? '#f8fafc' : '#1e293b',
        marginBottom: '12px',
        position: 'relative', 
        zIndex: 1
      }}>
        Oops! Something went wrong.
      </h1>

      <p style={{
        fontSize: '16px',
        color: dark ? '#94a3b8' : '#64748b',
        marginBottom: '32px',
        maxWidth: '400px',
        lineHeight: '1.6'
      }}>
        The page you're looking for doesn't exist or has been moved to a new location.
      </p>

      <button
        onClick={() => window.history.back()}
        style={{
          backgroundColor: '#2563eb',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '15px',
          padding: '12px 32px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#1d4ed8';
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = '0 6px 8px -1px rgba(37, 99, 235, 0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#2563eb';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px -1px rgba(37, 99, 235, 0.2)';
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
