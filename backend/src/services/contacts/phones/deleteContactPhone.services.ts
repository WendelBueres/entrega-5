import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";

const prisma = new PrismaClient();

const deleteContactPhoneService = async (id: number) => {
  return await prisma.contactPhone.delete({ where: { id: id } });
};

export default deleteContactPhoneService;
