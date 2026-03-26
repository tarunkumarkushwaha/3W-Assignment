import AddPost from '../components/AddPost';
import Post from "../components/Post";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/postSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const PostPage = () => {
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.AUTH);
  const { items, status, error } = useSelector((state) => state.POST);

  useEffect(() => {
    dispatch(fetchPosts());

  }, [dispatch]);

  return (
    <>
      <div
        className="side-entry"
        style={{
          background: dark
            ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
            : 'linear-gradient(to bottom, #f0fdf4, #dcfce7)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 10px',
          transition: 'background 0.3s ease'
        }}
      >
        <div style={{
          margin: '0 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '16px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '576px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <AddPost />

            {status === 'loading' && (
              <div style={{ padding: '20px 0' }}>
                <LoadingSpinner />
              </div>
            )}

            {status === 'failed' && (
              <p style={{
                textAlign: 'center',
                color: '#ef4444',
                marginTop: '16px',
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                Error loading posts: {error}
              </p>
            )}

            {status === 'succeeded' && items.map((item) => (
              <Post item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;