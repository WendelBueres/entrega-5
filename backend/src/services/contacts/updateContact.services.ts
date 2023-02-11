import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";
import { IUserRequest } from "../../interfaces/user.interface";

const prisma = new PrismaClient();

const updateContactService = async (
  data: IUserRequest,
  id: number,
  idUser: number
) => {
  if (!data.name) {
    throw new AppError("field name is required");
  }

  const contactExists = await prisma.contact.findFirstOrThrow({
    where: { id: id, userId: idUser },
  });

  if (!contactExists) {
    throw new AppError("contact not found", 404);
  }

  const contact = await prisma.contact.update({
    where: { id: id },
    data: { name: data.name },
    include: { ContactEmail: true, ContactPhone: true },
  });

  return contact;
};

export default updateContactService;
