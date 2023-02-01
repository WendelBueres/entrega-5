import { Router } from "express";
import createContactEmailController from "../controllers/createContactEmail.controller";
import deleteContactEmailController from "../controllers/deleteContactEmail.controller";
import updateContactEmailController from "../controllers/updateContactEmail.controller";

const contactEmailRoutes = Router();

contactEmailRoutes.post("", createContactEmailController);
contactEmailRoutes.patch("/:id", updateContactEmailController);
contactEmailRoutes.delete("/:id", deleteContactEmailController);

export default contactEmailRoutes;
