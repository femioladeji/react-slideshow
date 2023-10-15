import { translateXRegex, getAttributeRow, getSlideshowWidth } from '../../support/utils';

describe('slide functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006/?path=/story/examples-slide--default');
        cy.frameLoaded("#storybook-preview-iframe");
        cy.iframe('#storybook-preview-iframe')
            .find('.react-slideshow-container')
            .as("slide")
    });

    it('loads the slide accurately', async () => {
        cy.get('@slide').should('exist');
        const width = await getSlideshowWidth();
        cy.get('@slide').invoke('width').should('gt', 0);
        cy.get('@slide').find('.images-wrap').should('have.class', 'horizontal');
        cy.get('@slide').find('.images-wrap > div').should('have.length', 5);
        cy.get('@slide').find('.images-wrap').should('have.css', 'width').and('match', new RegExp(`${width * 5}`))
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-1 * width))
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.class', 'active')
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.css', 'width').and('match', new RegExp(width))
    });

    it('shows the arrow by default and hides it when the property is set to false', async () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').invoke('width').should('gt', 0);
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

    it('shows the indicator if the indicators prop is set to a truthy value', async () => {
        cy.get('@slide').should('exist');
        const width = await getSlideshowWidth();
        cy.get('@slide').invoke('width').should('gt', 0);
        cy.get('@slide').next().should('not.exist');
        // change the indicators prop to truthy value
        getAttributeRow("indicators").find('button').click();
        // cy.get('div#root').debug();
        cy.get('@slide').next().should('exist');
        cy.get('@slide').next().should('have.class', 'indicators');
        cy.get('@slide').next().find('button').should('have.length', 3);
        // clicking on the second indicator should make the second slide active
        cy.get('@slide').next().find('li:nth-of-type(2) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-2 * width));
        // clicking on the third indicator should make the third slide active
        cy.get('@slide').next().find('li:nth-of-type(3) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-3 * width));
        // clicking on the third indicator should make the third slide active
        cy.get('@slide').next().find('li:nth-of-type(1) button').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-1 * width));
    });

    it('setting infinite to false should prevent previous from working on first slide and next from working on last slide', async () => {
        cy.get('@slide').should('exist');
        const width = await getSlideshowWidth();
        cy.get('@slide').invoke('width').should('gt', 0);
        // clicking on previous should work for now
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-3 * width));
        // return back to first slide
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-1 * width));
        // click on the infinite prop and set it to false
        getAttributeRow("infinite").find('button').click();
        // now no need to render extra two slides
        cy.get('@slide').find('.images-wrap > div').should('have.length', 3);
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex('0'));
        cy.get('@slide').find('.nav:first-of-type').should('have.attr', 'disabled');
        // click next to go to last slide
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.wait(3000);
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-2 * width));
        cy.get('@slide').find('.nav:last-of-type').should('have.attr', 'disabled');
    });
});
