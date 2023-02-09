import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors";
import { IContactRequest } from "../../interfaces/contact.interface";
import { IContactEmailRequest } from "../../interfaces/contactEmail.interface";
import { IContactPhoneRequest } from "../../interfaces/contactPhone.interface";

const prisma = new PrismaClient();

const createContactService = async (data: IContactRequest) => {
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
      user: { connect: { id: data.userId } },
    },
  });

  if (data.email) {
    const email: IContactEmailRequest = await prisma.contactEmail.create({
      data: {
        email: data.email,
        contact: { connect: { id: contact.id } },
      },
    });
  }

  if (data.phone) {
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
