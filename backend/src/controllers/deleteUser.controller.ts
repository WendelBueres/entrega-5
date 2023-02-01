import { Request, Response } from "express";
import deleteUserService from "../services/deleteUser.services";

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteUserService(parseInt(id));

  return res.status(204).send();
};

export default deleteUserController;
