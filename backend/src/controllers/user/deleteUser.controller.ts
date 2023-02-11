import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import deleteUserService from "../../services/users/deleteUserContact.services";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;

    await deleteUserService(parseInt(userId));

    return res.status(204).send();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new AppError(`User not found`, 404);
      }
    }
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default deleteUserController;
