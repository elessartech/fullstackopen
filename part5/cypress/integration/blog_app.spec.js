describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      const user = {
        name: "test",
        username: "test",
        password: "test",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.visit("http://localhost:3000");
    });

    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type("test");
      cy.get("#password-input").type("test");
      cy.get("#login-button").click();

      cy.contains("logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username-input").type("tset");
      cy.get("#password-input").type("tset");
      cy.get("#login-button").click();
      cy.get(".error-message").should("contain", "Wrong credentials");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      const user = {
        name: "test",
        username: "test",
        password: "test",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.request("POST", "http://localhost:3001/api/login/", {
        username: user.username,
        password: user.password,
      });
      cy.visit("http://localhost:3000");
      cy.get("#username-input").type("test");
      cy.get("#password-input").type("test");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      const blog = {
        title: "My Great Test Title",
        author: "Some Author",
        url: "www.google.com",
      };
      cy.contains("create new blog").click();
      cy.get("#author").type(blog.author);
      cy.get("#title").type(blog.title);
      cy.get("#url").type(blog.url);
      cy.contains("save").click();
      cy.contains(blog.title)
    });
  });
});
