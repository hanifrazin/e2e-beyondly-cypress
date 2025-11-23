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

        // --- CART ---
        cy.get('.chakra-tabs__tab-panels.css-8atqhb')
            .scrollIntoView()
            .should('be.visible')
            .as('card-produk-baru')
        // cy.wait(3000)
        cy.get('@card-produk-baru')
            .find('.slick-list div[data-index="0"]')
            .first()
            .click();
        cy.url().should('include','/product-details');
        cy.get('h1.productDetail_productDetail-title__PSSNs')
            .invoke('text')
            .as('nmBarang');
        cy.get('.chakra-editable__preview')
            .invoke('text')
            .then((text) => Number(text))
            .as('totalBrg')
        cy.get('.productDetail_productDetail-stock__HPRXJ')
            .find('span[style*="font-weight: 500"]')
            .invoke('text')
            .then((text) => Number(text.replace(/[^\d]/g, '')))
            .as('nominalBayar');
        cy.get('#productDetail-button-cart')
            .click({ force: true });
        cy.wait(3000);
        cy.get('.HeaderQbee_total-cart-num__JcmEp')
            .invoke('text')
            .then((text) => {
                expect(Number(text)).to.greaterThan(0);
            })
        cy.get('.HeaderQbee_total-cart__Acy0A')
            .find('svg')
            .click({ force: true });
        cy.get('p[style="cursor: pointer; z-index: 999;"]')
            .invoke('text')
            .then((text) => {
                cy.get('@nmBarang').then((nmBarang) => {
                    expect(text).to.eq(nmBarang)
                })
            })
        cy.contains("Rp")
            .invoke('text')
            .then((text) => {
               cy.get('@nominalBayar').then((nominal) => {
                   expect(Number(text.replace(/[^\d]/g, ''))).to.eq(nominal);
               })
            })
        cy.get('.style_title-wrapper__9CYu2')
            .find('svg')
            .first()
            .click();


        // --- CHECKOUT - CEK PESANAN ---
        cy.get('#productDetail-button-buy').click({ force: true });


        
    })


});