import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";

const prisma = new PrismaClient();

const deleteContactService = async (id: number) => {
  const userDeleted = await prisma.contact.delete({ where: { id: id } });

  return userDeleted;
};

export default deleteContactService;
