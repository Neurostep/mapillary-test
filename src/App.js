import * as vd from "virtual-dom";
import createElement from "virtual-dom/create-element";
import Viewer from "./Viewer";
import UpNext from "./UpNext";
import Router from "./Router";

export default class App {
    constructor(domTarget, {
        mapillaryURL = "https://a.mapillary.com/v2",
        mapillaryClientId = "OFQtWkUwVEdHa3pMSWZ0cVpWVi1RZzo3NjVkYmU2NDM3ZTMzNGI0",
        upNextCount = 10,
        fakeUserAvatar = "",
        routerRoot = ""
    }) {
        this.domTarget = domTarget;
        this.viewer = new Viewer(mapillaryURL, mapillaryClientId, { fakeUserAvatar });
        this.upNext = new UpNext(mapillaryURL, mapillaryClientId, {
            count: upNextCount,
            clickHandler: (item) => {
                this.viewer.mapillary.moveToKey(item.mkey)
                    .then(() => {
                        Router.navigate(item.mkey);
                        Router.check();
                    });
            }
        });
        this.domTarget.appendChild(
            createElement(this.render())
        );
        this.initUpNextItems();
        Router.init(routerRoot);
        Router.add(/(.*)/, key => {
            let idx = 0;
            this.upNext.items.forEach((item, id) => {
                if (item.data.mkey === key) {
                    idx = id;
                    let currentActive = this.domTarget.querySelector(".active");
                    let el = this.domTarget.querySelector(`.up-next-item-${idx}`);
                    currentActive.classList.remove("active");
                    el.classList.add("active");
                }
            });
            let descrEl = this.domTarget.querySelector(`.description-container`);
            descrEl.removeChild(descrEl.querySelector(".description"));
            descrEl.appendChild(
                createElement(this.viewer.renderDescription(this.upNext.items[idx].data))
            );
        });
    }

    initUpNextItems() {
        return this.upNext.fetchData()
            .then(json => {
                let activeKey = Router.getFragment();
                let idx = 0;
                json.ss.forEach((item, id) => {
                    if (item.mkey === activeKey) {
                        idx = id;
                    }
                });
                this.initMapillary(json.ss[idx].mkey);
                let descrEl = this.domTarget.querySelector(`.description-container`);
                descrEl.appendChild(
                    createElement(this.viewer.renderDescription(json.ss[idx]))
                );
                // eslint-disable-next-line no-param-reassign
                json.ss[idx].active = true;
                return json;
            })
            .then(json =>
                json.ss.forEach((item, i) => {
                    let parent = this.domTarget.querySelector(`.up-next-item-${i}`);
                    if (item.active) {
                        parent.classList.add("active");
                    }
                    parent.removeChild(parent.querySelector(".up-next-item-loading"));
                    this.upNext.items[i].update(item).renderTo(parent);
                })
            );
    }

    initMapillary(imageId) {
        return this.viewer.initMapillaryViewer(imageId);
    }

    render() {
        return vd.h("div.app-container", [
            vd.h("div.app", [
                this.viewer.render(),
                this.upNext.render(),
                vd.h("div", {
                    style: { clear: "both" }
                })
            ])
        ]);
    }
}
