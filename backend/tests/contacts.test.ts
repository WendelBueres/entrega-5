import request from "supertest";
import app from "../src/app";

describe("Tests Contacts", () => {
  it("should be able to create a new contact", async () => {
    await request(app).post("/users").send({
      name: "User Test",
      email: "usertest@mail.com",
      password: "12345678",
    });
    const res = await request(app).post("/login").send({
      email: "usertest@mail.com",
      password: "12345678",
    });

    const response = await request(app)
      .post("/contact")
      .set("Authorization", `Bearer ${res.body.token}`)
      .send({
        name: "Contact 01",
        userId: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  it("should be able to create a new contact without email", async () => {
    const res = await request(app).post("/login").send({
      email: "usertest@mail.com",
      password: "12345678",
    });

    const response = await request(app)
      .post("/contact")
      .set("Authorization", `Bearer ${res.body.token}`)
      .send({
        name: "Contact 02",
        phone: "96 99992-9999",
        userId: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  it("should be able to create a new contact without phone", async () => {
    const res = await request(app).post("/login").send({
      email: "usertest@mail.com",
      password: "12345678",
    });

    const response = await request(app)
      .post("/contact")
      .set("Authorization", `Bearer ${res.body.token}`)
      .send({
        name: "Contact 03",
        email: "contact03@mm.com",
        userId: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  it("should not be able to create a new contact without name", async () => {
    const res = await request(app).post("/login").send({
      email: "usertest@mail.com",
      password: "12345678",
    });

    const response = await request(app)
      .post("/contact")
      .set("Authorization", `Bearer ${res.body.token}`)
      .send({
        email: "contact04@mm.com",
        userId: 1,
      });

    console.log(res.body.token);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("field name is required");
    expect(response.body.error);
  });
});
