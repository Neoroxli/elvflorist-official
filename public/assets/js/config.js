!(function () {
    var t = sessionStorage.getItem("__CONFIG__"),
        i = {
            direction: "ltr",
            theme: "light",
            layout: { width: "default", position: "fixed" },
            topbar: { color: "light" },
            menu: { color: "light" },
            sidenav: { view: "default" },
        };
    const o = document.getElementsByTagName("html")[0];
    ((config = Object.assign(JSON.parse(JSON.stringify(i)), {})).direction =
        o.getAttribute("dir") || i.direction),
        (config.theme = o.getAttribute("data-mode") || i.theme),
        (config.layout.width =
            o.getAttribute("data-layout-width") || i.layout.width),
        (config.layout.position =
            o.getAttribute("data-layout-position") || i.layout.position),
        (config.topbar.color =
            o.getAttribute("data-topbar-color") || i.topbar.color),
        (config.menu.color = o.getAttribute("data-menu-color") || i.menu.color),
        (config.sidenav.view =
            o.getAttribute("data-sidenav-view") || i.sidenav.view),
        (window.defaultConfig = JSON.parse(JSON.stringify(config))),
        null !== t && (config = JSON.parse(t)),
        (window.config = config) &&
        (o.setAttribute("dir", config.direction),
            o.setAttribute("data-mode", config.theme),
            o.setAttribute("data-layout-width", config.layout.width),
            o.setAttribute("data-layout-position", config.layout.position),
            o.setAttribute("data-topbar-color", config.topbar.color),
            o.setAttribute("data-menu-color", config.menu.color),
            window.innerWidth <= 1140
                ? o.setAttribute("data-sidenav-view", "mobile")
                : o.setAttribute("data-sidenav-view", config.sidenav.view));
})();
