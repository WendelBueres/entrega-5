import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";
import { IContactRequest } from "../../interfaces/contact.interface";
import { IContactEmailRequest } from "../../interfaces/contactEmail.interface";
import { IContactPhoneRequest } from "../../interfaces/contactPhone.interface";

const prisma = new PrismaClient();

const createContactService = async (data: IContactRequest, userId: number) => {
  let fieldsRequireds = ["name", "userId"];
  const keys = Object.keys(data);

  for (var i = 0; i < fieldsRequireds.length; i++) {
    if (!keys.includes(fieldsRequireds[i])) {
      throw new AppError(`field ${fieldsRequireds[i]} is required`);
    }
  }

  const contact = await prisma.contact.create({
    data: {
      name: data.name,
      user: { connect: { id: userId } },
    },
  });

  if (data.email) {
    const regex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    let isEmail = regex.test(data.email);

    if (!isEmail) {
      throw new AppError("provide a valid email");
    }

    const email: IContactEmailRequest = await prisma.contactEmail.create({
      data: {
        email: data.email,
        contact: { connect: { id: contact.id } },
      },
    });
  }

  if (data.phone) {
    const regex =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

    let isPhone = regex.test(data.phone);

    if (!isPhone) {
      throw new AppError(
        "provide a valid phone, in format (XX) XXXX-XXXX or (XX) XXXXX-XXXX"
      );
    }

    const phone: IContactPhoneRequest = await prisma.contactPhone.create({
      data: {
        phone: data.phone,
        contact: { connect: { id: contact.id } },
      },
    });
  }

  const contactResponse = await prisma.contact.findUnique({
    where: {
      id: contact.id,
    },
    include: {
      ContactEmail: true,
      ContactPhone: true,
    },
  });

  return contactResponse;
};

export default createContactService;
