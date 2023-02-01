import { Request, Response } from "express";
import deleteContactEmailService from "../services/deleteContactEmail.services";

const deleteContactEmailController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idContact = parseInt(id);

  await deleteContactEmailService(idContact);

  return res.status(204).send();
};

export default deleteContactEmailController;
