import { Request, Response } from "express";
import listUserService from "../../services/users/listUser.services";

const listUserController = async (req: Request, res: Response) => {
  const user = await listUserService();

  return res.status(201).json(user).send();
};

export default listUserController;
