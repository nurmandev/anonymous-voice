import express from 'express';

import { CategoriesController } from './categories.controller';

const router = express.Router();

router.post(
  '/create-categories',
  // validateRequest(ClientOrderValidation.createOrderZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoriesController.createCategories
);

router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  CategoriesController.getSingleCategories
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  CategoriesController.getAllCategories)

router.patch(
  '/:id',
  // validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  CategoriesController.updateCategories
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  CategoriesController.deleteCategories
);

export const CategoriesRoutes = router;
