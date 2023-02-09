import { Router } from "express";
import createContactPhoneController from "../controllers/contact/phone/createContactPhone.controller";
import deleteContactPhoneController from "../controllers/contact/phone/deleteContactPhone.controller";
import updateContactPhoneController from "../controllers/contact/phone/updateContactPhone.controller";

const contactPhoneRoutes = Router();

contactPhoneRoutes.post("", createContactPhoneController);
contactPhoneRoutes.patch("/:id", updateContactPhoneController);
contactPhoneRoutes.delete("/:id", deleteContactPhoneController);

export default contactPhoneRoutes;
