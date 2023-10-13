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

  /*A intenção era validar os dois métodos de colocar um produto no carrinho (pela lista de produtos e pela tela do produto), mas por algum motivo,
  o evento de aparecer o botão "add to cart" ao correr do mouse sobre o produto na lista não estava ocorrendo.*/

    it("CT001 - Verificando se o botão de adicionar ao carrinho é clicável - 1 ", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_38').click();
      cy.wait(1000);
      cy.get('#product-addtocart-button').should('be.enabled');

        
    })

    it("CT002 - Verificando se o botão de adicionar ao carrinho é clicável - 2 ", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_823').click();
      cy.wait(1000);
      cy.get('#product-addtocart-button').should('be.enabled');

            
    })

    it("CT003 - Comportamento do botão adicionar ao carrinho", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_823').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-182').click();
      cy.get('#option-label-color-93-item-57').click();
      cy.get('#product-addtocart-button').click();
      cy.get('.message-success').should('be.visible');
      cy.get('.counter-number').should('have.text','1');
    
            
    })

    it("CT004 - Comportamento do botão adicionar ao carrinho ao adicionar outro produto", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_823').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-182').click();
      cy.get('#option-label-color-93-item-57').click();
      cy.get('#product-addtocart-button').click();
      cy.visit('https://magento2-demo.magebit.com/collections/yoga-new.html');
      cy.get('#product-item-info_44').click();
      cy.wait(1000);
      cy.get('#product-addtocart-button').click();
      cy.get('.message-success').should('be.visible')
      cy.get('.counter-number').should('have.text','2')
    
            
    })

    it("CT005 - Comportamento do botão o mesmo produto várias vezes no carrinho", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_44').click();
      cy.wait(1000);
      cy.get('#product-addtocart-button').click();
      cy.wait(1000);
      cy.get('#product-addtocart-button').click();
      cy.wait(1000);
      cy.get('#product-addtocart-button').click();
      cy.wait(1000);
      cy.get('#product-addtocart-button').click();
      cy.get('.message-success').should('be.visible')
      cy.get('.counter-number').should('have.text','4')
    
            
    })

    it("CT006 - Comportamento de quando o produto é colocado no carrinho em quantidade maior que 1", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_823').click();
      cy.wait(1000)
      cy.get('#option-label-size-157-item-182').click()
      cy.get('#option-label-color-93-item-57').click()
      cy.get('#qty').clear().type('5');
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);  
      cy.get('.showcart').click();
      cy.get(':nth-child(7) > .secondary > .action > span').click();
      cy.get('.input-text.qty:eq(0)').should('have.value','5');
    


    })

    it("CT007 - Validação da Mensagem de quando o produto é colocado no carrinho", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_823').click();
      cy.wait(1000)
      cy.get('#option-label-size-157-item-182').click()
      cy.get('#option-label-color-93-item-57').click()
      cy.get('#product-addtocart-button').click()
      cy.get('.message-success').should('be.visible')
      cy.get('.counter-number').should('have.text','1')


    })

    it("CT008 - Validação da apresentação do produto no carrinho - 1", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_823').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-182').click();
      cy.get('#option-label-color-93-item-57').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(1000);
      cy.get('.showcart').click();
      cy.get('#mini-cart > .item > :nth-child(1) > .product-item-details > .product-item-name > a').should('have.text','Thorpe Track Pant');

    })

    it("CT009 - Validação da apresentação do produto no carrinho - 2", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_823').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-182').click();
      cy.get('#option-label-color-93-item-57').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get(':nth-child(7) > .secondary > .action > span').click()
      cy.get('.item > .product-item-details > .product-item-name > a').should('have.text','Thorpe Track Pant');


    })

    it("CT010 - Validação da apresentação de múltiplos produtos no carrinho - 1", () => {
      cy.get('.home-main > .content > .action').click();
      cy.get('#product-item-info_44').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(1000);
      cy.visit('https://magento2-demo.magebit.com/collections/yoga-new.html');
      cy.get('#product-item-info_823').click();
      cy.wait(1000);
      cy.get('#option-label-size-157-item-182').click();
      cy.get('#option-label-color-93-item-57').click();
      cy.get('#product-addtocart-button').click();
      cy.wait(3000);
      cy.get('.showcart').click();
      cy.get('[data-role="product-item"][data-collapsible="true"] > :nth-child(1) > .product-item-details > .product-item-name > a').should('have.text','Thorpe Track Pant');
      cy.get('#mini-cart > li:nth-child(2) > div > div > strong > a').should('have.text','Didi Sport Watch');

    })

    it("CT011 - Validação da apresentação de múltiplos produtos no carrinho - 2", () => {
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
   
    





})
