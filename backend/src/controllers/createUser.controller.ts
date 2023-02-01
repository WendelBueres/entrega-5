import { Request, Response } from "express";
import createUserService from "../services/createUser.services";

const createUserController = async (req: Request, res: Response) => {
  const data = req.body;
  const user = await createUserService(data);

  return res.status(201).json(user).send();
};

export default createUserController;
