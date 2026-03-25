import { useSelector } from "react-redux";

const footerLinkStyle = (isDark) => ({
  fontSize: '12px',
  textDecoration: 'none',
  color: isDark ? '#64748b' : '#94a3b8',
  transition: 'color 0.2s ease',
  cursor: 'pointer'
});
const Foot = () => {
  const { dark } = useSelector((state) => state.AUTH);

  return (
    <footer
      style={{
        backgroundColor: dark ? '#0f172a' : '#ffffff',
        borderTop: dark ? '1px solid #1e293b' : '1px solid #e2e8f0',
        padding: '24px 16px',
        textAlign: 'center',
        marginTop: 'auto',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <p style={{
          fontSize: '14px',
          fontWeight: '500',
          color: dark ? '#94a3b8' : '#64748b',
          margin: 0
        }}>
          &copy; {new Date().getFullYear()}{' '}
          <span style={{ color: '#2563eb', fontWeight: '700' }}>Task planet Post</span>.
          All rights reserved.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          <a href="/" style={footerLinkStyle(dark)}>Privacy Policy</a>
          <a href="/" style={footerLinkStyle(dark)}>Terms of Service</a>
          <a href="/" style={footerLinkStyle(dark)}>Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
