import express from 'express';

import { FileUploadController } from './fileUpload.controller';
const path = require('path');

const router = express.Router();


router.post(
  '/',
  // validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
   FileUploadController.imageUpload
);

export const FileUploadRoutes = router;
