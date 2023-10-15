import { at } from "cypress/types/lodash";

export const translateXRegex = (value: string | number) => {
    return new RegExp(`matrix\\(1, 0, 0, 1, ${value}, 0\\)`);
}

export const translateYRegex = (value: string | number) => {
    return new RegExp(`matrix\\(1, 0, 0, 1, 0, ${value}\\)`);
}

export const getAttributeRow = (attribute: string) => {
    return cy.get('.docblock-argstable').find('td').contains(attribute).parents('tr')
}

export const getSlideshowWidth = () => {
    return new Promise((resolve) => {
        cy.get('@slide').then(element => {
            // @ts-ignore
            resolve(element.width());
        });
    })
}
