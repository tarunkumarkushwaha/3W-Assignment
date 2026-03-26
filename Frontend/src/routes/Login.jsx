import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setLoading } from '../../redux/authSlice';
import { setUserName } from '../../redux/authSlice';
import { toast } from "react-toastify"

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#e2e8f0'
};

const inputStyle = {
  width: '100%',
  borderRadius: '12px',
  padding: '12px 16px',
  fontSize: '14px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  borderRadius: '14px',
  padding: '14px',
  fontSize: '15px',
  fontWeight: '600',
  color: '#fff',
  border: 'none',
  boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
  transition: 'all 0.3s ease'
};

const Login = () => {
  const [password, setpassword] = useState("")
  const { userName, backendURL, loading, dark } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!userName || !password) {
      toast.error("Please enter username and password");
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: password.trim()
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const msg = await res.text();
        toast.error(msg || "Login failed");
        return;
      }

      const data = await res.json();
      dispatch(setAuth({
        token: data.accessToken,
        username: userName
      }));

      toast.success(`User ${userName} signed in successfully`);
      dispatch(resetPostState());
      navigate("/post");

    } catch (err) {
      toast.error("Server error");
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <>
      <div className="mainbg" style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        minHeight: '100vh'
      }}>
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.8) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(2, 6, 23, 0.8) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px'
        }}>
          <section style={{ width: '100%', maxWidth: '400px' }}>

            <div style={{
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}>

              <div style={{ padding: '32px' }}>

                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: '0' }}>Welcome Back</h2>
                  <p style={{ marginTop: '8px', fontSize: '14px', color: '#94a3b8' }}>
                    Sign in to continue to <span style={{ color: '#38bdf8', fontWeight: '600' }}>Task Planet</span>
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email or Username</label>
                    <input
                      value={userName || ""}
                      onChange={(e) => dispatch(setUserName(e.target.value))}
                      type="email"
                      id="email"
                      placeholder="yourname@anymail.com"
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" style={labelStyle}>Password</label>
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value.trim())}
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleSignin}
                    disabled={loading}
                    style={{
                      ...buttonStyle,
                      opacity: loading ? 0.6 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      background: 'linear-gradient(to right, #4ade80, #2563eb)',
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 20px -5px rgba(37, 99, 235, 0.5)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3)';
                      }
                    }}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8', margin: '0' }}>
                    Don’t have an account yet?{" "}
                    <Link to="/signup" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>
                      Sign up
                    </Link>
                  </p>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>

  )
}

export default Login