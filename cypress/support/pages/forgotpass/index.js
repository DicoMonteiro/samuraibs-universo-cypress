import { el } from './elements'
import toast from '../../components/toast';
import alert from '../../components/alert'

class ForgotPassPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go(){
        cy.visit("/forgot-password");
        cy.contains(el.pageName).should("be.visible");
    }
    form(user) {
        cy.get(el.email)
            .clear()
            .type(user.email);
    }
    submit(){
        cy.contains('button[type=submit]', 'Recuperar').click();
    }
    
}

export default new ForgotPassPage;