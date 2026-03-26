import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//  backendURL: "https://threew-assignment-lgvx.onrender.com",
// backendURL: "http://localhost:3000",  // for dev
const API_URL = "https://threew-assignment-lgvx.onrender.com/discussions";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };
};

// to fetch all postss 
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
});

// adding posts 
export const addPostAsync = createAsyncThunk('post/addPost', async (postData) => {
  const response = await axios.post(API_URL, postData, getAuthHeader());
  return response.data;
});

// deleting post 
export const deletePostAsync = createAsyncThunk('post/deletePost', async (postId) => {
  await axios.delete(`${API_URL}/${postId}`, getAuthHeader());
  return postId;
});

// updating post 
export const updatePostAsync = createAsyncThunk('post/updatePost', async ({ id, content }) => {
  const response = await axios.put(`${API_URL}/${id}`, { content }, getAuthHeader());
  return response.data;
});


// like post 
export const likePostAsync = createAsyncThunk(
  'post/likePost',
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/like`,
        {},
        getAuthHeader()
      );

      return {
        postId,
        likes: response.data.likes,
        dislikes: response.data.dislikes,
        userLiked: response.data.userLiked,  // it like and dislike of the logged user current one
        userDisliked: response.data.userDisliked
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// dislike post 
export const dislikePostAsync = createAsyncThunk(
  'post/dislikePost',
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/dislike`,
        {},
        getAuthHeader()
      );

      return {
        postId,
        likes: response.data.likes,
        dislikes: response.data.dislikes,
        userLiked: response.data.userLiked,  // same as above 
        userDisliked: response.data.userDisliked
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// add comment 
export const addCommentAsync = createAsyncThunk('post/addComment', async ({ postId, text }) => {
  const response = await axios.post(`${API_URL}/${postId}/comment`, { text }, getAuthHeader());
  return response.data.post;
});

// Slice 

const postSlice = createSlice({
  name: 'post',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    resetPostState: (state) => {  // unused
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post._id !== action.payload);
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        const post = state.items.find(p => p._id === action.payload.postId);
        if (post) {
          post.likes = action.payload.likes;
          post.dislikes = action.payload.dislikes;
          post.userLiked = action.payload.userLiked;
          post.userDisliked = action.payload.userDisliked;
        }
      })
      .addCase(dislikePostAsync.fulfilled, (state, action) => {
        const post = state.items.find(p => p._id === action.payload.postId);
        if (post) {
          post.likes = action.payload.likes;
          post.dislikes = action.payload.dislikes;
          post.userLiked = action.payload.userLiked;
          post.userDisliked = action.payload.userDisliked;
        }
      });
  },
});

export default postSlice.reducer;