import { Router } from "express";
import createContactEmailController from "../controllers/contact/emails/createContactEmail.controller";
import deleteContactEmailController from "../controllers/contact/emails/deleteContactEmail.controller";
import updateContactEmailController from "../controllers/contact/emails/updateContactEmail.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";

const contactEmailRoutes = Router();

contactEmailRoutes.post("", hasAuthMiddleware, createContactEmailController);
contactEmailRoutes.patch(
  "/:id",
  hasAuthMiddleware,
  updateContactEmailController
);
contactEmailRoutes.delete(
  "/:id",
  hasAuthMiddleware,
  deleteContactEmailController
);

export default contactEmailRoutes;
