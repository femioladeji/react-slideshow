export const translateXRegex = (value: string | number) => {
    return new RegExp(`matrix\\(1, 0, 0, 1, ${value}, 0\\)`);
}

export const translateYRegex = (value: string | number) => {
    return new RegExp(`matrix\\(1, 0, 0, 1, 0, ${value}\\)`);
}