import faker from "@faker-js/faker";
import signupPage from "../support/pages/signup";

describe("Cadastro", function() {

  before(function() {
    cy.fixture('signup').then(function(signup) {
      this.success = signup.success
      this.invalid_email = signup.invalid_email
      this.email_exists = signup.email_exists
      this.short_password = signup.short_password
    })
  })

  context("quando o usuário é novato", function() {
    
    before(function() {
      cy.deleteUser(this.success)
    });

    it("deve cadastrar um novo usuário", function() {
      signupPage.go();
      signupPage.form(this.success);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando o email já existe", function() {

    before(function() {
      cy.deleteUser(this.email_exists)
      cy.postUser(this.email_exists)
    });

    it("deve exibir email já cadastrado", function() {
      signupPage.go();
      signupPage.form(this.email_exists);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Email já cadastrado para outro usuário."
      );
    });
  });

  context("quando o email é incorreto", function() {

    it("deve exibir mensagem de alerta", function() {
      signupPage.go();
      signupPage.form(this.invalid_email);
      signupPage.submit();
      signupPage.alert.haveText("Informe um email válido");
    });
  });

  context("quando a senha é muito curta", function() {
    const passwords = ["1", "2a", "3ab", "4ab@", "5abc$"];

    beforeEach(function() {
      signupPage.go();
    });

    passwords.forEach(function(password) {
      it("não deve cadastrar com a senha: " + password, function() {
        this.short_password.password = password;
        signupPage.form(this.short_password);
        signupPage.submit();
      });
    });

    afterEach(function() {
      signupPage.alert.haveText("Pelo menos 6 caracteres");
    });
  });

  context("quando não preencho nenhum dos campos", function() {
    const alertMessages = ["Nome é obrigatório", "E-mail é obrigatório", "Senha é obrigatória"];

    before(function() {
      signupPage.go();
      signupPage.submit();
    });

    alertMessages.forEach(function(message) {
      it("deve exibir a mensagem de alerta: " + message.toLowerCase(), () => {
        signupPage.alert.haveText(message);
      });
    })
    
  });
});
