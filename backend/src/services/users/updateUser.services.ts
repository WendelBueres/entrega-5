import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { AppError } from "../../errors";
import { IUserRequest } from "../../interfaces/user.interface";
import { IUserResponse } from "../../interfaces/userResponse.interface";

const prisma = new PrismaClient();

const updateUserService = async (data: IUserRequest, id: number) => {
  let fieldsRequireds = ["name", "email", "password"];
  const keys = Object.keys(data);
  let contain = false;

  for (var i = 0; i < fieldsRequireds.length; i++) {
    contain = keys.includes(fieldsRequireds[i]);
    if (contain) {
      break;
    }
  }

  if (!contain) {
    throw new AppError("provide a field required: name, email or password");
  }

  if (data.password) {
    data.password = await hash(data.password, 10);
  }

  const user: IUserResponse = await prisma.user.update({
    where: { id: id },
    data: data,
  });

  delete user.password;

  return user;
};

export default updateUserService;
