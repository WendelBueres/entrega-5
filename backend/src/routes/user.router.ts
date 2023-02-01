import { Router } from "express";
import createUserController from "../controllers/createUser.controller";
import deleteUserController from "../controllers/deleteUser.controller";
import listDetailsUserController from "../controllers/listDetailsUser.controller";
import listUserController from "../controllers/listUser.controller";
import updateUserController from "../controllers/updateUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUserController);
userRoutes.get("/:id", listDetailsUserController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
