import { Router } from "express";
import createContactPhoneController from "../controllers/createContactPhone.controller";
import deleteContactPhoneController from "../controllers/deleteContactPhone.controller";
import updateContactPhoneController from "../controllers/updateContactPhone.controller";

const contactPhoneRoutes = Router();

contactPhoneRoutes.post("", createContactPhoneController);
contactPhoneRoutes.patch("/:id", updateContactPhoneController);
contactPhoneRoutes.delete("/:id", deleteContactPhoneController);

export default contactPhoneRoutes;
