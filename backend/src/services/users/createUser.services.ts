import { PrismaClient } from "@prisma/client";
import { IUserRequest } from "../../interfaces/user.interface";
import { AppError } from "../../errors";
import { hash } from "bcrypt";
import { IUserResponse } from "../../interfaces/userResponse.interface";

const prisma = new PrismaClient();

const createUserService = async (data: IUserRequest) => {
  let fieldsRequireds = ["name", "email", "password"];
  const keys = Object.keys(data);

  for (var i = 0; i < fieldsRequireds.length; i++) {
    if (!keys.includes(fieldsRequireds[i])) {
      throw new AppError(`field ${fieldsRequireds[i]} is required`);
    }
  }

  const hashedPassword = await hash(String(data.password), 10);

  const user: IUserResponse = await prisma.user.create({
    data: { name: data.name, email: data.email, password: hashedPassword },
  });

  delete user.password;

  return user;
};

export default createUserService;
