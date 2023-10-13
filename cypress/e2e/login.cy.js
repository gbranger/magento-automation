Cypress.on('uncaught:exception',()=> {
  return false;
});

const faker = require('faker');

describe('Tela de Login', () => {

  const nome = faker.name.firstName();
  const sobrenome = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  beforeEach (() => {
    cy.viewport(1920, 1080)
    cy.visit('https://magento2-demo.magebit.com/', {
      headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "axios/0.18.0"
      },
    });
    cy.get('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a').click();
    cy.wait(1000);

  })

      it("CT001 - Carregamento da tela de Login", () => {
        cy.get('#maincontent > div.page-title-wrapper > h1 > span').should('have.text','Customer Login');
    
      })

    
      it("CT002 - Comportamento do campo Email", () => {
        cy.get('#email').type(email).should('have.value',email);
  
      })

      it("CT003 - Comportamento do campo Password", () => {
        cy.get('#pass').type(password).should('have.value',password);
  
      })

      it("CT004 - Comportamento do botão Sign In sem dados nos campos Email e Password", () => {
        cy.get('#send2').click();
        cy.get('#email-error').should('be.visible')
        cy.get('#pass-error').should('be.visible')
  
      })

      it("CT005 - Comportamento do botão Sign In sem dados no campo Email", () => {
        cy.get('#pass').type(password);
        cy.get('#send2').click();
        cy.get('#email-error').should('be.visible')
      
  
      })

      it("CT006 - Comportamento do botão Sign In sem dados no campo Password", () => {
        cy.get('#email').type(email);
        cy.get('#send2').click();
        cy.get('#pass-error').should('be.visible')

         
      })

      it("CT007 - Comportamento do botão Forgot Your Password", () => {
        cy.get('#login-form > fieldset > div.actions-toolbar > div.secondary > a > span').click();
        cy.get('#maincontent > div.page-title-wrapper > h1 > span').should('have.text','Forgot Your Password?')

         
      })

      it("CT008 - Comportamento do botão Sign In com credenciais inválidas", () => {
        cy.get('#email').type(email);
        cy.get('#pass').type(password);
        cy.get('#send2').click();
        cy.get('.message-error').should('be.visible').should('have.text','\nThe account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.\n')

      })

      it("CT009 - Comportamento do botão Sign In com credenciais válidas", () => {
        cy.get('#email').type('roni_cost@example.com');
        cy.get('#pass').type('roni_cost3@example.com');
        cy.get('#send2').click();

        cy.get('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.greet.welcome > span').should('have.text','Welcome, Veronica Costello!')
        

      })


        



})