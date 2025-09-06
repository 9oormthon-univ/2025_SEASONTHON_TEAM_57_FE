'use server';

import { api } from './api';

export const PUTCommentEdit = async (commentId: number) => {
  try {
    const res = await api<'commentEdit'>(
      'PUT',
      `/comments/${commentId}`,
      {
        commentId: commentId,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const DELETEComment = async (commentId: number) => {
  try {
    const res = await api<'commentDelete'>(
      'DELETE',
      `/comments/${commentId}`,
      {
        commentId: commentId,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const GETPostCommentList = async (postId: number) => {
  try {
    const res = await api<'postCommentList'>(
      'GET',
      `talent-posts/${postId}/comments`,
      {
        postId: postId,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const POSTCommentCreate = async (postId: number) => {
  try {
    const res = await api<'commentCreate'>(
      'POST',
      `/talent-posts/${postId}/comments`,
      {
        postId: postId,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const GETMyCommentList = async () => {
  try {
    const res = await api<'myCommentList'>('GET', '/comments/my', undefined, {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
    });
    return res;
  } catch (error) {
    throw error;
  }
};
