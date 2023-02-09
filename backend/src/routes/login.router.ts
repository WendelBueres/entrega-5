import { Router } from "express";
import createSessionController from "../controllers/session/createSession.controller";

const loginRouter = Router();

loginRouter.post("", createSessionController);

export default loginRouter;
