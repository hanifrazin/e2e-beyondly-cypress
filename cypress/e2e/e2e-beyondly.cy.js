describe('Automation E2E Beyondly Ecommerce', () => {
    let dataUser = {};

    before(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();

        cy.fixture('data.json').then((data) => {
            dataUser = data;
        })
    })


});