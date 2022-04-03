import { el } from './elements'
import toast from '../../components/toast';
import alert from '../../components/alert'

class ResetPassPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go(token){
        cy.visit('/reset-password?token=' + token);
        cy.contains(el.pageName).should("be.visible");
    }
    form(newPass, confirmPass) {
        cy.get(el.newPass)
            .clear()
            .type(newPass);
        cy.get(el.confirmPass)
            .clear()
            .type(confirmPass);
    }
    submit(){
        cy.contains(el.buttonChangePass).click();
    }
}

export default new ResetPassPage()