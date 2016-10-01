function clearSlashes(str) {
    return str.replace(/\/$/, "").replace(/^\//, "");
}

const Router = {
    routes: [],
    init() {
        this.root = "/";
    },

    add(re, handler) {
        this.routes.push({ re, handler });
        return this;
    },

    check() {
        let fragment = this.getFragment();
        for (let i = 0; i < this.routes.length; i++) {
            let match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    },

    navigate(path = "") {
        history.pushState(null, null, this.root + clearSlashes(path));
        return this;
    },

    getFragment() {
        return clearSlashes(decodeURIComponent(location.pathname));
    }
};

export default Router;
