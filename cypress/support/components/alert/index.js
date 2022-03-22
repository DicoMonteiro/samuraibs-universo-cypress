import { element } from './elements'

class Alert {
    haveText(message){
        cy.contains(element.error, message).should("be.visible");
    }
}

export default new Alert;