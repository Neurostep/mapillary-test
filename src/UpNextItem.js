import * as vd from "virtual-dom";
import createElement from "virtual-dom/create-element";

export default class UpNextItem {
    constructor() {
        this.data = null;
    }

    update(data) {
        this.data = data;
        return this;
    }

    renderTo(element) {
        return element.appendChild(createElement(this.render()));
    }

    render() {
        return !!this.data
            ? vd.h("div.up-next-item", [
                vd.h("div.up-next-item-thumbnail", [
                    vd.h("img", {
                        src: `https://d1cuyjsrcm0gby.cloudfront.net/${this.data.mkey}/thumb-320.jpg`
                    })
                ]),
                vd.h("div.up-next-item-description", [
                    vd.h("div.up-next-item-description-title"),
                    vd.h("div.up-next-item-description-author"),
                    vd.h("div.up-next-item-description-views")
                ])
            ])
            : vd.h("div.up-next-item-loading", "Loading...");
    }
}
