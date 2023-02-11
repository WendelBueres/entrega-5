import request from "supertest";
import app from "../src/app";

describe("Tests User", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "User Test",
      email: "usertest@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  it("when creating user, password should not be returned", async () => {
    const response = await request(app).post("/users").send({
      name: "User Test",
      email: "user.test@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
    expect(response.body).not.toBe("password");
    expect(response.body.error).toBeFalsy();
  });

  it("it should not be possible to create a user with an email already registered", async () => {
    const response = await request(app).post("/users").send({
      name: "User Test",
      email: "user.test@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Unique constraint failed on the email");
    expect(response.body.error);
  });

  it("should not be able to create a new user with no name", async () => {
    const response = await request(app).post("/users").send({
      password: "12345678",
      email: "usertest@mail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("field name is required");
    expect(response.body.error);
  });

  it("should not be able to create a new user with no email", async () => {
    const response = await request(app).post("/users").send({
      name: "User Test",
      password: "12345678",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("field email is required");
    expect(response.body.error);
  });

  it("should not be able to create a new user with no password", async () => {
    const response = await request(app).post("/users").send({
      name: "User Test",
      email: "usertest@mail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("field password is required");
    expect(response.body.error);
  });
});
