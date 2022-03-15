import loginPage from "../support/pages/login/index";

describe("Login", () => {

  context("quando informado os dados de usuário cadastrado", () => {
    const user = {
      name: "Adriano Almeida",
      email: "adriano.almeida@teste.com",
      password: "teste@123",
      is_provider: true,
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
      cy.request({
          method: "POST", 
          url: "http://localhost:3333/users", 
          body: user, 
          failOnStatusCode: false
      }).then(function (response) {
        expect(response.status).to.eq(200);
      });
    });

    it("deve realizar o login com sucesso", () => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();

      loginPage.nav.shouldProfileHeader(user.name);
    });
  });

  context("quando informado a senha incorreta", () => {
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

    it("deve exibir uma mensagem de alerta", () => {
      user.password = "teste123&";

      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
      loginPage.toast.shouldHaveText(
        "Ocorreu um erro ao fazer login, verifique suas credenciais."
      );
    });
  });

  context("quando informado o email é incorreto", () => {
    const user = {
      name: "João Paulo",
      email: "joao.paulo@teste.com",
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

    it("deve exibir uma mensagem de alerta", () => {
      user.email = "joao.paulo.teste.com";

      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
      loginPage.alertHaveText("Informe um email válido");
    });
  });

  context("quando não informado nenhum dos campos", () => {
    const alertMessages = ["E-mail é obrigatório", "Senha é obrigatória"];

    before(() => {
      loginPage.go();
      loginPage.submit();
    });

    it("deve exibir a mensagem de alerta: " + alertMessages[0].toLowerCase(), () => {
        loginPage.alertHaveText(alertMessages[0]);
      }
    );

    it(
      "deve exibir a mensagem de alerta: " + alertMessages[1].toLowerCase(), () => {
        loginPage.alertHaveText(alertMessages[1]);
      }
    );
  });
});
