import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../../errors";
import createContactEmailService from "../../../services/contacts/emails/createContactEmail.services";

const createContactEmailController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { userId } = req.user;

    const contact = await createContactEmailService(data, parseInt(userId));
    return res.status(201).json(contact).send();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        res
          .status(404)
          .json({
            message: "not found contact for contactId",
          })
          .send();
      }
    }
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default createContactEmailController;
