import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";

const prisma = new PrismaClient();

const deleteContactPhoneService = async (id: number) => {
  const contact = await prisma.contactPhone.findUnique({
    where: {
      id: id,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found.");
  }

  return await prisma.contactPhone.delete({ where: { id: id } });
};

export default deleteContactPhoneService;
