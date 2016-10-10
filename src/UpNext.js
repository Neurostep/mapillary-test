import "whatwg-fetch";
import * as vd from "virtual-dom";
import UpNextItem from "./UpNextItem";

export default class UpNext {
    constructor(mapillaryURL, mapillaryClientId, options = {
        count: 10,
        clickHandler: () => {}
    }) {
        this.data = {};
        this.options = options;
        this.mapillaryURL = mapillaryURL;
        this.mapillaryClientId = mapillaryClientId;
        this.items = this.initItems();
    }

    render() {
        return vd.h("div.up-next.left",
            this.items.map(
                (item, i) => vd.h(`div.up-next-item-${i}`, item.render())
            )
        );
    }

    initItems() {
        let items = [];
        for (let i = 0; i < this.options.count; i++) {
            items.push(new UpNextItem(this.options.clickHandler));
        }
        return items;
    }

    fetchData() {
        let { count } = this.options;
        let { mapillaryURL, mapillaryClientId } = this;
        let url = `${mapillaryURL}/search/s/ul` +
            "?max_lat=180&max_lon=90&min_lat=-90&min_lon=-180" +
            `&limit=${count}&starred=true&client_id=${mapillaryClientId}`;
        return fetch(url)
            .then(response => response.json());
    }
}
