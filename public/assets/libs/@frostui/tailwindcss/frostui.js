(function (b, S) {
    typeof exports == "object" && typeof module < "u"
        ? S(exports)
        : typeof define == "function" && define.amd
            ? define(["exports"], S)
            : ((b = typeof globalThis < "u" ? globalThis : b || self),
                S((b.frostui = {})));
})(this, function (b) {
    "use strict";
    var _e = Object.defineProperty;
    var Ae = (b, S, P) =>
        S in b
            ? _e(b, S, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: P,
            })
            : (b[S] = P);
    var o = (b, S, P) => (Ae(b, typeof S != "symbol" ? S + "" : S, P), P);
    const S = new Map(),
        P = {
            set(e, i, t) {
                S.has(e) || S.set(e, new Map()), S.get(e).set(i, t);
            },
            get(e, i) {
                var t;
                return ((t = S.get(e)) == null ? void 0 : t.get(i)) || null;
            },
            remove(e, i) {
                var t;
                return ((t = S.get(e)) == null ? void 0 : t.delete(i)) || !0;
            },
        },
        ot = new Map(),
        Dt = {
            addListener(e, i, t) {
                ot.has(e) || ot.set(e, new Map());
                const n = ot.get(e);
                let s = n.get(i);
                s == null && (s = []), s.push(t), n.set(i, s);
            },
            removeListener(e, i, t) {
                if (!ot.has(e)) return;
                const n = ot.get(e);
                let s = n.get(i);
                s != null && ((s = s.filter((a) => a != t)), n.set(i, s));
            },
            getCallbacks(e, i) {
                var t;
                return ((t = ot.get(e)) == null ? void 0 : t.get(i)) ?? [];
            },
        },
        p = {
            findAll(e) {
                return Array.from(document.querySelectorAll(e));
            },
            findAllInElement(e, i) {
                return Array.from(e.querySelectorAll(i));
            },
            findOnlyChildrenInElement(e, i) {
                return Array.from(e.querySelectorAll(":scope > " + i));
            },
            find(e) {
                return document.querySelector(e);
            },
            findById(e) {
                return document.getElementById(e);
            },
            findOrById(e) {
                return e.length != 0 && e.charAt(0) == "#"
                    ? document.querySelector(e)
                    : document.getElementById(e);
            },
            nextElementSibling(e) {
                return e.nextElementSibling instanceof HTMLElement
                    ? e.nextElementSibling
                    : null;
            },
            getSiblingElement(e) {
                return e.nextElementSibling;
            },
            addOverlay(e) {
                const i = document.createElement("div");
                return (
                    i.classList.add(...e),
                    i.classList.add("hidden"),
                    i.setAttribute("data-fc-overlay-backdrop", ""),
                    document.body.appendChild(i),
                    i
                );
            },
            showOverlay() {
                var e;
                (e = this.getOverlay()) == null || e.classList.remove("hidden");
            },
            hideOverlay() {
                var e;
                (e = this.getOverlay()) == null || e.classList.add("hidden");
            },
            getOverlay() {
                return document.querySelector('[data-fc-overlay-backdrop=""]');
            },
            isElementSameOrContains(e, i) {
                return e.contains(i) || e == i;
            },
            isElementContains(e, i) {
                return e.contains(i) && e != i;
            },
            getAttribute(e, i, t = null) {
                return e.hasAttribute(i) ? e.getAttribute(i) : t;
            },
        };
    class I {
        constructor(i, t) {
            o(this, "_element");
            o(this, "_destroyed", !1);
            o(this, "_config", {});
            typeof i == "string"
                ? (this._element = p.findOrById(i))
                : (this._element = i),
                (this._config = t ?? {}),
                this._element != null &&
                P.set(this.constructor.type, this._element, this);
        }
        get config() {
            return this._config ?? {};
        }
        static getInstance(i) {
            return i == null ? null : P.get(this.type, i);
        }
        static getInstanceOrCreate(i, t) {
            if (i == null) return null;
            const n = this.getInstance(i);
            return n ?? new this(i, t);
        }
        addEventListener(i, t) {
            Dt.addListener(this, i, t);
        }
        removeEventListener(i, t) {
            Dt.removeListener(this, i, t);
        }
        dispatchEvent(i) {
            Dt.getCallbacks(this, i).forEach((t) => t());
        }
        destroy() {
            (this._destroyed = !0),
                this._element != null &&
                P.remove(this.constructor.type, this._element);
        }
    }
    o(I, "type", "");
    const Lt = {
        addAfterEvent(e, i, t) {
            const n = (s) => {
                i(s), e.removeEventListener(t, n, !0);
            };
            e.addEventListener(t, n, !0);
        },
        afterTransition(e, i) {
            window
                .getComputedStyle(e, null)
                .getPropertyValue("transition-duration") !== "0s"
                ? this.addAfterEvent(e, i, "transitionend")
                : i();
        },
        isMouseEventWithinElement(e, i) {
            const t = { x: i.pageX, y: i.pageY },
                n = e.getBoundingClientRect();
            return (
                t.x < n.right &&
                t.x > n.left &&
                t.y < n.bottom &&
                t.y > n.top
            );
        },
        listenOverlayClick(e) {
            var i;
            (i = p.getOverlay()) == null || i.addEventListener("click", e);
        },
    },
        F = class extends I {
            constructor(t, n) {
                super(t, n);
                o(this, "_targetElement", null);
                this.init();
            }
            init() {
                this._element != null &&
                    (this._element.classList.add(F.DEFAULT.class.base),
                        (this._targetElement = this.getTargetElement())),
                    this.initOptions(),
                    this.initListener();
            }
            initOptions() {
                this._targetElement != null &&
                    !this._targetElement.classList.contains(
                        F.DEFAULT.class.hidden
                    ) &&
                    this._element.classList.add(F.DEFAULT.class.open),
                    this.config.toggle && this.toggle();
            }
            initListener() {
                this._element.addEventListener("click", () => {
                    this.toggle();
                });
            }
            get isShown() {
                var t;
                return (
                    ((t = this._element) == null
                        ? void 0
                        : t.classList.contains(F.DEFAULT.class.open)) ?? !1
                );
            }
            show() {
                this._destroyed ||
                    (this.dispatchEvent(F.EVENTS.show),
                        this._targetElement != null &&
                        this._element != null &&
                        (this._element.classList.add(F.DEFAULT.class.open),
                            this._targetElement.classList.remove(
                                F.DEFAULT.class.hidden
                            ),
                            (this._targetElement.style.height = "0px"),
                            (this._targetElement.style.height = `${this._targetElement.scrollHeight}px`),
                            Lt.afterTransition(this._targetElement, () => {
                                this.isShown &&
                                    (this._targetElement.style.height = "");
                            })),
                        this.dispatchEvent(F.EVENTS.shown));
            }
            hide() {
                this._destroyed ||
                    (this.dispatchEvent(F.EVENTS.hide),
                        this._targetElement != null &&
                        this._element != null &&
                        (this._element.classList.remove(F.DEFAULT.class.open),
                            (this._targetElement.style.height = `${this._targetElement.scrollHeight}px`),
                            Lt.afterTransition(this._targetElement, () => {
                                this.isShown ||
                                    (this._targetElement.classList.add(
                                        F.DEFAULT.class.hidden
                                    ),
                                        (this._targetElement.style.height = ""));
                            }),
                            setTimeout(() => {
                                this._targetElement.style.height = "0px";
                            })),
                        this.dispatchEvent(F.EVENTS.hidden));
            }
            toggle() {
                this.isShown ? this.hide() : this.show();
            }
            getTargetElement() {
                if (this._element == null) return null;
                const t =
                    this.config.target ??
                    this._element.getAttribute(F.DEFAULT.attr.target);
                return typeof t == "string"
                    ? p.findOrById(t)
                    : t instanceof HTMLElement
                        ? t
                        : p.nextElementSibling(this._element);
            }
        };
    let O = F;
    o(O, "type", "collapse"),
        o(O, "SELECTOR", '[data-fc-type="collapse"]'),
        o(O, "EVENTS", {
            show: "fc.collapse.show",
            shown: "fc.collapse.shown",
            hide: "fc.collapse.hide",
            hidden: "fc.collapse.hidden",
        }),
        o(O, "DEFAULT", {
            class: { base: "fc-collapse", hidden: "hidden", open: "open" },
            attr: { target: "data-fc-target" },
        });
    const xt = class extends I {
        constructor(t, n) {
            super(t, n);
            o(this, "targetCollapses", []);
            this.init();
        }
        init() {
            if (this._element != null) {
                const t = p.findAllInElement(this._element, O.SELECTOR);
                let n = !1;
                for (let s of t)
                    if (s.hasAttribute(xt.DEFAULT.attr.parent)) {
                        n = !0;
                        break;
                    }
                if (!n)
                    this.targetCollapses = t.map((s) =>
                        O.getInstanceOrCreate(s)
                    );
                else {
                    const s = this._element.id;
                    this.targetCollapses = t
                        .filter(
                            (a) => a.getAttribute(xt.DEFAULT.attr.parent) == s
                        )
                        .map((a) => O.getInstanceOrCreate(a));
                }
                this.initListeners();
            }
        }
        initListeners() {
            this.targetCollapses.forEach((t) => {
                t.addEventListener(O.EVENTS.show, () => {
                    this._destroyed ||
                        this.targetCollapses
                            .filter((n) => n != t)
                            .forEach((n) => n.hide());
                });
            });
        }
    };
    let X = xt;
    o(X, "type", "accordion"),
        o(X, "SELECTOR", '[data-fc-type="accordion"]'),
        o(X, "DEFAULT", { attr: { parent: "data-fc-parent" } });
    function dt(e) {
        return e.split("-")[1];
    }
    function Ft(e) {
        return e === "y" ? "height" : "width";
    }
    function et(e) {
        return e.split("-")[0];
    }
    function ft(e) {
        return ["top", "bottom"].includes(et(e)) ? "x" : "y";
    }
    function It(e, i, t) {
        let { reference: n, floating: s } = e;
        const a = n.x + n.width / 2 - s.width / 2,
            l = n.y + n.height / 2 - s.height / 2,
            r = ft(i),
            d = Ft(r),
            h = n[d] / 2 - s[d] / 2,
            f = r === "x";
        let c;
        switch (et(i)) {
            case "top":
                c = { x: a, y: n.y - s.height };
                break;
            case "bottom":
                c = { x: a, y: n.y + n.height };
                break;
            case "right":
                c = { x: n.x + n.width, y: l };
                break;
            case "left":
                c = { x: n.x - s.width, y: l };
                break;
            default:
                c = { x: n.x, y: n.y };
        }
        switch (dt(i)) {
            case "start":
                c[r] -= h * (t && f ? -1 : 1);
                break;
            case "end":
                c[r] += h * (t && f ? -1 : 1);
        }
        return c;
    }
    const ae = async (e, i, t) => {
        const {
            placement: n = "bottom",
            strategy: s = "absolute",
            middleware: a = [],
            platform: l,
        } = t,
            r = a.filter(Boolean),
            d = await (l.isRTL == null ? void 0 : l.isRTL(i));
        let h = await l.getElementRects({
            reference: e,
            floating: i,
            strategy: s,
        }),
            { x: f, y: c } = It(h, n, d),
            m = n,
            g = {},
            E = 0;
        for (let u = 0; u < r.length; u++) {
            const { name: L, fn: v } = r[u],
                {
                    x: y,
                    y: _,
                    data: R,
                    reset: U,
                } = await v({
                    x: f,
                    y: c,
                    initialPlacement: n,
                    placement: m,
                    strategy: s,
                    middlewareData: g,
                    rects: h,
                    platform: l,
                    elements: { reference: e, floating: i },
                });
            (f = y ?? f),
                (c = _ ?? c),
                (g = { ...g, [L]: { ...g[L], ...R } }),
                U &&
                E <= 50 &&
                (E++,
                    typeof U == "object" &&
                    (U.placement && (m = U.placement),
                        U.rects &&
                        (h =
                            U.rects === !0
                                ? await l.getElementRects({
                                    reference: e,
                                    floating: i,
                                    strategy: s,
                                })
                                : U.rects),
                        ({ x: f, y: c } = It(h, m, d))),
                    (u = -1));
        }
        return { x: f, y: c, placement: m, strategy: s, middlewareData: g };
    };
    function Ht(e) {
        return typeof e != "number"
            ? (function (i) {
                return { top: 0, right: 0, bottom: 0, left: 0, ...i };
            })(e)
            : { top: e, right: e, bottom: e, left: e };
    }
    function yt(e) {
        return {
            ...e,
            top: e.y,
            left: e.x,
            right: e.x + e.width,
            bottom: e.y + e.height,
        };
    }
    async function Mt(e, i) {
        var t;
        i === void 0 && (i = {});
        const {
            x: n,
            y: s,
            platform: a,
            rects: l,
            elements: r,
            strategy: d,
        } = e,
            {
                boundary: h = "clippingAncestors",
                rootBoundary: f = "viewport",
                elementContext: c = "floating",
                altBoundary: m = !1,
                padding: g = 0,
            } = i,
            E = Ht(g),
            u = r[m ? (c === "floating" ? "reference" : "floating") : c],
            L = yt(
                await a.getClippingRect({
                    element:
                        (t = await (a.isElement == null
                            ? void 0
                            : a.isElement(u))) == null || t
                            ? u
                            : u.contextElement ||
                            (await (a.getDocumentElement == null
                                ? void 0
                                : a.getDocumentElement(r.floating))),
                    boundary: h,
                    rootBoundary: f,
                    strategy: d,
                })
            ),
            v = c === "floating" ? { ...l.floating, x: n, y: s } : l.reference,
            y = await (a.getOffsetParent == null
                ? void 0
                : a.getOffsetParent(r.floating)),
            _ = ((await (a.isElement == null ? void 0 : a.isElement(y))) &&
                (await (a.getScale == null ? void 0 : a.getScale(y)))) || {
                x: 1,
                y: 1,
            },
            R = yt(
                a.convertOffsetParentRelativeRectToViewportRelativeRect
                    ? await a.convertOffsetParentRelativeRectToViewportRelativeRect(
                        { rect: v, offsetParent: y, strategy: d }
                    )
                    : v
            );
        return {
            top: (L.top - R.top + E.top) / _.y,
            bottom: (R.bottom - L.bottom + E.bottom) / _.y,
            left: (L.left - R.left + E.left) / _.x,
            right: (R.right - L.right + E.right) / _.x,
        };
    }
    const re = Math.min,
        oe = Math.max;
    function Ut(e, i, t) {
        return oe(e, re(i, t));
    }
    const ce = (e) => ({
        name: "arrow",
        options: e,
        async fn(i) {
            const { element: t, padding: n = 0 } = e || {},
                {
                    x: s,
                    y: a,
                    placement: l,
                    rects: r,
                    platform: d,
                    elements: h,
                } = i;
            if (t == null) return {};
            const f = Ht(n),
                c = { x: s, y: a },
                m = ft(l),
                g = Ft(m),
                E = await d.getDimensions(t),
                u = m === "y",
                L = u ? "top" : "left",
                v = u ? "bottom" : "right",
                y = u ? "clientHeight" : "clientWidth",
                _ = r.reference[g] + r.reference[m] - c[m] - r.floating[g],
                R = c[m] - r.reference[m],
                U = await (d.getOffsetParent == null
                    ? void 0
                    : d.getOffsetParent(t));
            let J = U ? U[y] : 0;
            (J && (await (d.isElement == null ? void 0 : d.isElement(U)))) ||
                (J = h.floating[y] || r.floating[g]);
            const lt = _ / 2 - R / 2,
                at = f[L],
                Et = J - E[g] - f[v],
                M = J / 2 - E[g] / 2 + lt,
                k = Ut(at, M, Et),
                $ =
                    dt(l) != null &&
                    M != k &&
                    r.reference[g] / 2 - (M < at ? f[L] : f[v]) - E[g] / 2 < 0;
            return {
                [m]: c[m] - ($ ? (M < at ? at - M : Et - M) : 0),
                data: { [m]: k, centerOffset: M - k },
            };
        },
    });
    ["top", "right", "bottom", "left"].reduce(
        (e, i) => e.concat(i, i + "-start", i + "-end"),
        []
    );
    const he = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function wt(e) {
        return e.replace(/left|right|bottom|top/g, (i) => he[i]);
    }
    function de(e, i, t) {
        t === void 0 && (t = !1);
        const n = dt(e),
            s = ft(e),
            a = Ft(s);
        let l =
            s === "x"
                ? n === (t ? "end" : "start")
                    ? "right"
                    : "left"
                : n === "start"
                    ? "bottom"
                    : "top";
        return (
            i.reference[a] > i.floating[a] && (l = wt(l)),
            { main: l, cross: wt(l) }
        );
    }
    const fe = { start: "end", end: "start" };
    function Ot(e) {
        return e.replace(/start|end/g, (i) => fe[i]);
    }
    const me = function (e) {
        return (
            e === void 0 && (e = {}),
            {
                name: "flip",
                options: e,
                async fn(i) {
                    var t;
                    const {
                        placement: n,
                        middlewareData: s,
                        rects: a,
                        initialPlacement: l,
                        platform: r,
                        elements: d,
                    } = i,
                        {
                            mainAxis: h = !0,
                            crossAxis: f = !0,
                            fallbackPlacements: c,
                            fallbackStrategy: m = "bestFit",
                            fallbackAxisSideDirection: g = "none",
                            flipAlignment: E = !0,
                            ...u
                        } = e,
                        L = et(n),
                        v = et(l) === l,
                        y = await (r.isRTL == null
                            ? void 0
                            : r.isRTL(d.floating)),
                        _ =
                            c ||
                            (v || !E
                                ? [wt(l)]
                                : (function (k) {
                                    const $ = wt(k);
                                    return [Ot(k), $, Ot($)];
                                })(l));
                    c ||
                        g === "none" ||
                        _.push(
                            ...(function (k, $, rt, tt) {
                                const K = dt(k);
                                let N = (function (pt, $t, ve) {
                                    const se = ["left", "right"],
                                        le = ["right", "left"],
                                        Te = ["top", "bottom"],
                                        be = ["bottom", "top"];
                                    switch (pt) {
                                        case "top":
                                        case "bottom":
                                            return ve
                                                ? $t
                                                    ? le
                                                    : se
                                                : $t
                                                    ? se
                                                    : le;
                                        case "left":
                                        case "right":
                                            return $t ? Te : be;
                                        default:
                                            return [];
                                    }
                                })(et(k), rt === "start", tt);
                                return (
                                    K &&
                                    ((N = N.map((pt) => pt + "-" + K)),
                                        $ && (N = N.concat(N.map(Ot)))),
                                    N
                                );
                            })(l, E, g, y)
                        );
                    const R = [l, ..._],
                        U = await Mt(i, u),
                        J = [];
                    let lt =
                        ((t = s.flip) == null ? void 0 : t.overflows) || [];
                    if ((h && J.push(U[L]), f)) {
                        const { main: k, cross: $ } = de(n, a, y);
                        J.push(U[k], U[$]);
                    }
                    if (
                        ((lt = [...lt, { placement: n, overflows: J }]),
                            !J.every((k) => k <= 0))
                    ) {
                        var at, Et;
                        const k =
                            (((at = s.flip) == null
                                ? void 0
                                : at.index) || 0) + 1,
                            $ = R[k];
                        if ($)
                            return {
                                data: { index: k, overflows: lt },
                                reset: { placement: $ },
                            };
                        let rt =
                            (Et = lt
                                .filter((tt) => tt.overflows[0] <= 0)
                                .sort(
                                    (tt, K) =>
                                        tt.overflows[1] - K.overflows[1]
                                )[0]) == null
                                ? void 0
                                : Et.placement;
                        if (!rt)
                            switch (m) {
                                case "bestFit": {
                                    var M;
                                    const tt =
                                        (M = lt
                                            .map((K) => [
                                                K.placement,
                                                K.overflows
                                                    .filter((N) => N > 0)
                                                    .reduce(
                                                        (N, pt) => N + pt,
                                                        0
                                                    ),
                                            ])
                                            .sort(
                                                (K, N) => K[1] - N[1]
                                            )[0]) == null
                                            ? void 0
                                            : M[0];
                                    tt && (rt = tt);
                                    break;
                                }
                                case "initialPlacement":
                                    rt = l;
                            }
                        if (n !== rt) return { reset: { placement: rt } };
                    }
                    return {};
                },
            }
        );
    },
        Pt = function (e) {
            return (
                e === void 0 && (e = 0),
                {
                    name: "offset",
                    options: e,
                    async fn(i) {
                        const { x: t, y: n } = i,
                            s = await (async function (a, l) {
                                const {
                                    placement: r,
                                    platform: d,
                                    elements: h,
                                } = a,
                                    f = await (d.isRTL == null
                                        ? void 0
                                        : d.isRTL(h.floating)),
                                    c = et(r),
                                    m = dt(r),
                                    g = ft(r) === "x",
                                    E = ["left", "top"].includes(c) ? -1 : 1,
                                    u = f && g ? -1 : 1,
                                    L = typeof l == "function" ? l(a) : l;
                                let {
                                    mainAxis: v,
                                    crossAxis: y,
                                    alignmentAxis: _,
                                } = typeof L == "number"
                                        ? {
                                            mainAxis: L,
                                            crossAxis: 0,
                                            alignmentAxis: null,
                                        }
                                        : {
                                            mainAxis: 0,
                                            crossAxis: 0,
                                            alignmentAxis: null,
                                            ...L,
                                        };
                                return (
                                    m &&
                                    typeof _ == "number" &&
                                    (y = m === "end" ? -1 * _ : _),
                                    g
                                        ? { x: y * u, y: v * E }
                                        : { x: v * E, y: y * u }
                                );
                            })(i, e);
                        return { x: t + s.x, y: n + s.y, data: s };
                    },
                }
            );
        };
    function ge(e) {
        return e === "x" ? "y" : "x";
    }
    const ue = function (e) {
        return (
            e === void 0 && (e = {}),
            {
                name: "shift",
                options: e,
                async fn(i) {
                    const { x: t, y: n, placement: s } = i,
                        {
                            mainAxis: a = !0,
                            crossAxis: l = !1,
                            limiter: r = {
                                fn: (L) => {
                                    let { x: v, y } = L;
                                    return { x: v, y };
                                },
                            },
                            ...d
                        } = e,
                        h = { x: t, y: n },
                        f = await Mt(i, d),
                        c = ft(et(s)),
                        m = ge(c);
                    let g = h[c],
                        E = h[m];
                    if (a) {
                        const L = c === "y" ? "bottom" : "right";
                        g = Ut(g + f[c === "y" ? "top" : "left"], g, g - f[L]);
                    }
                    if (l) {
                        const L = m === "y" ? "bottom" : "right";
                        E = Ut(E + f[m === "y" ? "top" : "left"], E, E - f[L]);
                    }
                    const u = r.fn({ ...i, [c]: g, [m]: E });
                    return { ...u, data: { x: u.x - t, y: u.y - n } };
                },
            }
        );
    };
    function C(e) {
        var i;
        return (
            ((i = e.ownerDocument) == null ? void 0 : i.defaultView) || window
        );
    }
    function H(e) {
        return C(e).getComputedStyle(e);
    }
    function Bt(e) {
        return e instanceof C(e).Node;
    }
    function Y(e) {
        return Bt(e) ? (e.nodeName || "").toLowerCase() : "";
    }
    let vt;
    function Wt() {
        if (vt) return vt;
        const e = navigator.userAgentData;
        return e && Array.isArray(e.brands)
            ? ((vt = e.brands.map((i) => i.brand + "/" + i.version).join(" ")),
                vt)
            : navigator.userAgent;
    }
    function V(e) {
        return e instanceof C(e).HTMLElement;
    }
    function G(e) {
        return e instanceof C(e).Element;
    }
    function jt(e) {
        return typeof ShadowRoot > "u"
            ? !1
            : e instanceof C(e).ShadowRoot || e instanceof ShadowRoot;
    }
    function Tt(e) {
        const { overflow: i, overflowX: t, overflowY: n, display: s } = H(e);
        return (
            /auto|scroll|overlay|hidden|clip/.test(i + n + t) &&
            !["inline", "contents"].includes(s)
        );
    }
    function Ee(e) {
        return ["table", "td", "th"].includes(Y(e));
    }
    function Ct(e) {
        const i = /firefox/i.test(Wt()),
            t = H(e),
            n = t.backdropFilter || t.WebkitBackdropFilter;
        return (
            t.transform !== "none" ||
            t.perspective !== "none" ||
            (!!n && n !== "none") ||
            (i && t.willChange === "filter") ||
            (i && !!t.filter && t.filter !== "none") ||
            ["transform", "perspective"].some((s) =>
                t.willChange.includes(s)
            ) ||
            ["paint", "layout", "strict", "content"].some((s) => {
                const a = t.contain;
                return a != null && a.includes(s);
            })
        );
    }
    function Rt() {
        return /^((?!chrome|android).)*safari/i.test(Wt());
    }
    function Nt(e) {
        return ["html", "body", "#document"].includes(Y(e));
    }
    const qt = Math.min,
        mt = Math.max,
        bt = Math.round;
    function zt(e) {
        const i = H(e);
        let t = parseFloat(i.width),
            n = parseFloat(i.height);
        const s = V(e),
            a = s ? e.offsetWidth : t,
            l = s ? e.offsetHeight : n,
            r = bt(t) !== a || bt(n) !== l;
        return r && ((t = a), (n = l)), { width: t, height: n, fallback: r };
    }
    function Jt(e) {
        return G(e) ? e : e.contextElement;
    }
    const Kt = { x: 1, y: 1 };
    function ct(e) {
        const i = Jt(e);
        if (!V(i)) return Kt;
        const t = i.getBoundingClientRect(),
            { width: n, height: s, fallback: a } = zt(i);
        let l = (a ? bt(t.width) : t.width) / n,
            r = (a ? bt(t.height) : t.height) / s;
        return (
            (l && Number.isFinite(l)) || (l = 1),
            (r && Number.isFinite(r)) || (r = 1),
            { x: l, y: r }
        );
    }
    function gt(e, i, t, n) {
        var s, a;
        i === void 0 && (i = !1), t === void 0 && (t = !1);
        const l = e.getBoundingClientRect(),
            r = Jt(e);
        let d = Kt;
        i && (n ? G(n) && (d = ct(n)) : (d = ct(e)));
        const h = r ? C(r) : window,
            f = Rt() && t;
        let c =
            (l.left +
                ((f &&
                    ((s = h.visualViewport) == null
                        ? void 0
                        : s.offsetLeft)) ||
                    0)) /
            d.x,
            m =
                (l.top +
                    ((f &&
                        ((a = h.visualViewport) == null
                            ? void 0
                            : a.offsetTop)) ||
                        0)) /
                d.y,
            g = l.width / d.x,
            E = l.height / d.y;
        if (r) {
            const u = C(r),
                L = n && G(n) ? C(n) : n;
            let v = u.frameElement;
            for (; v && n && L !== u;) {
                const y = ct(v),
                    _ = v.getBoundingClientRect(),
                    R = getComputedStyle(v);
                (_.x += (v.clientLeft + parseFloat(R.paddingLeft)) * y.x),
                    (_.y += (v.clientTop + parseFloat(R.paddingTop)) * y.y),
                    (c *= y.x),
                    (m *= y.y),
                    (g *= y.x),
                    (E *= y.y),
                    (c += _.x),
                    (m += _.y),
                    (v = C(v).frameElement);
            }
        }
        return yt({ width: g, height: E, x: c, y: m });
    }
    function Q(e) {
        return (
            (Bt(e) ? e.ownerDocument : e.document) || window.document
        ).documentElement;
    }
    function _t(e) {
        return G(e)
            ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
            : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
    }
    function Xt(e) {
        return gt(Q(e)).left + _t(e).scrollLeft;
    }
    function ut(e) {
        if (Y(e) === "html") return e;
        const i = e.assignedSlot || e.parentNode || (jt(e) && e.host) || Q(e);
        return jt(i) ? i.host : i;
    }
    function Yt(e) {
        const i = ut(e);
        return Nt(i) ? i.ownerDocument.body : V(i) && Tt(i) ? i : Yt(i);
    }
    function Gt(e, i) {
        var t;
        i === void 0 && (i = []);
        const n = Yt(e),
            s = n === ((t = e.ownerDocument) == null ? void 0 : t.body),
            a = C(n);
        return s
            ? i.concat(a, a.visualViewport || [], Tt(n) ? n : [])
            : i.concat(n, Gt(n));
    }
    function Qt(e, i, t) {
        let n;
        if (i === "viewport")
            n = (function (l, r) {
                const d = C(l),
                    h = Q(l),
                    f = d.visualViewport;
                let c = h.clientWidth,
                    m = h.clientHeight,
                    g = 0,
                    E = 0;
                if (f) {
                    (c = f.width), (m = f.height);
                    const u = Rt();
                    (!u || (u && r === "fixed")) &&
                        ((g = f.offsetLeft), (E = f.offsetTop));
                }
                return { width: c, height: m, x: g, y: E };
            })(e, t);
        else if (i === "document")
            n = (function (l) {
                const r = Q(l),
                    d = _t(l),
                    h = l.ownerDocument.body,
                    f = mt(
                        r.scrollWidth,
                        r.clientWidth,
                        h.scrollWidth,
                        h.clientWidth
                    ),
                    c = mt(
                        r.scrollHeight,
                        r.clientHeight,
                        h.scrollHeight,
                        h.clientHeight
                    );
                let m = -d.scrollLeft + Xt(l);
                const g = -d.scrollTop;
                return (
                    H(h).direction === "rtl" &&
                    (m += mt(r.clientWidth, h.clientWidth) - f),
                    { width: f, height: c, x: m, y: g }
                );
            })(Q(e));
        else if (G(i))
            n = (function (l, r) {
                const d = gt(l, !0, r === "fixed"),
                    h = d.top + l.clientTop,
                    f = d.left + l.clientLeft,
                    c = V(l) ? ct(l) : { x: 1, y: 1 };
                return {
                    width: l.clientWidth * c.x,
                    height: l.clientHeight * c.y,
                    x: f * c.x,
                    y: h * c.y,
                };
            })(i, t);
        else {
            const l = { ...i };
            if (Rt()) {
                var s, a;
                const r = C(e);
                (l.x -=
                    ((s = r.visualViewport) == null ? void 0 : s.offsetLeft) ||
                    0),
                    (l.y -=
                        ((a = r.visualViewport) == null
                            ? void 0
                            : a.offsetTop) || 0);
            }
            n = l;
        }
        return yt(n);
    }
    function Zt(e, i) {
        return V(e) && H(e).position !== "fixed"
            ? i
                ? i(e)
                : e.offsetParent
            : null;
    }
    function te(e, i) {
        const t = C(e);
        if (!V(e)) return t;
        let n = Zt(e, i);
        for (; n && Ee(n) && H(n).position === "static";) n = Zt(n, i);
        return n &&
            (Y(n) === "html" ||
                (Y(n) === "body" && H(n).position === "static" && !Ct(n)))
            ? t
            : n ||
            (function (s) {
                let a = ut(s);
                for (; V(a) && !Nt(a);) {
                    if (Ct(a)) return a;
                    a = ut(a);
                }
                return null;
            })(e) ||
            t;
    }
    function pe(e, i, t) {
        const n = V(i),
            s = Q(i),
            a = gt(e, !0, t === "fixed", i);
        let l = { scrollLeft: 0, scrollTop: 0 };
        const r = { x: 0, y: 0 };
        if (n || (!n && t !== "fixed"))
            if (((Y(i) !== "body" || Tt(s)) && (l = _t(i)), V(i))) {
                const d = gt(i, !0);
                (r.x = d.x + i.clientLeft), (r.y = d.y + i.clientTop);
            } else s && (r.x = Xt(s));
        return {
            x: a.left + l.scrollLeft - r.x,
            y: a.top + l.scrollTop - r.y,
            width: a.width,
            height: a.height,
        };
    }
    const Le = {
        getClippingRect: function (e) {
            let {
                element: i,
                boundary: t,
                rootBoundary: n,
                strategy: s,
            } = e;
            const a =
                t === "clippingAncestors"
                    ? (function (h, f) {
                        const c = f.get(h);
                        if (c) return c;
                        let m = Gt(h).filter(
                            (L) => G(L) && Y(L) !== "body"
                        ),
                            g = null;
                        const E = H(h).position === "fixed";
                        let u = E ? ut(h) : h;
                        for (; G(u) && !Nt(u);) {
                            const L = H(u),
                                v = Ct(u);
                            L.position === "fixed" && (g = null),
                                (
                                    E
                                        ? v || g
                                        : v ||
                                        L.position !== "static" ||
                                        !g ||
                                        ![
                                            "absolute",
                                            "fixed",
                                        ].includes(g.position)
                                )
                                    ? (g = L)
                                    : (m = m.filter((y) => y !== u)),
                                (u = ut(u));
                        }
                        return f.set(h, m), m;
                    })(i, this._c)
                    : [].concat(t),
                l = [...a, n],
                r = l[0],
                d = l.reduce((h, f) => {
                    const c = Qt(i, f, s);
                    return (
                        (h.top = mt(c.top, h.top)),
                        (h.right = qt(c.right, h.right)),
                        (h.bottom = qt(c.bottom, h.bottom)),
                        (h.left = mt(c.left, h.left)),
                        h
                    );
                }, Qt(i, r, s));
            return {
                width: d.right - d.left,
                height: d.bottom - d.top,
                x: d.left,
                y: d.top,
            };
        },
        convertOffsetParentRelativeRectToViewportRelativeRect: function (
            e
        ) {
            let { rect: i, offsetParent: t, strategy: n } = e;
            const s = V(t),
                a = Q(t);
            if (t === a) return i;
            let l = { scrollLeft: 0, scrollTop: 0 },
                r = { x: 1, y: 1 };
            const d = { x: 0, y: 0 };
            if (
                (s || (!s && n !== "fixed")) &&
                ((Y(t) !== "body" || Tt(a)) && (l = _t(t)), V(t))
            ) {
                const h = gt(t);
                (r = ct(t)),
                    (d.x = h.x + t.clientLeft),
                    (d.y = h.y + t.clientTop);
            }
            return {
                width: i.width * r.x,
                height: i.height * r.y,
                x: i.x * r.x - l.scrollLeft * r.x + d.x,
                y: i.y * r.y - l.scrollTop * r.y + d.y,
            };
        },
        isElement: G,
        getDimensions: function (e) {
            return zt(e);
        },
        getOffsetParent: te,
        getDocumentElement: Q,
        getScale: ct,
        async getElementRects(e) {
            let { reference: i, floating: t, strategy: n } = e;
            const s = this.getOffsetParent || te,
                a = this.getDimensions;
            return {
                reference: pe(i, await s(t), n),
                floating: { x: 0, y: 0, ...(await a(t)) },
            };
        },
        getClientRects: (e) => Array.from(e.getClientRects()),
        isRTL: (e) => H(e).direction === "rtl",
    },
        ee = (e, i, t) => {
            const n = new Map(),
                s = { platform: Le, ...t },
                a = { ...s.platform, _c: n };
            return ae(e, i, { ...s, platform: a });
        },
        T = class extends I {
            constructor(t, n) {
                super(t, n);
                o(this, "_targetElement", null);
                o(this, "clicked", !1);
                o(this, "_targetOffset", 4);
                o(this, "_placement", null);
                o(this, "_trigger", null);
                o(this, "_autoclose", null);
                o(this, "keyListener", (t) => {
                    t.key == "Escape" && this.hide();
                });
                this.init();
            }
            get isShown() {
                var t;
                return (
                    ((t = this._targetElement) == null
                        ? void 0
                        : t.classList.contains(T.DEFAULT.class.hidden)) === !1
                );
            }
            get isHover() {
                return this._trigger === "hover";
            }
            show() {
                this.dispatchEvent(T.EVENTS.show),
                    this.addComputePositionInTargetElement(),
                    this._targetElement != null &&
                    this._element != null &&
                    (this._targetElement.classList.remove(
                        T.DEFAULT.class.hidden
                    ),
                        setTimeout(() => {
                            this._element.classList.add(T.DEFAULT.class.open),
                                this._targetElement.classList.add(
                                    T.DEFAULT.class.open
                                );
                        }, 1)),
                    window.addEventListener("keydown", this.keyListener),
                    this.dispatchEvent(T.EVENTS.shown);
            }
            hide() {
                var t;
                this.dispatchEvent(T.EVENTS.hide),
                    (this.clicked = !1),
                    this._targetElement != null &&
                    ((t = this._element) == null ||
                        t.classList.remove(T.DEFAULT.class.open),
                        this._targetElement.classList.remove(
                            T.DEFAULT.class.open
                        ),
                        this._targetElement.classList.add(
                            T.DEFAULT.class.hidden
                        )),
                    window.removeEventListener("keydown", this.keyListener),
                    this.dispatchEvent(T.EVENTS.hidden);
            }
            toggle() {
                this.isShown ? this.hide() : this.show();
            }
            init() {
                this._element != null &&
                    ((this._targetElement = this.getTargetElement()),
                        this.initOptions(),
                        this.initListener());
            }
            initOptions() {
                var t, n, s, a;
                if (
                    ((t = this._element) == null ||
                        t.classList.add(T.DEFAULT.class.base),
                        (n = this._targetElement) == null ||
                        n.classList.add(T.DEFAULT.class.base),
                        (this._placement = p.getAttribute(
                            this._element,
                            T.DEFAULT.attr.placement,
                            this.config.placement
                        )),
                        (this._trigger = p.getAttribute(
                            this._element,
                            T.DEFAULT.attr.trigger,
                            this.config.trigger ?? "click"
                        )),
                        (this._autoclose = p.getAttribute(
                            this._element,
                            T.DEFAULT.attr.autoclose,
                            this.config.autoclose ?? "both"
                        )),
                        ((s = this._targetElement) == null
                            ? void 0
                            : s.classList.contains(T.DEFAULT.class.hidden)) ===
                        !1 && this.show(),
                        (a = this._element) != null &&
                        a.hasAttribute(T.DEFAULT.attr.offset))
                ) {
                    const l = this._element.getAttribute(T.DEFAULT.attr.offset);
                    isNaN(parseInt(l)) || (this._targetOffset = parseInt(l));
                }
            }
            initListener() {
                var t, n;
                (t = this._element) == null ||
                    t.addEventListener("click", () => {
                        this._destroyed ||
                            (this.isHover
                                ? (this.clicked ? this.hide() : this.show(),
                                    (this.clicked = !this.clicked))
                                : this.toggle());
                    }),
                    this.isHover &&
                    ((n = this._element) == null ||
                        n.addEventListener("mouseover", () => {
                            this.show();
                        }),
                        window.addEventListener("mousemove", (s) => {
                            this._destroyed ||
                                (this._targetElement != null &&
                                    this._element != null &&
                                    s.target instanceof HTMLElement &&
                                    !this.clicked &&
                                    !p.isElementSameOrContains(
                                        this._targetElement,
                                        s.target
                                    ) &&
                                    !p.isElementSameOrContains(
                                        this._element,
                                        s.target
                                    ) &&
                                    this.hide());
                        })),
                    window.addEventListener("click", (s) => {
                        if (
                            !this._destroyed &&
                            this._targetElement != null &&
                            this._element != null &&
                            s.target instanceof HTMLElement
                        ) {
                            if (
                                p.isElementSameOrContains(
                                    this._element,
                                    s.target
                                )
                            )
                                return;
                            const a = p.isElementSameOrContains(
                                this._targetElement,
                                s.target
                            );
                            ((this._autoclose == "outside" && !a) ||
                                (this._autoclose == "inside" && a) ||
                                this._autoclose == "both") &&
                                this.hide();
                        }
                    });
            }
            addComputePositionInTargetElement() {
                const t = [Pt(this._targetOffset)];
                this._element != null &&
                    this._targetElement != null &&
                    (this._targetElement.classList.add("absolute"),
                        ee(this._element, this._targetElement, {
                            placement: this._placement ?? "bottom-start",
                            middleware: t,
                        }).then(({ x: n, y: s }) => {
                            this._targetElement != null &&
                                Object.assign(this._targetElement.style, {
                                    left: `${n}px`,
                                    top: `${s}px`,
                                });
                        }));
            }
            getTargetElement() {
                if (this._element == null) return null;
                const t = this._element.getAttribute(T.DEFAULT.attr.target),
                    n = this.config.target ?? t;
                return typeof n == "string"
                    ? p.findOrById(n)
                    : n instanceof HTMLElement
                        ? n
                        : p.nextElementSibling(this._element);
            }
        };
    let B = T;
    o(B, "type", "dropdown"),
        o(B, "SELECTOR", '[data-fc-type="dropdown"]'),
        o(B, "EVENTS", {
            show: "fc.dropdown.show",
            shown: "fc.dropdown.shown",
            hide: "fc.dropdown.hide",
            hidden: "fc.dropdown.hidden",
        }),
        o(B, "DEFAULT", {
            class: { base: "fc-dropdown", hidden: "hidden", open: "open" },
            attr: {
                target: "data-fc-target",
                placement: "data-fc-placement",
                trigger: "data-fc-trigger",
                offset: "data-fc-offset",
                autoclose: "data-fc-autoclose",
            },
        });
    const Vt = class extends I {
        constructor(t, n) {
            super(t, n);
            o(this, "_elements", new Map());
            this.init();
        }
        init() {
            if (this._element != null) {
                const t = new Map(),
                    n = this._element.querySelectorAll("[data-fc-target]");
                for (const s of n) {
                    const a = s.getAttribute(Vt.DEFAULT.attr.target);
                    if (a != null) {
                        const l = p.findOrById(a);
                        l != null && t.set(s, l);
                    }
                }
                (this._elements = t), this.initListener();
            }
        }
        initListener() {
            for (const t of this._elements.keys())
                t.addEventListener("click", () => {
                    this.showTab(t);
                });
        }
        showTab(t) {
            const n = this._elements.get(t),
                s = Array.from(this._elements.keys()).filter((l) => l != t),
                a = s.map((l) => this._elements.get(l));
            n == null || n.classList.remove("hidden"),
                a.forEach((l) => l.classList.add("hidden")),
                n == null || n.classList.add("active"),
                t.classList.add("active"),
                a.forEach((l) => l.classList.remove("active")),
                s.forEach((l) => l.classList.remove("active"));
        }
    };
    let Z = Vt;
    o(Z, "type", "tab"),
        o(Z, "SELECTOR", '[data-fc-type="tab"]'),
        o(Z, "DEFAULT", { attr: { target: "data-fc-target" } });
    const A = class extends I {
        constructor(t, n) {
            super(t, n);
            o(this, "_targetElement", null);
            o(this, "_windowClickListen", !1);
            o(this, "keyListener", (t) => {
                t.key == "Escape" && !this.isStatic && this.hide();
            });
            o(this, "onWindowClicked", (t) => {
                !this.isStatic &&
                    t.target instanceof HTMLElement &&
                    this._targetElement &&
                    this.isShown &&
                    (p.isElementContains(this._targetElement, t.target) ||
                        this.hide());
            });
            this.init();
        }
        get isShown() {
            var t;
            return !(
                (t = this._targetElement) != null &&
                t.classList.contains(A.DEFAULT.class.hidden)
            );
        }
        get isStatic() {
            return this.config.behavior === "static";
        }
        init() {
            var t;
            this._element != null &&
                ((this._targetElement = this.getTargetElement()),
                    (t = this._targetElement) == null ||
                    t.classList.add(A.DEFAULT.class.base),
                    this.initOptions(),
                    this.initListener());
        }
        initOptions() {
            var n;
            let t =
                (n = this._element) == null
                    ? void 0
                    : n.getAttribute(A.DEFAULT.attr.behavior);
            t
                ? (this.config.behavior = t == "static" ? "static" : "default")
                : this.config.behavior == null &&
                (this.config.behavior = "default");
        }
        initListener() {
            var t;
            this._element != null &&
                (this._element.addEventListener("click", () => {
                    this.toggle();
                }),
                    (t = this._targetElement) == null ||
                    t
                        .querySelectorAll(`[${A.DEFAULT.attr.dismiss}]`)
                        .forEach((n) => {
                            n.addEventListener("click", () => {
                                this.hide();
                            });
                        }));
        }
        show() {
            if (
                (this.dispatchEvent(A.EVENTS.show),
                    this._targetElement != null && this._element != null)
            ) {
                const t = document.documentElement.clientWidth;
                (document.body.style.paddingRight =
                    Math.abs(window.innerWidth - t) + "px"),
                    document.body.classList.add(A.DEFAULT.class.overflowHidden),
                    this._element.classList.add(A.DEFAULT.class.open),
                    this._targetElement.classList.remove(
                        A.DEFAULT.class.hidden
                    ),
                    setTimeout(() => {
                        this._targetElement.classList.add(A.DEFAULT.class.open),
                            p.showOverlay(),
                            this._windowClickListen ||
                            (window.addEventListener(
                                "click",
                                this.onWindowClicked
                            ),
                                (this._windowClickListen = !0));
                    }, 1);
            }
            window.addEventListener("keydown", this.keyListener),
                this.dispatchEvent(A.EVENTS.shown);
        }
        hide() {
            var t;
            this.dispatchEvent(A.EVENTS.hide),
                this._targetElement != null &&
                this.isShown &&
                (document.body.classList.remove(
                    A.DEFAULT.class.overflowHidden
                ),
                    (t = this._element) == null ||
                    t.classList.remove(A.DEFAULT.class.open),
                    this._targetElement.classList.remove(A.DEFAULT.class.open),
                    Object.assign(document.body.style, { paddingRight: null }),
                    setTimeout(() => {
                        window.removeEventListener(
                            "click",
                            this.onWindowClicked
                        ),
                            (this._windowClickListen = !1),
                            p.hideOverlay(),
                            this._targetElement.classList.add(
                                A.DEFAULT.class.hidden
                            );
                    }, 1)),
                window.removeEventListener("keydown", this.keyListener),
                this.dispatchEvent(A.EVENTS.hidden);
        }
        toggle() {
            this.isShown ? this.hide() : this.show();
        }
        getTargetElement() {
            if (this._element == null) return null;
            const t =
                this.config.target ??
                this._element.getAttribute(A.DEFAULT.attr.target);
            return typeof t == "string"
                ? p.findOrById(t)
                : t instanceof HTMLElement
                    ? t
                    : p.nextElementSibling(this._element);
        }
    };
    let W = A;
    o(W, "type", "modal"),
        o(W, "SELECTOR", '[data-fc-type="modal"]'),
        o(W, "EVENTS", {
            show: "fc.modal.show",
            shown: "fc.modal.shown",
            hide: "fc.modal.hide",
            hidden: "fc.modal.hidden",
        }),
        o(W, "DEFAULT", {
            class: {
                base: "fc-modal",
                hidden: "hidden",
                open: "open",
                overflowHidden: "overflow-hidden",
            },
            attr: {
                target: "data-fc-target",
                dismiss: "data-fc-dismiss",
                behavior: "data-fc-behavior",
            },
        });
    const w = class extends I {
        constructor(t, n) {
            super(t, n);
            o(this, "_targetElement", null);
            o(this, "_arrowElement", null);
            o(this, "_targetOffset", 8);
            this.init();
        }
        get isShown() {
            var t;
            return !(
                (t = this._targetElement) != null &&
                t.classList.contains(w.DEFAULT.class.hidden)
            );
        }
        get isClickTrigger() {
            return this.config.trigger === "click";
        }
        show() {
            this.computeTooltipPosition(),
                this.dispatchEvent(w.EVENTS.show),
                this._targetElement != null &&
                this._element != null &&
                (this._targetElement.classList.remove(
                    w.DEFAULT.class.hidden
                ),
                    this._targetElement.classList.remove(
                        w.DEFAULT.class.opacity0
                    ),
                    setTimeout(() => {
                        this._element.classList.add(w.DEFAULT.class.open),
                            this._targetElement.classList.add(
                                w.DEFAULT.class.open
                            ),
                            this._targetElement.classList.add(
                                w.DEFAULT.class.opacity100
                            );
                    }, 1)),
                this.dispatchEvent(w.EVENTS.shown);
        }
        hide() {
            var t;
            this.dispatchEvent(w.EVENTS.hide),
                this._targetElement != null &&
                ((t = this._element) == null ||
                    t.classList.remove(w.DEFAULT.class.open),
                    this._targetElement.classList.add(w.DEFAULT.class.opacity0),
                    this._targetElement.classList.remove(
                        w.DEFAULT.class.opacity100
                    ),
                    this._targetElement.classList.add(w.DEFAULT.class.hidden)),
                this.dispatchEvent(w.EVENTS.hidden);
        }
        toggle() {
            this.isShown ? this.hide() : this.show();
        }
        init() {
            const t = this._element.getAttribute(w.DEFAULT.attr.target);
            t
                ? (this._targetElement = p.findOrById(t))
                : (this._targetElement = p.nextElementSibling(this._element)),
                this._targetElement &&
                (this._arrowElement = this._targetElement.querySelector(
                    `[${w.DEFAULT.attr.arrow}]`
                )),
                this.initOptions(),
                this.initListener();
        }
        initOptions() {
            var t, n, s, a, l;
            if (
                ((t = this._element) != null &&
                    t.hasAttribute(w.DEFAULT.attr.placement) &&
                    (this.config.placement =
                        (n = this._element) == null
                            ? void 0
                            : n.getAttribute(w.DEFAULT.attr.placement)),
                    (s = this._element) != null &&
                    s.hasAttribute(w.DEFAULT.attr.trigger) &&
                    (this.config.trigger =
                        ((a = this._element) == null
                            ? void 0
                            : a.getAttribute(w.DEFAULT.attr.trigger)) ===
                            "click"
                            ? "click"
                            : "hover"),
                    (l = this._element) != null &&
                    l.hasAttribute(w.DEFAULT.attr.offset))
            ) {
                const r = this._element.getAttribute(w.DEFAULT.attr.offset);
                isNaN(parseInt(r)) || (this._targetOffset = parseInt(r));
            }
        }
        initListener() {
            this._element != null &&
                (this.isClickTrigger
                    ? this._element.addEventListener("click", () => {
                        this.toggle();
                    })
                    : (this._element.addEventListener("mouseenter", () => {
                        this.show();
                    }),
                        this._element.addEventListener("mouseleave", () => {
                            this.hide();
                        })));
        }
        computeTooltipPosition() {
            const t = [
                Pt(this._targetOffset),
                ue({ padding: 2 }),
                me({ fallbackStrategy: "bestFit" }),
            ];
            this._arrowElement && t.push(ce({ element: this._arrowElement })),
                this._element != null &&
                this._targetElement != null &&
                (this._targetElement.classList.add(
                    w.DEFAULT.class.absolute
                ),
                    this._arrowElement &&
                    this._arrowElement.classList.add(
                        w.DEFAULT.class.absolute
                    ),
                    ee(this._element, this._targetElement, {
                        placement: this.config.placement,
                        middleware: t,
                    }).then(({ x: n, y: s, middlewareData: a }) => {
                        var l, r, d, h;
                        if (
                            (Object.assign(this._targetElement.style, {
                                left: `${n}px`,
                                top: `${s}px`,
                            }),
                                a.arrow && this._arrowElement)
                        ) {
                            const { x: f, y: c } = a.arrow,
                                m =
                                    f != null
                                        ? `${f}px`
                                        : `${-this._arrowElement.offsetWidth /
                                        2
                                        }px`,
                                g =
                                    c != null
                                        ? `${c}px`
                                        : `${-this._arrowElement.offsetHeight /
                                        2
                                        }px`,
                                E = {
                                    left:
                                        (l = this.config.placement) != null &&
                                            l.includes("left")
                                            ? null
                                            : m,
                                    top:
                                        (r = this.config.placement) != null &&
                                            r.includes("top")
                                            ? null
                                            : g,
                                    right:
                                        (d = this.config.placement) != null &&
                                            d.includes("left")
                                            ? m
                                            : null,
                                    bottom:
                                        (h = this.config.placement) != null &&
                                            h.includes("top")
                                            ? g
                                            : null,
                                };
                            Object.assign(this._arrowElement.style, E);
                        }
                    }));
        }
    };
    let j = w;
    o(j, "type", "tooltip"),
        o(j, "SELECTOR", '[data-fc-type="tooltip"]'),
        o(j, "EVENTS", {
            show: "fc.tooltip.show",
            shown: "fc.tooltip.shown",
            hide: "fc.tooltip.hide",
            hidden: "fc.tooltip.hidden",
        }),
        o(j, "DEFAULT", {
            class: {
                base: "fc-collapse",
                hidden: "hidden",
                open: "open",
                opacity0: "opacity-0",
                opacity100: "opacity-100",
                absolute: "absolute",
            },
            attr: {
                target: "data-fc-target",
                placement: "data-fc-placement",
                trigger: "data-fc-trigger",
                arrow: "data-fc-arrow",
                offset: "data-fc-offset",
            },
        });
    const x = class extends I {
        constructor(t, n) {
            super(t, n);
            o(this, "_targetElement", null);
            o(this, "keyListener", (t) => {
                t.key == "Escape" && !this.isStatic && this.hide();
            });
            this.init();
        }
        init() {
            var t;
            this._element != null &&
                ((this._targetElement = this.getTargetElement()),
                    (t = this._targetElement) == null ||
                    t.classList.add(x.DEFAULT.class.base),
                    this.initOptions(),
                    this.initListener());
        }
        initOptions() {
            var a, l, r;
            let t =
                (a = this._element) == null
                    ? void 0
                    : a.getAttribute(x.DEFAULT.attr.scroll);
            t
                ? (this.config.scroll = t !== "false")
                : this.config.scroll == null && (this.config.scroll = !1);
            let n =
                (l = this._element) == null
                    ? void 0
                    : l.getAttribute(x.DEFAULT.attr.backdrop);
            n
                ? (this.config.backdrop = n !== "false")
                : this.config.backdrop == null && (this.config.backdrop = !0);
            let s =
                (r = this._element) == null
                    ? void 0
                    : r.getAttribute(x.DEFAULT.attr.behavior);
            s
                ? (this.config.behavior = s == "static" ? "static" : "default")
                : this.config.behavior == null &&
                (this.config.behavior = "default");
        }
        initListener() {
            var t;
            this._element != null &&
                (this._element.addEventListener("click", () => {
                    this.toggle();
                }),
                    (t = this._targetElement) == null ||
                    t
                        .querySelectorAll(`[${x.DEFAULT.attr.dismiss}]`)
                        .forEach((n) => {
                            n.addEventListener("click", () => {
                                this.hide();
                            });
                        }),
                    Lt.listenOverlayClick(() => {
                        this.isStatic || this.hide();
                    }));
        }
        get isShown() {
            var t;
            return !(
                (t = this._targetElement) != null &&
                t.classList.contains(x.DEFAULT.class.hidden)
            );
        }
        get isStatic() {
            return this.config.behavior === "static";
        }
        show() {
            if (
                (this.dispatchEvent(x.EVENTS.show),
                    this._targetElement != null &&
                    this._element != null &&
                    (this._targetElement.classList.remove(
                        x.DEFAULT.class.hidden
                    ),
                        this._element.classList.add(x.DEFAULT.class.open),
                        this.config.backdrop && p.showOverlay(),
                        setTimeout(() => {
                            this._targetElement.classList.add(x.DEFAULT.class.open);
                        }, 1),
                        !this.config.scroll))
            ) {
                const t = document.documentElement.clientWidth;
                (document.body.style.paddingRight =
                    Math.abs(window.innerWidth - t) + "px"),
                    document.body.classList.add("overflow-hidden");
            }
            window.addEventListener("keydown", this.keyListener),
                this.dispatchEvent(x.EVENTS.shown);
        }
        hide() {
            var t;
            this.isShown &&
                (this.dispatchEvent(x.EVENTS.hide),
                    this._targetElement != null &&
                    this.isShown &&
                    ((t = this._element) == null ||
                        t.classList.remove(x.DEFAULT.class.open),
                        this._targetElement.classList.remove(x.DEFAULT.class.open),
                        Lt.afterTransition(this._targetElement, () => {
                            this._targetElement.classList.add(
                                x.DEFAULT.class.hidden
                            ),
                                this.config.backdrop && p.hideOverlay();
                        }),
                        this.config.scroll ||
                        (document.body.classList.remove("overflow-hidden"),
                            Object.assign(document.body.style, {
                                paddingRight: null,
                            }))),
                    window.removeEventListener("keydown", this.keyListener),
                    this.dispatchEvent(x.EVENTS.hidden));
        }
        toggle() {
            this.isShown ? this.hide() : this.show();
        }
        getTargetElement() {
            if (this._element == null) return null;
            const t =
                this.config.target ??
                this._element.getAttribute(x.DEFAULT.attr.target);
            return typeof t == "string"
                ? p.findOrById(t)
                : t instanceof HTMLElement
                    ? t
                    : p.nextElementSibling(this._element);
        }
    };
    let q = x;
    o(q, "type", "offcanvas"),
        o(q, "SELECTOR", '[data-fc-type="offcanvas"]'),
        o(q, "EVENTS", {
            show: "fc.offcanvas.show",
            shown: "fc.offcanvas.shown",
            hide: "fc.offcanvas.hide",
            hidden: "fc.offcanvas.hidden",
        }),
        o(q, "DEFAULT", {
            class: { base: "fc-offcanvas", hidden: "hidden", open: "open" },
            attr: {
                target: "data-fc-target",
                dismiss: "data-fc-dismiss",
                behavior: "data-fc-behavior",
                scroll: "data-fc-scroll",
                backdrop: "data-fc-backdrop",
            },
        });
    const ht = class extends I {
        constructor(t, n) {
            super(t, n);
            o(this, "_targetElement", null);
            this.init();
        }
        init() {
            this._element != null &&
                (this._targetElement = this._getTargetElement()),
                this._targetElement && this.initListener();
        }
        initListener() {
            this._element.addEventListener("click", () => {
                this.hide();
            });
        }
        hide() {
            this.dispatchEvent(ht.EVENTS.hide),
                this._targetElement != null &&
                this._targetElement.classList.add(ht.DEFAULT.class.hidden),
                this.dispatchEvent(ht.EVENTS.hidden);
        }
        _getTargetElement() {
            if (this._element == null) return null;
            const t =
                this.config.target ??
                this._element.getAttribute(ht.DEFAULT.attr.target);
            return typeof t == "string"
                ? p.findOrById(t)
                : t instanceof HTMLElement
                    ? t
                    : this._element.parentElement;
        }
    };
    let z = ht;
    o(z, "type", "dismissable"),
        o(z, "SELECTOR", "[data-fc-dismiss]"),
        o(z, "EVENTS", {
            hide: "fc.dismissable.hide",
            hidden: "fc.dismissable.hidden",
        }),
        o(z, "DEFAULT", {
            class: { hidden: "hidden" },
            attr: { target: "data-fc-dismiss" },
        });
    const ye = {
        clearArray(e) {
            return e.filter((i) => i != null);
        },
        deepClone(e) {
            return JSON.parse(JSON.stringify(e));
        },
    },
        St = class {
            static get state() {
                return (
                    this._initialize ||
                    (this._initialize = this.retrieveFromLocal()),
                    this._state
                );
            }
            static init() {
                (this._initialize = this.retrieveFromLocal()),
                    (this._old_state = ye.deepClone(this._state));
            }
            static changeTheme(i) {
                (this._state.theme = i), this.updateState();
            }
            static updateState() {
                this.updateInLocal(), this.notifyListener();
            }
            static updateInLocal() {
                localStorage.setItem(
                    this.stateKey,
                    JSON.stringify(this._state)
                );
            }
            static retrieveFromLocal() {
                const i = localStorage.getItem(this.stateKey);
                if (i == null) return (this._state = this.defaultState), !0;
                const t = JSON.parse(i);
                return (
                    Object.keys(t).forEach((n) =>
                        t[n] == null ? (t[n] = this.defaultState[n]) : void 0
                    ),
                    (this._state = t),
                    !0
                );
            }
            static attachListener(i) {
                this._listener.push(i);
            }
            static detachListener(i) {
                this._listener = this._listener.filter((t) => t != i);
            }
            static notifyListener() {
                for (const i of this._listener) i(St.state);
            }
        };
    let D = St;
    o(D, "_old_state", null),
        o(D, "_initialize", !1),
        o(D, "stateKey", "frost.app_state"),
        o(D, "defaultState", { theme: "light" }),
        o(D, "_listener", []),
        o(D, "_state", St.defaultState);
    class it {
        static init() {
            D.attachListener(this.themeChangeListener),
                this.themeChangeListener(D.state);
        }
        static themeChangeListener(i) {
            i.theme == "system"
                ? (it.changeTheme(
                    window.matchMedia &&
                        window.matchMedia("(prefers-color-scheme: dark)")
                            .matches
                        ? "dark"
                        : "light"
                ),
                    window
                        .matchMedia("(prefers-color-scheme: dark)")
                        .addEventListener("change", it.windowThemeListener))
                : (it.changeTheme(i.theme),
                    window
                        .matchMedia("(prefers-color-scheme: dark)")
                        .removeEventListener("change", it.windowThemeListener));
        }
        static windowThemeListener(i) {
            it.changeTheme(i.matches ? "dark" : "light");
        }
        static changeTheme(i) {
            const t = document.getElementsByTagName("html")[0];
            i === "dark" ? t.classList.add("dark") : t.classList.remove("dark");
        }
    }
    const st = class extends I {
        constructor(t, n) {
            super(t, n);
            o(this, "theme", null);
            o(this, "trigger", null);
            this.init();
        }
        notifyThemeChanged(t) {
            var n, s;
            if (this.trigger != "switch")
                (n = this._element) == null ||
                    n.classList.remove(
                        "light-theme",
                        "dark-theme",
                        "system-theme"
                    ),
                    (s = this._element) == null ||
                    s.classList.add(`${t}-theme`);
            else if (this._element instanceof HTMLInputElement) {
                const a = this._element;
                t != "dark"
                    ? (a.removeAttribute("checked"), (a.checked = !1))
                    : (a.setAttribute("checked", "checked"), (a.checked = !0));
            }
        }
        init() {
            this._element != null &&
                (this._element.classList.add(st.DEFAULT.class.base),
                    (this.theme = p.getAttribute(
                        this._element,
                        st.DEFAULT.attr.theme,
                        this.config.theme
                    )),
                    (this.trigger = p.getAttribute(
                        this._element,
                        st.DEFAULT.attr.trigger,
                        this.config.trigger
                    )),
                    this.initListeners(),
                    this.notifyThemeChanged(D.state.theme));
        }
        initListeners() {
            var t;
            if (
                this.trigger == "switch" &&
                this._element instanceof HTMLInputElement
            ) {
                const n = this._element;
                n == null ||
                    n.addEventListener("change", (s) => {
                        D.changeTheme(n.checked ? "dark" : "light"),
                            this.setOtherSwitch();
                    });
            } else
                this.theme != null &&
                    this.trigger != "never" &&
                    ((t = this._element) == null ||
                        t.addEventListener("click", () => {
                            D.changeTheme(this.theme), this.setOtherSwitch();
                        }));
        }
        setOtherSwitch() {
            const t = D.state.theme;
            p.findAll(st.SELECTOR)
                .map((n) => st.getInstanceOrCreate(n))
                .forEach((n) => {
                    n == null || n.notifyThemeChanged(t);
                });
        }
    };
    let nt = st;
    o(nt, "type", "theme_switcher"),
        o(nt, "SELECTOR", '[data-fc-type="theme_switcher"]'),
        o(nt, "DEFAULT", {
            class: { base: "fc-theme" },
            attr: { theme: "data-fc-theme", trigger: "data-fc-trigger" },
        });
    const kt = class {
        static get instance() {
            return (
                this._instance == null && (this._instance = new kt()),
                this._instance
            );
        }
        init() {
            typeof window < "u" &&
                (D.init(),
                    it.init(),
                    p.addOverlay([
                        "transition-all",
                        "fixed",
                        "inset-0",
                        "z-40",
                        "bg-gray-900",
                        "bg-opacity-50",
                        "dark:bg-opacity-80",
                    ]),
                    kt.instance.awakeComponents());
        }
        awakeComponents() {
            [O, X, B, Z, W, q, j, z, nt].map((i) =>
                p.findAll(i.SELECTOR).forEach((t) => i.getInstanceOrCreate(t))
            );
        }
    };
    let At = kt;
    o(At, "_instance", null);
    const ie = At.instance,
        we = {
            Collapse: O,
            Accordion: X,
            Dropdown: B,
            Tooltip: j,
            Modal: W,
            Offcanvas: q,
            Dismissable: z,
            Tab: Z,
            app: ie,
        },
        ne = ie.init;
    typeof window < "u" && ((window.frost = we), ne()),
        (b.Accordion = X),
        (b.Collapse = O),
        (b.Dismissable = z),
        (b.Dropdown = B),
        (b.Modal = W),
        (b.Offcanvas = q),
        (b.Tab = Z),
        (b.ThemeSwitcher = nt),
        (b.Tooltip = j),
        (b.initFrost = ne),
        Object.defineProperty(b, Symbol.toStringTag, { value: "Module" });
});
