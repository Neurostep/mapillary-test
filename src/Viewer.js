import * as vd from "virtual-dom";
import * as Mapillary from "mapillary-js";
import createElement from "virtual-dom/create-element";

export default class Viewer {
    constructor(mapillaryURL, mapillaryClientId, { fakeUserAvatar = "" }) {
        this.mapillary = null;
        this.dom = this.render();
        this.mapillaryURL = mapillaryURL;
        this.mapillaryClientId = mapillaryClientId;
        this.fakeUserAvatar = fakeUserAvatar;
    }

    render() {
        return vd.h("div.viewer.left", [
            vd.h("div.view#mapillary-view"),
            vd.h("div.description-container")
        ]);
    }

    renderDescription(data) {
        let src = `${this.mapillaryURL}/u/${data.user}/profile.png?client_id=${this.mapillaryClientId}`;
        return vd.h("div.description", [
            vd.h("div.user", [
                vd.h("div.user-avatar.left", [
                    vd.h("img", {
                        src,
                        onerror: (e) => {
                            // eslint-disable-next-line no-param-reassign
                            e.target.src = this.fakeUserAvatar;
                        }
                    })
                ]),
                vd.h("div.user-info.left", [
                    vd.h("div.name", [`Author: ${data.user}`]),
                    vd.h("div.likes", [`Views: ${data.views}`])
                ]),
                vd.h("div.clear")
            ])
        ]);
    }

    updateDescription(data, target) {
        let descrEl = target.querySelector(`.description-container`);
        let currentDescription = descrEl.querySelector(".description");
        if (currentDescription) {
            descrEl.removeChild(currentDescription);
        }
        descrEl.appendChild(
            createElement(this.renderDescription(data))
        );
    }

    initMapillaryViewer(imageId) {
        this.mapillary = new Mapillary.Viewer(
            "mapillary-view",
            this.mapillaryClientId,
            imageId,
            { cover: false }
        );
    }
}
