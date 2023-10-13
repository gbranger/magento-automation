Cypress.on('uncaught:exception',()=> {
  return false;
});

const faker = require('faker');


describe('Tela de Cadastro', () => {

  const nome = faker.name.firstName();
  const sobrenome = faker.name.lastName();
  const email = faker.internet.email();


    beforeEach (() => {
      cy.viewport(1920, 1080)
      cy.visit('https://magento2-demo.magebit.com/', {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "axios/0.18.0"
        },
      });
      cy.visit('https://magento2-demo.magebit.com/customer/account/create/');
      cy.wait(1000);

    })

      it("CT001 - Carregamento da tela de Cadastro", () => {
        cy.get('.base').should('have.text','Create New Customer Account');
      
      })

      it("CT002 - Comportamento do campo First Name", () => {
        cy.get('#firstname').type(nome).should('have.value',nome);
      
      })

      it("CT003 - Comportamento do campo Last Name", () => {
        cy.get('#lastname').type(sobrenome).should('have.value',sobrenome);
      
      })

      it("CT004 - Comportamento ao selecionar o checkbox Sign Up for Newsletter", () => {
        cy.get('#is_subscribed').click().should('be.checked');
      
      })

      it("CT005 - Comportamento ao desselecionar o checkbox Sign Up for Newsletter", () => {
        cy.get('#is_subscribed').click().click().should('not.be.checked');
      
      })

      it("CT006 - Comportamento do campo Email", () => {
        cy.get('#email_address').type(email).should('have.value',email);
      
      })

      it("CT007 - Comportamento do campo Password", () => {
        cy.get('#password').type('abc123!!!').should('have.value','abc123!!!');

      })

      it("CT008 - Comportamento do campo Password com menos de oito caracteres", () => {
        cy.wait(1000);
        cy.get('#password').type('a1!!!');
        cy.get('#password-error').should('have.text','Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');


      })

      it("CT009 - Comportamento do campo Password com menos de três classes de caracteres", () => {
        cy.wait(1000);
        cy.get('#password').type('abcabcabc');
        cy.get('#password-error').should('have.text','Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');


      })

      it("CT010 - Comportamento do campo Confirm Password", () => {
        cy.get('#password-confirmation').type('abc123!!!').should('have.value','abc123!!!');

      })

      it("CT011 - Comportamento do botão Create an Account com o campo First Name em branco", () => {
        cy.wait(1000);
        cy.get('#lastname').type(sobrenome);
        cy.get('#email_address').type(email);
        cy.get('#password').type('abc123!!!');
        cy.get('#password-confirmation').type('abc123!!!');
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.get('#firstname-error').should('be.visible');

      })

      it("CT012 - Comportamento do botão Create an Account com o campo Last Name em branco", () => {
        cy.wait(1000);
        cy.get('#firstname').type(nome);
        cy.get('#email_address').type(email);
        cy.get('#password').type('abc123!!!');
        cy.get('#password-confirmation').type('abc123!!!');
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.get('#lastname-error').should('be.visible');

      })

      it("CT013 - Comportamento do botão Create an Account com o campo Email em branco", () => {
        cy.wait(1000);
        cy.get('#firstname').type(nome);
        cy.get('#lastname').type(sobrenome);
        cy.get('#password').type('abc123!!!')
        cy.get('#password-confirmation').type('abc123!!!');
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.get('#email_address-error').should('be.visible');

      })

      it("CT014 - Comportamento do botão Create an Account com o campo Email fora do padrão", () => {
        cy.wait(1000);
        cy.get('#firstname').type(nome);
        cy.get('#lastname').type(sobrenome);
        cy.get('#email_address').type('email');
        cy.get('#password').type('abc123!!!')
        cy.get('#password-confirmation').type('abc123!!!');
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.get('#email_address-error').should('be.visible').should('have.text','Please enter a valid email address (Ex: johndoe@domain.com).');

      })

      it("CT015 - Comportamento do botão Create an Account com o campo Password em branco", () => {
        cy.wait(1000);
        cy.get('#firstname').type(nome);
        cy.get('#lastname').type(sobrenome);
        cy.get('#email_address').type(email);  
        cy.get('#password-confirmation').type('abc123!!!');   
        cy.wait(1000);   
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.get('#password-error').should('be.visible');

      })

      it("CT016 - Comportamento do botão Create an Account com o campo Confirm Password em branco", () => {
        cy.wait(1000);
        cy.get('#firstname').type(nome);
        cy.get('#lastname').type(sobrenome);
        cy.get('#email_address').type(email);  
        cy.get('#password').type('abc123!!!')  
        cy.wait(1000);   
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.get('#password-confirmation-error').should('be.visible');

      })

      it("CT017 - Comportamento do botão Create an Account com os campos Password e Confirm Password com dados diferentes", () => {
        cy.wait(1000);
        cy.get('#firstname').type(nome);
        cy.get('#lastname').type(sobrenome);
        cy.get('#email_address').type(email);
        cy.get('#password').type('abc123!!!')  
        cy.get('#password-confirmation').type('abc123!!!!!');   
        cy.wait(1000);   
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.get('#password-confirmation-error').should('be.visible').should('have.text','Please enter the same value again.');

      })

      it("CT018 - Comportamento do botão Create an Account com todos os campos preenchidos de acordo", () => {
        cy.wait(1000);
        cy.get('#firstname').type(nome);
        cy.get('#lastname').type(sobrenome);
        cy.get('#email_address').type(email);
        cy.get('#password').type('abc123!!!')  
        cy.get('#password-confirmation').type('abc123!!!');   
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
        cy.wait(1000);   
        cy.get('.message-success').should('be.visible').should('have.text','\nThank you for registering with Main Website Store.\n');

      })



})


        