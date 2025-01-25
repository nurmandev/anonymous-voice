
import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

import './auth.swagger';

const router = express.Router();


router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY,
  //   ENUM_USER_ROLE.STUDENT
  // ),
  AuthController.changePassword
);


router.post(
  '/forget-password',
  // validateRequest(AuthValidation.changePasswordZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY,
  //   ENUM_USER_ROLE.STUDENT
  // ),
  AuthController.forgetPassword
);

router.post(
  '/email-verification',
  // validateRequest(AuthValidation.loginZodSchema),
  AuthController.emailVerification
);
router.post(
  '/sign-up-jwt-verification',
  // validateRequest(AuthValidation.loginZodSchema),
  AuthController.jwtVerification
);

export const AuthRoutes = router;
