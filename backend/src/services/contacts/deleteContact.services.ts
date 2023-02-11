import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";
const prisma = new PrismaClient();

const deleteContactService = async (id: number, userId: number) => {
  const contactExists = await prisma.contact.findFirstOrThrow({
    where: { id: id, userId: userId },
  });

  if (!contactExists) {
    throw new AppError("contact not found", 404);
  }

  const contactDeleted = await prisma.contact.delete({
    where: { id: id },
  });

  return contactDeleted;
};

export default deleteContactService;
