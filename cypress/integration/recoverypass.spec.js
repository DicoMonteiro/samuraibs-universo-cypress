
import fpPage from "../support/pages/forgotpass";
import resetPage from "../support/pages/resetpass";

describe('Esqueceu a senha', function() {
    
    before(function() {
        cy.fixture('recovery').then(function(recovery) {
            this.data = recovery
        })
    });

    context('quando o usuário esquece a senha', function() {
        
        before(function() {
          cy.deleteUser(this.data)
          cy.postUser(this.data)
        });
        it('deve poder resgatar por email', function() {
            fpPage.go();
            fpPage.form(this.data);
            fpPage.submit();

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

            fpPage.toast.shouldHaveText(message);
        });
    });

    context('quando o usuário solicita o resgate', function() {
        
        before(function() {
            cy.deleteUser(this.data)
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        });
        it('deve poder cadastrar uma nova senha', function() {
            // cy.tokenUser(this.data.email)
            const token = Cypress.env('recoveryToken')
            resetPage.go(token)
            resetPage.form('Teste@123', 'Teste@123')
            resetPage.submit()

            const message = 'Agora você já pode logar com a sua nova senha secreta.'

            resetPage.toast.shouldHaveText(message)

        });
    });
});
