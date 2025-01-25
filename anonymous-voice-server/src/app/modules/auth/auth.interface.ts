import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
  userName: string;
  password: string;
};
export type IUserVerification = {
  email: string;
  isForgetPassword?: boolean;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IForgetPassword = {
  email: string;
  newPassword: string;
};
