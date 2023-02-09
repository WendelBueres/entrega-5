import { PrismaClient, User } from "@prisma/client";
import { IUserResponse } from "../../interfaces/userResponse.interface";

const prisma = new PrismaClient();

const listUserService = async () => {
  function exclude(user: IUserResponse) {
    delete user.password;
    return user;
  }

  function excludeArray(dict: User[], items: [string]) {
    const arr = [];
    for (let i = 0; i < dict.length; i++) {
      exclude(dict[i]);
      arr.push(dict[i]);
    }
    return arr;
  }

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const response = excludeArray(users, ["password"]);

  return response;
};

export default listUserService;
