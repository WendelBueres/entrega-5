import { Router } from "express";
import createContactEmailController from "../controllers/contact/emails/createContactEmail.controller";
import deleteContactEmailController from "../controllers/contact/emails/deleteContactEmail.controller";
import updateContactEmailController from "../controllers/contact/emails/updateContactEmail.controller";

const contactEmailRoutes = Router();

contactEmailRoutes.post("", createContactEmailController);
contactEmailRoutes.patch("/:id", updateContactEmailController);
contactEmailRoutes.delete("/:id", deleteContactEmailController);

export default contactEmailRoutes;
