import { element } from './elements'

class Toast {
    shouldHaveText(expectedText){
        cy.get(element.toast)
        .should("be.visible")
        .find("p")
        .should("have.text", expectedText);
    }
}

export default new Toast;