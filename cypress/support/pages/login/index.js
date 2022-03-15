import { element } from './elements'
import toast from '../../components/toast/index';
import nav from '../../components/nav/index';

class LoginPage {

    constructor() {
        this.toast = toast
        this.nav = nav
    }

    go(){
        cy.visit("/");
        cy.contains("h1", "Faça seu login").should("be.visible" , {timeout: 3000});
    }
    form(user) {
        cy.get(element.email).type(user.email);
        cy.get(element.password).type(user.password);
    }
    submit(){
        cy.contains(element.accessButton).click();
    }
    alertHaveText(message){
        cy.contains(element.alert, message).should("be.visible");
    }
    
}

export default new LoginPage;