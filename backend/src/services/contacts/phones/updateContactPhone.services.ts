import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";
import { IContactPhoneRequest } from "../../../interfaces/contactPhone.interface";

const prisma = new PrismaClient();

const updateContactPhoneService = async (
  data: IContactPhoneRequest,
  id: number,
  userId: number
) => {
  if (!data.phone) {
    throw new AppError("field phone is required");
  }

  const regex =
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

  let isPhone = regex.test(data.phone);

  if (!isPhone) {
    throw new AppError(
      "Provide a valid phone, in format (XX) XXXX-XXXX or (XX) XXXXX-XXXX"
    );
  }

  const phone = await prisma.contactPhone.findUnique({ where: { id: id } });
  const contact = await prisma.contact.findFirstOrThrow({
    where: { id: phone?.contactId, userId: userId },
  });

  if (!contact) {
    throw new AppError("contact email not found", 404);
  }

  const contactUpdate = await prisma.contactPhone.update({
    where: { id: id },
    data: {
      phone: data.phone,
    },
  });

  return contactUpdate;
};

export default updateContactPhoneService;
