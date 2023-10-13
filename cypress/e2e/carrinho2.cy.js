Cypress.on('uncaught:exception',()=> {
  return false;
});

describe('Inserir itens ao carrinho', () => {


  beforeEach (() => {
    cy.viewport(1920, 1080)
    cy.visit('https://magento2-demo.magebit.com/', {
      headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "axios/0.18.0"
      },
    });
    cy.wait(1000);

  })

  //Os testes baseados no carrinho de compras foram divididos em dois specs por questões de Performance

  it("CT012 - Validação da permissão de exclusão de itens do carrinho pelo usuário", () => {
    cy.get('.home-main > .content > .action').click();
    cy.get('#product-item-info_44').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.wait(4000);
    cy.get('.action-delete').click();
    cy.wait(5500);
    cy.get('.cart-empty > :nth-child(1)').should('have.text','You have no items in your shopping cart.')
  })
  
  
  
  
  
  it("CT013 - Exclusão de todos itens do carrinho - 1", () => {
    cy.get('#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > div > a.block-promo.home-t-shirts').click();
    cy.get('#product-item-info_1468').click();
    cy.wait(1000);
    cy.get('#option-label-size-157-item-170').click();
    cy.get('#option-label-color-93-item-58').click();
    cy.get('#product-addtocart-button').click();
    cy.visit('https://magento2-demo.magebit.com/promotions/tees-all.html');
    cy.get('#product-item-info_1548').click();
    cy.get('#option-label-size-157-item-171').click();
    cy.get('#option-label-color-93-item-56').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(2000);
    cy.get('.showcart').click();   
    cy.wait(1000);   
    cy.get(':nth-child(7) > .secondary > .action > span').click()
    cy.wait(2000);
    cy.get(':nth-child(3) > .item-actions > td > .actions-toolbar > .action-delete').click();
    cy.wait(2000);
    cy.get('.action-delete').click();
    cy.wait(2000);
    cy.get('.cart-empty > :nth-child(1)').should('have.text','You have no items in your shopping cart.')


  })

  it("CT014 - Validação da atualização do contador de itens ao excluir itens do carrinho - 1", () => {
    cy.get('#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > div > a.block-promo.home-t-shirts').click();
    cy.get('#product-item-info_1468').click();
    cy.wait(1000);
    cy.get('#option-label-size-157-item-170').click();
    cy.get('#option-label-color-93-item-58').click();
    cy.get('#product-addtocart-button').click();
    cy.visit('https://magento2-demo.magebit.com/promotions/tees-all.html');
    cy.get('#product-item-info_1548').click();
    cy.get('#option-label-size-157-item-171').click();
    cy.get('#option-label-color-93-item-56').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.counter-number').should('have.text','2')
    cy.get('.showcart').click();      
    cy.get(':nth-child(7) > .secondary > .action > span').click()
    cy.wait(3000);
    cy.get(':nth-child(3) > .item-actions > td > .actions-toolbar > .action-delete').click();
    cy.wait(3000);
    cy.get('.counter-number').should('have.text','1')



  })
  
  
  it("CT015 - Exclusão de todos itens do carrinho - 2", () => {
    cy.get('#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > div > a.block-promo.home-t-shirts').click();
    cy.get('#product-item-info_1468').click();
    cy.wait(1000);
    cy.get('#option-label-size-157-item-170').click();
    cy.get('#option-label-color-93-item-58').click();
    cy.get('#product-addtocart-button').click();
    cy.visit('https://magento2-demo.magebit.com/promotions/tees-all.html');
    cy.get('#product-item-info_1548').click();
    cy.get('#option-label-size-157-item-171').click();
    cy.get('#option-label-color-93-item-56').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get(':nth-child(1) > :nth-child(1) > .product-item-details > .actions > .secondary > .action:eq(0)').click();   
    cy.get('.action-primary').click();
    cy.wait(3000);
    cy.get('.product-item-details > .actions > .secondary > .action:eq(0)').click();  
    cy.get('.action-primary').click(); 
    cy.wait(3000);
    cy.get('.subtitle').should('have.text','You have no items in your shopping cart.');
    


  })

  it("CT016 - Validação da atualização do contador de itens ao excluir itens do carrinho - 2", () => {
    cy.get('#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > div > a.block-promo.home-t-shirts').click();
    cy.get('#product-item-info_1468').click();
    cy.wait(1000);
    cy.get('#option-label-size-157-item-170').click();
    cy.get('#option-label-color-93-item-58').click();
    cy.get('#product-addtocart-button').click();
    cy.visit('https://magento2-demo.magebit.com/promotions/tees-all.html');
    cy.get('#product-item-info_1548').click();
    cy.get('#option-label-size-157-item-171').click();
    cy.get('#option-label-color-93-item-56').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.counter-number').should('have.text','2')
    cy.get('.showcart').click();
    cy.get(':nth-child(1) > :nth-child(1) > .product-item-details > .actions > .secondary > .action:eq(0)').click();   
    cy.get('.action-primary').click();
    cy.wait(1000);
    cy.get('.counter-number').should('have.text','1');



  })

  it("CT017 - Validação da ordem de sequência dos itens inseridos no carrinho", () => {
    cy.get('.home-main > .content > .action').click();
    cy.get('#product-item-info_44').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(1000);
    cy.visit('https://magento2-demo.magebit.com/collections/yoga-new.html');
    cy.get('#product-item-info_823').click();
    cy.get('#option-label-size-157-item-182').click();
    cy.get('#option-label-color-93-item-57').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get(':nth-child(3) > .item-info > .item > .product-item-details > .product-item-name > a').should('have.text','Didi Sport Watch');
    cy.get(':nth-child(4) > .item-info > .item > .product-item-details > .product-item-name > a').should('have.text','Thorpe Track Pant');

  })

  it("CT018 - Atualização da quantidade de itens inseridos no carrinho - 1", () => {
    cy.get('.home-main > .content > .action').click();
    cy.get('#product-item-info_44').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(1000);
    cy.visit('https://magento2-demo.magebit.com/collections/yoga-new.html');
    cy.get('#product-item-info_823').click();
    cy.get('#option-label-size-157-item-182').click();
    cy.get('#option-label-color-93-item-57').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get('.input-text.qty:eq(0)').clear().type('3');
    cy.get('.input-text.qty:eq(1)').clear().type('4');
    cy.get('.update').click();
    cy.get('.input-text.qty:eq(0)').should('have.value','3');
    cy.get('.input-text.qty:eq(1)').should('have.value','4');



  })
  
  it("CT019 - Atualização do contador ao alterar a quantidade de itens inseridos no carrinho - 1", () => {
    cy.get('.home-main > .content > .action').click();
    cy.get('#product-item-info_44').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(1000);
    cy.visit('https://magento2-demo.magebit.com/collections/yoga-new.html');
    cy.get('#product-item-info_823').click();
    cy.get('#option-label-size-157-item-182').click();
    cy.get('#option-label-color-93-item-57').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get('.input-text.qty:eq(0)').clear().type('3');
    cy.get('.input-text.qty:eq(1)').clear().type('4');
    cy.get('.update').click();
    cy.get('.counter-number').should('have.text','7');


  })
  
  it("CT020 - Atualização da quantidade de itens inseridos no carrinho - 2", () => {
    cy.get('.home-main > .content > .action').click();
    cy.get('#product-item-info_44').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(1000);
    cy.visit('https://magento2-demo.magebit.com/collections/yoga-new.html');
    cy.get('#product-item-info_823').click();
    cy.get('#option-label-size-157-item-182').click();
    cy.get('#option-label-color-93-item-57').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get('.item-qty.cart-item-qty:eq(0)').clear().type('5');
    cy.wait(500);
    cy.get('.update-cart-item:eq(0)').click();
    cy.get('.item-qty.cart-item-qty:eq(1)').clear().type('6');
    cy.wait(500);
    cy.get('.update-cart-item:eq(1)').click();
    cy.wait(1000);
    cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get('.input-text.qty:eq(0)').should('have.value','6');
    cy.get('.input-text.qty:eq(1)').should('have.value','5');



  })
  
  it("CT021 - Atualização do contador ao alterar a quantidade de itens inseridos no carrinho - 1", () => {
    cy.get('.home-main > .content > .action').click();
    cy.get('#product-item-info_44').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(1000);
    cy.visit('https://magento2-demo.magebit.com/collections/yoga-new.html');
    cy.get('#product-item-info_823').click();
    cy.get('#option-label-size-157-item-182').click();
    cy.get('#option-label-color-93-item-57').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get('.item-qty.cart-item-qty:eq(0)').clear().type('6');
    cy.get('.update-cart-item:eq(0)').click();
    cy.get('.item-qty.cart-item-qty:eq(1)').clear().type('5');
    cy.get('.update-cart-item:eq(1)').click();
    cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get('.counter-number').should('have.text','11');


  })

  it("CT022 - Validação da descrição do produto a partir do carrinho", () => {
    cy.get('#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > div > a.block-promo.home-t-shirts').click();
    cy.get('#product-item-info_1468').click();
    cy.wait(1000);
    cy.get('#option-label-size-157-item-170').click();
    cy.get('#option-label-color-93-item-58').click();
    cy.get('#product-addtocart-button').click();
    cy.visit('https://magento2-demo.magebit.com/promotions/tees-all.html');
    cy.get('#product-item-info_1548').click();
    cy.get('#option-label-size-157-item-171').click();
    cy.get('#option-label-color-93-item-56').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000);
    cy.get('.showcart').click();
    cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get(':nth-child(3) > .item-info > .item > .product-item-details > .product-item-name > a').click();
    cy.get('.base').should('have.text','Elisa EverCool™ Tee');



  })


})