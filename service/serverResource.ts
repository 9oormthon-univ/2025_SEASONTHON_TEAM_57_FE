import {
  GetAccessToken,
  RegisterUser,
  RefreshAccessToken,
  Logout,
  SkillPost,
  SkillCategoryPosts,
  SkillCreate,
  SkillDelete,
  SkillEdit,
  SkillRecommend,
  MySkillPosts,
  HotSkillPosts,
  CommentCreate,
  CommentDelete,
  CommentEdit,
  MyCommentList,
  PostCommentList,
} from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  registerUser: RegisterUser;
  refreshAccessToken: RefreshAccessToken;
  logout: Logout;
  skillPost: SkillPost;
  skillCategoryPosts: SkillCategoryPosts;
  skillCreate: SkillCreate;
  skillDelete: SkillDelete;
  skillEdit: SkillEdit;
  skillRecommend: SkillRecommend;
  mySkillPosts: MySkillPosts;
  hotSkillPosts: HotSkillPosts;
  commentCreate: CommentCreate;
  commentDelete: CommentDelete;
  commentEdit: CommentEdit;
  myCommentList: MyCommentList;
  postCommentList: PostCommentList;
}
