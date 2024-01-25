// Overwrites native 'children' prototype.
// fix ie for react-inlinesvg, which use it
// Adds Document & DocumentFragment support for IE9 & Safari.
// Returns array instead of HTMLCollection.
/* eslint-disable */
(function (constructor) {
    if (
        Object.getOwnPropertyDescriptor(constructor.prototype, "children") ===
        undefined
    ) {
        Object.defineProperty(constructor.prototype, "children", {
            get() {
                let i = 0;
                let node;
                const nodes = this.childNodes;
                const children = [];
                while ((node = nodes[i++])) {
                    if (node.nodeType === 1) {
                        children.push(node);
                    }
                }
                return children;
            },
            configurable: true,
            enumerable: true,
        });
    }
    // @ts-ignore
})(window.Element);
/* eslint-enable */

export {};
