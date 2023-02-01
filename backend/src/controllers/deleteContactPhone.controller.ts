import { Request, Response } from "express";
import deleteContactPhoneService from "../services/deleteContactPhone.services";

const deleteContactPhoneController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idContact = parseInt(id);

  await deleteContactPhoneService(idContact);

  return res.status(204).send();
};

export default deleteContactPhoneController;
