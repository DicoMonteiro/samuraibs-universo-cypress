import loginPage from "../support/pages/login";
import dashPage from "../support/pages/dash";

describe("Login", () => {
  let user = {
    name: "Adriano Almeida",
    email: "adriano.almeida@teste.com",
    password: "teste@123",
    is_provider: true,
  };

  before(() => {
    cy.deleteUser(user)
    cy.postUser(user)
  });

  context("quando informado os dados de usuário cadastrado", () => {
    
    before(() => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
    })
    it("deve realizar o login com sucesso", () => {
      dashPage.header.shouldProfileHeader(user.name);
    });
  });

  context("quando informado a senha incorreta", () => {
    before(() => {
      user.password = "teste123&";
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
    })

    it("deve exibir uma mensagem de alerta de falha no login", () => {
      loginPage.toast.shouldHaveText(
        "Ocorreu um erro ao fazer login, verifique suas credenciais."
      );
    });
  });

  context("quando informado o email é incorreto", () => {
    before(() => {
      user.email = "joao.paulo.teste.com";
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
    })

    it("deve exibir uma mensagem de alerta de falha no login", () => {
      loginPage.alert.haveText("Informe um email válido");
    });
  });

  context("quando informado o email é inválido", () => {
    const emails = [
        "adriano.com.br",
        ".com.br",
        "@gmail.com",
        "@",
        "adriano@",
        "111",
        "&*^&%^",
        "xpto123"
    ]

    before(() => {
      loginPage.go();
    })

    emails.forEach((email) => {
      it("deve exibir uma mensagem de alerta de falha no login para o email: " + email, () => {
        user.email = email;
        loginPage.form(user);
        loginPage.submit();
        loginPage.alert.haveText("Informe um email válido");
      });
    })

    
  });

  context("quando não informado nenhum dos campos", () => {
    const alertMessages = ["E-mail é obrigatório", "Senha é obrigatória"];

    before(() => {
      loginPage.go();
      loginPage.submit();
    });

    it("deve exibir a mensagem de alerta: " + alertMessages[0].toLowerCase(), () => {
        loginPage.alert.haveText(alertMessages[0]);
      }
    );

    it(
      "deve exibir a mensagem de alerta: " + alertMessages[1].toLowerCase(), () => {
        loginPage.alert.haveText(alertMessages[1]);
      }
    );
  });
});
