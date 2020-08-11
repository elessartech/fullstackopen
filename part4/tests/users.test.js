const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

const helper = require("../utils/test_helper");

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

describe("adding a user", () => {
  test("both username and password must be given", async () => {
    const userWithNoPassword = {
      username: "userWithNoPassword",
      name: "userWithNoPassword",
    };
    await api.post("/api/users").send(userWithNoPassword).expect(401);
  });

  test("both username and password must be at least 3 characters long", async () => {
    const userWith2CharsPsw = {
      username: "qwe",
      name: "qw",
      password: "qw",
    };
    await api.post("/api/users").send(userWith2CharsPsw).expect(401);

    const userWith2CharsUsrname = {
      username: "qw",
      name: "qw",
      password: "qwe",
    };
    await api.post("/api/users").send(userWith2CharsUsrname).expect(401);
  });

  test("the username must be unique", async () => {
    const notUniqueUsername = {
      username: "test",
      name: "test",
      password: "test",
    };
    await api.post("/api/users").send(notUniqueUsername).expect(401);
  });
});
