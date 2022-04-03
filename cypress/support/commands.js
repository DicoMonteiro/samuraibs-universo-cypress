// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import moment from 'moment'
import {apiServer} from '../../cypress.json'
import loginPage from './pages/login'
import dashPage from './pages/dash'

// App Actions
Cypress.Commands.add('uiLogin', function(user) {
    loginPage.go();
    loginPage.form(user)
    loginPage.submit()
    dashPage.header.shouldProfileHeader(user.name)
})

Cypress.Commands.add('deleteUser', function(user){
    cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
    });
})

Cypress.Commands.add('postUser', function(user){
    cy.request({
        method: "POST", 
        // url: "http://localhost:3333/users", 
        // url: apiServer + '/users',
        url: `${Cypress.config().apiServer}/users`,
        body: user, 
        failOnStatusCode: false
    }).then(function (response) {
      expect(response.status).to.eq(200);
    });
})

Cypress.Commands.add('recoveryPass', function(email) {
    cy.request({
        method: "POST", 
        // url: "http://localhost:3333/password/forgot",
        url: apiServer + '/password/forgot',
        // url: Cypress.config().apiServer + '/password/forgot',  
        body: {
            email: email
        }, 
        failOnStatusCode: false
    }).then(function (response) {
      expect(response.status).to.eq(204);

      cy.task("findToken", email).then(function (result) {
        Cypress.env('recoveryToken', result.token)
      });
    });
})

Cypress.Commands.add('createAppointment', function(hour) {
    let now = new Date();
    now.setDate(now.getDate());
    // now.setDate(now.getDate() + 1);

    while (now.getDay() === 0 || now.getDay() === 6)  {
        now.setDate(now.getDate() + 1);
    }

    // cy.log(now.getDay())
    Cypress.env('appointmentDate', now)

    // const date = moment(now).format('YYYY-MM-DD ' + hour + ':00');
    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`);
    cy.log(date);

    const payload = {
        provider_id: `${Cypress.env('providerId')}`,
	    date: `${date}`
    }

    cy.request({
        method: "POST", 
        // url: "http://localhost:3333/appointments",
        url: apiServer + '/appointments',
        // url: Cypress.config().apiServer + '/appointments', 
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        },
        body: payload, 
        failOnStatusCode: false
    }).then(function (response) {
      expect(response.status).to.eq(200);
    });

})

Cypress.Commands.add('setProviderId', function(providerEmail) {
    
    cy.request({
        method: 'GET',
        // url: 'http://localhost:3333/providers',
        url: apiServer + '/providers',
        // url: Cypress.config().apiServer + '/providers', 
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        }
    }).then(function (response) {
        expect(response.status).to.eq(200);
        console.log(response.body)

        const providerList = response.body

        providerList.forEach(function (provider){
            if (provider.email === providerEmail){
                Cypress.env('providerId', provider.id);
            }
        })
    });
})

Cypress.Commands.add('apiLogin', function(user, setLocalStorage = false) {
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: "POST", 
        // url: "http://localhost:3333/sessions",
        url: apiServer + '/sessions',
        // url: Cypress.config().apiServer + '/sessions', 
        body: payload, 
        failOnStatusCode: false
    }).then(function (response) {
      expect(response.status).to.eq(200);
      Cypress.env('apiToken', response.body.token);

      if (setLocalStorage === true) {
        const { token, user } = response.body  
        window.localStorage.setItem('@Samurai:token', token)
        window.localStorage.setItem('@Samurai:user', JSON.stringify(user))
      }
    });


})