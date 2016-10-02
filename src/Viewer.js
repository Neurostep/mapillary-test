import * as Mapillary from "mapillary-js";
import * as vd from "virtual-dom";

export default class Viewer {
    constructor(mapillaryClientId) {
        this.mapillary = null;
        this.dom = this.render();
        this.mapillaryClientId = mapillaryClientId;
    }

    render() {
        return vd.h("div.viewer.left", [
            vd.h("div.view#mapillary-view"),
            vd.h("div.description-container")
        ]);
    }

    renderDescription(data) {
        return vd.h("div.description", [
            vd.h("div.user", [
                vd.h("div.user-avatar.left", [
                    vd.h("img", {
                        src: `https://a.mapillary.com/v2/u/${data.user}/profile.png?client_id=OFQtWkUwVEdHa3pMSWZ0cVpWVi1RZzo3NjVkYmU2NDM3ZTMzNGI0`,
                        onerror: (e) => {
                            e.target.src = "../fake-avatar.png";
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

    initMapillaryViewer(imageId) {
        this.mapillary = new Mapillary.Viewer(
            "mapillary-view",
            this.mapillaryClientId,
            imageId,
            { cover: false }
        );
    }
}
