export interface CommentEdit {
  method: 'PUT';
  endpoint: `/comments/${number}`;
  req: {
    commentId: number;
  };
  res: {
    id: number;
    authorId: number;
    authorName: string;
    content: string;
    createdAt: string;
    parenId: number;
    children: string[];
  };
}

export interface CommentDelete {
  method: 'DELETE';
  endpoint: `/comments/${number}`;
  req: {
    commentId: number;
  };
  res: {
    success: boolean;
  };
}

interface CommentList {
  id: number;
  authorId: number;
  authorName: string;
  content: string;
  createdAt: string;
  parentId: number;
  children: string[];
}

export interface PostCommentList {
  method: 'GET';
  endpoint: `talent-posts/${number}/comments`;
  req: {
    postId: number;
  };
  res: {
    comments: CommentList[];
  };
}

export interface CommentCreate {
  method: 'POST';
  endpoint: `/talent-posts/${number}/comments`;
  req: {
    postId: number;
  };
  res: {
    id: number;
    authorId: number;
    authorName: string;
    content: string;
    createdAt: string;
    parentId: number;
    children: string[];
  };
}

export interface MyCommentList {
  method: 'GET';
  endpoint: '/comments/my';
  req: undefined;
  res: {
    comments: CommentList[];
  };
}
