import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";

const prisma = new PrismaClient();

const listUserService = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export default listUserService;
