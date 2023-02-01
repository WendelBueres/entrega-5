import { Request, Response } from "express";
import updateContactPhoneService from "../services/updateContactPhone.services";

const updateContactPhoneController = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;

  const contact = await updateContactPhoneService(data, parseInt(id));

  return res.status(200).json(contact).send();
};

export default updateContactPhoneController;
