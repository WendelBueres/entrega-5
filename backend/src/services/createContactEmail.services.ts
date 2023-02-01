import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";
import { IContactEmailRequest } from "../interfaces/contactEmail.interface";

const prisma = new PrismaClient();

const createContactEmailService = async (data: IContactEmailRequest) => {
  let fieldsRequireds: string[] = [];

  if (data.id) {
    throw new AppError("id is not definable");
  }

  if (!data.userId) {
    fieldsRequireds.push("userId");
  }

  if (!data.email) {
    fieldsRequireds.push("email");
  }

  if (fieldsRequireds.length > 0) {
    if (fieldsRequireds.length > 1) {
      throw new AppError(
        `Fields ${fieldsRequireds[0]} and ${fieldsRequireds[1]} is required`
      );
    }
    throw new AppError(`Field ${fieldsRequireds[0]} is required`);
  }

  const user = await prisma.user.findUnique({ where: { id: data.userId } });

  if (!user) {
    throw new AppError("User not found");
  }

  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  let isEmail = regex.test(data.email);

  if (!isEmail) {
    throw new AppError("provide a valid email");
  }

  const emailExists = await prisma.contactEmail.findUnique({
    where: { email: data.email },
  });

  if (emailExists) {
    throw new AppError("email is already registered");
  }

  const contact = await prisma.contactEmail.create({ data: data });

  return contact;
};

export default createContactEmailService;
