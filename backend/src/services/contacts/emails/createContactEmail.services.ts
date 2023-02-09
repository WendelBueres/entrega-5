import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";
import { IContactEmailRequest } from "../../../interfaces/contactEmail.interface";

const prisma = new PrismaClient();

const createContactEmailService = async (data: IContactEmailRequest) => {
  let fieldsRequireds = ["contactId", "email"];
  const keys = Object.keys(data);

  for (var i = 0; i < fieldsRequireds.length; i++) {
    if (!keys.includes(fieldsRequireds[i])) {
      throw new AppError(`field ${fieldsRequireds[i]} is required`);
    }
  }

  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  let isEmail = regex.test(data.email);

  if (!isEmail) {
    throw new AppError("provide a valid email");
  }

  const contact = await prisma.contactEmail.create({
    data: {
      email: data.email,
      contact: { connect: { id: data.contactId } },
    },
  });

  return contact;
};

export default createContactEmailService;
