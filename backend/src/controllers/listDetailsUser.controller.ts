import { Request, Response } from "express";
import listDetailsUserService from "../services/listDetailsUser.services";

const listDetailsUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await listDetailsUserService(parseInt(id));

  return res.status(201).json(user).send();
};

export default listDetailsUserController;
