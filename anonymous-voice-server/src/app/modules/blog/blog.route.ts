import express from 'express';

import { BlogController } from './blog.controller';

const router = express.Router();

router.post(
  '/create-blog',
  // validateRequest(ClientOrderValidation.createOrderZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.createBlog
);

router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  BlogController.getSingleBlog
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  BlogController.getAllBlogs)

router.patch(
  '/:id',
  // validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  BlogController.updateBlog
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.deleteBlog
);

export const BlogRoutes = router;
