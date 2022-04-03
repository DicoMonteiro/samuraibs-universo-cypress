import { element } from './elements'
import toast from '../../components/toast';
import alert from '../../components/alert'

class LoginPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go(){
        cy.visit("/");
        cy.contains(element.title).should("be.visible" , {timeout: 3000});
    }
    form(user) {
        cy.get(element.email)
            .clear()
            .type(user.email);
        cy.get(element.password)
            .clear()
            .type(user.password);
    }
    submit(){
        cy.contains(element.accessButton).click();
    }
    
}

export default new LoginPage;