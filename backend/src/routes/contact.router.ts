import { Router } from "express";
import createContactController from "../controllers/contact/createContact.controller";
import updateContactController from "../controllers/contact/updateContact.controller";
import deleteContactController from "../controllers/contact/deleteContact.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";
import getDetailsContactController from "../controllers/contact/getDetailsContact.controller";

const contactRouter = Router();

contactRouter.post("", hasAuthMiddleware, createContactController);
contactRouter.get("/:id", hasAuthMiddleware, getDetailsContactController);
contactRouter.patch("/:id", hasAuthMiddleware, updateContactController);
contactRouter.delete("/:id", hasAuthMiddleware, deleteContactController);

export default contactRouter;
