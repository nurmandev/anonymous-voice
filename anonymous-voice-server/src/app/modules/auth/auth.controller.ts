import { Request, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import { sendEmail } from "../../../shared/mailNotification";
import sendResponse from "../../../shared/sendResponse";
import config, { ADMIN_EMAIL } from "../../../config";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  // const data ={
  //   from:ADMIN_EMAIL,
  //   to: "rfazlay21@gmail.com",
  //   subject: "User Login",
  //   text: `Hello ${loginData.email} has logged in`,
  // }
  // sendEmail(data)

  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: others,
  });
});
const emailVerification = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  console.log("HITTED IN EMAIL VALIDATOR CONTROLLER");

  const result = await AuthService.emailVerification(loginData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "email Verified successfully !",
    data: result,
  });
});
const jwtVerification = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log("HITTED IN JWT VALIDATOR CONTROLLER", token);

  const result = await AuthService.jwtVerification(token);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "email Verified successfully !",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully !",
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  // const user = req.user;
  const { ...passwordData } = req.body;

  await AuthService.forgetPassword(passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully !",
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  emailVerification,
  jwtVerification,
};
