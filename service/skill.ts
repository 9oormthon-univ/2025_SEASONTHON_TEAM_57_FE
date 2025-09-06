'use server';

import { api } from './api';
import { SkillCreate } from './interfaces';

export const GetSkillPost = async (postId: number) => {
  try {
    const res = await api<'skillPost'>(
      'GET',
      `/talent-posts/${postId}`,
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

export const PUTSkillEdit = async (postId: number) => {
  try {
    const res = await api<'skillEdit'>(
      'PUT',
      `/talent-posts/${postId}`,
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

export const DeleteSkillPost = async (postId: number) => {
  try {
    const res = await api<'skillDelete'>(
      'DELETE',
      `/talent-posts/${postId}`,
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

export const CreateSkillPost = async (param: SkillCreate['req']) => {
  try {
    const res = await api<'skillCreate'>(
      'POST',
      '/talent-posts',
      {
        type: param.type,
        title: param.title,
        content: param.content,
        learnCategoryIds: param.learnCategoryIds,
        teachCategoryIds: param.teachCategoryIds,
        price: param.price,
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

export const GETSkillRecommend = async () => {
  try {
    const res = await api<'skillRecommend'>('GET', '/talent-posts/recommended', undefined, {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const GETMySkillPosts = async () => {
  try {
    const res = await api<'mySkillPosts'>('GET', '/talent-posts/my', undefined, {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const GETHotSkillPosts = async () => {
  try {
    const res = await api<'hotSkillPosts'>('GET', '/talent-posts/hot', undefined, {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const GETSkillCategoryPosts = async (categoryId: number) => {
  try {
    const res = await api<'skillCategoryPosts'>(
      'GET',
      `/talent-posts/category/${categoryId}`,
      undefined,
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

export const GETAllSkillCategoryPosts = async () => {
  try {
    const res = await api<'allSkillCategoryPosts'>('GET', '/talent-posts/all', undefined, {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
    });
    return res;
  } catch (error) {
    throw error;
  }
};
