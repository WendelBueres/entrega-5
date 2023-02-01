import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";
import { IContactPhoneRequest } from "../interfaces/contactPhone.interface";

const prisma = new PrismaClient();

const createContactPhoneService = async (data: IContactPhoneRequest) => {
  let fieldsRequireds: string[] = [];

  if (data.id) {
    throw new AppError("id is not definable");
  }

  if (!data.userId) {
    fieldsRequireds.push("userId");
  }

  if (!data.phone) {
    fieldsRequireds.push("phone");
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
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

  let isPhone = regex.test(data.phone);

  if (!isPhone) {
    throw new AppError(
      "provide a valid phone, in format (XX) XXXX-XXXX or (XX) XXXXX-XXXX"
    );
  }

  const phoneExists = await prisma.contactPhone.findUnique({
    where: { phone: data.phone },
  });

  if (phoneExists) {
    throw new AppError("phone is already registered");
  }

  const contact = await prisma.contactPhone.create({ data: data });

  return contact;
};

export default createContactPhoneService;
