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
  GetCertificating,
  GetMemberCertificating,
  GetMyCertificatingByChallenge,
  GetMyCertificatingByDate,
  GetParticipatingMember,
  PostChallenge,
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
  getCertificating: GetCertificating;
  getMemberCertificating: GetMemberCertificating;
  getMyCertificatingByChallenge: GetMyCertificatingByChallenge;
  getMyCertificatingByDate: GetMyCertificatingByDate;
  getParticipatingMember: GetParticipatingMember;
  postChallenge: PostChallenge;
}
