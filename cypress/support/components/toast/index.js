import { element } from './elements'

class Toast {
    shouldHaveText(expectedText){
        cy.get(element.toast, { timeout: 10000 })
        .should("be.visible")
        .should("have.css", "opacity", "1", { timeout: 15000 })
        .find("p")
        .should("have.text", expectedText);
    }
}

export default new Toast;