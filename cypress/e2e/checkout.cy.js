Cypress.on('uncaught:exception',()=> {
  return false;
});

const faker = require('faker');

describe('Checkout sem Login Prévio', () => {

  const nome = faker.name.firstName();
  const sobrenome = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const nomeEmpresa = faker.company.companyName();
  const endereco = faker.address.streetAddress();
  const estado = faker.address.state();
  const cidade = faker.address.city();
  const zipcode = faker.address.zipCode();
  const celular = faker.phone.phoneNumber();


  beforeEach (() => {
    cy.viewport(1920, 1080)
    cy.visit('https://magento2-demo.magebit.com/', {
      headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "axios/0.18.0"
      },

    })
  })

 it("CT001 - Comportamento botão Proceed to Checkout sem login - 1", () => {
    cy.get('.block-promo-wrapper.block-promo-hp').click();
    cy.get('#product-item-info_1202').click();
    cy.wait(1000);
    cy.get('#option-label-size-157-item-172').click();
    cy.get('#option-label-color-93-item-53').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get('#top-cart-btn-checkout').click();
    cy.wait(3000);
    cy.get('#shipping > div.step-title').should('have.text','Shipping Address');



  })

    it("CT002 - Comportamento botão Proceed to Checkout sem login - 2", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get(':nth-child(7) > .secondary > .action > span').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get('#shipping > .step-title')
      cy.wait(3000);
      cy.get('#shipping > div.step-title').should('have.text','Shipping Address');




    })

    it("CT003 - Comportamento do campo Email Address no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('#customer-email').type(email).should('have.value',email);

    })

    it("CT004 - Comportamento do campo First Name no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('.input-text:eq(4)').type(nome).should('have.value',nome);

    })

    it("CT005 - Comportamento do campo Last Name no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('.input-text:eq(5)').type(sobrenome).should('have.value',sobrenome);

    })

    it("CT006 - Comportamento do campo Company no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('.input-text:eq(6)').type(nomeEmpresa).should('have.value',nomeEmpresa);

    })

    it("CT007 - Comportamento dos campos Street Address no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('.input-text:eq(7)').type(endereco).should('have.value',endereco);
      cy.get('.input-text:eq(8)').type(endereco).should('have.value',endereco);
      cy.get('.input-text:eq(9)').type(endereco).should('have.value',endereco);

    })

    it("CT008 - Comportamento do combo Country no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('[name=country_id]').select('Uruguay').should('have.value','UY');

    })

    it("CT009 - Comportamento do campo State/Province no formulário do checkout com país diferente dos Estados Unidos", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('[name=country_id]').select('Uruguay')
      cy.wait(3000);
      cy.get('.input-text:eq(10)').type(estado).should('have.value',estado);

    })

    it("CT010 - Comportamento do combo State/Province no formulário do checkout com país Estados Unidos", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('[name=region_id]').select('Hawaii').should('have.value','21');

    })

      it("CT011 - Comportamento do campo City no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('.input-text:eq(11)').type(cidade).should('have.value',cidade);

    })

    it("CT012 - Comportamento do campo Zip/Postal Code no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('.input-text:eq(12)').type(zipcode).should('have.value',zipcode);

    })

    it("CT013 - Comportamento do campo Phone Number no formulário do checkout", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get('.input-text:eq(13)').type(celular).should('have.value',celular);

    })




  })


  


