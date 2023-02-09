import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";
import { IContactPhoneRequest } from "../../../interfaces/contactPhone.interface";

const prisma = new PrismaClient();

const updateContactPhoneService = async (
  data: IContactPhoneRequest,
  id: number
) => {
  const regex =
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

  let isPhone = regex.test(data.phone);

  if (!isPhone) {
    throw new AppError(
      "Provide a valid phone, in format (XX) XXXX-XXXX or (XX) XXXXX-XXXX"
    );
  }

  const contact = await prisma.contactPhone.update({
    where: { id: id },
    data: {
      phone: data.phone,
    },
  });

  return contact;
};

export default updateContactPhoneService;
