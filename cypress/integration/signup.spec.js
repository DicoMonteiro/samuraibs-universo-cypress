import faker from "@faker-js/faker";
import signupPage from "../support/pages/signup/index";

describe("Cadastro", () => {
  // beforeEach(() => {
  //   // cy.visit("/signup");
  //   // cy.contains("h1", "Faça seu cadastro").should("be.visible");
  //   signupPage.go()
  // });

  context("quando o usuário é novato", () => {
    const user = {
      name: "Apolo Monteiro",
      email: "apolo.monteiro@teste.com",
      password: "teste@123",
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
    });

    it("deve cadastrar um novo usuário", () => {
      // cy.get('input[placeholder^="Nome"]').type(user.name);
      // cy.get('input[placeholder$="email"]').type(user.email);
      // cy.get('input[placeholder*="senha"]').type(user.password);

      // cy.contains("button", "Cadastrar").click();

      signupPage.go();
      signupPage.form(user);
      signupPage.submit();

      // cy.get(".toast")
      //   .should("be.visible")
      //   .find("p")
      //   .should(
      //     "have.text",
      //     "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      //   );

      signupPage.toast.shouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando o email já existe", () => {
    const user = {
      name: "Apolo Vale",
      email: "apolo.vale@teste.com",
      password: "teste@123",
      is_provider: true,
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });
    });

    it("deve exibir email já cadastrado", () => {
      // cy.get('input[placeholder^="Nome"]').type(user.name);
      // cy.get('input[placeholder$="email"]').type(user.email);
      // cy.get('input[placeholder*="senha"]').type(user.password);

      // cy.contains("button", "Cadastrar").click();
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();

      // cy.get(".toast")
      //   .should("be.visible")
      //   .find("p")
      //   .should("have.text", "Email já cadastrado para outro usuário.");

      signupPage.toast.shouldHaveText(
        "Email já cadastrado para outro usuário."
      );
    });
  });

  context("quando o email é incorreto", () => {
    const user = {
      name: "Elizabeth Olse",
      email: "elizabeth.olse.com",
      password: "teste@123",
    };

    it("deve exibir mensagem de alerta", () => {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.alertHaveText("Informe um email válido");
    });
  });

  context("quando a senha é muito curta", () => {
    const passwords = ["1", "2a", "3ab", "4ab@", "5abc$"];

    beforeEach(() => {
      signupPage.go();
    });

    passwords.forEach((password) => {
      const user = {
        name: "Jason Friday",
        email: "jason@teste.com",
        password: password,
      };
      it("não deve cadastrar com a senha: " + password, () => {
        signupPage.form(user);
        signupPage.submit();
      });
    });

    afterEach(() => {
      signupPage.alertHaveText("Pelo menos 6 caracteres");
    });
  });

  context("quando não preencho nenhum dos campos", () => {
    const alertMessages = ["Nome é obrigatório", "E-mail é obrigatório", "Senha é obrigatória"];

    before(() => {
      signupPage.go();
      signupPage.submit();
    });

    alertMessages.forEach((message) => {
      it("deve exibir a mensagem de alerta: " + message.toLowerCase(), () => {
        signupPage.alertHaveText(message);
      });
    })
    
  });
  //   it("deve cadastrar um novo usuário", () => {
  //     // const name = faker.name.findName();
  //     // const email = faker.internet.email();
  //     // const password = 'teste@123'

  //     // // massa de dados do teste
  //     // const user = {
  //     //   name: "Apolo Monteiro",
  //     //   email: "apolo.monteiro@teste.com",
  //     //   password: "teste@123",
  //     // };

  //     // // Criado um function para remover da base de dados o usuário já cadastrado
  //     // cy.task("removeUser", user.email).then(function (result) {
  //     //   console.log(result);
  //     // });

  //     // preencher os campos de cadastros
  //     cy.get('input[placeholder="Nome"]').type(user.name);
  //     cy.get('input[placeholder="E-mail"]').type(user.email);
  //     cy.get('input[placeholder="Senha"]').type(user.password);

  //     // POC usada para dar um by pass e registra com sucesso mesmo que já tenha cadastrado o usuário
  //     // cy.intercept('POST', '/users', {
  //     //     statusCode: 200
  //     // }).as('postUser')

  //     cy.contains("button", "Cadastrar").click();

  //     // cy.wait('@postUser')

  //     // validar o resultado esperado
  //     cy.get(".toast")
  //       .should("be.visible")
  //       .find("p")
  //       .should(
  //         "have.text",
  //         "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
  //       );
  //   });

  //   it("deve exibir email já cadastrado", () => {
  //     // massa de dados para o teste
  //     const user = {
  //       name: "Apolo Vale",
  //       email: "apolo.vale@teste.com",
  //       password: "teste@123",
  //       is_provider: true,
  //     };

  //     // Criado um function para remover da base de dados o usuário já cadastrado
  //     cy.task("removeUser", user.email).then(function (result) {
  //       console.log(result);
  //     });

  //     // Realizar o cadastro antes da execução do cenário
  //     cy.request("POST", "http://localhost:3333/users", user).then(function (
  //       response
  //     ) {
  //       expect(response.status).to.eq(200);
  //     });

  //     // preencher os campos de cadastros
  //     cy.get('input[placeholder="Nome"]').type(user.name);
  //     cy.get('input[placeholder="E-mail"]').type(user.email);
  //     cy.get('input[placeholder="Senha"]').type(user.password);

  //     cy.contains("button", "Cadastrar").click();

  //     // validar o resultado esperado
  //     cy.get(".toast")
  //       .should("be.visible")
  //       .find("p")
  //       .should("have.text", "Email já cadastrado para outro usuário.");
  //   });
});
