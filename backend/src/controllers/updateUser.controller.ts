import { Request, Response } from "express";
import updateUserService from "../services/updateUser.services";

const updateUserController = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;

  const contact = await updateUserService(data, parseInt(id));

  return res.status(201).json(contact).send();
};

export default updateUserController;
