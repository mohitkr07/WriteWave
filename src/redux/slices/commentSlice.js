/* eslint-disable no-unused-vars */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async postId => {
    console.log(BASE_URL);
    const token = await getToken();
    const response = await fetch(`${BASE_URL}api/user/comments/${postId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
);

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({postId, comment}) => {
    const token = await getToken();
    const response = await fetch(`${BASE_URL}api/user/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({content: comment}),
    });
    const data = await response.json();
    return data;
  },
);

export const addReply = createAsyncThunk(
  'comment/createComment',
  async ({postId, comment, commentId}) => {
    const token = await getToken();
    const response = await fetch(`${BASE_URL}api/user/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({content: comment, commentId}),
    });
    const data = await response.json();
    return data;
  },
);

export const getReplies = createAsyncThunk(
  'comment/getReplies',
  async commentId => {
    const token = await getToken();
    const response = await fetch(`${BASE_URL}api/user/replies/${commentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
);

export const likeComment = createAsyncThunk(
  'comment/likeComment',
  async commentId => {
    const token = await getToken();
    const response = await fetch(
      `${BASE_URL}api/user/likeComment/${commentId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    replies: [],
    postId: null,
    reply: {
      replyMode: false,
      replyTo: null,
    },
    showComment: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleComment: (state, action) => {
      state.showComment = action.payload;
    },
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setReplyMode: (state, action) => {
      state.reply.replyMode = action.payload;
    },
    setReplyTo: (state, action) => {
      state.reply.replyTo = action.payload;
    },
    setRepliesVacant: (state, action) => {
      state.replies = [];
    },
    likeReplyLocally: (state, action) => {
      const {commentId, replyId, userId} = action.payload;
      const reply = state.replies.find(
        reply => reply.commentId === commentId,
      ).replies;
      const index = reply.findIndex(reply => reply._id === replyId);
      const test = reply[index].likes.some(like => like.user === userId);
      if (test) {
        reply[index].likes = reply[index].likes.filter(
          like => like.user !== userId,
        );
      } else {
        reply[index].likes.push({user: userId});
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload.comments;
        state.postId = action.payload.postId;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createComment.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.comments = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getReplies.pending, (state, action) => {})
      .addCase(getReplies.fulfilled, (state, action) => {
        // storing fetched replies

        const bool = state.replies.some(
          reply => reply.commentId === action.payload.comment._id,
        );
        if (bool) {
          const index = state.replies.findIndex(
            reply => reply.commentId === action.payload.comment._id,
          );
          state.replies[index].replies = action.payload.comment.replies;
        } else {
          state.replies = [
            ...state.replies,
            {
              commentId: action.payload.comment._id,
              replies: action.payload.comment.replies,
            },
          ];
        }
      })
      .addCase(getReplies.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(likeComment.pending, (state, action) => {})
      .addCase(likeComment.fulfilled, (state, action) => {
        // state.comments = action.payload;
      })
      .addCase(likeComment.rejected, (state, action) => {});
  },
});

export default commentSlice.reducer;
export const {
  toggleComment,
  setReplyMode,
  setReplyTo,
  setRepliesVacant,
  likeReplyLocally,
} = commentSlice.actions;
