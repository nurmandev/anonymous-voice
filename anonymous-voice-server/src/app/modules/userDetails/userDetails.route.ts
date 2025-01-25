import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { UserDetailsController } from './userDetails.controller';

const router = express.Router();

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserDetailsController.getSingleUserDetails
);
// router.get(
//   '/',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   AdminController.getAllAdmins
// );

router.patch(
  '/:id',
  // validateRequest(AdminValidation.updateAdmin),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserDetailsController.updateUserDetails
);

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
//   AdminController.deleteAdmin
// );

export const UserDetailsRoutes = router;
