Olá, eu sou o Guilherme Branger e foi proposto um desafio de automação de testes utilizando o Cypress para mim. O desafio consistia em apresentar cenários de teste para o site (https://magento.nublue.co.uk/). Eu utilizei um segundo endereço o projeto da automação: (https://magento2-demo.magebit.com/) pois o primeiro endereço aparentemente apresenta uma segurança para não ser acessado por bots ou por softwares automatizados.

Para que os testes sejam rodados, será necessário:

1) A instalação do Node.js (https://nodejs.org/en);
2) Baixar o repositório do projeto;
3) Fazer a instalação do Cypress (https://www.cypress.io) diretamente no terminal utilizando o comando "npm i cypress";
4) Fazer a instalação da biblioteca faker (https://fakerjs.dev/guide/), responsável pelos dados aleatórios utilizados para preencher os formulários utilizando o comando "npm install @faker-js/faker --save-dev";
5) Abrir o projeto de automação no cypress utilizando o comando "npx cypress open";
6) Selecionar os testes e2e;
7) Selecionar o navegador "Google Chrome".

A partir desse ponto é só selecionar um dos specs para os testes sejam automaticamente executados, são eles:
1) cadastro.cy.js: Casos de teste da tela de cadastro do site;
2) login.cy.js: Casos de teste da tela de login do site;
3) carrinho.cy.js: Casos de teste relacionados a colocar itens do site no carrinho e comportamentos auxiliares;
4) carrinho2.cy.js: Continuação dos casos de teste relacionados a colocar itens do site no carrinho e comportamentos auxiliares;
5) checkout.cy.js: Casos de teste relacionados com o sistema de checkout e finalização de compra do site SEM FAZER LOGIN;
6) checkout2.cy.js: Continuação dos Casos de teste relacionados com o sistema de checkout e finalização de compra do site SEM FAZER LOGIN;
7) checkout2.cy.js: Casos de teste relacionados com o sistema de checkout e finalização de compra do site APÓS FAZER LOGIN; Antes de rodar esse suite, é necessário a limpeza do carrinho do usuário de demonstração.


Alguns erros podem acontecer durante os testes por questões de conectividade com o ambiente da aplicação ou da própria internet do usuário, os testes podem ser repetidos à vontade e, em sua grande maioria, entregarão resultados de sucesso. Você pode precisar colocar o endereço da aplicação na lista de confiança de seu antivírus/firewall.

Se surgir qualquer dúvida, sugestão ou crítica construtiva, podem me contatar pelo meu linkedIN: https://www.linkedin.com/in/gbranger/