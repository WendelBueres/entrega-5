import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";

const prisma = new PrismaClient();

const listDetailsUserService = async (id: number) => {
  const userExist = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      ContactEmail: true,
      ContactPhone: true,
    },
  });

  if (!userExist) {
    throw new AppError("User not found.");
  }

  return userExist;
};

export default listDetailsUserService;
