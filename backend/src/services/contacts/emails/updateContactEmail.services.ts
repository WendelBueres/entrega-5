import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";
import { IContactEmailRequest } from "../../../interfaces/contactEmail.interface";

const prisma = new PrismaClient();

const updateContactEmailService = async (
  data: IContactEmailRequest,
  id: number
) => {
  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  let isEmail = regex.test(data.email);

  if (!isEmail) {
    throw new AppError("provide a valid email");
  }

  const contact = await prisma.contactEmail.update({
    where: { id: id },
    data: {
      email: data.email,
    },
  });

  return contact;
};

export default updateContactEmailService;
