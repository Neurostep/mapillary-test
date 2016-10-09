import App from "./App";
import Router from "./Router";

let app = new App(document.getElementById("demo"), {
    fakeUserAvatar: "../fake-avatar.png",
    activeItemKey: Router.getFragment(),
    onViewerMove: key => {
        Router.navigate(key);
        Router.check();
    }
});

Router.init();
Router.add(/(.*)/, key => {
    let item = app.setActiveItem(key, app.upNext.items);
    app.updateViewerDescription(item.data);
});
