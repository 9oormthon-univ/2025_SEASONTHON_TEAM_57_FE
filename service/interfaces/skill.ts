import { SkillType } from '@/constants/types';

export interface SkillPost {
  method: 'GET';
  endpoint: `/talent-posts/${number}`;
  req: {
    postId: number;
  };
  res: {
    id: number;
    authorId: number;
    authorName: string;
    type: SkillType;
    title: string;
    content: string;
    createdAt: string;
    status: 'open' | 'close';
    commentCount: number;
    categories: {
      id: number;
      name: string;
      type: SkillType;
    }[];
  };
}

export interface SkillEdit {
  method: 'PUT';
  endpoint: `/talent-posts/${number}`;
  req: {
    postId: number;
  };
  res: {
    type: SkillType;
    title: string;
    content: string;
    status: 'open' | 'close';
    learnCategoryIds: number[];
    teachCategoryIds: number[];
  };
}

export interface SkillDelete {
  method: 'DELETE';
  endpoint: `/talent-posts/${number}`;
  req: {
    postId: number;
  };
  res: {
    success: boolean;
  };
}

export interface SkillCreate {
  method: 'POST';
  endpoint: '/talent-posts';
  req: {
    type: SkillType;
    title: string;
    content: string;
    learnCategoryIds: number[];
    teachCategoryIds: number[];
  };
  res: {
    id: number;
    authorId: number;
    authorName: string;
    type: SkillType;
    title: string;
    content: string;
    createdAt: string;
    status: 'open' | 'close';
    commentCount: number;
    categories: {
      id: number;
      name: string;
      type: SkillType;
    }[];
  };
}

interface SkillPostData {
  id: number;
  authorName: string;
  type: SkillType;
  title: string;
  createdAt: string;
  status: 'open' | 'close';
  commentCount: number;
  categoryNames: string[];
}

export interface SkillRecommend {
  method: 'GET';
  endpoint: '/talent-posts/recommended';
  req: undefined;
  res: SkillPostData[];
}

export interface MySkillPosts {
  method: 'GET';
  endpoint: '/talent-posts/my';
  req: undefined;
  res: SkillPostData[];
}

export interface HotSkillPosts {
  method: 'GET';
  endpoint: '/talent-posts/hot';
  req: undefined;
  res: SkillPostData[];
}

export interface SkillCategoryPosts {
  method: 'GET';
  endpoint: `/talent-posts/category/${number}`;
  req: {
    categoryId: number;
  };
  res: SkillPostData[];
}
