import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout, themeChange } from '../../redux/authSlice';

const Navbar = () => {
  const [menu, setmenu] = useState(false);
  const { accessToken, userName, dark, backendURL } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTheme = () => dispatch(themeChange());

  const handleLogout = async () => {
    try {
      const res = await fetch(`${backendURL}/logout`, {
        method: "POST",
        credentials: "include"
      });

      if (!res.ok) {
        const errorText = await res.text();
        return toast.error(errorText);
      }

      toast.success(`User ${userName} has successfully signed out`);
      navigate("/login");
      dispatch(logout());

    } catch (error) {
      toast.error("Server error during logout");
      dispatch(logout());
      navigate("/login");
    }
  };

  const loginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setmenu(true);
      } else {
        setmenu(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header style={{ position: 'relative', zIndex: 100 }}>
        <nav
          style={{
            backgroundColor: dark ? '#1e293b' : '#ffffff',
            position: 'fixed', 
            width: '100%',
            top: 0,
            left: 0,
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 5%',
            boxShadow: dark ? '0 4px 6px -1px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1)',
            borderBottom: dark ? '1px solid #334155' : '1px solid #e2e8f0',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '35px',
                height: '35px',
                backgroundColor: '#2563eb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '10px'
              }}>T</div>
              <span style={{
                fontSize: '20px',
                fontWeight: '700',
                letterSpacing: '-0.5px',
                color: dark ? '#f8fafc' : '#1e293b'
              }}>
                Task planet
              </span>
            </Link>
          </div>

          {menu && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <ul style={{
                display: 'flex',
                gap: '25px',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}>
                <li>
                  <NavLink to="/" style={({ isActive }) => ({
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: isActive ? '#2563eb' : (dark ? '#94a3b8' : '#64748b'),
                    borderBottom: isActive ? '2px solid #2563eb' : 'none',
                    paddingBottom: '24px'
                  })}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/post" style={({ isActive }) => ({
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: isActive ? '#2563eb' : (dark ? '#94a3b8' : '#64748b'),
                    borderBottom: isActive ? '2px solid #2563eb' : 'none',
                    paddingBottom: '24px'
                  })}>Discussions</NavLink>
                </li>
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                  onClick={handleTheme}
                  style={{
                    background: 'none',
                    border: dark ? '1px solid #334155' : '1px solid #e2e8f0',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: dark ? '#fbbf24' : '#64748b'
                  }}
                >
                  {dark ? '☀️' : '🌙'}
                </button>

                <button
                  onClick={accessToken ? handleLogout : loginClick}
                  style={{
                    backgroundColor: accessToken ? 'transparent' : '#2563eb',
                    color: accessToken ? (dark ? '#f8fafc' : '#1e293b') : '#ffffff',
                    border: accessToken ? `1px solid ${dark ? '#334155' : '#e2e8f0'}` : 'none',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {accessToken ? 'Log Out' : 'Sign In'}
                </button>
              </div>
            </div>
          )}
        </nav>
        <div style={{ height: '70px' }}></div>
      </header>
    </>
  )
}

export default React.memo(Navbar)