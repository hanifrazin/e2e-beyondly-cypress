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
        cy.get('button').contains('Hapus semua').click();
        cy.get('.chakra-text.styles_popup-delete__title__cMWtl.css-0').contains('Hapus semua pesanan dari Keranjang').should('be.visible');
        cy.get('.chakra-button.styles_popup-delete__button__i5ksa.css-2ghkq0').click();
        cy.get('.style_title-wrapper__9CYu2')
            .find('svg')
            .first()
            .click();

        cy.get('#productDetail-button-buy').click({ force: true });

        // --- CHECKOUT - CEK PESANAN ---
        cy.url().should('include','/checkout/shipping');
        cy.get('.styles_pickDelivery-desc-h1__r3Qjk').click();
        cy.get('#chakra-modal--header-22').contains('Layanan Pengiriman').should('be.visible');
        cy.get('div:nth-child(2) > label.styles_regular-delivery-content__NySsb').first().click();
        cy.get('div.pickCourier_courier-container__s4da6.css-0').first().click();
        cy.get('.chakra-text.styles_pickDelivery-desc-h1__r3Qjk.css-0')
            .eq(0)
            .invoke('text')
            .as('kurir');
        cy.get('.chakra-text.styles_pickDelivery-desc-h1__r3Qjk.css-0')
            .eq(1)
            .invoke('text')
            .then((text) => Number(text.replace(/[^\d]/g, '')))
            .as('ongkir');
        cy.wait(1000);
        cy.get('.styles_checkout-summary-total__9WH9V')
            .invoke('text')
            .then((text) => {
                const totalSummary = Number(text.replace(/[^\d]/g, ''));

                cy.get('@nominalBayar').then((nominal) => {
                    cy.get('@ongkir').then((ongkir) => {
                        const totalAll = nominal + ongkir;
                        expect(totalAll).to.eq(totalSummary);
                    });
                });
            });
        cy.get('button').contains('Pilih Pembayaran').click();

        // --- CHECKOUT - PILIH PEMBAYARAN ---
        cy.url().should('include','/checkout/payment');
        cy.url()
            .then((url) => url.split('/').pop())
            .as('invoiceNo');
        cy.get('.style_title__1KaOz').contains('Transfer bank').should('be.visible');
        cy.get('#accordion-button-4').first().click();
        cy.get('.style_data-wrapper__wXfEb')
            .eq(2)
            .contains('Mandiri Virtual Account')
            .should('be.visible')
            .first()
            .click();
        cy.get('.style_payment-summary-total__kXrym')
            .invoke('text')
            .then((text) => {
                const totalSummary = Number(text.replace(/[^\d]/g, ''));

                cy.get('@nominalBayar').then((nominal) => {
                    cy.get('@ongkir').then((ongkir) => {
                        const totalAll = nominal + ongkir;
                        expect(totalAll).to.eq(totalSummary);
                    });
                });
            });
        cy.get('button').contains('Bayar pesanan')
            .should('be.visible')
            .and('not.be.disabled')
            .click();
        cy.get('@invoiceNo').then((inv) => {
            cy.url().should('include',`/checkout/payment-detail/${inv}`);
        });
        cy.get('.chakra-input.css-35gjr8')
        
    })


});