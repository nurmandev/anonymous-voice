import express from "express";

import { AppointmentRoutes } from "../modules/appointment/appointments.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { FileUploadRoutes } from "../modules/fileUpload/fileUPload.route";
import { MentorRoutes } from "../modules/mentor/mentor.route";
import { MessagingRoutes } from "../modules/messaging/messaging.route";
import { UserRoutes } from "../modules/user/user.route";
import { UserDetailsRoutes } from "../modules/userDetails/userDetails.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/mentors",
    route: MentorRoutes,
  },
  {
    path: "/appointments",
    route: AppointmentRoutes,
  },
  {
    path: "/userDetails",
    route: UserDetailsRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/message",
    route: MessagingRoutes,
  },

  {
    path: "/blog-post",
    route: BlogRoutes,
  },
  {
    path: "/file-upload",
    route: FileUploadRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
