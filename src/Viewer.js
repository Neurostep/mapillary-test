import * as Mapillary from "mapillary-js";
import * as vd from "virtual-dom";

export default class Viewer {
    constructor(mapillaryClientId) {
        this.dom = this.render();
        this.mapillaryClientId = mapillaryClientId;
    }

    render() {
        return vd.h("div.viewer", [
            vd.h("div.view#mapillary-view"),
            vd.h("div.description", [
                vd.h("div.title"),
                vd.h("div.user", [
                    vd.h("div.user-avatar"),
                    vd.h("div.user-info", [
                        vd.h("div.name")
                    ])
                ])
            ])
        ]);
    }

    initMapillaryViewer() {
        return new Mapillary.Viewer(
            "mapillary-view",
            this.mapillaryClientId,
            "1h21g7fUhtjL1gDyxEsEMQ"
        );
    }
}
