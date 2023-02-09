import { Router } from "express";
import createContactController from "../controllers/contact/createContact.controller";
import deleteContactController from "../controllers/contact/deleteContact.controller";
import updateContactController from "../controllers/contact/updateContact.controller";

const contactRouter = Router();

contactRouter.post("", createContactController);
contactRouter.patch("/:id", updateContactController);
contactRouter.delete("/:id", deleteContactController);

export default contactRouter;
