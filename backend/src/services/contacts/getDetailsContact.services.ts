import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";
import { IUserRequest } from "../../interfaces/user.interface";

const prisma = new PrismaClient();

const getDetailsContactService = async (id: number, idUser: number) => {
  const contactExists = await prisma.contact.findFirstOrThrow({
    where: { id: id, userId: idUser },
    include: { ContactEmail: true, ContactPhone: true },
  });

  if (!contactExists) {
    throw new AppError("contact not found", 404);
  }

  return contactExists;
};

export default getDetailsContactService;
