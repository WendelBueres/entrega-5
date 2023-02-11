import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../../errors";
import updateContactPhoneService from "../../../services/contacts/phones/updateContactPhone.services";

const updateContactPhoneController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const { userId } = req.user;

    const contact = await updateContactPhoneService(
      data,
      parseInt(id),
      parseInt(userId)
    );

    return res.status(200).json(contact).send();
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

export default updateContactPhoneController;
