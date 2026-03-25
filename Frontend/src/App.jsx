import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PostPage from "./routes/PostPage";
import Login from './routes/Login';
import Signup from './routes/Signup';
import Navbar from "./components/Navbar";
import Foot from "./components/Foot";
import ErrorPage from "./routes/ErrorPage";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./routes/Home";
import { setAuth, setLoading } from '../redux/authSlice';

function App() {
  const dispatch = useDispatch();
  const { accessToken, backendURL } = useSelector((state) => state.AUTH);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(`${backendURL}/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          if (accessToken) {
            toast.error("Session expired. Please login again.");
          }
          return;
        }

        const data = await res.json();

        if (data?.accessToken) {
          dispatch(setAuth({
            token: data.accessToken,
            username: data.username || localStorage.getItem('userName')
          }));
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    refresh();
  }, [dispatch, backendURL]);

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Foot />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

export default App
