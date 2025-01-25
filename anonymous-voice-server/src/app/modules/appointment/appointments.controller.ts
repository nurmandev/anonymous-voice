import { Request, Response } from "express";
import httpStatus from "http-status";

import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { appointmentFilterableFields } from "./appointments.constants";
import { IAppointment } from "./appointments.interfaces";
import { AppointmentService } from "./appointments.service";

const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const { ...appointmentData } = req.body;
  const result = await AppointmentService.createAppointment(appointmentData);
  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment Booked successfully",
    data: result,
  });
});

const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AppointmentService.getSingleAppointment(id);

  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment fetched successfully",
    data: result,
  });
});

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AppointmentService.getAllAppointments(
    filters,
    paginationOptions
  );

  sendResponse<IAppointment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Appointments fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateAppointment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await AppointmentService.updateAppointment(id, updatedData);

    sendResponse<IAppointment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order updated successfully",
      data: result,
    });
  })
);

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AppointmentService.deleteAppointmentFromDB(id);

  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty deleted successfully",
    data: result,
  });
});

export const AppointmentController = {
  createAppointment,
  getSingleAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
};
