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

    Cypress.Commands.add('login', ({ username, password }) => {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
      }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
        cy.get("#username-input").type(username);
        cy.get("#password-input").type(password);
        cy.get("#login-button").click();
      })
    })

    Cypress.Commands.add('createBlog', ({ title, author, url, likes=null }) => {
      cy.request({
        url: 'http://localhost:3001/api/blogs/',
        method: 'POST',
        body: { title, author, url, likes},
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })
    
      cy.visit('http://localhost:3000')
    })
    
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      const user = {
        name: "test",
        username: "test",
        password: "test",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.login({ username: user.username, password: user.password })
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
      })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'My Test Blog',
          author: "Test Author",
          url: "google.com"
        })
      })

      it("A blog can be liked", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("you liked the post")
      });
  });

  describe('making sure that the user who created a blog can delete it', function () {
    beforeEach(function () {
      cy.createBlog({
        title: 'My Test Blog',
        author: "Test Author",
        url: "google.com"
      })
    })

    it("A blog can be deleted", function () {
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("you removed the post");
    });

    it("A blog cannot be deleted by other users", function () {
      cy.contains("logout").click();
      const user = {
        name: "test2",
        username: "test2",
        password: "test",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.login({ username: user.username, password: user.password })
      cy.contains("view").click();
      cy.get('#removeBtn').should('not.be.visible')
    });
  });

  describe('the blogs are ordered according to likes with the blog with the most likes being first', function () {
    beforeEach(function () {
      cy.createBlog({
        title: 'My Test Blog',
        author: "Test Author",
        url: "google.com",
        likes: 5
      }),
      cy.createBlog({
        title: 'My Test Blog 2',
        author: "Test Author",
        url: "google.com",
        likes: 3 
      }),
      cy.createBlog({
        title: 'My Test Blog 3',
        author: "Test Author",
        url: "google.com",
        likes: 9
      })
    })

    it("Blogs are ordered properly", function () {
      cy.get('.likes').eq(0).should('have.text', 'likes 9 like')
      cy.get('.likes').eq(1).should('have.text', 'likes 5 like')
      cy.get('.likes').eq(2).should('have.text', 'likes 3 like')
    });
  });

  });
});
