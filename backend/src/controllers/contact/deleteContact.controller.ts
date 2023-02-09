import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import deleteContactService from "../../services/contacts/deleteContact.services";

const deleteContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idContact = parseInt(id);

    await deleteContactService(idContact);

    return res.status(204).send();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new AppError(`Email not found`, 404);
      }
    }
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default deleteContactController;
