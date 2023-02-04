import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";

const prisma = new PrismaClient();

const deleteContactEmailService = async (id: number) => {
  const contact = await prisma.contactEmail.findUnique({
    where: {
      id: id,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found.");
  }

  return await prisma.contactEmail.delete({ where: { id: id } });
};

export default deleteContactEmailService;
