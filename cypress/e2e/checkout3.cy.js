Cypress.on('uncaught:exception',()=> {
  return false;
});

const faker = require('faker');

describe('Checkout com Login Prévio', () => {

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
    cy.get('.panel > .header > .authorization-link > a').click();
    cy.get('#email').type('roni_cost@example.com');
    cy.get('#pass').type('roni_cost3@example.com');
    cy.wait(1000);
    cy.get('#send2').click();
    

  })

    it("CT001 - Comportamento botão Proceed to Checkout - 1", () => {
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

    it("CT002 - Comportamento botão Proceed to Checkout  - 2", () => {
      cy.get('.showcart').click();
      cy.wait(5000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.wait(3000);
      cy.get('#shipping > div.step-title').should('have.text','Shipping Address');



    })

    it("CT003 - Comportamento botão New Address", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get('.new-address-popup > .action').click();
      cy.get('.modal-footer > .primary').should('be.visible');
        



    })

    it("CT004 - Validação dos campos da tela New Address", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get('.new-address-popup > .action').click();
      cy.get('[name="firstname"]').clear().type(nome).should('have.value',nome);
      cy.get('[name="lastname"]').clear().type(sobrenome).should('have.value',sobrenome);
      cy.get('[name="company"]').type(nomeEmpresa).should('have.value',nomeEmpresa);
      cy.get('[name="street[0]"]').type(endereco).should('have.value',endereco);
      cy.get('[name=country_id]').should('have.value','US');
      cy.get('[name=region_id]').select('California').should('have.value','12');
      cy.get('[name="city"]').type(cidade).should('have.value',cidade);
      cy.get('[name="postcode"]').type(zipcode).should('have.value',zipcode);
      cy.get('[name="telephone"]').type(celular).should('have.value',celular);
        



    })


//Como na tela anterior, não é possível validar as mensagens de erro dos campos obrigatórios por conta dos ids dinâmicos e classes não definidas//

    it("CT005 - Comportamento do botão Ship Here com os dados Preenchidos", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get('.new-address-popup > .action').click();
      cy.get('[name="firstname"]').clear().type(nome).should('have.value',nome);
      cy.get('[name="lastname"]').clear().type(sobrenome).should('have.value',sobrenome);
      cy.get('[name="company"]').type(nomeEmpresa).should('have.value',nomeEmpresa);
      cy.get('[name="street[0]"]').type(endereco).should('have.value',endereco);
      cy.get('[name=country_id]').should('have.value','US');
      cy.get('[name=region_id]').select('California').should('have.value','12');
      cy.get('[name="city"]').type(cidade).should('have.value',cidade);
      cy.get('[name="postcode"]').type(zipcode).should('have.value',zipcode);
      cy.get('[name="telephone"]').type(celular).should('have.value',celular);
      cy.get('.modal-footer > .primary').click();
      cy.get('.selected-item').should('be.visible');
            



    })

    it("CT006 - Comportamento do do combo Shipping Methods", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click().should('be.checked');
      cy.get(':nth-child(2) > :nth-child(1) > .radio').should('not.be.checked');  
            



    })

    it("CT007 - Comportamento do botão Next", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click()
      cy.get('.button').click()
      cy.get('.payment-group > .step-title').should('be.visible');
            



    })

    it("CT008 - Validação dos campos de edição dos campos na tela Payment Method", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
      cy.get('.button').click();
      cy.get('#billing-address-same-as-shipping-checkmo').click();
      cy.get('.field-select-billing > .control > .select').select('New Address');
      cy.get('[name="firstname"]:eq(1)').clear().type(nome).should('have.value',nome);
      cy.get('[name="lastname"]:eq(1)').clear().type(sobrenome).should('have.value',sobrenome);
      cy.get('[name="company"]:eq(1)').type(nomeEmpresa).should('have.value',nomeEmpresa);
      cy.get('[name="street[0]"]:eq(1)').type(endereco).should('have.value',endereco);
      cy.get('[name=country_id]:eq(1)').should('have.value','US');
      cy.get('[name=region_id]:eq(1)').select('California').should('have.value','12');
      cy.get('[name="city"]:eq(1)').type(cidade).should('have.value',cidade);
      cy.get('[name="postcode"]:eq(1)').type(zipcode).should('have.value',zipcode);
      cy.get('[name="telephone"]:eq(1)').type(celular).should('have.value',celular);
      


    })

    //Como na tela anterior, não é possível validar as mensagens de erro dos campos obrigatórios por conta dos ids dinâmicos e classes não definidas//

    it("CT009 - Validação da edição dos campos na tela Payment Method", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
         cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
      cy.get('.button').click();
      cy.get('#billing-address-same-as-shipping-checkmo').click();
      cy.get('.field-select-billing > .control > .select').select('New Address');
      cy.get('[name="firstname"]:eq(1)').clear().type(nome);
      cy.get('[name="lastname"]:eq(1)').clear().type(sobrenome);
      cy.get('[name="company"]:eq(1)').type(nomeEmpresa);
      cy.get('[name="street[0]"]:eq(1)').type(endereco);
      cy.get('[name=region_id]:eq(1)').select('California');
      cy.get('[name="city"]:eq(1)').type(cidade);
      cy.get('[name="postcode"]:eq(1)').type(zipcode);
      cy.get('[name="telephone"]:eq(1)').type(celular);
      cy.get('.action-update').click();
      cy.get('span.title').should('be.visible')


    })

    it("CT010 - Validação do botão cancel na  edição dos campos na tela Payment Method", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
      cy.get('.button').click();
      cy.get('#billing-address-same-as-shipping-checkmo').click();
      cy.get('.field-select-billing > .control > .select').select('New Address');
      cy.get('.action-cancel > span').click();
      cy.get('[name="billingAddresscheckmo.firstname"] > .label > span').should('not.be.visible');
  
    })


    it("CT011 - Comportamento do botão Place order na tela Payment Method prévio e com um item no carrinho", () => {
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
      cy.get('.button').click();
      cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
      cy.get('.base').should('have.text','Thank you for your purchase!');



    })

    it("CT012 - Comportamento do botão Place order na tela Payment Method prévio e com múltiplos produtos no carrinho", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1855').click();
      cy.get('#option-label-size-157-item-176').click();
      cy.get('#option-label-color-93-item-58').click();
      cy.get('#product-addtocart-button').click();
      cy.visit('https://magento2-demo.magebit.com/promotions/pants-all.html')
      cy.get('#product-item-info_771').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-182').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.wait(3000);
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
      cy.get('.button').click();
      cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
      cy.get('.base').should('have.text','Thank you for your purchase!');



    })

    it("CT013 - Comportamento do botão Place order na tela Payment Method prévio e com múltiplos itens no carrinho", () => {
      cy.get('.block-promo-wrapper.block-promo-hp').click();
      cy.get('#product-item-info_1202').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-172').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#qty').clear().type(3);
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.visit('https://magento2-demo.magebit.com/promotions/pants-all.html')
      cy.get('#product-item-info_1855').click();
      cy.get('#option-label-size-157-item-176').click();
      cy.get('#option-label-color-93-item-58').click();
      cy.get('#qty').clear().type(4);
      cy.get('#product-addtocart-button').click();
      cy.visit('https://magento2-demo.magebit.com/promotions/pants-all.html')
      cy.get('#product-item-info_771').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-182').click();
      cy.get('#option-label-color-93-item-53').click();
      cy.get('#qty').clear().type(5);
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.counter-number').should('have.text','12')
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('#top-cart-btn-checkout').click();
      cy.wait(3000);
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
      cy.get('.button').click();
      cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
      cy.get('.base').should('have.text','Thank you for your purchase!');



    })


    







})
