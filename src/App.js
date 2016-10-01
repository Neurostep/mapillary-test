import * as vd from "virtual-dom";
import createElement from "virtual-dom/create-element";
import Viewer from "./Viewer";
import UpNext from "./UpNext";
import Router from "./Router";

export default class App {
    constructor(domTarget, mapillaryClientId) {
        this.domTarget = domTarget;
        this.viewer = new Viewer(mapillaryClientId);
        this.upNext = new UpNext(mapillaryClientId, 10);
        this.domTarget.appendChild(
            createElement(this.render())
        );
        this.initMapillary();
        this.initUpNextItems();
        Router.init();
    }

    initUpNextItems() {
        return this.upNext.fetchData()
            .then(json =>
                json.ss.map(
                    (item, i) => this.upNext.items[i].update(item).renderTo(
                        this.domTarget.querySelector(`.up-next-item-${i}`)
                    )
                )
            );
    }

    initMapillary(mapillaryClientId) {
        return this.viewer.initMapillaryViewer(mapillaryClientId);
    }

    render() {
        return vd.h("div.app-container", [
            vd.h("div.app", [
                this.viewer.render(),
                this.upNext.render()
            ])
        ]);
    }
}
