import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './fileUpload.interface';
import { FileUploadService } from './fileUpload.service';

;

const imageUpload: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
 
    const result = await FileUploadService.imageUpload(req,res);
console.log("result--->",result)
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Image Uploaded Successfully!',
      data: result,
    });
  }
);

export const FileUploadController = {

  imageUpload
};
