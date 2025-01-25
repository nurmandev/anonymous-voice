import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.post(
  '/create-notification',
  // validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  NotificationController.createNotification
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  NotificationController.getSingleNotification
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  NotificationController.getAllNotification
);

router.patch(
  '/:id',
  // validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  NotificationController.updateNotificationSeenStatus
);

;

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
//   AcademicFacultyController.deleteFaculty
// );

export const NotificationRoutes = router;
