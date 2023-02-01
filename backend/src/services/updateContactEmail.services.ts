import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";
import { IContactEmailRequest } from "../interfaces/contactEmail.interface";

const prisma = new PrismaClient();

const updateContactEmailService = async (
  data: IContactEmailRequest,
  id: number
) => {
  if (data.id) {
    throw new AppError("id is not changeable");
  }

  if (data.userId) {
    throw new AppError("UserId is not changeable");
  }

  const email = await prisma.contactEmail.findUnique({
    where: { id: id },
  });

  if (!email) {
    throw new AppError("Contact not found");
  }

  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  let isEmail = regex.test(data.email);

  if (!isEmail) {
    throw new AppError("provide a valid email");
  }

  const EmailExists = await prisma.contactEmail.findUnique({
    where: { email: data.email },
  });

  if (EmailExists) {
    throw new AppError("Email is already registered");
  }

  const contact = await prisma.contactEmail.update({
    where: { id: id },
    data: data,
  });

  return contact;
};

export default updateContactEmailService;
