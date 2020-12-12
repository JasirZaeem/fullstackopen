describe("Blog app", function () {
  const testBlog = {
    title: "A new blog!",
    author: "Jasir Zaeem",
    url: "https://zaeem.dev",
  };

  const testUser = {
    name: "Jasir Zaeem",
    username: "jasir",
    password: "password",
  };
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", testUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("html").contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type(testUser.username);
      cy.get("#password").type(testUser.password);
      cy.get("#login-button").click();

      cy.contains(`${testUser.name} (${testUser.username}) logged in`);
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type(testUser.username);
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

      cy.get(".toast.error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
    describe("When logged in", function () {
      beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/auth/login", {
          username: testUser.username,
          password: testUser.password,
        }).then((response) => {
          localStorage.setItem("user", JSON.stringify(response.body));
          cy.visit("http://localhost:3000");
        });
      });

      it("A blog can be created", function () {
        cy.get("#new-blog-form-control-btn").click();

        cy.get("#new-title-input").type(testBlog.title);
        cy.get("#new-author-input").type(testBlog.author);
        cy.get("#new-url-input").type(testBlog.url);

        cy.get("#create-new-blog-btn").click();

        cy.get(".toast.success").contains(
          `Added new blog "${testBlog.title}" by ${testBlog.author}`
        );

        cy.get(".blog-list").contains(
          `${testBlog.title} by ${testBlog.author}`
        );
      });

      it("A blog can be liked", function () {
        cy.get(".blog-list > :nth-child(1) > .details-btn").click();
        cy.get(".likes")
          .invoke("text")
          .then((text) => {
            const initialLikes = Number.parseInt(text.split(" ")[1]);
            cy.get(".like-btn").click();

            cy.get(".likes")
              .invoke("text")
              .should((text2) => {
                const newLikes = Number.parseInt(text2.split(" ")[1]);
                expect(newLikes).eq(initialLikes + 1);
              });
          });
      });
      it("A blog cannot be deleted if not by user", function () {
        cy.get(".blog-list > :nth-child(1) > .details-btn").click();
        cy.get(".delete-blog-btn").should("not.exist");
      });
      describe("When user has created blogs", function () {
        beforeEach(function () {
          const { token } = JSON.parse(localStorage.getItem("user"));
          cy.request({
            url: "http://localhost:3001/api/blogs",
            method: "POST",
            body: testBlog,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(() => {
            cy.visit("http://localhost:3000");
          });
        });
        it("A blog can be deleted", function () {
          cy.get(".blog-list > :nth-child(7) > .details-btn").click();
          cy.get(".delete-blog-btn").click();
          cy.get(".toast.error").contains(
            `Deleted blog "${testBlog.title}" by ${testBlog.author}`
          );
        });
      });
      it("Blogs are rendered ordered by their likes", function () {
        let previousLikes = Infinity;
        cy.get(".blog").each(($el) => {
          cy.wrap($el).find(".details-btn").click();
          cy.wrap($el)
            .get(".likes")
            .invoke("text")
            .then((text) => {
              const currentLikes = Number.parseInt(text.split(" ")[1]);
              expect(currentLikes).lte(previousLikes);
              previousLikes = currentLikes;
            });
        });
      });
    });
  });
});
