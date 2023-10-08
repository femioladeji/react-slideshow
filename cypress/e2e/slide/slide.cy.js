import { translateXRegex, getAttributeRow } from '../../support/utils';

describe('slide functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006/?path=/story/examples-slide--default');
        cy.frameLoaded("#storybook-preview-iframe");
        cy.iframe('#storybook-preview-iframe')
            .find('.react-slideshow-container')
            .as("slide")
    });

    it('loads the slide accurately', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.images-wrap').should('have.class', 'horizontal');
        cy.get('@slide').find('.images-wrap > div').should('have.length', 5);
        cy.get('[title="Go full screen [F]"]').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'width').and('match', /4840/)
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-968'))
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.class', 'active')
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.css', 'width').and('match', /968px/)
    });

    it('shows the arrow by default and hides it when the property is set to false', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.nav').should('have.length', 2);
        cy.get('@slide').find('.nav:first-of-type').should('have.attr', 'data-type', 'prev');
        cy.get('@slide').find('.nav:last-of-type').should('have.attr', 'data-type', 'next');
        cy.get('@slide').find('.nav:first-of-type').should('be.visible');
        cy.get('@slide').find('.nav:last-of-type').should('be.visible');
        // click on the arrows prop and set it to false
        getAttributeRow("arrows").find('button').click();
        cy.get('@slide').find('.nav').should('have.length', 0);
        // click the label to set it to true again
        getAttributeRow("arrows").find('label').click();
        cy.get('@slide').find('.nav').should('have.length', 2);
    });

    it('shows the indicator if the indicators prop is set to a truthy value', () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').next().should('not.exist');
        // change the indicators prop to truthy value
        getAttributeRow("indicators").find('button').click();
        // cy.get('div#root').debug();
        cy.get('@slide').next().should('exist');
        cy.get('@slide').next().should('have.class', 'indicators');
        cy.get('@slide').next().find('button').should('have.length', 3);
        // clicking on the second indicator should make the second slide active
        cy.get('@slide').next().find('li:nth-of-type(2) button').click();
        cy.get('[title="Go full screen [F]"]').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-1936'));
        // clicking on the third indicator should make the third slide active
        cy.get('@slide').next().find('li:nth-of-type(3) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-2904'));
        // clicking on the third indicator should make the third slide active
        cy.get('@slide').next().find('li:nth-of-type(1) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-968'));
    });

    it('setting infinite to false should prevent previous from working on first slide and next from working on last slide', () => {
        cy.get('@slide').should('exist');
        cy.get('[title="Go full screen [F]"]').click();
        // clicking on previous should work for now
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-2904'));
        // return back to first slide
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-968'));
        cy.get('[title="Exit full screen [F]"]').click();
        // click on the infinite prop and set it to false
        getAttributeRow("infinite").find('button').click();
        // now no need to render extra two slides
        cy.get('[title="Go full screen [F]"]').click();
        cy.get('@slide').find('.images-wrap > div').should('have.length', 3);
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('0'));
        cy.get('@slide').find('.nav:first-of-type').should('have.attr', 'disabled');
        // click next to go to last slide
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.wait(3000);
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('-1936'));
        cy.get('@slide').find('.nav:last-of-type').should('have.attr', 'disabled');
    });
});