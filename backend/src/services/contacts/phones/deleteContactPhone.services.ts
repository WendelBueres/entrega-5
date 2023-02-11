import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";

const prisma = new PrismaClient();

const deleteContactPhoneService = async (id: number, userId: number) => {
  const phone = await prisma.contactPhone.findUnique({ where: { id: id } });
  const contact = await prisma.contact.findFirstOrThrow({
    where: { id: phone?.contactId, userId: userId },
  });

  if (!contact) {
    throw new AppError("contact email not found", 404);
  }

  return await prisma.contactPhone.delete({ where: { id: id } });
};

export default deleteContactPhoneService;
