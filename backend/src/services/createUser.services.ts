import { PrismaClient } from "@prisma/client";
import { IUserRequest } from "../interfaces/user.interface";
import { AppError } from "../errors";

const prisma = new PrismaClient();

const createUserService = async (data: IUserRequest) => {
  if (data.id) {
    throw new AppError("id is not definable");
  }

  if (!data.name) {
    throw new AppError("name is field required");
  }

  const user = await prisma.user.create({ data: data });

  return user;
};

export default createUserService;
