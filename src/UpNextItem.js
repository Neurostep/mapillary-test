import * as vd from "virtual-dom";
import createElement from "virtual-dom/create-element";

export default class UpNextItem {
    constructor(clickHandler) {
        this.data = null;
        this.clickHandler = clickHandler;
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
            ? vd.h("div.up-next-item", {
                onclick: (ev) => {
                    console.log(ev);
                    this.clickHandler(this.data);
                }
            }, [
                vd.h("div.up-next-item-thumbnail.left", [
                    vd.h("img", {
                        src: `https://d1cuyjsrcm0gby.cloudfront.net/${this.data.mkey}/thumb-320.jpg`
                    })
                ]),
                vd.h("div.up-next-item-description.left", [
                    vd.h("div.up-next-item-description-author", [`Author: ${this.data.user}`]),
                    vd.h("div.up-next-item-description-views", [`Views: ${this.data.views}`])
                ]),
                vd.h("div.clear")
            ])
            : vd.h("div.up-next-item-loading", "Loading...");
    }
}
