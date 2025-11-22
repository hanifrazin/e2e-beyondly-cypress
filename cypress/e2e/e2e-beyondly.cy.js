describe('Automation E2E Beyondly Ecommerce', () => {
    const base_url = Cypress.env('base_url');
    let dataUser = {};

    before(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();

        cy.fixture('data.json').then((data) => {
            dataUser = data;
        })
    })

    it('E2E process from login to checkout (excluding payment)', () => {
        // --- LOGIN ---
        cy.visit(base_url);
        cy.contains('header p', 'Ketahui aroma yang cocok untuk kepribadianmu')
            .parent()           
            .find('svg')        
            .click({ force: true });
        cy.get('[href="\/login"]').click();
        cy.url().should('eq',`${base_url}/login`);
        cy.get('#page-login__tabs-number__input-number').clear().type(dataUser.nohp);
        cy.get('#page-login__tabs-email__input-password').clear().type(dataUser.password);
        cy.get('#page-login__button-login').click();
        cy.url().should('eq',`${base_url}/home`);
    })


});