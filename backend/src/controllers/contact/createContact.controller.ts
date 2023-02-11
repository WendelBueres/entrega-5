import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import createContactService from "../../services/contacts/createContact.services";

const createContactController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { userId } = req.user;

    const contact = await createContactService(data, parseInt(userId));

    return res.status(201).json(contact).send();
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default createContactController;
