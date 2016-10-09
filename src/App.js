import * as vd from "virtual-dom";
import createElement from "virtual-dom/create-element";
import Viewer from "./Viewer";
import UpNext from "./UpNext";

export default class App {
    constructor(domTarget, {
        mapillaryURL = "https://a.mapillary.com/v2",
        mapillaryClientId = "OFQtWkUwVEdHa3pMSWZ0cVpWVi1RZzo3NjVkYmU2NDM3ZTMzNGI0",
        upNextCount = 10,
        fakeUserAvatar = "",
        activeItemKey = "",
        onViewerMove = () => {}
    }) {
        this.domTarget = domTarget;
        this.viewer = new Viewer(mapillaryURL, mapillaryClientId, { fakeUserAvatar });
        this.upNext = new UpNext(mapillaryURL, mapillaryClientId, {
            count: upNextCount,
            clickHandler: ({ mkey }) =>
                this.viewer.mapillary.moveToKey(mkey)
                    .then(() => onViewerMove(mkey))
        });
        this.domTarget.appendChild(
            createElement(this.render())
        );
        this.initUpNextItems(activeItemKey);
    }

    initUpNextItems(activeKey = "") {
        return this.upNext.fetchData()
            .then(json => {
                json.ss.forEach((item, i) => {
                    let parent = this.domTarget.querySelector(`.up-next-item-${i}`);
                    parent.removeChild(parent.querySelector(".up-next-item-loading"));
                    this.upNext.items[i].update(item).renderTo(parent);
                });
                let activeItem = this.setActiveItem(activeKey, this.upNext.items);
                this.updateViewerDescription(activeItem.data);
                this.initMapillary(activeItem.data.mkey);
            });
    }

    setActiveItem(key = "", items = []) {
        let idx = 0;
        items.forEach((item, id) => {
            if (item.data.mkey === key) {
                idx = id;
            }
        });
        let el = this.domTarget.querySelector(`.up-next-item-${idx}`);
        let currentActive = this.domTarget.querySelector(".active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        el.classList.add("active");
        return items[idx];
    }

    updateViewerDescription(data) {
        return this.viewer.updateDescription(data, this.domTarget);
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
