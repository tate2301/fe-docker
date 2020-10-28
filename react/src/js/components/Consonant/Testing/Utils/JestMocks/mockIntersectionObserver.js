export default ({ observe = callback => callback(), intersectionRatio = 1 } = {}) => {
    class IntersectionObserverMock {
        constructor(callback) {
            this.callback = callback;
            this.observeElementsProps = [{ intersectionRatio }];
        }

        observe = () => observe(() => this.callback(this.observeElementsProps));
    }

    const properties = {
        writable: true,
        configurable: true,
        value: IntersectionObserverMock,
    };

    Object.defineProperty(window, 'IntersectionObserver', properties);
    Object.defineProperty(global, 'IntersectionObserver', properties);
};
