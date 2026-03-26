import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useState } from "react"
import { setUserName } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  boxSizing: 'border-box' // Essential for width: 100% to work with padding
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
  transition: 'all 0.3s ease',
  cursor: 'pointer'
};

const Signup = () => {
  const [naam, setnaam] = useState("")
  const [password, setpassword] = useState("")
  const [showpass, setshowpass] = useState(false)
  const [checkpassword, setcheckpassword] = useState("")
  const { backendURL, dark } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();

  const passwordValidator = (pass) => {
    let result = { error: false, errormessege: "" };

    if (pass.length < 8) {
      return { error: true, errormessege: "Password must be at least 8 characters" };
    }

    let hasUpper = false;
    let hasLower = false;
    let hasDigit = false;
    let hasSpecial = false;

    for (let char of pass) {
      if (char >= "A" && char <= "Z") hasUpper = true;
      else if (char >= "a" && char <= "z") hasLower = true;
      else if (char >= "0" && char <= "9") hasDigit = true;
      else hasSpecial = true;
    }

    if (!hasUpper) return { error: true, errormessege: "Must contain an uppercase letter" };
    if (!hasLower) return { error: true, errormessege: "Must contain a lowercase letter" };
    if (!hasDigit) return { error: true, errormessege: "Must contain a number" };
    if (!hasSpecial) return { error: true, errormessege: "Must contain a special character" };

    return result;
  };


  const handle = async () => {
    dispatch(setUserName(e.target.value))
    let username = naam
    try {
      const res = await fetch(`${backendURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) return toast.error(await res.text());
      toast.success("User created! You can now login.");
      navigate("/login");
    } catch {
      toast.error("Server error");
    }
  };

  let navigate = useNavigate()

  const handleSignup = () => {
    if (!/\S+@\S+\.\S+/.test(naam)) {
      toast.error("Enter a valid email");
      return;
    }

    const validation = passwordValidator(password);
    if (validation.error) {
      toast.error(validation.errormessege);
      return;
    }

    if (password !== checkpassword) {
      toast.error("Passwords do not match");
      return;
    }

    handle();
  };


  return (
    <section className="mainbg" style={{
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left',
      minHeight: '100vh',
      marginTop: '40px'
    }}>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.8) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(2, 6, 23, 0.8) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px'
      }}>
        <div style={{ width: '100%', maxWidth: '448px' }}>

          <div style={{
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }}>

            <div style={{ padding: '32px' }}>

              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#fff',
                  margin: '0',
                  letterSpacing: '-0.5px'
                }}>
                  Create your account
                </h1>
                <p style={{ marginTop: '8px', fontSize: '14px', color: '#94a3b8' }}>
                  Join <span style={{ color: '#38bdf8', fontWeight: '600' }}>Task Planet</span> and start earning smartly
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    value={naam}
                    onChange={(e) => setnaam(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="name@anymail.com"
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="password" style={labelStyle}>Password</label>
                  <input
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    type={showpass ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" style={labelStyle}>Confirm Password</label>
                  <input
                    value={checkpassword}
                    onChange={(e) => setcheckpassword(e.target.value)}
                    type={showpass ? "text" : "password"}
                    id="confirm-password"
                    placeholder="••••••••"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="check"
                    checked={showpass}
                    onChange={(e) => setshowpass(e.target.checked)}
                    style={{ cursor: 'pointer', accentColor: '#38bdf8' }}
                  />
                  <label htmlFor="check" style={{ fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                    Show passwords
                  </label>
                </div>

                <button
                  onClick={handleSignup}
                  style={{
                    ...buttonStyle,
                    background: 'linear-gradient(to right, #4ade80, #2563eb)',
                    marginTop: '10px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px -5px rgba(37, 99, 235, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3)';
                  }}
                >
                  Create Account
                </button>

                <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8', margin: '0' }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>
                    Login here
                  </Link>
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  )
}

export default Signup