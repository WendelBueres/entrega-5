import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../../errors";
import createContactPhoneService from "../../../services/contacts/phones/createContactPhone.services";

const createContactPhoneController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { userId } = req.user;

    const contact = await createContactPhoneService(data, parseInt(userId));

    return res.status(201).json(contact).send();
  } catch (e) {
    console.log(e);
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

export default createContactPhoneController;
