import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";
import { IContactPhoneRequest } from "../../../interfaces/contactPhone.interface";

const prisma = new PrismaClient();

const createContactPhoneService = async (data: IContactPhoneRequest) => {
  let fieldsRequireds = ["contactId", "phone"];
  const keys = Object.keys(data);

  for (var i = 0; i < fieldsRequireds.length; i++) {
    if (!keys.includes(fieldsRequireds[i])) {
      throw new AppError(`field ${fieldsRequireds[i]} is required`);
    }
  }

  const regex =
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

  let isPhone = regex.test(data.phone);

  if (!isPhone) {
    throw new AppError(
      "provide a valid phone, in format (XX) XXXX-XXXX or (XX) XXXXX-XXXX"
    );
  }

  const contact = await prisma.contactPhone.create({
    data: { phone: data.phone, contact: { connect: { id: data.contactId } } },
  });

  return contact;
};

export default createContactPhoneService;
