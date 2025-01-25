import { Request, Response } from "express";
import httpStatus from "http-status";

import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { mentorFilterableFields } from "./mentor.constant";
import { IMentor, IMentorSchedule } from "./mentor.interface";
import { MentorService } from "./mentor.service";

const getSingleMentor = catchAsync(async (req: Request, res: Response) => {
  const userName = req.params.userName;
  const result = await MentorService.getSingleMentor(userName);

  sendResponse<IMentor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor fetched successfully !",
    data: result,
  });
});

const getAllMentors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, mentorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await MentorService.getAllMentors(filters, paginationOptions);

  sendResponse<IMentor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentors fetched successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const updateMentor = catchAsync(async (req: Request, res: Response) => {
  const userName = req.params.userName;
  const updatedData = req.body;

  const result = await MentorService.updateMentor(userName, updatedData);

  sendResponse<IMentor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor updated successfully !",
    data: result,
  });
});
const updateMentorSchedule = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const updatedData = req.body;
  const result = await MentorService.updateMentorSchedule(updatedData);

  sendResponse<IMentorSchedule>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "MentorSchedule updated successfully !",
    data: result,
  });
});
const deleteMentor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MentorService.deleteMentor(id);

  sendResponse<IMentor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor deleted successfully !",
    data: result,
  });
});

export const MentorController = {
  getSingleMentor,
  getAllMentors,
  updateMentor,
  updateMentorSchedule,
  deleteMentor,
};
