/*!
 * jQuery Cycle2; build: v20131005
 * http://jquery.malsup.com/cycle2/
 * Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
 */
/*! core engine; version: 20131003 */
(function (e) {
    "use strict";
    function t(e) {
        return (e || "").toLowerCase();
    }
    var i = "20131003";
    (e.fn.cycle = function (i) {
        var n;
        return 0 !== this.length || e.isReady
            ? this.each(function () {
                  var n,
                      s,
                      o,
                      c,
                      r = e(this),
                      l = e.fn.cycle.log;
                  if (!r.data("cycle.opts")) {
                      (r.data("cycle-log") === !1 || (i && i.log === !1) || (s && s.log === !1)) && (l = e.noop), l("--c2 init--"), (n = r.data());
                      for (var a in n) n.hasOwnProperty(a) && /^cycle[A-Z]+/.test(a) && ((c = n[a]), (o = a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t)), l(o + ":", c, "(" + typeof c + ")"), (n[o] = c));
                      (s = e.extend({}, e.fn.cycle.defaults, n, i || {})),
                          (s.timeoutId = 0),
                          (s.paused = s.paused || !1),
                          (s.container = r),
                          (s._maxZ = s.maxZ),
                          (s.API = e.extend({ _container: r }, e.fn.cycle.API)),
                          (s.API.log = l),
                          (s.API.trigger = function (e, t) {
                              return s.container.trigger(e, t), s.API;
                          }),
                          r.data("cycle.opts", s),
                          r.data("cycle.API", s.API),
                          s.API.trigger("cycle-bootstrap", [s, s.API]),
                          s.API.addInitialSlides(),
                          s.API.preInitSlideshow(),
                          s.slides.length && s.API.initSlideshow();
                  }
              })
            : ((n = { s: this.selector, c: this.context }),
              e.fn.cycle.log("requeuing slideshow (dom not ready)"),
              e(function () {
                  e(n.s, n.c).cycle(i);
              }),
              this);
    }),
        (e.fn.cycle.API = {
            opts: function () {
                return this._container.data("cycle.opts");
            },
            addInitialSlides: function () {
                var t = this.opts(),
                    i = t.slides;
                (t.slideCount = 0),
                    (t.slides = e()),
                    (i = i.jquery ? i : t.container.find(i)),
                    t.random &&
                        i.sort(function () {
                            return Math.random() - 0.5;
                        }),
                    t.API.add(i);
            },
            preInitSlideshow: function () {
                var t = this.opts();
                t.API.trigger("cycle-pre-initialize", [t]);
                var i = e.fn.cycle.transitions[t.fx];
                i && e.isFunction(i.preInit) && i.preInit(t), (t._preInitialized = !0);
            },
            postInitSlideshow: function () {
                var t = this.opts();
                t.API.trigger("cycle-post-initialize", [t]);
                var i = e.fn.cycle.transitions[t.fx];
                i && e.isFunction(i.postInit) && i.postInit(t);
            },
            initSlideshow: function () {
                var t,
                    i = this.opts(),
                    n = i.container;
                i.API.calcFirstSlide(),
                    "static" == i.container.css("position") && i.container.css("position", "relative"),
                    e(i.slides[i.currSlide]).css("opacity", 1).show(),
                    i.API.stackSlides(i.slides[i.currSlide], i.slides[i.nextSlide], !i.reverse),
                    i.pauseOnHover &&
                        (i.pauseOnHover !== !0 && (n = e(i.pauseOnHover)),
                        n.hover(
                            function () {
                                i.API.pause(!0);
                            },
                            function () {
                                i.API.resume(!0);
                            }
                        )),
                    i.timeout && ((t = i.API.getSlideOpts(i.currSlide)), i.API.queueTransition(t, t.timeout + i.delay)),
                    (i._initialized = !0),
                    i.API.updateView(!0),
                    i.API.trigger("cycle-initialized", [i]),
                    i.API.postInitSlideshow();
            },
            pause: function (t) {
                var i = this.opts(),
                    n = i.API.getSlideOpts(),
                    s = i.hoverPaused || i.paused;
                t ? (i.hoverPaused = !0) : (i.paused = !0), s || (i.container.addClass("cycle-paused"), i.API.trigger("cycle-paused", [i]).log("cycle-paused"), n.timeout && (clearTimeout(i.timeoutId), (i.timeoutId = 0), (i._remainingTimeout -= e.now() - i._lastQueue), (0 > i._remainingTimeout || isNaN(i._remainingTimeout)) && (i._remainingTimeout = void 0)));
            },
            resume: function (e) {
                var t = this.opts(),
                    i = !t.hoverPaused && !t.paused;
                e ? (t.hoverPaused = !1) : (t.paused = !1), i || (t.container.removeClass("cycle-paused"), 0 === t.slides.filter(":animated").length && t.API.queueTransition(t.API.getSlideOpts(), t._remainingTimeout), t.API.trigger("cycle-resumed", [t, t._remainingTimeout]).log("cycle-resumed"));
            },
            add: function (t, i) {
                var n,
                    s = this.opts(),
                    o = s.slideCount,
                    c = !1;
                "string" == e.type(t) && (t = e.trim(t)),
                    e(t).each(function () {
                        var t,
                            n = e(this);
                        i ? s.container.prepend(n) : s.container.append(n), s.slideCount++, (t = s.API.buildSlideOpts(n)), (s.slides = i ? e(n).add(s.slides) : s.slides.add(n)), s.API.initSlide(t, n, --s._maxZ), n.data("cycle.opts", t), s.API.trigger("cycle-slide-added", [s, t, n]);
                    }),
                    s.API.updateView(!0),
                    (c = s._preInitialized && 2 > o && s.slideCount >= 1),
                    c && (s._initialized ? s.timeout && ((n = s.slides.length), (s.nextSlide = s.reverse ? n - 1 : 1), s.timeoutId || s.API.queueTransition(s)) : s.API.initSlideshow());
            },
            calcFirstSlide: function () {
                var e,
                    t = this.opts();
                (e = parseInt(t.startingSlide || 0, 10)), (e >= t.slides.length || 0 > e) && (e = 0), (t.currSlide = e), t.reverse ? ((t.nextSlide = e - 1), 0 > t.nextSlide && (t.nextSlide = t.slides.length - 1)) : ((t.nextSlide = e + 1), t.nextSlide == t.slides.length && (t.nextSlide = 0));
            },
            calcNextSlide: function () {
                var e,
                    t = this.opts();
                t.reverse ? ((e = 0 > t.nextSlide - 1), (t.nextSlide = e ? t.slideCount - 1 : t.nextSlide - 1), (t.currSlide = e ? 0 : t.nextSlide + 1)) : ((e = t.nextSlide + 1 == t.slides.length), (t.nextSlide = e ? 0 : t.nextSlide + 1), (t.currSlide = e ? t.slides.length - 1 : t.nextSlide - 1));
            },
            calcTx: function (t, i) {
                var n,
                    s = t;
                return i && s.manualFx && (n = e.fn.cycle.transitions[s.manualFx]), n || (n = e.fn.cycle.transitions[s.fx]), n || ((n = e.fn.cycle.transitions.fade), s.API.log('Transition "' + s.fx + '" not found.  Using fade.')), n;
            },
            prepareTx: function (e, t) {
                var i,
                    n,
                    s,
                    o,
                    c,
                    r = this.opts();
                return 2 > r.slideCount
                    ? ((r.timeoutId = 0), void 0)
                    : (!e || (r.busy && !r.manualTrump) || (r.API.stopTransition(), (r.busy = !1), clearTimeout(r.timeoutId), (r.timeoutId = 0)),
                      r.busy ||
                          ((0 !== r.timeoutId || e) &&
                              ((n = r.slides[r.currSlide]),
                              (s = r.slides[r.nextSlide]),
                              (o = r.API.getSlideOpts(r.nextSlide)),
                              (c = r.API.calcTx(o, e)),
                              (r._tx = c),
                              e && void 0 !== o.manualSpeed && (o.speed = o.manualSpeed),
                              r.nextSlide != r.currSlide && (e || (!r.paused && !r.hoverPaused && r.timeout))
                                  ? (r.API.trigger("cycle-before", [o, n, s, t]),
                                    c.before && c.before(o, n, s, t),
                                    (i = function () {
                                        (r.busy = !1), r.container.data("cycle.opts") && (c.after && c.after(o, n, s, t), r.API.trigger("cycle-after", [o, n, s, t]), r.API.queueTransition(o), r.API.updateView(!0));
                                    }),
                                    (r.busy = !0),
                                    c.transition ? c.transition(o, n, s, t, i) : r.API.doTransition(o, n, s, t, i),
                                    r.API.calcNextSlide(),
                                    r.API.updateView())
                                  : r.API.queueTransition(o))),
                      void 0);
            },
            doTransition: function (t, i, n, s, o) {
                var c = t,
                    r = e(i),
                    l = e(n),
                    a = function () {
                        l.animate(c.animIn || { opacity: 1 }, c.speed, c.easeIn || c.easing, o);
                    };
                l.css(c.cssBefore || {}),
                    r.animate(c.animOut || {}, c.speed, c.easeOut || c.easing, function () {
                        r.css(c.cssAfter || {}), c.sync || a();
                    }),
                    c.sync && a();
            },
            queueTransition: function (t, i) {
                var n = this.opts(),
                    s = void 0 !== i ? i : t.timeout;
                return 0 === n.nextSlide && 0 === --n.loop
                    ? (n.API.log("terminating; loop=0"),
                      (n.timeout = 0),
                      s
                          ? setTimeout(function () {
                                n.API.trigger("cycle-finished", [n]);
                            }, s)
                          : n.API.trigger("cycle-finished", [n]),
                      (n.nextSlide = n.currSlide),
                      void 0)
                    : (s &&
                          ((n._lastQueue = e.now()),
                          void 0 === i && (n._remainingTimeout = t.timeout),
                          n.paused ||
                              n.hoverPaused ||
                              (n.timeoutId = setTimeout(function () {
                                  n.API.prepareTx(!1, !n.reverse);
                              }, s))),
                      void 0);
            },
            stopTransition: function () {
                var e = this.opts();
                e.slides.filter(":animated").length && (e.slides.stop(!1, !0), e.API.trigger("cycle-transition-stopped", [e])), e._tx && e._tx.stopTransition && e._tx.stopTransition(e);
            },
            advanceSlide: function (e) {
                var t = this.opts();
                return clearTimeout(t.timeoutId), (t.timeoutId = 0), (t.nextSlide = t.currSlide + e), 0 > t.nextSlide ? (t.nextSlide = t.slides.length - 1) : t.nextSlide >= t.slides.length && (t.nextSlide = 0), t.API.prepareTx(!0, e >= 0), !1;
            },
            buildSlideOpts: function (i) {
                var n,
                    s,
                    o = this.opts(),
                    c = i.data() || {};
                for (var r in c) c.hasOwnProperty(r) && /^cycle[A-Z]+/.test(r) && ((n = c[r]), (s = r.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t)), o.API.log("[" + (o.slideCount - 1) + "]", s + ":", n, "(" + typeof n + ")"), (c[s] = n));
                (c = e.extend({}, e.fn.cycle.defaults, o, c)), (c.slideNum = o.slideCount);
                try {
                    delete c.API, delete c.slideCount, delete c.currSlide, delete c.nextSlide, delete c.slides;
                } catch (l) {}
                return c;
            },
            getSlideOpts: function (t) {
                var i = this.opts();
                void 0 === t && (t = i.currSlide);
                var n = i.slides[t],
                    s = e(n).data("cycle.opts");
                return e.extend({}, i, s);
            },
            initSlide: function (t, i, n) {
                var s = this.opts();
                i.css(t.slideCss || {}), n > 0 && i.css("zIndex", n), isNaN(t.speed) && (t.speed = e.fx.speeds[t.speed] || e.fx.speeds._default), t.sync || (t.speed = t.speed / 2), i.addClass(s.slideClass);
            },
            updateView: function (e, t) {
                var i = this.opts();
                if (i._initialized) {
                    var n = i.API.getSlideOpts(),
                        s = i.slides[i.currSlide];
                    (!e && t !== !0 && (i.API.trigger("cycle-update-view-before", [i, n, s]), 0 > i.updateView)) || (i.slideActiveClass && i.slides.removeClass(i.slideActiveClass).eq(i.currSlide).addClass(i.slideActiveClass), e && i.hideNonActive && i.slides.filter(":not(." + i.slideActiveClass + ")").hide(), i.API.trigger("cycle-update-view", [i, n, s, e]), e && i.API.trigger("cycle-update-view-after", [i, n, s]));
                }
            },
            getComponent: function (t) {
                var i = this.opts(),
                    n = i[t];
                return "string" == typeof n ? (/^\s*[\>|\+|~]/.test(n) ? i.container.find(n) : e(n)) : n.jquery ? n : e(n);
            },
            stackSlides: function (t, i, n) {
                var s = this.opts();
                t || ((t = s.slides[s.currSlide]), (i = s.slides[s.nextSlide]), (n = !s.reverse)), e(t).css("zIndex", s.maxZ);
                var o,
                    c = s.maxZ - 2,
                    r = s.slideCount;
                if (n) {
                    for (o = s.currSlide + 1; r > o; o++) e(s.slides[o]).css("zIndex", c--);
                    for (o = 0; s.currSlide > o; o++) e(s.slides[o]).css("zIndex", c--);
                } else {
                    for (o = s.currSlide - 1; o >= 0; o--) e(s.slides[o]).css("zIndex", c--);
                    for (o = r - 1; o > s.currSlide; o--) e(s.slides[o]).css("zIndex", c--);
                }
                e(i).css("zIndex", s.maxZ - 1);
            },
            getSlideIndex: function (e) {
                return this.opts().slides.index(e);
            },
        }),
        (e.fn.cycle.log = function () {
            window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "));
        }),
        (e.fn.cycle.version = function () {
            return "Cycle2: " + i;
        }),
        (e.fn.cycle.transitions = {
            custom: {},
            none: {
                before: function (e, t, i, n) {
                    e.API.stackSlides(i, t, n), (e.cssBefore = { opacity: 1, display: "block" });
                },
            },
            fade: {
                before: function (t, i, n, s) {
                    var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                    t.API.stackSlides(i, n, s), (t.cssBefore = e.extend(o, { opacity: 0, display: "block" })), (t.animIn = { opacity: 1 }), (t.animOut = { opacity: 0 });
                },
            },
            fadeout: {
                before: function (t, i, n, s) {
                    var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                    t.API.stackSlides(i, n, s), (t.cssBefore = e.extend(o, { opacity: 1, display: "block" })), (t.animOut = { opacity: 0 });
                },
            },
            scrollHorz: {
                before: function (e, t, i, n) {
                    e.API.stackSlides(t, i, n);
                    var s = e.container.css("overflow", "hidden").width();
                    (e.cssBefore = { left: n ? s : -s, top: 0, opacity: 1, display: "block" }), (e.cssAfter = { zIndex: e._maxZ - 2, left: 0 }), (e.animIn = { left: 0 }), (e.animOut = { left: n ? -s : s });
                },
            },
        }),
        (e.fn.cycle.defaults = { allowWrap: !0, autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]", delay: 0, easing: null, fx: "fade", hideNonActive: !0, loop: 0, manualFx: void 0, manualSpeed: void 0, manualTrump: !0, maxZ: 100, pauseOnHover: !1, reverse: !1, slideActiveClass: "cycle-slide-active", slideClass: "cycle-slide", slideCss: { position: "absolute", top: 0, left: 0 }, slides: "> img", speed: 500, startingSlide: 0, sync: !0, timeout: 4e3, updateView: -1 }),
        e(document).ready(function () {
            e(e.fn.cycle.defaults.autoSelector).cycle();
        });
})(jQuery) /*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130304 */,
    (function (e) {
        "use strict";
        function t(t, n) {
            var s,
                o,
                c,
                r = n.autoHeight;
            if ("container" == r) (o = e(n.slides[n.currSlide]).outerHeight()), n.container.height(o);
            else if (n._autoHeightRatio) n.container.height(n.container.width() / n._autoHeightRatio);
            else if ("calc" === r || ("number" == e.type(r) && r >= 0)) {
                if (((c = "calc" === r ? i(t, n) : r >= n.slides.length ? 0 : r), c == n._sentinelIndex)) return;
                (n._sentinelIndex = c), n._sentinel && n._sentinel.remove(), (s = e(n.slides[c].cloneNode(!0))), s.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), s.css({ position: "static", visibility: "hidden", display: "block" }).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), s.find("*").css("visibility", "hidden"), (n._sentinel = s);
            }
        }
        function i(t, i) {
            var n = 0,
                s = -1;
            return (
                i.slides.each(function (t) {
                    var i = e(this).height();
                    i > s && ((s = i), (n = t));
                }),
                n
            );
        }
        function n(t, i, n, s) {
            var o = e(s).outerHeight(),
                c = i.sync ? i.speed / 2 : i.speed;
            i.container.animate({ height: o }, c);
        }
        function s(i, o) {
            o._autoHeightOnResize && (e(window).off("resize orientationchange", o._autoHeightOnResize), (o._autoHeightOnResize = null)), o.container.off("cycle-slide-added cycle-slide-removed", t), o.container.off("cycle-destroyed", s), o.container.off("cycle-before", n), o._sentinel && (o._sentinel.remove(), (o._sentinel = null));
        }
        e.extend(e.fn.cycle.defaults, { autoHeight: 0 }),
            e(document).on("cycle-initialized", function (i, o) {
                function c() {
                    t(i, o);
                }
                var r,
                    l = o.autoHeight,
                    a = e.type(l),
                    d = null;
                ("string" === a || "number" === a) &&
                    (o.container.on("cycle-slide-added cycle-slide-removed", t),
                    o.container.on("cycle-destroyed", s),
                    "container" == l ? o.container.on("cycle-before", n) : "string" === a && /\d+\:\d+/.test(l) && ((r = l.match(/(\d+)\:(\d+)/)), (r = r[1] / r[2]), (o._autoHeightRatio = r)),
                    "number" !== a &&
                        ((o._autoHeightOnResize = function () {
                            clearTimeout(d), (d = setTimeout(c, 50));
                        }),
                        e(window).on("resize orientationchange", o._autoHeightOnResize)),
                    setTimeout(c, 30));
            });
    })(jQuery) /*! caption plugin for Cycle2;  version: 20130306 */,
    (function (e) {
        "use strict";
        e.extend(e.fn.cycle.defaults, { caption: "> .cycle-caption", captionTemplate: "{{slideNum}} / {{slideCount}}", overlay: "> .cycle-overlay", overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>", captionModule: "caption" }),
            e(document).on("cycle-update-view", function (t, i, n, s) {
                "caption" === i.captionModule &&
                    e.each(["caption", "overlay"], function () {
                        var e = this,
                            t = n[e + "Template"],
                            o = i.API.getComponent(e);
                        o.length && t ? (o.html(i.API.tmpl(t, n, i, s)), o.show()) : o.hide();
                    });
            }),
            e(document).on("cycle-destroyed", function (t, i) {
                var n;
                e.each(["caption", "overlay"], function () {
                    var e = this,
                        t = i[e + "Template"];
                    i[e] && t && ((n = i.API.getComponent("caption")), n.empty());
                });
            });
    })(jQuery) /*! command plugin for Cycle2;  version: 20130707 */,
    (function (e) {
        "use strict";
        var t = e.fn.cycle;
        (e.fn.cycle = function (i) {
            var n,
                s,
                o,
                c = e.makeArray(arguments);
            return "number" == e.type(i)
                ? this.cycle("goto", i)
                : "string" == e.type(i)
                ? this.each(function () {
                      var r;
                      return (n = i), (o = e(this).data("cycle.opts")), void 0 === o ? (t.log('slideshow must be initialized before sending commands; "' + n + '" ignored'), void 0) : ((n = "goto" == n ? "jump" : n), (s = o.API[n]), e.isFunction(s) ? ((r = e.makeArray(c)), r.shift(), s.apply(o.API, r)) : (t.log("unknown command: ", n), void 0));
                  })
                : t.apply(this, arguments);
        }),
            e.extend(e.fn.cycle, t),
            e.extend(t.API, {
                next: function () {
                    var e = this.opts();
                    if (!e.busy || e.manualTrump) {
                        var t = e.reverse ? -1 : 1;
                        (e.allowWrap === !1 && e.currSlide + t >= e.slideCount) || (e.API.advanceSlide(t), e.API.trigger("cycle-next", [e]).log("cycle-next"));
                    }
                },
                prev: function () {
                    var e = this.opts();
                    if (!e.busy || e.manualTrump) {
                        var t = e.reverse ? 1 : -1;
                        (e.allowWrap === !1 && 0 > e.currSlide + t) || (e.API.advanceSlide(t), e.API.trigger("cycle-prev", [e]).log("cycle-prev"));
                    }
                },
                destroy: function () {
                    this.stop();
                    var t = this.opts(),
                        i = e.isFunction(e._data) ? e._data : e.noop;
                    clearTimeout(t.timeoutId),
                        (t.timeoutId = 0),
                        t.API.stop(),
                        t.API.trigger("cycle-destroyed", [t]).log("cycle-destroyed"),
                        t.container.removeData(),
                        i(t.container[0], "parsedAttrs", !1),
                        t.retainStylesOnDestroy || (t.container.removeAttr("style"), t.slides.removeAttr("style"), t.slides.removeClass(t.slideActiveClass)),
                        t.slides.each(function () {
                            e(this).removeData(), i(this, "parsedAttrs", !1);
                        });
                },
                jump: function (e) {
                    var t,
                        i = this.opts();
                    if (!i.busy || i.manualTrump) {
                        var n = parseInt(e, 10);
                        if (isNaN(n) || 0 > n || n >= i.slides.length) return i.API.log("goto: invalid slide index: " + n), void 0;
                        if (n == i.currSlide) return i.API.log("goto: skipping, already on slide", n), void 0;
                        (i.nextSlide = n), clearTimeout(i.timeoutId), (i.timeoutId = 0), i.API.log("goto: ", n, " (zero-index)"), (t = i.currSlide < i.nextSlide), i.API.prepareTx(!0, t);
                    }
                },
                stop: function () {
                    var t = this.opts(),
                        i = t.container;
                    clearTimeout(t.timeoutId), (t.timeoutId = 0), t.API.stopTransition(), t.pauseOnHover && (t.pauseOnHover !== !0 && (i = e(t.pauseOnHover)), i.off("mouseenter mouseleave")), t.API.trigger("cycle-stopped", [t]).log("cycle-stopped");
                },
                reinit: function () {
                    var e = this.opts();
                    e.API.destroy(), e.container.cycle();
                },
                remove: function (t) {
                    for (var i, n, s = this.opts(), o = [], c = 1, r = 0; s.slides.length > r; r++) (i = s.slides[r]), r == t ? (n = i) : (o.push(i), (e(i).data("cycle.opts").slideNum = c), c++);
                    n && ((s.slides = e(o)), s.slideCount--, e(n).remove(), t == s.currSlide ? s.API.advanceSlide(1) : s.currSlide > t ? s.currSlide-- : s.currSlide++, s.API.trigger("cycle-slide-removed", [s, t, n]).log("cycle-slide-removed"), s.API.updateView());
                },
            }),
            e(document).on("click.cycle", "[data-cycle-cmd]", function (t) {
                t.preventDefault();
                var i = e(this),
                    n = i.data("cycle-cmd"),
                    s = i.data("cycle-context") || ".cycle-slideshow";
                e(s).cycle(n, i.data("cycle-arg"));
            });
    })(jQuery) /*! hash plugin for Cycle2;  version: 20130905 */,
    (function (e) {
        "use strict";
        function t(t, i) {
            var n;
            return t._hashFence
                ? ((t._hashFence = !1), void 0)
                : ((n = window.location.hash.substring(1)),
                  t.slides.each(function (s) {
                      if (e(this).data("cycle-hash") == n) {
                          if (i === !0) t.startingSlide = s;
                          else {
                              var o = s > t.currSlide;
                              (t.nextSlide = s), t.API.prepareTx(!0, o);
                          }
                          return !1;
                      }
                  }),
                  void 0);
        }
        e(document).on("cycle-pre-initialize", function (i, n) {
            t(n, !0),
                (n._onHashChange = function () {
                    t(n, !1);
                }),
                e(window).on("hashchange", n._onHashChange);
        }),
            e(document).on("cycle-update-view", function (e, t, i) {
                i.hash && "#" + i.hash != window.location.hash && ((t._hashFence = !0), (window.location.hash = i.hash));
            }),
            e(document).on("cycle-destroyed", function (t, i) {
                i._onHashChange && e(window).off("hashchange", i._onHashChange);
            });
    })(jQuery) /*! loader plugin for Cycle2;  version: 20130307 */,
    (function (e) {
        "use strict";
        e.extend(e.fn.cycle.defaults, { loader: !1 }),
            e(document).on("cycle-bootstrap", function (t, i) {
                function n(t, n) {
                    function o(t) {
                        var o;
                        "wait" == i.loader ? (r.push(t), 0 === a && (r.sort(c), s.apply(i.API, [r, n]), i.container.removeClass("cycle-loading"))) : ((o = e(i.slides[i.currSlide])), s.apply(i.API, [t, n]), o.show(), i.container.removeClass("cycle-loading"));
                    }
                    function c(e, t) {
                        return e.data("index") - t.data("index");
                    }
                    var r = [];
                    if ("string" == e.type(t)) t = e.trim(t);
                    else if ("array" === e.type(t)) for (var l = 0; t.length > l; l++) t[l] = e(t[l])[0];
                    t = e(t);
                    var a = t.length;
                    a &&
                        (t
                            .hide()
                            .appendTo("body")
                            .each(function (t) {
                                function c() {
                                    0 === --l && (--a, o(d));
                                }
                                var l = 0,
                                    d = e(this),
                                    u = d.is("img") ? d : d.find("img");
                                return (
                                    d.data("index", t),
                                    (u = u.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])')),
                                    u.length
                                        ? ((l = u.length),
                                          u.each(function () {
                                              this.complete
                                                  ? c()
                                                  : e(this)
                                                        .load(function () {
                                                            c();
                                                        })
                                                        .error(function () {
                                                            0 === --l && (i.API.log("slide skipped; img not loaded:", this.src), 0 === --a && "wait" == i.loader && s.apply(i.API, [r, n]));
                                                        });
                                          }),
                                          void 0)
                                        : (--a, r.push(d), void 0)
                                );
                            }),
                        a && i.container.addClass("cycle-loading"));
                }
                var s;
                i.loader && ((s = i.API.add), (i.API.add = n));
            });
    })(jQuery) /*! pager plugin for Cycle2;  version: 20130525 */,
    (function (e) {
        "use strict";
        function t(t, i, n) {
            var s,
                o = t.API.getComponent("pager");
            o.each(function () {
                var o = e(this);
                if (i.pagerTemplate) {
                    var c = t.API.tmpl(i.pagerTemplate, i, t, n[0]);
                    s = e(c).appendTo(o);
                } else s = o.children().eq(t.slideCount - 1);
                s.on(t.pagerEvent, function (e) {
                    e.preventDefault(), t.API.page(o, e.currentTarget);
                });
            });
        }
        function i(e, t) {
            var i = this.opts();
            if (!i.busy || i.manualTrump) {
                var n = e.children().index(t),
                    s = n,
                    o = s > i.currSlide;
                i.currSlide != s && ((i.nextSlide = s), i.API.prepareTx(!0, o), i.API.trigger("cycle-pager-activated", [i, e, t]));
            }
        }
        e.extend(e.fn.cycle.defaults, { pager: "> .cycle-pager", pagerActiveClass: "cycle-pager-active", pagerEvent: "click.cycle", pagerTemplate: "<span>&bull;</span>" }),
            e(document).on("cycle-bootstrap", function (e, i, n) {
                n.buildPagerLink = t;
            }),
            e(document).on("cycle-slide-added", function (e, t, n, s) {
                t.pager && (t.API.buildPagerLink(t, n, s), (t.API.page = i));
            }),
            e(document).on("cycle-slide-removed", function (t, i, n) {
                if (i.pager) {
                    var s = i.API.getComponent("pager");
                    s.each(function () {
                        var t = e(this);
                        e(t.children()[n]).remove();
                    });
                }
            }),
            e(document).on("cycle-update-view", function (t, i) {
                var n;
                i.pager &&
                    ((n = i.API.getComponent("pager")),
                    n.each(function () {
                        e(this).children().removeClass(i.pagerActiveClass).eq(i.currSlide).addClass(i.pagerActiveClass);
                    }));
            }),
            e(document).on("cycle-destroyed", function (e, t) {
                var i = t.API.getComponent("pager");
                i && (i.children().off(t.pagerEvent), t.pagerTemplate && i.empty());
            });
    })(jQuery) /*! prevnext plugin for Cycle2;  version: 20130709 */,
    (function (e) {
        "use strict";
        e.extend(e.fn.cycle.defaults, { next: "> .cycle-next", nextEvent: "click.cycle", disabledClass: "disabled", prev: "> .cycle-prev", prevEvent: "click.cycle", swipe: !1 }),
            e(document).on("cycle-initialized", function (e, t) {
                if (
                    (t.API.getComponent("next").on(t.nextEvent, function (e) {
                        e.preventDefault(), t.API.next();
                    }),
                    t.API.getComponent("prev").on(t.prevEvent, function (e) {
                        e.preventDefault(), t.API.prev();
                    }),
                    t.swipe)
                ) {
                    var i = t.swipeVert ? "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle",
                        n = t.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle";
                    t.container.on(i, function () {
                        t.API.next();
                    }),
                        t.container.on(n, function () {
                            t.API.prev();
                        });
                }
            }),
            e(document).on("cycle-update-view", function (e, t) {
                if (!t.allowWrap) {
                    var i = t.disabledClass,
                        n = t.API.getComponent("next"),
                        s = t.API.getComponent("prev"),
                        o = t._prevBoundry || 0,
                        c = void 0 !== t._nextBoundry ? t._nextBoundry : t.slideCount - 1;
                    t.currSlide == c ? n.addClass(i).prop("disabled", !0) : n.removeClass(i).prop("disabled", !1), t.currSlide === o ? s.addClass(i).prop("disabled", !0) : s.removeClass(i).prop("disabled", !1);
                }
            }),
            e(document).on("cycle-destroyed", function (e, t) {
                t.API.getComponent("prev").off(t.nextEvent), t.API.getComponent("next").off(t.prevEvent), t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle");
            });
    })(jQuery) /*! progressive loader plugin for Cycle2;  version: 20130315 */,
    (function (e) {
        "use strict";
        e.extend(e.fn.cycle.defaults, { progressive: !1 }),
            e(document).on("cycle-pre-initialize", function (t, i) {
                if (i.progressive) {
                    var n,
                        s,
                        o = i.API,
                        c = o.next,
                        r = o.prev,
                        l = o.prepareTx,
                        a = e.type(i.progressive);
                    if ("array" == a) n = i.progressive;
                    else if (e.isFunction(i.progressive)) n = i.progressive(i);
                    else if ("string" == a) {
                        if (((s = e(i.progressive)), (n = e.trim(s.html())), !n)) return;
                        if (/^(\[)/.test(n))
                            try {
                                n = e.parseJSON(n);
                            } catch (d) {
                                return o.log("error parsing progressive slides", d), void 0;
                            }
                        else (n = n.split(RegExp(s.data("cycle-split") || "\n"))), n[n.length - 1] || n.pop();
                    }
                    l &&
                        (o.prepareTx = function (e, t) {
                            var s, o;
                            return e || 0 === n.length
                                ? (l.apply(i.API, [e, t]), void 0)
                                : (t && i.currSlide == i.slideCount - 1
                                      ? ((o = n[0]),
                                        (n = n.slice(1)),
                                        i.container.one("cycle-slide-added", function (e, t) {
                                            setTimeout(function () {
                                                t.API.advanceSlide(1);
                                            }, 50);
                                        }),
                                        i.API.add(o))
                                      : t || 0 !== i.currSlide
                                      ? l.apply(i.API, [e, t])
                                      : ((s = n.length - 1),
                                        (o = n[s]),
                                        (n = n.slice(0, s)),
                                        i.container.one("cycle-slide-added", function (e, t) {
                                            setTimeout(function () {
                                                (t.currSlide = 1), t.API.advanceSlide(-1);
                                            }, 50);
                                        }),
                                        i.API.add(o, !0)),
                                  void 0);
                        }),
                        c &&
                            (o.next = function () {
                                var e = this.opts();
                                if (n.length && e.currSlide == e.slideCount - 1) {
                                    var t = n[0];
                                    (n = n.slice(1)),
                                        e.container.one("cycle-slide-added", function (e, t) {
                                            c.apply(t.API), t.container.removeClass("cycle-loading");
                                        }),
                                        e.container.addClass("cycle-loading"),
                                        e.API.add(t);
                                } else c.apply(e.API);
                            }),
                        r &&
                            (o.prev = function () {
                                var e = this.opts();
                                if (n.length && 0 === e.currSlide) {
                                    var t = n.length - 1,
                                        i = n[t];
                                    (n = n.slice(0, t)),
                                        e.container.one("cycle-slide-added", function (e, t) {
                                            (t.currSlide = 1), t.API.advanceSlide(-1), t.container.removeClass("cycle-loading");
                                        }),
                                        e.container.addClass("cycle-loading"),
                                        e.API.add(i, !0);
                                } else r.apply(e.API);
                            });
                }
            });
    })(jQuery) /*! tmpl plugin for Cycle2;  version: 20121227 */,
    (function (e) {
        "use strict";
        e.extend(e.fn.cycle.defaults, { tmplRegex: "{{((.)?.*?)}}" }),
            e.extend(e.fn.cycle.API, {
                tmpl: function (t, i) {
                    var n = RegExp(i.tmplRegex || e.fn.cycle.defaults.tmplRegex, "g"),
                        s = e.makeArray(arguments);
                    return (
                        s.shift(),
                        t.replace(n, function (t, i) {
                            var n,
                                o,
                                c,
                                r,
                                l = i.split(".");
                            for (n = 0; s.length > n; n++)
                                if ((c = s[n])) {
                                    if (l.length > 1) for (r = c, o = 0; l.length > o; o++) (c = r), (r = r[l[o]] || i);
                                    else r = c[i];
                                    if (e.isFunction(r)) return r.apply(c, s);
                                    if (void 0 !== r && null !== r && r != i) return r;
                                }
                            return i;
                        })
                    );
                },
            });
    })(jQuery);
//@ sourceMappingURL=jquery.cycle2.js.map
