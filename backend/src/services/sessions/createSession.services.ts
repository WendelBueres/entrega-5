import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { AppError } from "../../errors";
import jwt from "jsonwebtoken";
import { ILogin } from "../../interfaces/login.interface";
import { IUserRequest } from "../../interfaces/user.interface";

const createSessionServices = async (data: ILogin) => {
  const prisma = new PrismaClient();

  if (!data.email) {
    throw new AppError("email is a field required");
  }

  if (!data.password) {
    throw new AppError("password is a field required");
  }

  const user: IUserRequest | null = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("user or password invalid");
  }

  const checkPassword = await compare(data.password, user.password);

  if (!checkPassword) {
    throw new AppError("user or password invalid");
  }

  const id = String(user.id);

  const token = jwt.sign(
    {
      userId: id,
      userName: user.name,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "18h",
      subject: id,
    }
  );

  return { token: token };
};

export default createSessionServices;
