import { element } from './elements'

class Header {
    shouldProfileHeader(userName){
        cy.get(element.profileHeader)
            .should("be.visible")
            .should("have.text", userName)
    }
}

export default new Header;