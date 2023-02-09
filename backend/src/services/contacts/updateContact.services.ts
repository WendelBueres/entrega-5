import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";
import { IUserRequest } from "../../interfaces/user.interface";

const prisma = new PrismaClient();

const updateContactService = async (data: IUserRequest, id: number) => {
  const contact = await prisma.contact.update({
    where: { id: id },
    data: data,
  });

  return contact;
};

export default updateContactService;
