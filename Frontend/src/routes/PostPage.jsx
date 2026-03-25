import AddPost from '../components/AddPost';
import Post from "../components/Post";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/postSlice'; 
import LoadingSpinner from '../components/LoadingSpinner';

const PostPage = () => {
  const dispatch = useDispatch();
  
  const { items, status, error } = useSelector((state) => state.POST);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <>
      <div className="bg-linear-to-b from-green-50 to-green-200 min-h-screen flex justify-center items-center p-10 flex-col">
        <div className='mx-2 flex items-center w-full gap-4 flex-col'>
          <div className='w-full max-w-xl xl:mx-0 mx-auto'>
            <AddPost />

            {status === 'loading' && (
              <LoadingSpinner/>
            )}

            {status === 'failed' && (
              <p className="text-center text-red-500 my-4">Error loading posts: {error}</p>
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