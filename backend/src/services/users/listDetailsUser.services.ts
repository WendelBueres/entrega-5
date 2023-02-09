import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";
import { IUserResponse } from "../../interfaces/userResponse.interface";

const prisma = new PrismaClient();

const listDetailsUserService = async (id: number) => {
  const user: IUserResponse | null = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      contacts: true,
    },
  });

  delete user?.password;

  return user;
};

export default listDetailsUserService;
