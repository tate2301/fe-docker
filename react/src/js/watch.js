/**
 *
 * @param {Class} registry The React DOM Component Registry
 */
const watch = (registry) => {
    const body = registry.element !== document ? registry.element : document.querySelector('body');

    const config = {
        childList: true,
        subtree: true,
    };

    const callback = (mutationsList) => {
        mutationsList.forEach((mutation) => {
            if (mutation.addedNodes.length === 1) {
                const { addedNodes } = mutation;
                addedNodes.forEach((addedNode) => {
                    if (addedNode.nodeType === 1) {
                        registry.init(addedNode);
                    }
                });
            }
        });
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    observer.observe(body, config);
};

const authorWatch = (registry) => {
    if (typeof CQ !== 'undefined') {
        watch(registry);
    }
};

export default authorWatch;
