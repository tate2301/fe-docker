export const getItemsRange = ({ page, itemsPerPage }) => {
    const to = page * itemsPerPage;
    const from = to - (itemsPerPage - 1);

    return `${from}-${to} of`;
};

export const createEvent = (element, nodeValue) => ({
    preventDefault: () => {},
    target: {
        firstChild: { nodeValue },
        classList: {
            contains: className => element.hasClass(className),
        },
    },
});
