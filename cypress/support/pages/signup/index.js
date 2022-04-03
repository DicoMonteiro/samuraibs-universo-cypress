import { element } from './elements'
import toast from '../../components/toast';
import alert from '../../components/alert'

class SignupPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go(){
        cy.visit("/signup");
        cy.contains(element.title).should("be.visible");
    }
    form(user) {
        cy.get(element.name).type(user.name);
        cy.get(element.email).type(user.email);
        cy.get(element.password).type(user.password);
    }
    submit(){
        cy.contains(element.signupButton).click();
    }
    
}

export default new SignupPage;