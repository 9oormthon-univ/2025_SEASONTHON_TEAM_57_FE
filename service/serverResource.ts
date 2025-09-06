import {
  GetAccessToken,
  RegisterUser,
  RefreshAccessToken,
  Logout,
  GetApprovedChallenges,
  GetMyChallenges,
  GetPopularChallenges,
  GetChallenges,
  GetChallengeDetail,
  GetApprovedAllChallenges,
  GetParticipatingChallenges,
} from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  registerUser: RegisterUser;
  refreshAccessToken: RefreshAccessToken;
  logout: Logout;
  getApprovedChallenges: GetApprovedChallenges;
  getMyChallenges: GetMyChallenges;
  getPopularChallenges: GetPopularChallenges;
  getChallenges: GetChallenges;
  getChallengeDetail: GetChallengeDetail;
  getApprovedAllChallenges: GetApprovedAllChallenges;
  getParticipatingChallenges: GetParticipatingChallenges;
}
