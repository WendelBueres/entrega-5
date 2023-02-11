import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../errors";
import createSessionServices from "../../services/sessions/createSession.services";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const session = await createSessionServices(data);

    return res.status(200).json(session).send();
  } catch (e) {
    console.log(e);
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

export default createSessionController;
