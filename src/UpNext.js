import * as vd from "virtual-dom";
import UpNextItem from "./UpNextItem";

export default class UpNext {
    constructor(mapillaryClientId, count, clickHandler = () => {}) {
        this.data = {};
        this.items = this.initItems(count, clickHandler);
    }

    render() {
        return vd.h("div.up-next.left",
            this.items.map(
                (item, i) => vd.h(`div.up-next-item-${i}`, item.render())
            )
        );
    }

    initItems(count, clickHandler) {
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push(new UpNextItem(clickHandler));
        }
        return items;
    }

    fetchData() {
        return fetch("https://a.mapillary.com/v2/search/s/ul?max_lat=180&max_lon=90&min_lat=-90&min_lon=-180&limit=10&starred=true&client_id=OFQtWkUwVEdHa3pMSWZ0cVpWVi1RZzo3NjVkYmU2NDM3ZTMzNGI0")
        .then(response => response.json())
    }

}