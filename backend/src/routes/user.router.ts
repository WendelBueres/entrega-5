import { Router } from "express";
import createUserController from "../controllers/user/createUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";
import listDetailsUserController from "../controllers/user/listDetailsUser.controller";
import updateUserController from "../controllers/user/updateUser.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", hasAuthMiddleware, listDetailsUserController);
userRoutes.patch("", hasAuthMiddleware, updateUserController);
userRoutes.delete("", hasAuthMiddleware, deleteUserController);

export default userRoutes;
