import { translateXRegex } from '../../support/utils';

describe('introduction slide functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006');
        cy.frameLoaded("#storybook-preview-iframe");
        cy.get('[title="Go full screen [F]"]').click();
        cy.iframe('#storybook-preview-iframe')
            .find('.react-slideshow-container')
            .as("slide")
    })

    it('loads the introduction slide and the slide with slide 1', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.images-wrap').should('have.class', 'horizontal');
        cy.get('@slide').find('.images-wrap > div').should('have.length', 5);
        cy.get('@slide').find('.images-wrap').should('have.css', 'width').and('match', /4590px/)
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-918'))
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.class', 'active')
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.css', 'width').and('match', /918px/)
    });

    it('loads the next slides when the next button is clicked', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-1836'));
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-2754'));
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-918'));
    });

    it('loads the previous slides when the previous button is clicked', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-2754'));
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-1836'));
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-918'));
    });

    it('allows dragging the slide to go next and back', () => {
        cy.get('@slide').should('exist');
        // before the move
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-918'));
        cy.get('@slide')
            .trigger('mousedown', { which: 1, clientX: 450 })
            .trigger('mousemove', { clientX: 200 })
            .trigger('mouseup', { force: true });
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-1836'));

        cy.get('@slide')
            .trigger('mousedown', { which: 1, clientX: 200 })
            .trigger('mousemove', { clientX: 450 })
            .trigger('mouseup', { force: true });
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-918'));
    });
});