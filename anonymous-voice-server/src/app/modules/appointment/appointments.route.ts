import express from "express";

import { AppointmentController } from "./appointments.controller";

const router = express.Router();

router.post("/create-appointment", AppointmentController.createAppointment);

router.get("/:id", AppointmentController.getSingleAppointment);

router.get("/", AppointmentController.getAllAppointments);

router.patch(
  "/:id",
  // validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  AppointmentController.updateAppointment
);

router.delete(
  "/:id",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AppointmentController.deleteAppointment
);

export const AppointmentRoutes = router;
