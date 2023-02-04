import cors from "cors";
import express from "express";
import { handleErrorMidleware } from "./middlewares/handleError.midleware";
import "express-async-errors";
import userRoutes from "./routes/user.router";
import contactEmailRoutes from "./routes/contactEmail.router";
import contactPhoneRoutes from "./routes/contactPhone.router";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  app.use(cors());
  app.use(express.json());
  app.use("/users", userRoutes);
  app.use("/email", contactEmailRoutes);
  app.use("/phone", contactPhoneRoutes);
  app.use(handleErrorMidleware);
  next();
});

export default app;
