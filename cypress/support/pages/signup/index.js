import { element } from './elements'
import toast from '../../components/toast/index';

class SignupPage {

    constructor() {
        this.toast = toast
    }

    go(){
        cy.visit("/signup");
        cy.contains("h1", "Faça seu cadastro").should("be.visible");
    }
    form(user) {
        cy.get(element.name).type(user.name);
        cy.get(element.email).type(user.email);
        cy.get(element.password).type(user.password);
    }
    submit(){
        cy.contains(element.signupButton).click();
    }
    alertHaveText(message){
        cy.contains(element.alert, message).should("be.visible");
    }
    
}

export default new SignupPage;