import { Router } from "express";
import createUserController from "../controllers/user/createUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";
import listDetailsUserController from "../controllers/user/listDetailsUser.controller";
import listUserController from "../controllers/user/listUser.controller";
import updateUserController from "../controllers/user/updateUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUserController);
userRoutes.get("/:id", listDetailsUserController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
