import { Request, Response } from "express";
import updateContactEmailService from "../services/updateContactEmail.services";

const updateContactEmailController = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;

  const contact = await updateContactEmailService(data, parseInt(id));

  return res.status(201).json(contact).send();
};

export default updateContactEmailController;
