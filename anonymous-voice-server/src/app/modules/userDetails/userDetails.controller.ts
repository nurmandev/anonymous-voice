import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUserDetails } from './userDetails.interface';
import { UserDetailsService } from './userDetails.service';

const getSingleUserDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserDetailsService.getSingleUserDetails(id);

  sendResponse<IUserDetails>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully !',
    data: result,
  });
});

// const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, adminFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);

//   const result = await AdminService.getAllAdmins(filters, paginationOptions);

//   sendResponse<IAdmin[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admins fetched successfully !',
//     meta: result.meta,
//     data: result.data,
//   });
// });

const updateUserDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserDetailsService.updateUserDetails(id, updatedData);

  sendResponse<IUserDetails>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'UserDetails updated successfully !',
    data: result,
  });
});

// const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await AdminService.deleteAdmin(id);

//   sendResponse<IAdmin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin deleted successfully !',
//     data: result,
//   });
// });

export const UserDetailsController = {
  getSingleUserDetails,

  updateUserDetails,

};
