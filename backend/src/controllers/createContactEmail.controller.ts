import { Request, Response } from "express";
import createContactEmailService from "../services/createContactEmail.services";

const createContactEmailController = async (req: Request, res: Response) => {
  const data = req.body;

  const contact = await createContactEmailService(data);

  return res.status(201).json(contact).send();
};

export default createContactEmailController;
