import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function() {
    
    context('quando o cliente faz um agendamento no app mobile', function() {

        before(function () {
            cy.deleteUser(customer)
            cy.deleteUser(provider)
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        });
        it('o mesmo deve ser exibidono dashboard', function() {

            const date = Cypress.env('appointmentDate')

            // Login via Tela
            // cy.uiLogin(provider)

            // Login via API
            cy.apiLogin(provider, true)

            dashPage.go()
            dashPage.calendarShouldBeVisible()
            dashPage.selectDate(date)
            dashPage.appointmentShouldBe(customer, appointment.hour)
        });
    });
});