import { GetAccessToken, RegisterUser, RefreshAccessToken, Logout } from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  registerUser: RegisterUser;
  refreshAccessToken: RefreshAccessToken;
  logout: Logout;
}
