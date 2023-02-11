import { Router } from "express";
import createContactPhoneController from "../controllers/contact/phone/createContactPhone.controller";
import deleteContactPhoneController from "../controllers/contact/phone/deleteContactPhone.controller";
import updateContactPhoneController from "../controllers/contact/phone/updateContactPhone.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";

const contactPhoneRoutes = Router();

contactPhoneRoutes.post("", hasAuthMiddleware, createContactPhoneController);
contactPhoneRoutes.patch(
  "/:id",
  hasAuthMiddleware,
  updateContactPhoneController
);
contactPhoneRoutes.delete(
  "/:id",
  hasAuthMiddleware,
  deleteContactPhoneController
);

export default contactPhoneRoutes;
