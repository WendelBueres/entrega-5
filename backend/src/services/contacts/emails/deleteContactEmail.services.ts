import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors";

const prisma = new PrismaClient();

const deleteContactEmailService = async (id: number) => {
  return await prisma.contactEmail.delete({ where: { id: id } });
};

export default deleteContactEmailService;
