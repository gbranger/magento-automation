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

   //Os testes baseados no no checkout foram divididos em dois specs por questões de Performance 
    
  it("CT014 - Comportamento do Shipping Methods formulário do checkout com país Estados Unidos", () => {
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
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii');
    cy.get('[name=ko_unique_3]').click().should('be.checked');
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('[name=ko_unique_4]').should('not.be.checked');


  })

  it("CT015 - Comportamento do Shipping Methods formulário do checkout com país diferente dos Estados Unidos", () => {
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
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=country_id]').select('Uruguay');
    cy.wait(3000);
    cy.get('.input-text:eq(10)').type(estado);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.radio').click().should('be.checked');


  })

  /*O ideal seria fazer a checagem em todos os campos obrigatórios, mas todas as mensagens de erro, exceto as duas contempladas, apresentam ids dinâmicos
   e classes não definidas, tornando impossível manter o teste consistente*/

  it("CT016 - Comportamento do botão next sem dados no campo Email Address", () => {
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
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('#customer-email-error').should('be.visible');



  })

  it("CT017 - Comportamento do botão next sem dados no Shipping Methods", () => {
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
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get('.button').click();
    cy.get('.message').should('be.visible');



  })

  it("CT018 - Comportamento do botão Next com todos os dados obrigatórios preenchidos", () => {
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
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('.payment-group > .step-title').should('be.visible');


  })

 it("CT019 - Validação dos campos de edição dos campos na tela Payment Method", () => {
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
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('#billing-address-same-as-shipping-checkmo').click();
    cy.get('[name="firstname"]:eq(1)').type(nome).should('have.value',nome);
    cy.get('[name="lastname"]:eq(1)').type(sobrenome).should('have.value',sobrenome);
    cy.get('[name="company"]:eq(1)').type(nomeEmpresa).should('have.value',nomeEmpresa);
    cy.get('[name="street[0]"]:eq(1)').type(endereco).should('have.value',endereco);
    cy.get('[name=country_id]:eq(1)').should('have.value','US');
    cy.get('[name=region_id]:eq(1)').select('California').should('have.value','12');
    cy.get('[name="city"]:eq(1)').type(cidade).should('have.value',cidade);
    cy.get('[name="postcode"]:eq(1)').type(zipcode).should('have.value',zipcode);
    cy.get('[name="telephone"]:eq(1)').type(celular).should('have.value',celular);
    


  })

  //Como na tela anterior, não é possível validar as mensagens de erro dos campos obrigatórios por conta dos ids dinâmicos e classes não definidas//

  it("CT020 - Validação da edição dos campos na tela Payment Method", () => {
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
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('#billing-address-same-as-shipping-checkmo').click();
    cy.get('[name="firstname"]:eq(1)').type(nome);
    cy.get('[name="lastname"]:eq(1)').type(sobrenome);
    cy.get('[name="company"]:eq(1)').type(nomeEmpresa);
    cy.get('[name="street[0]"]:eq(1)').type(endereco);
    cy.get('[name=region_id]:eq(1)').select('California');
    cy.get('[name="city"]:eq(1)').type(cidade);
    cy.get('[name="postcode"]:eq(1)').type(zipcode);
    cy.get('[name="telephone"]:eq(1)').type(celular);
    cy.get('.action-update').click();
    cy.get('span.title').should('be.visible')


  })

  it("CT021 - Validação do botão cancel na  edição dos campos na tela Payment Method", () => {
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
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('#billing-address-same-as-shipping-checkmo').click();
    cy.get('.action-cancel > span').click();
    cy.get('[name="billingAddresscheckmo.firstname"] > .label > span').should('not.be.visible');


  })


  it("CT022 - Comportamento do botão Place order na tela Payment Method sem login prévio e com um item no carrinho", () => {
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
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
    cy.get('.base').should('have.text','Thank you for your purchase!');
    cy.get('#registration > div:nth-child(3) > p:nth-child(1)').should('have.text','You can track your order status by creating an account.');


  })

  it("CT023 - Comportamento do botão Place order na tela Payment Method sem login prévio e com múltiplos produtos no carrinho", () => {
    cy.get('.block-promo-wrapper.block-promo-hp').click();
    cy.get('#product-item-info_1202').click();
    cy.wait(1000);
    cy.get('#option-label-size-157-item-172').click();
    cy.get('#option-label-color-93-item-53').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.visit('https://magento2-demo.magebit.com/promotions/pants-all.html')
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
    cy.get('#top-cart-btn-checkout').click();
    cy.wait(3000);
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
    cy.get('.base').should('have.text','Thank you for your purchase!');



  })

  it("CT024 - Comportamento do botão Place order na tela Payment Method sem login prévio e com múltiplos itens no carrinho", () => {
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
    cy.get('.counter-number').should('have.text','12')
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get('#top-cart-btn-checkout').click();
    cy.wait(3000);
    cy.get('#customer-email').type(email);
    cy.get('.input-text:eq(4)').type(nome);
    cy.get('.input-text:eq(5)').type(sobrenome);
    cy.get('.input-text:eq(6)').type(nomeEmpresa);
    cy.get('.input-text:eq(7)').type(endereco);
    cy.get('[name=region_id]').select('Hawaii')
    cy.get('.input-text:eq(11)').type(cidade);
    cy.get('.input-text:eq(12)').type(zipcode);
    cy.get('.input-text:eq(13)').type(celular);
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
    cy.get('.base').should('have.text','Thank you for your purchase!');


  })

})