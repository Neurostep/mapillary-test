function clearSlashes(str) {
    return str.replace(/\/$/, "").replace(/^\//, "");
}

const Router = {
    routes: [],
    init(root) {
        this.root = root ? `/${clearSlashes(root)}/` : "/";
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
        history.pushState({ path }, null, this.root + clearSlashes(path));
        return this;
    },

    getFragment() {
        let fragment = decodeURIComponent(location.pathname);
        fragment = this.root != "/" ? fragment.replace(this.root, "") : fragment;
        return clearSlashes(fragment);
    }
};

export default Router;
