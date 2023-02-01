import { PrismaClient } from "@prisma/client";
import { AppError } from "../errors";
import { IUserRequest } from "../interfaces/user.interface";

const prisma = new PrismaClient();

const updateUserService = async (data: IUserRequest, id: number) => {
  if (data.id) {
    throw new AppError("id is not changeable");
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: data,
  });

  return user;
};

export default updateUserService;
