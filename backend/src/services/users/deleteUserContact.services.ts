import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";

const prisma = new PrismaClient();

const deleteUserService = async (id: number) => {
  const userDeleted = await prisma.user.delete({ where: { id: id } });

  return userDeleted;
};

export default deleteUserService;
