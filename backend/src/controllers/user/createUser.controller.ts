import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import createUserService from "../../services/users/createUser.services";

const createUserController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await createUserService(data);

    return res.status(201).json(user).send();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res
          .status(400)
          .json({
            message: `Unique constraint failed on the ${e.meta?.target}`,
          })
          .send();
      }
    }
    if (e instanceof AppError) {
      throw e;
    }
  }
};

export default createUserController;
