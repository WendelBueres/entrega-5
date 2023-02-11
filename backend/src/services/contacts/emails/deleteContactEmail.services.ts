import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";

const prisma = new PrismaClient();

const deleteContactEmailService = async (id: number, userId: number) => {
  const email = await prisma.contactEmail.findUnique({ where: { id: id } });
  const contact = await prisma.contact.findFirstOrThrow({
    where: { id: email?.contactId, userId: userId },
  });

  if (!contact) {
    throw new AppError("contact email not found", 404);
  }

  return await prisma.contactEmail.delete({ where: { id: id } });
};

export default deleteContactEmailService;
