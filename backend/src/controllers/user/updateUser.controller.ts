import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import updateUserService from "../../services/users/updateUser.services";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { userId } = req.user;

    const contact = await updateUserService(data, parseInt(userId));

    return res.status(200).json(contact).send();
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("correu 1");
      if (e.code === "P2025") {
        console.log("correu 1.1");
        throw new AppError(`User not found`, 404);
      }
      if (e.code === "P2002") {
        console.log("correu 1.2");
        throw new AppError(`Unique constraint failed on the ${e.meta?.target}`);
      }
    }
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default updateUserController;
