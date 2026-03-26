import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
    const { dark } = useSelector((state) => state.AUTH);
    const { backendStatus } = useSelector((state) => state.AUTH);
    let navigate = useNavigate()
    return (
        <div className="side-entry" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '0 20px',
            backgroundColor: dark ? '#0f172a' : '#f8fafc',
            textAlign: 'center',
            transition: 'background-color 0.3s ease'
        }}>
            <h1 style={{
                fontSize: '48px',
                fontWeight: '800',
                color: dark ? '#f8fafc' : '#1e293b',
                marginBottom: '16px',
                letterSpacing: '-1px'
            }}>
                Welcome to <span style={{ color: '#2563eb' }}>Task planet Social Post</span>
            </h1>

            <p style={{
                fontSize: '18px',
                color: dark ? '#94a3b8' : '#64748b',
                maxWidth: '600px',
                marginBottom: '32px',
                lineHeight: '1.6'
            }}>
                The modern platform for share ur ideas
            </p>

            {backendStatus === "loading" && (
                <div className="side-entry" style={{
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <p style={{ fontSize: "18px" }}>Waking up server...</p>
                    <p style={{ fontSize: "14px", color: "black" }}>
                        This may take 10-20 seconds (free hosting)
                    </p>
                </div>
            )}

            <button
                onClick={() => navigate("/login")}
                style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    padding: '14px 32px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1)',
                    transition: 'transform 0.2s, background-color 0.2s'
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#1d4ed8';
                    e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'translateY(0)';
                }}
            >
                Get Started Now
            </button>
        </div>
    )
}

export default Home