import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";
import { IContactEmailRequest } from "../../../interfaces/contactEmail.interface";

const prisma = new PrismaClient();

const updateContactEmailService = async (
  data: IContactEmailRequest,
  id: number,
  userId: number
) => {
  if (!data.email) {
    throw new AppError("field email is required");
  }

  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  let isEmail = regex.test(data.email);

  if (!isEmail) {
    throw new AppError("provide a valid email");
  }

  const email = await prisma.contactEmail.findUnique({ where: { id: id } });
  const contact = await prisma.contact.findFirstOrThrow({
    where: { id: email?.contactId, userId: userId },
  });

  if (!contact) {
    throw new AppError("contact email not found", 404);
  }

  const contactUpdated = await prisma.contactEmail.update({
    where: { id: id },
    data: {
      email: data.email,
    },
  });

  return contactUpdated;
};

export default updateContactEmailService;
