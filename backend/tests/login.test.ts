import request from "supertest";
import app from "../src/app";

describe("Tests Login", () => {
  it("must be able to login and return token", async () => {
    await request(app).post("/users").send({
      name: "User Test",
      email: "usertest@mail.com",
      password: "12345678",
    });

    const response = await request(app).post("/login").send({
      email: "usertest@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body.token);
    expect(response.body.error).toBeFalsy();
  });
});
