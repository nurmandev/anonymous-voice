import express from "express";

import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { MessagingController } from "./messaging.controller";

const router = express.Router();

router.post(
  "/create-message",

  MessagingController.createMessage
);

router.get(
  "/:id",

  MessagingController.getSingleMessage
);

router.get(
  "/",

  MessagingController.getAllMessages
);

router.patch(
  "/:id",

  MessagingController.updateMessageSeenStatus
);

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
//   AcademicFacultyController.deleteFaculty
// );

export const MessagingRoutes = router;
