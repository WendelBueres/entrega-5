import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import listDetailsUserService from "../../services/users/listDetailsUser.services";

const listDetailsUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const user = await listDetailsUserService(parseInt(userId));
    const token = req.headers.authorization?.slice(7);

    return res.status(200).json(user).send();
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

export default listDetailsUserController;
