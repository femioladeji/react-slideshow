import { translateYRegex } from '../../support/utils';

describe('slide functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006/?path=/story/examples-vertical--page');
        cy.frameLoaded("#storybook-preview-iframe");
        cy.iframe('#storybook-preview-iframe')
            .find('.react-slideshow-container')
            .as("slide")
    })

    it('loads the vertical slide and the slide with slide 1', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.images-wrap').should('have.class', 'vertical');
        cy.get('@slide').find('.images-wrap > div').should('have.length', 7);
        cy.get('@slide').find('.images-wrap').should('have.css', 'height').and('match', /2450px/)
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex(-350))
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.class', 'active')
    });

    it('loads the next slides when the next button is clicked', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.nav').last().click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-700'));
        cy.get('@slide').find('.nav').last().click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-1050'));
        cy.get('@slide').find('.nav').last().click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-1400'));
    });

    it('loads the previous slides when the previous button is clicked', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.nav').first().click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-1750'));
        cy.get('@slide').find('.nav').first().click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-1400'));
        cy.get('@slide').find('.nav').first().click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-1050'));
    });

    it('allows dragging the slide to go next and back', () => {
        cy.get('@slide').should('exist');
        // before the move
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-350'));
        cy.get('@slide')
            .trigger('mousedown', { which: 1, clientY: 344 })
            .trigger('mousemove', { clientY: 200 })
            .trigger('mouseup', { force: true });
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-700'));
        cy.wait(2000);
        cy.get('@slide')
            .trigger('mousedown', { which: 1, clientY: 200 })
            .trigger('mousemove', { clientY: 344 })
            .trigger('mouseup', { force: true });
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateYRegex('-350'));
    });
});