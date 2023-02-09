import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import updateContactService from "../../services/contacts/updateContact.services";

const updateContactController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const contact = await updateContactService(data, parseInt(id));

    return res.status(200).json(contact).send();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new AppError(`Email not found`, 404);
      }
      if (e.code === "P2002") {
        throw new AppError(`Unique constraint failed on the ${e.meta?.target}`);
      }
    }
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default updateContactController;
