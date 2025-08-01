class App {
    initComponents() {
        feather.replace();
        const e = document.querySelector('[data-toggle="back-to-top"]');
        if (e !== null) {
            window.addEventListener("scroll", function () {
                72 < window.pageYOffset
                    ? (e.classList.add("flex"), e.classList.remove("hidden"))
                    : (e.classList.remove("flex"), e.classList.add("hidden"));
            }),
                e.addEventListener("click", function (e) {
                    e.preventDefault(),
                        window.scrollTo({ top: 0, behavior: "smooth" });
                });
        }
    }
    initfullScreenListener() {
        var e = document.querySelector('[data-toggle="fullscreen"]');
        e &&
            e.addEventListener("click", function (e) {
                e.preventDefault(),
                    document.body.classList.toggle("fullscreen-enable"),
                    document.fullscreenElement ||
                        document.mozFullScreenElement ||
                        document.webkitFullscreenElement
                        ? document.cancelFullScreen
                            ? document.cancelFullScreen()
                            : document.mozCancelFullScreen
                                ? document.mozCancelFullScreen()
                                : document.webkitCancelFullScreen &&
                                document.webkitCancelFullScreen()
                        : document.documentElement.requestFullscreen
                            ? document.documentElement.requestFullscreen()
                            : document.documentElement.mozRequestFullScreen
                                ? document.documentElement.mozRequestFullScreen()
                                : document.documentElement.webkitRequestFullscreen &&
                                document.documentElement.webkitRequestFullscreen(
                                    Element.ALLOW_KEYBOARD_INPUT
                                );
            });
    }
    init() {
        this.initComponents(), this.initfullScreenListener();
    }
}
class ThemeCustomizer {
    constructor() {
        (this.html = document.getElementsByTagName("html")[0]),
            (this.config = {}),
            (this.defaultConfig = window.config);
    }
    initConfig() {
        (this.defaultConfig = JSON.parse(JSON.stringify(window.defaultConfig))),
            (this.config = JSON.parse(JSON.stringify(window.config))),
            this.setSwitchFromConfig();
    }
    initSidenav() {
        var e = window.location.href.split(/[?#]/)[0];
        document.querySelectorAll("ul.menu a.menu-link").forEach((t) => {
            if (t.href === e) {
                t.classList.add("active");
                let e = t.parentElement.parentElement.parentElement;
                if (e && e.classList.contains("menu-item")) {
                    t = e.querySelector('[data-fc-type="collapse"]');
                    if (t && null != frost) {
                        const n = frost.Collapse.getInstanceOrCreate(t);
                        n.show();
                    }
                }
            }
        }),
            setTimeout(function () {
                var e,
                    i,
                    o,
                    c,
                    a,
                    d,
                    t = document.querySelector("ul.menu .active");
                function r() {
                    (e = d += 20), (t = c), (n = a);
                    var e,
                        t,
                        n =
                            (e /= o / 2) < 1
                                ? (n / 2) * e * e + t
                                : (-n / 2) * (--e * (e - 2) - 1) + t;
                    (i.scrollTop = n), d < o && setTimeout(r, 20);
                }
                null != t &&
                    ((e = document.querySelector(
                        ".app-menu .simplebar-content-wrapper"
                    )),
                        (t = t.offsetTop - 300),
                        e &&
                        100 < t &&
                        ((o = 600),
                            (c = (i = e).scrollTop),
                            (a = t - c),
                            (d = 0),
                            r()));
            }, 200);
    }
    reverseQuery(e, t) {
        for (; e;) {
            if (e.parentElement && e.parentElement.querySelector(t) === e)
                return e;
            e = e.parentElement;
        }
        return null;
    }
    changeThemeDirection(e) {
        (this.config.direction = e),
            this.html.setAttribute("dir", e),
            this.setSwitchFromConfig();
    }
    changeThemeMode(e) {
        (this.config.theme = e),
            this.html.setAttribute("data-mode", e),
            this.setSwitchFromConfig();
    }
    changeLayoutWidth(e, t = !0) {
        this.html.setAttribute("data-layout-width", e),
            t && ((this.config.layout.width = e), this.setSwitchFromConfig());
    }
    changeLayoutPosition(e, t = !0) {
        this.html.setAttribute("data-layout-position", e),
            t &&
            ((this.config.layout.position = e), this.setSwitchFromConfig());
    }
    changeTopbarColor(e) {
        (this.config.topbar.color = e),
            this.html.setAttribute("data-topbar-color", e),
            this.setSwitchFromConfig();
    }
    changeMenuColor(e) {
        (this.config.menu.color = e),
            this.html.setAttribute("data-menu-color", e),
            this.setSwitchFromConfig();
    }
    changeSidenavView(e, t = !0) {
        this.html.setAttribute("data-sidenav-view", e),
            t && ((this.config.sidenav.view = e), this.setSwitchFromConfig());
    }
    resetTheme() {
        (this.config = JSON.parse(JSON.stringify(window.defaultConfig))),
            this.changeThemeDirection(this.config.direction),
            this.changeThemeMode(this.config.theme),
            this.changeLayoutWidth(this.config.layout.width),
            this.changeLayoutPosition(this.config.layout.position),
            this.changeTopbarColor(this.config.topbar.color),
            this.changeMenuColor(this.config.menu.color),
            this.changeSidenavView(this.config.sidenav.view),
            this.adjustLayout();
    }
    initSwitchListener() {
        var n = this,
            e =
                (document
                    .querySelectorAll("input[name=dir]")
                    .forEach(function (t) {
                        t.addEventListener("change", function (e) {
                            n.changeThemeDirection(t.value);
                        });
                    }),
                    document
                        .querySelectorAll("input[name=data-mode]")
                        .forEach(function (t) {
                            t.addEventListener("change", function (e) {
                                n.changeThemeMode(t.value);
                            });
                        }),
                    document
                        .querySelectorAll("input[name=data-layout-width]")
                        .forEach(function (t) {
                            t.addEventListener("change", function (e) {
                                n.changeLayoutWidth(t.value);
                            });
                        }),
                    document
                        .querySelectorAll("input[name=data-layout-position]")
                        .forEach(function (t) {
                            t.addEventListener("change", function (e) {
                                n.changeLayoutPosition(t.value);
                            });
                        }),
                    document
                        .querySelectorAll("input[name=data-topbar-color]")
                        .forEach(function (t) {
                            t.addEventListener("change", function (e) {
                                n.changeTopbarColor(t.value);
                            });
                        }),
                    document
                        .querySelectorAll("input[name=data-menu-color]")
                        .forEach(function (t) {
                            t.addEventListener("change", function (e) {
                                n.changeMenuColor(t.value);
                            });
                        }),
                    document
                        .querySelectorAll("input[name=data-sidenav-view]")
                        .forEach(function (t) {
                            t.addEventListener("change", function (e) {
                                n.changeSidenavView(t.value);
                            });
                        }),
                    document.getElementById("light-dark-mode")),
            e =
                (e &&
                    e.addEventListener("click", function (e) {
                        "light" === n.config.theme
                            ? n.changeThemeMode("dark")
                            : n.changeThemeMode("light");
                    }),
                    document.querySelector("#button-toggle-menu")),
            e =
                (e &&
                    e.addEventListener("click", function () {
                        var e = n.config.sidenav.view,
                            t = n.html.getAttribute("data-sidenav-view", e);
                        "mobile" === t
                            ? (n.showBackdrop(),
                                n.html.classList.toggle("sidenav-enable"))
                            : "hidden" == e
                                ? "hidden" === t
                                    ? n.changeSidenavView(
                                        "hidden" == e ? "default" : e,
                                        !1
                                    )
                                    : n.changeSidenavView("hidden", !1)
                                : "sm" === t
                                    ? n.changeSidenavView("sm" == e ? "default" : e, !1)
                                    : n.changeSidenavView("sm", !1);
                    }),
                    document.querySelector("#button-hover-toggle")),
            e =
                (e &&
                    e.addEventListener("click", function () {
                        var e = n.config.sidenav.view,
                            t = n.html.getAttribute("data-sidenav-view", e);
                        "hover" == e
                            ? "hover" === t
                                ? n.changeSidenavView(
                                    "hover" == e ? "hover-active" : e,
                                    !0
                                )
                                : n.changeSidenavView("hover", !0)
                            : "hover-active" === t
                                ? n.changeSidenavView(
                                    "hover-active" == e ? "hover" : e,
                                    !0
                                )
                                : n.changeSidenavView("hover-active", !0);
                    }),
                    document.querySelector("#reset-layout"));
        e &&
            e.addEventListener("click", function (e) {
                n.resetTheme();
            });
    }
    showBackdrop() {
        const e = document.createElement("div"),
            t =
                ((e.id = "backdrop"),
                    (e.classList =
                        "transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"),
                    document.body.appendChild(e),
                    document.getElementsByTagName("html")[0] &&
                    ((document.body.style.overflow = "hidden"),
                        1140 < window.innerWidth &&
                        (document.body.style.paddingRight = "15px")),
                    this);
        e.addEventListener("click", function (e) {
            t.html.classList.remove("sidenav-enable"), t.hideBackdrop();
        });
    }
    hideBackdrop() {
        var e = document.getElementById("backdrop");
        e &&
            (document.body.removeChild(e),
                (document.body.style.overflow = null),
                (document.body.style.paddingRight = null));
    }
    initWindowSize() {
        var t = this;
        window.addEventListener("resize", function (e) {
            t.adjustLayout();
        });
    }
    adjustLayout() {
        window.innerWidth <= 1140
            ? this.changeSidenavView("mobile", !1)
            : this.changeSidenavView(this.config.sidenav.view);
    }
    setSwitchFromConfig() {
        sessionStorage.setItem("__CONFIG__", JSON.stringify(this.config)),
            document
                .querySelectorAll("#theme-customization input[type=radio]")
                .forEach(function (e) {
                    e.checked = !1;
                });
        var e,
            t,
            n,
            i,
            o,
            c,
            a = this.config;
        a &&
            ((e = document.querySelector(
                "input[type=radio][name=dir][value=" + a.direction + "]"
            )),
                (t = document.querySelector(
                    "input[type=radio][name=data-mode][value=" + a.theme + "]"
                )),
                (n = document.querySelector(
                    "input[type=radio][name=data-layout-width][value=" +
                    a.layout.width +
                    "]"
                )),
                (i = document.querySelector(
                    "input[type=radio][name=data-layout-position][value=" +
                    a.layout.position +
                    "]"
                )),
                (o = document.querySelector(
                    "input[type=radio][name=data-topbar-color][value=" +
                    a.topbar.color +
                    "]"
                )),
                (c = document.querySelector(
                    "input[type=radio][name=data-menu-color][value=" +
                    a.menu.color +
                    "]"
                )),
                (a = document.querySelector(
                    "input[type=radio][name=data-sidenav-view][value=" +
                    a.sidenav.view +
                    "]"
                )),
                e && (e.checked = !0),
                t && (t.checked = !0),
                n && (n.checked = !0),
                i && (i.checked = !0),
                o && (o.checked = !0),
                c && (c.checked = !0),
                a && (a.checked = !0));
    }
    init() {
        this.initConfig(),
            this.initSidenav(),
            this.initSwitchListener(),
            this.initWindowSize(),
            this.adjustLayout(),
            this.setSwitchFromConfig();
    }
}
new App().init(), new ThemeCustomizer().init();
