import {
  IChangePassword,
  IForgetPassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUserVerification,
} from "./auth.interface";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";

import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { sendEmail } from "../../../shared/mailNotification";
import config, { ADMIN_EMAIL, NEXT_CLIENT_URL } from "../../../config";
import { User } from "../user/user.model";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { userName, password } = payload;

  const isUserExist = await User.isUserExist(userName);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const user = await new User();

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const { role, needsPasswordChange, userDetails, isVerified } = isUserExist;

  const id = user?._id;

  const accessToken = jwtHelpers.createToken(
    { userName, role, userDetails: id, isVerified },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userDetails, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
const emailVerification = async (payload: IUserVerification): Promise<any> => {
  const { email, isForgetPassword } = payload;
  // console.log('id', id, 'password', password);
  // creating instance of User
  const user = new User();
  //  // access to our instance methods
  // const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(email);
  // const isUserExist= {id:'220100001',password:'fre8992',needsPasswordChange:false,role: 'student'}
  if (isForgetPassword || !!isUserExist) {
    const data = {
      from: ADMIN_EMAIL,
      to: email,
      subject: "Reset Password",
      text: `Hi ${email} you have requested to reset your password. Please click on the link below to reset your password. ${NEXT_CLIENT_URL}/reset-password/${email}`,
    };

    sendEmail(data);
  }
  return {
    isUserExist: isUserExist ? true : false,
  };
};
const jwtVerification = async (payload: string): Promise<any> => {
  const token = payload;

  let verifiedToken = null;
  // const verify = jwt.verify(token, config.jwt.secret as Secret);
  // console.log("verify",verify)
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    if (verifiedToken?.exp > Date.now() / 1000) {
      // Perform email verification logic here
      await User.findOneAndUpdate(
        { email: verifiedToken?.email },
        { isVerified: true },
        {
          new: true,
        }
      );
    } else {
      console.log("Token has expired");
    }
  } catch (err) {
    throw new ApiError(
      httpStatus.OK,
      err?.message === "jwt expired" ? "Token Expired" : "Invalid Token"
    );
  }

  return {
    token: verifiedToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    if (verifiedToken?.exp > Date.now() / 1000) {
      // Perform email verification logic here
      console.log("Verification successful:", verifiedToken);
    } else {
      console.log("Token has expired");
    }
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      //@ts-ignore
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await User.findOne({ id: user?.email }).select(
    "+password"
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

const forgetPassword = async (payload: IForgetPassword): Promise<void> => {
  const { email, newPassword } = payload;

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await User.findOne({ email: email }).select("+password");

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking old password
  // if (
  //   isUserExist.password &&
  //   !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  // ) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  // }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  emailVerification,
  jwtVerification,
};
