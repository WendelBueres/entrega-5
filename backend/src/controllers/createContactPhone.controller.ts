import { Request, Response } from "express";
import createContactPhoneService from "../services/createContactPhone.services";

const createContactPhoneController = async (req: Request, res: Response) => {
  const data = req.body;

  const contact = await createContactPhoneService(data);

  return res.status(201).json(contact).send();
};

export default createContactPhoneController;
