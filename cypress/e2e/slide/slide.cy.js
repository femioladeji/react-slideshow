import { translateXRegex } from '../../support/utils';

describe('slide functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006/?path=/story/examples-slide--default');
        cy.frameLoaded("#storybook-preview-iframe");
        cy.iframe('#storybook-preview-iframe')
            .find('.react-slideshow-container')
            .as("slide")
    })

    it('loads the slide accurately', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.images-wrap').should('have.class', 'horizontal');
        cy.get('@slide').find('.images-wrap > div').should('have.length', 5);
        cy.get('@slide').find('.images-wrap').should('have.css', 'width').and('match', /3640/)
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-728'))
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.class', 'active')
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.css', 'width').and('match', /728px/)
    });

    it('shows the arrow by default and hides it when the property is set to false', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.nav').should('have.length', 2);
        cy.get('@slide').find('.nav:first-of-type').should('have.attr', 'data-type', 'prev');
        cy.get('@slide').find('.nav:last-of-type').should('have.attr', 'data-type', 'next');
        cy.get('@slide').find('.nav:first-of-type').should('be.visible');
        cy.get('@slide').find('.nav:last-of-type').should('be.visible');

        // click on the arrows prop and set it to false
        cy.get('.docblock-argstable').find('tr:nth-of-type(12)').find('button').click();
        cy.get('@slide').find('.nav').should('have.length', 0);
        // click the label to set it to true again
        cy.get('.docblock-argstable').find('tr:nth-of-type(12)').find('label').click();
        cy.get('@slide').find('.nav').should('have.length', 2);
    });

    it('shows the indicator if the indicators prop is set to a truthy value', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-728'))
        cy.get('@slide').next().should('not.exist');
        // change the indicators prop to truthy value
        cy.get('.docblock-argstable').find('tr:nth-of-type(9)').find('button').click();
        // cy.get('div#root').debug();
        cy.get('@slide').next().should('exist');
        cy.get('@slide').next().should('have.class', 'indicators');
        cy.get('@slide').next().find('button').should('have.length', 3);
        // clicking on the second indicator should make the second slide active
        cy.get('@slide').next().find('li:nth-of-type(2) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-1456'));
        // clicking on the third indicator should make the third slide active
        cy.get('@slide').next().find('li:nth-of-type(3) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-2184'));
        // clicking on the third indicator should make the third slide active
        cy.get('@slide').next().find('li:nth-of-type(1) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-728'));
    });

    it('setting infinite to false should prevent previous from working on first slide and next from working on last slide', () => {
        cy.get('@slide').should('exist');
        // clicking on previous should work for now
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-2184'));
        // return back to first slide
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-728'));
        // click on the infinite prop and set it to false
        cy.get('.docblock-argstable').find('tr:nth-of-type(14)').find('button').click();
        // now no need to render extra two slides
        cy.get('@slide').find('.images-wrap > div').should('have.length', 3);
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('0'));
        cy.get('@slide').find('.nav:first-of-type').should('have.attr', 'disabled');
        // click next to go to last slide
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.wait(3000);
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-1456'));
        cy.get('@slide').find('.nav:last-of-type').should('have.attr', 'disabled');
    });
});
