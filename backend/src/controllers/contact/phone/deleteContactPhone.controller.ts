import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../../errors";
import deleteContactPhoneService from "../../../services/contacts/phones/deleteContactPhone.services";

const deleteContactPhoneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    await deleteContactPhoneService(parseInt(id), parseInt(userId));

    return res.status(204).send();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new AppError(`Phone not found`, 404);
      }
    }
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default deleteContactPhoneController;
