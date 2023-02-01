// import "reflect-metadata";
import express from "express";
import { handleErrorMidleware } from "./middlewares/handleError.midleware";
import "express-async-errors";
import userRoutes from "./routes/user.router";
import contactEmailRoutes from "./routes/contactEmail.router";
import contactPhoneRoutes from "./routes/contactPhone.router";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocs from "./swagger.json";
const app = express();

app.use(express.json());
// app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/users", userRoutes);
app.use("/email", contactEmailRoutes);
app.use("/phone", contactPhoneRoutes);
app.use(handleErrorMidleware);

export default app;
