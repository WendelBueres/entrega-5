import app from "./app";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  const port = 8000;

  await prisma.$connect();

  app.listen(process.env.PORT || port, () => {
    console.log(`Servidor executando na porta: ${port}`);
  });
})();
