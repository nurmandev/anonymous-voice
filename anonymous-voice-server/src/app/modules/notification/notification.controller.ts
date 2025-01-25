import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { messagingFilterableFields } from './messaging.constants';
import { INotification } from './notification.interfaces';
import { NotificationService } from './notification.service';

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const { ...notificationData } = req.body;
  const result = await NotificationService.createNotification(
    notificationData
  );
  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Message Posted successfully',
    data: result,
  });
});

const getSingleNotification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NotificationService.getSingleMessage(id);

  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification fetched successfully',
    data: result,
  });
});

const getAllNotification = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, messagingFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await NotificationService.getAllNotification(
    filters,
    paginationOptions
  );

  sendResponse<{result:INotification[], unSeenNotification:number}>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification fetched successfully',
    meta: result.meta,
    data: result.data,

  });
});


const updateNotificationSeenStatus = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    // const receiver = req.query.receiver as string;
console.log("reciver--->",id)
    const result = await NotificationService.updateNotificationSeenStatus(id);

    sendResponse<INotification>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification seen successfully',
      data: result,
    });
  })
);

// const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AcademicFacultyService.deleteByIdFromDB(id);

//   sendResponse<IAcademicFaculty>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic faculty deleted successfully',
//     data: result,
//   });
// });

export const NotificationController = {
  createNotification,
  getAllNotification,
  getSingleNotification,
 updateNotificationSeenStatus
};
