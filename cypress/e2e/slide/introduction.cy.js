import { getSlideshowWidth, translateXRegex } from '../../support/utils';

describe('introduction slide functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006');
        cy.frameLoaded("#storybook-preview-iframe");
        cy.wait(2000);
        cy.iframe('#storybook-preview-iframe')
            .find('.react-slideshow-container')
            .as("slide")
    })

    it('loads the introduction slide and the slide with slide 1', async () => {
        cy.get('@slide').should('exist');
        cy.get('@slide').find('.images-wrap').should('have.class', 'horizontal');
        const width = await getSlideshowWidth();
        cy.get('@slide').invoke('width').should('gt', 0);
        cy.get('@slide').find('.images-wrap > div').should('have.length', 5);
        cy.get('@slide').find('.images-wrap').should('have.css', 'width').and('match', new RegExp(`${width * 5}px`))
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(`-${width}`))
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.class', 'active')
        cy.get('@slide').find('.images-wrap > div:nth-of-type(2)').should('have.css', 'width').and('match', new RegExp(`${width}px`))
    });

    it('loads the next slides when the next button is clicked', async () => {
        cy.get('@slide').should('exist');
        const width = await getSlideshowWidth();
        cy.get('@slide').invoke('width').should('gt', 0);
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-2 * width));
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-3 * width));
        cy.get('@slide').find('.nav:last-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-1 * width));
    });

    it('loads the previous slides when the previous button is clicked', async () => {
        cy.get('@slide').should('exist');
        const width = await getSlideshowWidth();
        cy.get('@slide').invoke('width').should('gt', 0);
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-3 * width));
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-2 * width));
        cy.get('@slide').find('.nav:first-of-type').click();
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-1 * width));
    });

    it('allows dragging the slide to go next and back', async () => {
        cy.get('@slide').should('exist');
        const width = await getSlideshowWidth();
        cy.get('@slide').invoke('width').should('gt', 0);
        // before the move
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-1 * width));
        cy.get('@slide')
            .trigger('mousedown', { which: 1, clientX: 450 })
            .trigger('mousemove', { clientX: 200 })
            .trigger('mouseup', { force: true });
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-2 * width));

        cy.get('@slide')
            .trigger('mousedown', { which: 1, clientX: 200 })
            .trigger('mousemove', { clientX08: 450 })
            .trigger('mouseup', { force: true });
        cy.get('@slide').find('.images-wrap').should('have.css', 'transform').and('match', translateXRegex(-1 * width));
    });
});