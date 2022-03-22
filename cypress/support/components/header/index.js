import { element } from './elements'

class Header {
    shouldProfileHeader(userName){
        cy.get(element.profileHeader, { timeout: 7000 })
            .should("be.visible")
            .should("have.text", userName)
    }
}

export default new Header;