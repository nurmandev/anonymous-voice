import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";

import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { userFilterableFields } from "./user.constant";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;

    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin created successfully!",
      data: result,
    });
  }
);
const createMentor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { mentor, ...userData } = req.body;

    const result = await UserService.createMentor(mentor, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Mentor created successfully!",
      data: result,
    });
  }
);
const isUsernameDuplicateController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userName } = req.body;

    const result = await UserService.isUsernameDuplicate(userName);

    sendResponse<string>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result ? "username is already in use" : "username is not in use",
      data: `${result}`,
    });
  }
);
const createMentee: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { mentee, ...userData } = req.body;

    const result = await UserService.createMentee(mentee, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Mentee created successfully!",
      data: result,
    });
  }
);

// const imageUpload: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {

//     const result = await UserService.imageUpload(req,res);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Image Uploaded Successfully!',
//       data: result,
//     });
//   }
// );

export const UserController = {
  createAdmin,
  createMentor,
  createMentee,
  isUsernameDuplicateController,
  // imageUpload
};
