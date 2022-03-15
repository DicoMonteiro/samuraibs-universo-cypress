import { element } from './elements'

class Nav {
    shouldProfileHeader(userName){
        cy.get(element.profileHeader).should("be.visible")
        cy.get(element.profileHeader).should("have.text", `${userName}`)
    }
}

export default new Nav;