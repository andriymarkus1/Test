export function getBackgroundColor(status) {
    let backgroundColor;
    switch (status) {
        case "в плані":
            backgroundColor = 'Turquoise';
            break;
        case "готовий до будівництва":
            backgroundColor = 'Yellow';
            break;
        case "будується":
            backgroundColor = '#36c136';
            break;
        case "не будується":
            backgroundColor = 'LightCoral';
            break;
        default:
            backgroundColor = 'none';
    }
    return backgroundColor;
}

export function getBorderColor(time) {
    let borderColor;
    switch (time) {
        case "в межах часу":
            borderColor = '#36c136';
            break;
        case "не в межах часу":
            borderColor = '#b31717';
            break;
        default:
            borderColor = 'none';
    }
    return borderColor;
}
