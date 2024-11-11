/*!
 * @pixi/ui - v2.1.5
 * Compiled Thu, 22 Aug 2024 13:04:36 UTC
 *
 * @pixi/ui is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 *
 * Copyright 2024, PixiJS Team, All Rights Reserved
 */
(this.PIXI = this.PIXI || {}),
  (this.PIXI.ui = (function (w, o, v, z) {
    "use strict";
    var ut = Object.defineProperty,
      pt = (s, t, i) =>
        t in s
          ? ut(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      S = (s, t, i) => (pt(s, typeof t != "symbol" ? t + "" : t, i), i);

    class ct {
      constructor() {
        S(this, "_isMouseIn"),
          S(this, "_isDown"),
          S(this, "onDown"),
          S(this, "onUp"),
          S(this, "onUpOut"),
          S(this, "onOut"),
          S(this, "onPress"),
          S(this, "onHover"),
          (this.onPress = new v.Signal()),
          (this.onDown = new v.Signal()),
          (this.onUp = new v.Signal()),
          (this.onHover = new v.Signal()),
          (this.onOut = new v.Signal()),
          (this.onUpOut = new v.Signal());
      }

      connectEvents(t) {
        o.isMobile.any
          ? (t.on("pointerdown", this.processDown, this),
            t.on("pointerup", this.processUp, this),
            t.on("pointerupoutside", this.processUpOut, this),
            t.on("pointerout", this.processOut, this),
            t.on("pointertap", this.processPress, this),
            t.on("pointerover", this.processOver, this))
          : (t.on("mousedown", this.processDown, this),
            t.on("mouseup", this.processUp, this),
            t.on("mouseupoutside", this.processUpOut, this),
            t.on("mouseout", this.processOut, this),
            t.on("click", this.processPress, this),
            t.on("mouseover", this.processOver, this));
      }

      disconnectEvents(t) {
        o.isMobile.any
          ? (t.off("pointerdown", this.processDown, this),
            t.off("pointerup", this.processUp, this),
            t.off("pointerupoutside", this.processUpOut, this),
            t.off("pointerout", this.processOut, this),
            t.off("pointertap", this.processPress, this),
            t.off("pointerover", this.processOver, this))
          : (t.off("mousedown", this.processDown, this),
            t.off("mouseup", this.processUp, this),
            t.off("mouseupoutside", this.processUpOut, this),
            t.off("mouseout", this.processOut, this),
            t.off("click", this.processPress, this),
            t.off("mouseover", this.processOver, this));
      }

      processDown(t) {
        (this._isDown = !0), this.onDown.emit(this, t), this.down(t);
      }

      processUp(t) {
        this._isDown && (this.onUp.emit(this, t), this.up(t)),
          (this._isDown = !1);
      }

      processUpOut(t) {
        this._isDown &&
          (this.onUp.emit(this, t),
          this.onUpOut.emit(this, t),
          this.up(t),
          this.upOut(t)),
          (this._isDown = !1);
      }

      processOut(t) {
        this._isMouseIn &&
          ((this._isMouseIn = !1), this.onOut.emit(this, t), this.out(t));
      }

      processPress(t) {
        (this._isDown = !1), this.onPress.emit(this, t), this.press(t);
      }

      processOver(t) {
        o.isMobile.any ||
          ((this._isMouseIn = !0), this.onHover.emit(this, t), this.hover(t));
      }

      down(t) {}

      up(t) {}

      upOut(t) {}

      out(t) {}

      press(t) {}

      hover(t) {}

      get isDown() {
        return this._isDown;
      }
    }

    var gt = Object.defineProperty,
      vt = (s, t, i) =>
        t in s
          ? gt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      V = (s, t, i) => (vt(s, typeof t != "symbol" ? t + "" : t, i), i);

    class N extends ct {
      constructor(t) {
        super(), V(this, "_view"), t && ((this.view = t), (this.enabled = !0));
      }

      set view(t) {
        this._view && this.disconnectEvents(this._view),
          (this._view = t),
          this.connectEvents(this._view);
      }

      get view() {
        return this._view;
      }

      set enabled(t) {
        if (!this.view) {
          console.error(
            "Button view is not set. Please set it before enabling the button."
          );
          return;
        }
        (this.view.eventMode = t ? "static" : "auto"),
          (this.view.cursor = t ? "pointer" : "default"),
          !t && this.isDown && this.processUp();
      }

      get enabled() {
        return this.view.eventMode === "static";
      }
    }

    class K extends o.Container {
      constructor(t) {
        super(),
          V(this, "button"),
          V(this, "onDown"),
          V(this, "onUp"),
          V(this, "onUpOut"),
          V(this, "onOut"),
          V(this, "onPress"),
          V(this, "onHover"),
          (this.button = new N(this)),
          (this.button.enabled = !0),
          t && this.addChild(t),
          (this.onPress = this.button.onPress),
          (this.onDown = this.button.onDown),
          (this.onUp = this.button.onUp),
          (this.onHover = this.button.onHover),
          (this.onOut = this.button.onOut),
          (this.onUpOut = this.button.onUpOut);
      }

      set enabled(t) {
        this.button.enabled = t;
      }

      get enabled() {
        return this.button.enabled;
      }
    }

    function _(s) {
      return typeof s == "string" ? o.Sprite.from(s) : s;
    }

    function q(s) {
      return typeof s == "string" ? o.Sprite.from(s) : s;
    }

    var wt = Object.defineProperty,
      ft = (s, t, i) =>
        t in s
          ? wt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      D = (s, t, i) => (ft(s, typeof t != "symbol" ? t + "" : t, i), i);

    class J extends o.Container {
      constructor(t, i, e) {
        super(),
          D(this, "_triggerEvents", new Set(["onPress"])),
          D(this, "innerView"),
          D(this, "_active"),
          D(this, "onChange"),
          (this.innerView = new o.Container()),
          this.addChild(this.innerView),
          (this.onChange = new v.Signal()),
          t && (this.views = t),
          i && (this.triggerEvents = i),
          e && this.views.length > 0 && (this.active = e),
          this.setInteractionEvents();
      }

      setInteractionEvents() {
        (this.innerView.eventMode = "static"),
          this.innerView.on("pointerdown", () => this.handleEvents("onDown")),
          this.innerView.on("pointerup", () => this.handleEvents("onUp")),
          this.innerView.on("pointerupoutside", () =>
            this.handleEvents("onUpOut")
          ),
          this.innerView.on("pointerout", () => this.handleEvents("onOut")),
          this.innerView.on("pointertap", () => this.handleEvents("onPress")),
          this.innerView.on("pointerover", () => this.handleEvents("onHover"));
      }

      handleEvents(t) {
        this._triggerEvents.has(t) && this.switch();
      }

      get activeView() {
        if (this.views && this.views[this.active])
          return this.views[this.active];
      }

      set views(t) {
        this.innerView.removeChildren(), t.forEach((i) => this.add(i));
      }

      get views() {
        return this.innerView.children;
      }

      add(t) {
        const i = _(t);
        this.innerView.addChild(i),
          (i.visible = !1),
          this.views.length === 1 && (this.active = 0);
      }

      remove(t) {
        this.views[t] && this.innerView.removeChild(this.views[t]);
      }

      set triggerEvents(t) {
        this._triggerEvents = new Set(Array.isArray(t) ? t : [t]);
      }

      get triggerEvents() {
        return Array.from(this._triggerEvents);
      }

      switch(t) {
        if (t !== void 0 && t === this.active) return;
        const i = this.active;
        if ((this.forceSwitch(t), i !== this.active)) {
          const e = this.views.length > 2 ? this.active : this.active === 1;
          this.onChange.emit(e);
        }
      }

      forceSwitch(t) {
        if (!(t !== void 0 && t === this.active)) {
          if (
            (this.activeView && (this.activeView.visible = !1),
            t !== void 0 && !this.views[t])
          )
            throw new Error(`View with id ${t} does not exist.`);
          (this._active = t !== void 0 ? t : this.nextActive),
            this._active !== void 0 && (this.views[this.active].visible = !0);
        }
      }

      get nextActive() {
        if (this.views.length !== 0)
          return this.active < this.views.length - 1 ? this.active + 1 : 0;
      }

      set active(t) {
        this.switch(t);
      }

      get active() {
        return this._active;
      }
    }

    function mt(s) {
      s && (s.parent && s.parent.removeChild(s), s.destroy(), (s = null));
    }

    var bt = Object.defineProperty,
      _t = (s, t, i) =>
        t in s
          ? bt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      U = (s, t, i) => (_t(s, typeof t != "symbol" ? t + "" : t, i), i);

    class xt extends J {
      constructor(t) {
        var i;
        super(),
          U(this, "labelText"),
          U(this, "onCheck"),
          U(this, "_style"),
          U(this, "_textClass"),
          (this._textClass = (i = t.TextClass) != null ? i : o.Text),
          (this.text = t.text),
          (this.style = t.style),
          (this.checked = t.checked),
          (this.triggerEvents = ["onPress"]),
          (this.innerView.cursor = "pointer"),
          (this.onCheck = new v.Signal()),
          this.onChange.connect(() => this.onCheck.emit(this.checked));
      }

      addLabel(t, i) {
        var e;
        t &&
          ((this.labelText = new this._textClass({
            text: t != null ? t : "",
            style: i != null ? i : (e = this._style) == null ? void 0 : e.text,
          })),
          this.addChild(this.labelText),
          (this.labelText.cursor = "pointer"),
          (this.labelText.eventMode = "static"),
          this.labelText.on(
            "pointertap",
            () => (this.checked = !this.checked)
          ));
      }

      set text(t) {
        if (!t) {
          mt(this.labelText);
          return;
        }
        this.labelText ? (this.labelText.text = t) : this.addLabel(t);
      }

      get text() {
        var t, i;
        return (i = (t = this.labelText) == null ? void 0 : t.text) != null
          ? i
          : "";
      }

      set style(t) {
        var i, e, h, n;
        const r = this.checked;
        this._style = t;
        const { unchecked: l, checked: d } = t,
          a = _(l),
          u = _(d);
        (this.views = [a, u]),
          r ? ((u.visible = !0), (this.active = 1)) : (a.visible = !0),
          this.labelText
            ? ((u.visible = !0),
              (this.active = 1),
              t.text && (this.labelText.style = t.text),
              (this.labelText.x =
                a.width +
                10 +
                ((e = (i = t.textOffset) == null ? void 0 : i.x) != null
                  ? e
                  : 0)),
              (this.labelText.y =
                (a.height - this.labelText.height) / 2 +
                ((n = (h = t.textOffset) == null ? void 0 : h.y) != null
                  ? n
                  : 0)))
            : (a.visible = !0);
      }

      get style() {
        return this._style;
      }

      get checked() {
        return this.active === 1;
      }

      set checked(t) {
        this.switch(t ? 1 : 0);
      }

      forceCheck(t) {
        this.forceSwitch(t ? 1 : 0);
      }
    }

    var yt = Object.defineProperty,
      St = (s, t, i) =>
        t in s
          ? yt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      E = (s, t, i) => (St(s, typeof t != "symbol" ? t + "" : t, i), i);

    class Vt extends o.Container {
      constructor(t) {
        super(),
          E(this, "_progress", 0),
          E(this, "options"),
          E(this, "bgCircle", new o.Graphics()),
          E(this, "fillCircle", new o.Graphics()),
          E(this, "innerView", new o.Container()),
          (this.options = t),
          this.addChild(this.innerView),
          this.innerView.addChild(this.bgCircle, this.fillCircle),
          this.addBackground(),
          t.value && (this.progress = t.value);
      }

      addBackground() {
        const {
          backgroundColor: t,
          lineWidth: i,
          radius: e,
          backgroundAlpha: h,
        } = this.options;
        let n = 1;
        h > 0 && (n = h),
          t === void 0 && (n = 1e-6),
          this.bgCircle.circle(0, 0, e).stroke({
            width: i,
            color: t,
            alpha: n,
          });
      }

      set progress(t) {
        t > 100 && (t = 100), t < 0 && (t = 0), (this._progress = t);
        const {
          lineWidth: i,
          radius: e,
          fillColor: h,
          fillAlpha: n,
          cap: r,
        } = this.options;
        if (t === 0 && n === 0) {
          this.fillCircle.clear();
          return;
        }
        const l = 0,
          d = (360 / 100) * t;
        this.fillCircle
          .clear()
          .arc(
            0,
            0,
            e,
            (0 - 90 + l) * o.DEG_TO_RAD,
            (0 - 90 + l + d) * o.DEG_TO_RAD
          )
          .stroke({
            width: i,
            color: h,
            cap: r,
            alpha: n,
          });
      }

      get progress() {
        return this._progress;
      }
    }

    var kt = Object.defineProperty,
      Ct = (s, t, i) =>
        t in s
          ? kt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      k = (s, t, i) => (Ct(s, typeof t != "symbol" ? t + "" : t, i), i);

    class Q extends o.Container {
      constructor(t) {
        super(),
          k(this, "bg"),
          k(this, "fill"),
          k(this, "fillMask"),
          k(this, "progressStart", 0),
          k(this, "_progress", 0),
          k(this, "options"),
          k(this, "innerView"),
          k(this, "_view"),
          (this.options = t),
          (this.innerView = new o.Container()),
          this.addChild(this.innerView),
          t != null && t.bg && t != null && t.fill && this.init(t);
      }

      init({ bg: t, fill: i, fillPaddings: e, progress: h }) {
        this.setBackground(t), this.setFill(i, e), (this.progress = h);
      }

      setBackground(t) {
        var i;
        this.bg && this.bg.destroy(),
          (i = this.options) != null &&
            i.nineSliceSprite &&
            (typeof t == "string"
              ? (this.bg = new o.NineSliceSprite({
                  texture: o.Texture.from(t),
                  leftWidth: this.options.nineSliceSprite.bg[0],
                  topHeight: this.options.nineSliceSprite.bg[1],
                  rightWidth: this.options.nineSliceSprite.bg[2],
                  bottomHeight: this.options.nineSliceSprite.bg[3],
                }))
              : console.warn(
                  "NineSliceSprite can not be used with views set as Container."
                )),
          t instanceof o.Graphics && (this.bg = t),
          !this.bg &&
            (typeof t == "string" || t instanceof o.Sprite) &&
            (this.bg = q(t)),
          this.innerView.addChildAt(this.bg, 0);
      }

      setFill(t, i) {
        var e, h, n;
        if (
          (this.fill && this.fill.destroy(),
          this.bg instanceof o.Sprite && t === this.bg)
        ) {
          console.warn("Can not use same Sprite instance for bg and fill.");
          return;
        }
        (e = this.options) != null &&
          e.nineSliceSprite &&
          (typeof t == "string"
            ? (this.fill = new o.NineSliceSprite({
                texture: o.Texture.from(t),
                leftWidth: this.options.nineSliceSprite.fill[0],
                topHeight: this.options.nineSliceSprite.fill[1],
                rightWidth: this.options.nineSliceSprite.fill[2],
                bottomHeight: this.options.nineSliceSprite.fill[3],
              }))
            : console.warn(
                "NineSliceSprite can not be used with views set as Container."
              )),
          this.fill ||
            (t instanceof o.Graphics ? (this.fill = t) : (this.fill = q(t))),
          this.innerView.addChildAt(this.fill, 1);
        const r = (h = i == null ? void 0 : i.left) != null ? h : 0,
          l = (n = i == null ? void 0 : i.top) != null ? n : 0;
        (this.fill.x = r),
          (this.fill.y = l),
          this.fillMask && ((this.fill.mask = null), this.fillMask.destroy());
        const d = this.fill.width / 2,
          a = this.fill.width / 2,
          u = this.fill.height / 2,
          p = this.fill.height / 2;
        let x = o.Texture.WHITE;
        this.fill instanceof o.Sprite &&
          this.fill.texture &&
          (x = this.fill.texture),
          (this.fillMask = new o.NineSliceSprite({
            texture: x,
            leftWidth: d,
            topHeight: u,
            rightWidth: a,
            bottomHeight: p,
          })),
          this.fillMask.position.copyFrom(this.fill),
          this.addChild(this.fillMask),
          (this.fill.mask = this.fillMask);
      }

      validate(t) {
        return (t = Math.round(t)), t < 0 ? 0 : t > 100 ? 100 : t;
      }

      set progress(t) {
        (this._progress = this.validate(t)),
          this.fill &&
            this.fillMask &&
            ((this.fill.mask = null),
            (this.fillMask.width =
              (this.fill.width / 100) * (this._progress - this.progressStart)),
            (this.fillMask.x =
              (this.progressStart / 100) * this.fill.width + this.fill.x),
            (this.fillMask.height = this.fill.height),
            (this.fill.mask = this.fillMask));
      }

      get progress() {
        return this._progress;
      }

      set width(t) {
        var i, e, h, n, r;
        if ((i = this.options) != null && i.nineSliceSprite) {
          if ((this.bg && (this.bg.width = t), this.fill)) {
            const l =
                (h =
                  (e = this.options.fillPaddings) == null ? void 0 : e.left) !=
                null
                  ? h
                  : 0,
              d =
                (r =
                  (n = this.options.fillPaddings) == null ? void 0 : n.right) !=
                null
                  ? r
                  : 0;
            (this.fill.width = t - l - d), (this.fillMask.width = t - l - d);
          }
          this.progress = this._progress;
        } else super.width = t;
      }

      get width() {
        return super.width;
      }

      set height(t) {
        var i, e, h, n, r;
        if ((i = this.options) != null && i.nineSliceSprite) {
          if ((this.bg && (this.bg.height = t), this.fill)) {
            const l =
                (h =
                  (e = this.options.fillPaddings) == null ? void 0 : e.top) !=
                null
                  ? h
                  : 0,
              d =
                (r =
                  (n = this.options.fillPaddings) == null
                    ? void 0
                    : n.bottom) != null
                  ? r
                  : 0;
            (this.fill.height = t - l - d), (this.fillMask.height = t - l - d);
          }
          this.progress = this._progress;
        } else super.height = t;
      }

      get height() {
        return super.height;
      }

      setSize(t, i) {
        var e, h, n, r, l, d, a, u, p, x;
        if ((e = this.options) != null && e.nineSliceSprite) {
          if ((this.bg && this.bg.setSize(t, i), this.fill)) {
            typeof t == "object"
              ? ((i = (h = t.height) != null ? h : t.width), (t = t.width))
              : (i = i != null ? i : t);
            const y =
                (r =
                  (n = this.options.fillPaddings) == null ? void 0 : n.top) !=
                null
                  ? r
                  : 0,
              M =
                (d =
                  (l = this.options.fillPaddings) == null
                    ? void 0
                    : l.bottom) != null
                  ? d
                  : 0,
              B =
                (u =
                  (a = this.options.fillPaddings) == null ? void 0 : a.left) !=
                null
                  ? u
                  : 0,
              R =
                (x =
                  (p = this.options.fillPaddings) == null ? void 0 : p.right) !=
                null
                  ? x
                  : 0;
            this.fill.setSize(t - B - R, i - y - M),
              this.fillMask.setSize(t - B - R, i - y - M);
          }
          this.progress = this._progress;
        } else super.setSize(t, i);
      }
    }

    var Tt = Object.defineProperty,
      Pt = (s, t, i) =>
        t in s
          ? Tt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      m = (s, t, i) => (Pt(s, typeof t != "symbol" ? t + "" : t, i), i);

    class Z extends Q {
      constructor(t) {
        var i, e;
        super(t),
          m(this, "_slider1"),
          m(this, "_slider2"),
          m(this, "value1Text"),
          m(this, "value2Text"),
          m(this, "_value1"),
          m(this, "_value2"),
          m(this, "dragging", 0),
          m(this, "_min", 0),
          m(this, "_max", 100),
          m(this, "_step", 1),
          m(this, "startX"),
          m(this, "startUpdateValue1"),
          m(this, "startUpdateValue2"),
          m(this, "settings"),
          (this.settings = t),
          (this.slider1 = t.slider1),
          (this.slider2 = t.slider2),
          (this.min = (i = t.min) != null ? i : 0),
          (this.max = (e = t.max) != null ? e : 100);
      }

      init(t) {
        super.init(t), this.fill && (this.fill.eventMode = "none");
      }

      set slider1(t) {
        var i;
        if (
          t &&
          (this._slider1 &&
            (this.slider1.removeAllListeners(), this.slider1.destroy()),
          (this._slider1 = this.createSlider(t)),
          this.settings.showValue && !this.value1Text)
        ) {
          const e = (i = this.settings.valueTextClass) != null ? i : o.Text;
          (this.value1Text = new e({
            text: "",
            style: this.settings.valueTextStyle || { fill: 16777215 },
          })),
            this.value1Text.anchor.set(0.5),
            this.addChild(this.value1Text);
        }
      }

      get slider1() {
        return this._slider1;
      }

      set slider2(t) {
        var i;
        if (
          t &&
          (this._slider2 &&
            (this.slider2.removeAllListeners(), this.slider2.destroy()),
          (this._slider2 = this.createSlider(t)),
          this.settings.showValue && !this.value2Text)
        ) {
          const e = (i = this.settings.valueTextClass) != null ? i : o.Text;
          (this.value2Text = new e({
            text: "",
            style: this.settings.valueTextStyle || { fill: 16777215 },
          })),
            this.value2Text.anchor.set(0.5),
            this.addChild(this.value2Text);
        }
      }

      get slider2() {
        return this._slider2;
      }

      setBackground(t) {
        this.bg && this.bg.removeAllListeners(),
          super.setBackground(t),
          this.activateBG();
      }

      activateBG() {
        (this.bg.eventMode = "static"),
          this.bg
            .on("pointerdown", this.startUpdate, this)
            .on("globalpointermove", this.update, this)
            .on("pointerup", this.endUpdate, this)
            .on("pointerupoutside", this.endUpdate, this);
      }

      createSlider(t) {
        var i;
        const e = _(t),
          h = (r) => {
            this.bg && (r.currentTarget = this.bg), this.startUpdate(r);
          };
        (e.eventMode = "static"),
          e
            .on("pointerdown", h)
            .on("pointerup", this.endUpdate, this)
            .on("pointerupoutside", this.endUpdate, this),
          (e.x = e.width / 2);
        const n = new o.Container();
        return (
          n.addChild(e),
          e instanceof o.Sprite && e.anchor.set(0.5),
          (n.y = ((i = this.bg) == null ? void 0 : i.height) / 2),
          this.addChild(n),
          n
        );
      }

      startUpdate(t) {
        this.dragging = 1;
        const i = t.currentTarget;
        (this.startX = i.parent.worldTransform.applyInverse(t.global).x),
          (this.startUpdateValue1 = this._value1),
          (this.startUpdateValue2 = this._value2),
          this.update(t);
      }

      endUpdate() {
        this.dragging &&
          ((this.dragging = 0),
          (this.startX ||
            this.startUpdateValue1 !== this._value1 ||
            this.startUpdateValue2 !== this._value2) &&
            this.change(),
          (this.startUpdateValue1 = null),
          (this.startUpdateValue2 = null));
      }

      onClick() {
        this.change();
      }

      update(t) {
        const i = t.currentTarget,
          { x: e } = i.parent.worldTransform.applyInverse(t.global);
        e !== this.startX && (this.startX = null);
      }

      change() {}

      set max(t) {
        this._max = t;
      }

      get max() {
        return this._max;
      }

      set min(t) {
        this._min = t;
      }

      get min() {
        return this._min;
      }

      set step(t) {
        this._step = t;
      }

      get step() {
        return this._step;
      }
    }

    var It = Object.defineProperty,
      Ot = (s, t, i) =>
        t in s
          ? It(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      H = (s, t, i) => (Ot(s, typeof t != "symbol" ? t + "" : t, i), i);

    class Mt extends Z {
      constructor(t) {
        super(t),
          H(this, "sliderOptions"),
          H(this, "activeValue"),
          H(this, "onChange", new v.Signal()),
          H(this, "onUpdate", new v.Signal()),
          (this.sliderOptions = t),
          this.setInitialState();
      }

      setInitialState() {
        this.validateValues();
        const { value1: t, value2: i } = this.sliderOptions;
        this.updateProgress(t, i), (this.value2 = i), (this.value1 = t);
      }

      updateProgress(t = this.value1, i = this.value2) {
        (this.progressStart = ((t - this.min) / (this.max - this.min)) * 100),
          (this.progress = ((i - this.min) / (this.max - this.min)) * 100);
      }

      validateValues() {
        this.sliderOptions.value1 || (this.sliderOptions.value1 = this.min),
          this.sliderOptions.value2 ||
            (this.sliderOptions.value2 = this.sliderOptions.max),
          this.sliderOptions.value2 < this.sliderOptions.value1 &&
            (this.sliderOptions.value2 = this.sliderOptions.value1),
          this.sliderOptions.value1 < this.sliderOptions.min &&
            (this.sliderOptions.value1 = this.sliderOptions.min),
          this.sliderOptions.value1 > this.sliderOptions.max &&
            (this.sliderOptions.value1 = this.sliderOptions.max),
          this.sliderOptions.value2 > this.sliderOptions.max &&
            (this.sliderOptions.value2 = this.sliderOptions.max);
      }

      get value1() {
        return this._value1;
      }

      set value1(t) {
        var i;
        t !== this._value1 &&
          (t < this.min && (t = this.min),
          t > this._value2 && (t = this._value2),
          (this._value1 = t),
          this.updateSlider1(),
          (i = this.onUpdate) == null || i.emit(this.value1, this.value2));
      }

      get value2() {
        return this._value2;
      }

      set value2(t) {
        var i;
        t !== this._value2 &&
          (t < this._value1 && (t = this._value1),
          t > this.max && (t = this.max),
          (this._value2 = t),
          this.updateSlider2(),
          (i = this.onUpdate) == null || i.emit(this.value1, this.value2));
      }

      update(t) {
        var i;
        if ((super.update(t), !this.dragging)) return;
        const e = t.currentTarget,
          { x: h } = e.parent.worldTransform.applyInverse(t.global),
          n = Math.abs(h - this._slider1.x - this._slider1.width),
          r = Math.abs(h - this._slider2.x);
        this.activeValue ||
          (this.slider1 && h < this.slider1.x
            ? (this.activeValue = "value1")
            : this.slider2 && h > this.slider2.x
            ? (this.activeValue = "value2")
            : (this.activeValue = n < r ? "value1" : "value2"));
        const l = this.validate(
          (h / ((i = this.bg) == null ? void 0 : i.width)) * 100
        );
        this.activeValue === "value1"
          ? ((this.progressStart = l),
            (this.value1 = this.min + ((this.max - this.min) / 100) * l),
            this.updateProgress(this.value1, this.value2))
          : ((this.progress = l),
            (this.value2 = this.min + ((this.max - this.min) / 100) * l),
            this.updateProgress(this.value1, this.value2));
      }

      endUpdate() {
        super.endUpdate(), (this.activeValue = null);
      }

      change() {
        var t;
        (t = this.onChange) == null || t.emit(this.value1, this.value2);
      }

      set slider1(t) {
        (super.slider1 = t), this.updateSlider1();
      }

      get slider1() {
        return this._slider1;
      }

      set slider2(t) {
        (super.slider2 = t), this.updateSlider2();
      }

      get slider2() {
        return this._slider2;
      }

      updateSlider1() {
        var t, i, e, h, n, r, l;
        if (
          (this.updateProgress(this.value1, this.value2),
          (this._slider1.x =
            (((t = this.bg) == null ? void 0 : t.width) / 100) *
              this.progressStart -
            this._slider1.width / 2),
          (this._slider1.y = ((i = this.bg) == null ? void 0 : i.height) / 2),
          this._slider2 &&
            this._slider1.x > this._slider2.x &&
            (this._slider1.x = this._slider2.x),
          (e = this.sliderOptions) != null && e.showValue)
        ) {
          this.value1Text.text = `${Math.round(this.value1)}`;
          const d = this._slider1.x + this._slider1.width / 2,
            a = this._slider1.y;
          (this.value1Text.x =
            d +
            ((n =
              (h = this.sliderOptions.valueTextOffset) == null
                ? void 0
                : h.x) != null
              ? n
              : 0)),
            (this.value1Text.y =
              a +
              ((l =
                (r = this.sliderOptions.valueTextOffset) == null
                  ? void 0
                  : r.y) != null
                ? l
                : 0));
        }
      }

      updateSlider2() {
        var t, i, e, h, n, r, l;
        if (
          (this.updateProgress(this.value1, this.value2),
          (this._slider2.x =
            (((t = this.bg) == null ? void 0 : t.width) / 100) * this.progress -
            this._slider2.width / 2),
          (this._slider2.y = ((i = this.bg) == null ? void 0 : i.height) / 2),
          this._slider2.x < this._slider1.x &&
            (this._slider2.x = this._slider1.x),
          (e = this.sliderOptions) != null && e.showValue)
        ) {
          this.value2Text.text = `${Math.round(this.value2)}`;
          const d = this._slider2.x + this._slider2.width / 2,
            a = this._slider2.y;
          (this.value2Text.x =
            d +
            ((n =
              (h = this.sliderOptions.valueTextOffset) == null
                ? void 0
                : h.x) != null
              ? n
              : 0)),
            (this.value2Text.y =
              a +
              ((l =
                (r = this.sliderOptions.valueTextOffset) == null
                  ? void 0
                  : r.y) != null
                ? l
                : 0));
        }
      }

      set width(t) {
        (super.width = t), this.updateSlider1(), this.updateSlider2();
      }

      get width() {
        return super.width;
      }

      set height(t) {
        (super.height = t), this.updateSlider1(), this.updateSlider2();
      }

      get height() {
        return super.height;
      }

      setSize(t, i) {
        super.setSize(t, i), this.updateSlider1(), this.updateSlider2();
      }
    }

    function j(s, t, i = 0, e = !0) {
      let h = t.scale.x,
        n = t.scale.y;
      if (!s) throw new Error("Parent is not defined");
      const r = s.width - i * 2,
        l = s.height - i * 2,
        d = r - Math.round(t.width),
        a = l - Math.round(t.height);
      if (
        (d < 0 && (h = r / (t.width / h)),
        a < 0 && (n = l / (t.height / n)),
        h <= 0 || n <= 0)
      ) {
        t.scale.set(0);
        return;
      }
      if (e || t.scale.x === t.scale.y) {
        const u = Math.min(h, n);
        t.scale.set(u, u);
      } else {
        const u = t.scale.x / t.scale.y;
        d < a ? t.scale.set(h, h / u) : t.scale.set(n * u, n);
      }
    }

    function Bt(s) {
      return typeof s == "string" || typeof s == "number"
        ? new o.Text({ text: String(s) })
        : s;
    }

    var Et = Object.defineProperty,
      At = (s, t, i) =>
        t in s
          ? Et(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      f = (s, t, i) => (At(s, typeof t != "symbol" ? t + "" : t, i), i);

    class $ extends K {
      constructor(t) {
        var i, e;
        super(),
          f(this, "animations"),
          f(this, "originalInnerViewState"),
          f(this, "defaultDuration", 100),
          f(this, "options"),
          f(this, "_padding"),
          f(this, "_offset"),
          f(this, "_textOffset"),
          f(this, "iconOffset"),
          f(this, "innerView", new o.Container()),
          f(this, "_views", {}),
          f(this, "state"),
          f(this, "anchor"),
          f(this, "_defaultTextScale", {
            x: 1,
            y: 1,
          }),
          f(this, "_defaultIconScale", { x: 1, y: 1 }),
          f(this, "_defaultTextAnchor", {
            x: 0.5,
            y: 0.5,
          }),
          f(this, "_defaultIconAnchor", { x: 0.5, y: 0.5 }),
          (this.options = t != null ? t : {});
        const {
          defaultView: h,
          hoverView: n,
          pressedView: r,
          disabledView: l,
          text: d,
          padding: a,
          offset: u,
          textOffset: p,
          iconOffset: x,
          defaultTextScale: y,
          defaultIconScale: M,
          defaultTextAnchor: B,
          defaultIconAnchor: R,
          scale: ot,
          anchor: rt,
          anchorX: lt,
          anchorY: at,
          icon: fi,
          animations: dt,
        } = t != null ? t : {};
        this.addChild(this.innerView),
          (this.anchor = new o.ObservablePoint({
            _onUpdate: () => this.updateAnchor(),
          })),
          this.anchor.set(
            (i = lt != null ? lt : rt) != null ? i : 0,
            (e = at != null ? at : rt) != null ? e : 0
          ),
          (this.padding = a != null ? a : 0),
          (this.offset = u),
          (this.textOffset = p),
          (this.iconOffset = x),
          (this.defaultTextScale = y),
          (this.defaultIconScale = M),
          (this.defaultTextAnchor = B),
          (this.defaultIconAnchor = R),
          this.scale.set(ot != null ? ot : 1),
          dt &&
            ((this.animations = dt),
            o.Ticker.shared.add(() => z.Group.shared.update())),
          this.setState("default"),
          (this.defaultView = h),
          (this.hoverView = n),
          (this.pressedView = r),
          (this.disabledView = l),
          (this.text = d),
          (this.iconView = fi),
          this.initStateControl();
      }

      set text(t) {
        if (!t || t === 0) {
          this.removeView("textView");
          return;
        }
        if (!this._views.textView) {
          this.createTextView(t);
          return;
        }
        this._views.textView.text = t.toString();
      }

      get text() {
        var t;
        return (t = this._views.textView) == null ? void 0 : t.text;
      }

      set enabled(t) {
        (this.button.enabled = t), this.setState(t ? "default" : "disabled");
      }

      get enabled() {
        return this.button.enabled;
      }

      setState(t, i = !1) {
        if (!i && this.state === t) return;
        const e = this.getStateView(this.state);
        e && (e.visible = !1), (this.state = t);
        const h = this.getStateView(t);
        h && (this.setOffset(h, t, this.offset), (h.visible = !0)),
          this.updateAnchor(),
          this.playAnimations(t);
      }

      createTextView(t) {
        var i;
        if (
          ((this._views.textView = Bt(t)),
          ((i = this.options) == null ? void 0 : i.defaultTextScale) === void 0)
        ) {
          const { x: e, y: h } = this._views.textView.scale;
          this._defaultTextScale = { x: e, y: h };
        }
        this.innerView.addChild(this._views.textView),
          this.adjustTextView(this.state);
      }

      setOffset(t, i, e) {
        var h, n, r, l, d, a;
        const u = e ? e[i] : { x: 0, y: 0 },
          p = e == null ? void 0 : e.default;
        u
          ? ((t.x += (h = u.x) != null ? h : 0),
            (t.y += (n = u.y) != null ? n : 0))
          : p
          ? ((t.x += (r = p.x) != null ? r : 0),
            (t.y += (l = p.y) != null ? l : 0))
          : (e.x || e.y) &&
            ((t.x += (d = e.x) != null ? d : 0),
            (t.y += (a = e.y) != null ? a : 0));
      }

      getStateView(t) {
        var i, e, h, n, r, l, d, a;
        if (this._views)
          switch (t) {
            case "hover":
              return (e =
                (i = this._views.hoverView) != null
                  ? i
                  : this._views.defaultView) != null
                ? e
                : void 0;
            case "pressed":
              return (r =
                (n =
                  (h = this._views.pressedView) != null
                    ? h
                    : this._views.hoverView) != null
                  ? n
                  : this._views.defaultView) != null
                ? r
                : void 0;
            case "disabled":
              return (d =
                (l = this._views.disabledView) != null
                  ? l
                  : this._views.defaultView) != null
                ? d
                : void 0;
            case "default":
              return (a = this._views.defaultView) != null ? a : void 0;
            default:
              return;
          }
      }

      adjustTextView(t) {
        var i;
        if (!this.text) return;
        const e = this.getStateView(this.state),
          { x: h, y: n } = this._defaultTextAnchor;
        e &&
          (((i = this.options) != null && i.ignoreRefitting) ||
            this._views.textView.scale.set(
              this._defaultTextScale.x,
              this._defaultTextScale.y
            ),
          j(e, this._views.textView, this.padding, !1),
          (this._views.textView.x = e.x + e.width / 2),
          (this._views.textView.y = e.y + e.height / 2)),
          this._views.textView.anchor.set(h, n),
          this.setOffset(this._views.textView, t, this.textOffset);
      }

      adjustIconView(t) {
        var i;
        if (!this._views.iconView) return;
        const e = this.getStateView(t);
        if (!e) return;
        ((i = this.options) != null && i.ignoreRefitting) ||
          this._views.iconView.scale.set(
            this._defaultIconScale.x,
            this._defaultIconScale.y
          );
        const { x: h, y: n } = this._defaultIconAnchor;
        j(e, this._views.iconView, this.padding, !1),
          "anchor" in this._views.iconView
            ? this._views.iconView.anchor.set(h, n)
            : this._views.iconView.pivot.set(
                h * (this._views.iconView.width / this._views.iconView.scale.x),
                n * (this._views.iconView.height / this._views.iconView.scale.y)
              ),
          (this._views.iconView.x = e.x + e.width / 2),
          (this._views.iconView.y = e.y + e.height / 2),
          this.setOffset(this._views.iconView, t, this.iconOffset);
      }

      updateAnchor() {
        var t, i;
        if (!this._views) return;
        const e = (t = this.anchor.x) != null ? t : 0,
          h = (i = this.anchor.y) != null ? i : 0;
        if (
          ([
            this._views.defaultView,
            this._views.hoverView,
            this._views.pressedView,
            this._views.disabledView,
          ].forEach((n) => {
            var r;
            n &&
              ((r = n.anchor) == null || r.set(0),
              (n.x = -n.width * e),
              (n.y = -n.height * h));
          }),
          this._views.defaultView)
        ) {
          const { x: n, y: r, width: l, height: d } = this._views.defaultView;
          this.hitArea = new o.Rectangle(n, r, l, d);
        }
        this.adjustIconView(this.state), this.adjustTextView(this.state);
      }

      set defaultView(t) {
        this.updateView("defaultView", t);
      }

      get defaultView() {
        return this._views.defaultView;
      }

      set hoverView(t) {
        this.updateView("hoverView", t),
          this._views.hoverView &&
            this.state !== "hover" &&
            (this._views.hoverView.visible = !1);
      }

      get hoverView() {
        return this._views.hoverView;
      }

      set pressedView(t) {
        this.updateView("pressedView", t),
          this._views.pressedView && (this._views.pressedView.visible = !1);
      }

      get pressedView() {
        return this._views.pressedView;
      }

      set disabledView(t) {
        this.updateView("disabledView", t),
          this._views.disabledView && (this._views.disabledView.visible = !1);
      }

      get disabledView() {
        return this._views.disabledView;
      }

      updateView(t, i) {
        var e;
        i !== void 0 &&
          (this.removeView(t),
          i !== null &&
            ((e = this.options) != null &&
              e.nineSliceSprite &&
              (typeof i == "string"
                ? (this._views[t] = new o.NineSliceSprite({
                    texture: o.Texture.from(i),
                    leftWidth: this.options.nineSliceSprite[0],
                    topHeight: this.options.nineSliceSprite[1],
                    rightWidth: this.options.nineSliceSprite[2],
                    bottomHeight: this.options.nineSliceSprite[3],
                  }))
                : console.warn(
                    "NineSliceSprite can not be used with views set as Container."
                  )),
            this._views[t] || (this._views[t] = _(i)),
            this.setOffset(this._views[t], this.state, this.offset),
            this._views[t].parent || this.innerView.addChild(this._views[t]),
            this.updateAnchor(),
            this._views.iconView &&
              this.innerView.addChild(this._views.iconView),
            this._views.textView &&
              this.innerView.addChild(this._views.textView),
            this.setState(this.state, !0)));
      }

      removeView(t) {
        this._views[t] &&
          (this.innerView.removeChild(this._views[t]), (this._views[t] = null));
      }

      set textView(t) {
        t !== void 0 &&
          (this.removeView("textView"), t !== null && this.createTextView(t));
      }

      get textView() {
        return this._views.textView;
      }

      set iconView(t) {
        var i;
        if (t !== void 0 && (this.removeView("iconView"), t !== null)) {
          if (
            ((this._views.iconView = _(t)),
            ((i = this.options) == null ? void 0 : i.defaultIconScale) ===
              void 0)
          ) {
            const { x: e, y: h } = this._views.iconView.scale;
            this._defaultIconScale = { x: e, y: h };
          }
          this._views.iconView.parent ||
            this.innerView.addChild(this._views.iconView),
            this.setState(this.state, !0);
        }
      }

      get iconView() {
        return this._views.iconView;
      }

      playAnimations(t) {
        var i, e, h, n, r, l, d, a;
        if (!this.animations) return;
        if (t === "default" && !this.originalInnerViewState) {
          this.originalInnerViewState = {
            x: this.innerView.x,
            y: this.innerView.y,
            width: this.innerView.width,
            height: this.innerView.height,
            scale: { x: this.innerView.scale.x, y: this.innerView.scale.y },
          };
          const p = (i = this.animations) == null ? void 0 : i.default;
          if (p) {
            (this.innerView.x =
              (e = p.props.x) != null ? e : this.originalInnerViewState.x),
              (this.innerView.y =
                (h = p.props.y) != null ? h : this.originalInnerViewState.y),
              (this.innerView.width =
                (n = p.props.width) != null
                  ? n
                  : this.originalInnerViewState.width),
              (this.innerView.height =
                (r = p.props.height) != null
                  ? r
                  : this.originalInnerViewState.height),
              (this.innerView.scale.x =
                (l = p.props.scale.x) != null
                  ? l
                  : this.originalInnerViewState.scale.x),
              (this.innerView.scale.y =
                (d = p.props.scale.y) != null
                  ? d
                  : this.originalInnerViewState.scale.y);
            return;
          }
        }
        const u =
          (a = this.animations[t]) != null ? a : this.animations.default;
        if (u) {
          const p = u;
          (this.defaultDuration = p.duration),
            new z.Tween(this.innerView).to(p.props, p.duration).start();
          return;
        }
        new z.Tween(this.innerView)
          .to(this.originalInnerViewState, this.defaultDuration)
          .start();
      }

      initStateControl() {
        this.onDown.connect(() => {
          this.setState("pressed");
        }),
          this.onUp.connect(() => {
            o.isMobile.any ? this.setState("default") : this.setState("hover");
          }),
          this.onUpOut.connect(() => {
            this.setState("default");
          }),
          this.onOut.connect(() => {
            this.button.isDown || this.setState("default");
          }),
          this.onPress.connect(() => {
            o.isMobile.any ? this.setState("default") : this.setState("hover");
          }),
          this.onHover.connect(() => {
            this.button.isDown ||
              (o.isMobile.any
                ? this.setState("default")
                : this.setState("hover"));
          });
      }

      set padding(t) {
        (this._padding = t),
          this.adjustTextView(this.state),
          this.adjustIconView(this.state);
      }

      get padding() {
        return this._padding;
      }

      set offset(t) {
        (this._offset = t), this.updateAnchor();
      }

      get offset() {
        return this._offset;
      }

      set textOffset(t) {
        (this._textOffset = t), this.adjustTextView(this.state);
      }

      get textOffset() {
        return this._textOffset;
      }

      set defaultTextScale(t) {
        var i, e;
        if (t === void 0) return;
        this.options.defaultTextScale = t;
        const h = typeof t == "number";
        (this._defaultTextScale.x = h ? t : (i = t.x) != null ? i : 1),
          (this._defaultTextScale.y = h ? t : (e = t.y) != null ? e : 1),
          this.adjustTextView(this.state);
      }

      get defaultTextScale() {
        return this.defaultTextScale;
      }

      set defaultIconScale(t) {
        var i, e;
        if (t === void 0) return;
        this.options.defaultIconScale = t;
        const h = typeof t == "number";
        (this._defaultIconScale.x = h ? t : (i = t.x) != null ? i : 1),
          (this._defaultIconScale.y = h ? t : (e = t.y) != null ? e : 1),
          this.adjustIconView(this.state);
      }

      get defaultIconScale() {
        return this.defaultIconScale;
      }

      set defaultTextAnchor(t) {
        var i, e;
        if (t === void 0) return;
        this.options.defaultTextAnchor = t;
        const h = typeof t == "number";
        (this._defaultTextAnchor.x = h ? t : (i = t.x) != null ? i : 1),
          (this._defaultTextAnchor.y = h ? t : (e = t.y) != null ? e : 1),
          this.adjustTextView(this.state);
      }

      get defaultTextAnchor() {
        return this.defaultTextAnchor;
      }

      set defaultIconAnchor(t) {
        var i, e;
        if (t === void 0) return;
        this.options.defaultIconAnchor = t;
        const h = typeof t == "number";
        (this._defaultIconAnchor.x = h ? t : (i = t.x) != null ? i : 1),
          (this._defaultIconAnchor.y = h ? t : (e = t.y) != null ? e : 1),
          this.adjustIconView(this.state);
      }

      get defaultIconAnchor() {
        return this.defaultIconAnchor;
      }

      set width(t) {
        var i;
        (i = this.options) != null && i.nineSliceSprite
          ? (this._views.defaultView && (this._views.defaultView.width = t),
            this._views.hoverView && (this._views.hoverView.width = t),
            this._views.pressedView && (this._views.pressedView.width = t),
            this._views.disabledView && (this._views.disabledView.width = t),
            this.adjustTextView(this.state),
            this.adjustIconView(this.state),
            this.updateAnchor())
          : (super.width = t);
      }

      get width() {
        return super.width;
      }

      set height(t) {
        var i;
        (i = this.options) != null && i.nineSliceSprite
          ? (this._views.defaultView && (this._views.defaultView.height = t),
            this._views.hoverView && (this._views.hoverView.height = t),
            this._views.pressedView && (this._views.pressedView.height = t),
            this._views.disabledView && (this._views.disabledView.height = t),
            this.adjustTextView(this.state),
            this.adjustIconView(this.state),
            this.updateAnchor())
          : (super.height = t);
      }

      get height() {
        return super.height;
      }

      setSize(t, i) {
        var e;
        (e = this.options) != null && e.nineSliceSprite
          ? (this._views.defaultView && this._views.defaultView.setSize(t, i),
            this._views.hoverView && this._views.hoverView.setSize(t, i),
            this._views.pressedView && this._views.pressedView.setSize(t, i),
            this._views.disabledView && this._views.disabledView.setSize(t, i),
            this.adjustTextView(this.state),
            this.adjustIconView(this.state),
            this.updateAnchor())
          : super.setSize(t, i);
      }
    }

    var Dt = Object.defineProperty,
      tt = Object.getOwnPropertySymbols,
      Ut = Object.prototype.hasOwnProperty,
      Ht = Object.prototype.propertyIsEnumerable,
      F = (s, t, i) =>
        t in s
          ? Dt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      it = (s, t) => {
        for (var i in t || (t = {})) Ut.call(t, i) && F(s, i, t[i]);
        if (tt) for (var i of tt(t)) Ht.call(t, i) && F(s, i, t[i]);
        return s;
      },
      g = (s, t, i) => (F(s, typeof t != "symbol" ? t + "" : t, i), i);

    class $t extends o.Container {
      constructor(t) {
        super(),
          g(this, "_bg"),
          g(this, "inputMask"),
          g(this, "_cursor"),
          g(this, "inputField"),
          g(this, "placeholder"),
          g(this, "editing", !1),
          g(this, "tick", 0),
          g(this, "lastInputData"),
          g(this, "activation", !1),
          g(this, "options"),
          g(this, "input"),
          g(this, "handleActivationBinding", this.handleActivation.bind(this)),
          g(this, "onKeyUpBinding", this.onKeyUp.bind(this)),
          g(this, "stopEditingBinding", this.stopEditing.bind(this)),
          g(this, "onInputBinding", this.onInput.bind(this)),
          g(this, "onEnter"),
          g(this, "onChange"),
          g(this, "paddingTop", 0),
          g(this, "paddingRight", 0),
          g(this, "paddingBottom", 0),
          g(this, "paddingLeft", 0),
          (this.options = t),
          (this.options = t),
          (this.padding = t.padding),
          (this.cursor = "text"),
          (this.interactive = !0),
          this.on("pointertap", () => {
            (this.activation = !0), o.isMobile.any && this.handleActivation();
          }),
          o.isMobile.any
            ? window.addEventListener(
                "touchstart",
                this.handleActivationBinding
              )
            : o.isMobile.any ||
              (window.addEventListener("click", this.handleActivationBinding),
              window.addEventListener("keyup", this.onKeyUpBinding),
              window.addEventListener("input", this.onInputBinding)),
          (this.onEnter = new v.Signal()),
          (this.onChange = new v.Signal()),
          o.Ticker.shared.add((i) => this.update(i.deltaTime)),
          t.bg
            ? (this.bg = t.bg)
            : console.error("Input: bg is not defined, please define it.");
      }

      onInput(t) {
        this.lastInputData = t.data;
      }

      onKeyUp(t) {
        const i = t.key;
        i === "Backspace"
          ? this._delete()
          : i === "Escape" || i === "Enter"
          ? this.stopEditing()
          : i.length === 1
          ? this._add(i)
          : this.lastInputData &&
            this.lastInputData.length === 1 &&
            this._add(this.lastInputData);
      }

      init() {
        var t, i, e;
        const h = this.options,
          n = { fill: 0, align: "center" };
        (this.options.textStyle = (t = h.textStyle) != null ? t : n),
          (this.options.TextClass = (i = h.TextClass) != null ? i : o.Text);
        const r = it(it({}, n), h.textStyle);
        (this.inputField = new this.options.TextClass({
          text: "",
          style: r,
        })),
          (this._cursor = new o.Sprite(o.Texture.WHITE)),
          (this._cursor.tint = Number(h.textStyle.fill) || 0),
          this._cursor.anchor.set(0.5),
          (this._cursor.width = 2),
          (this._cursor.height = this.inputField.height * 0.8),
          (this._cursor.alpha = 0),
          (this.placeholder = new this.options.TextClass({
            text: h.placeholder,
            style: r != null ? r : n,
          })),
          (this.placeholder.visible = !!h.placeholder),
          this.addChild(this.inputField, this.placeholder, this._cursor),
          (this.value = (e = h.value) != null ? e : ""),
          this.align();
      }

      set bg(t) {
        var i, e;
        this._bg && this._bg.destroy(),
          (i = this.options) != null &&
            i.nineSliceSprite &&
            (typeof t == "string"
              ? (this._bg = new o.NineSliceSprite({
                  texture: o.Texture.from(t),
                  leftWidth: this.options.nineSliceSprite[0],
                  topHeight: this.options.nineSliceSprite[1],
                  rightWidth: this.options.nineSliceSprite[2],
                  bottomHeight: this.options.nineSliceSprite[3],
                }))
              : console.warn(
                  "NineSliceSprite can not be used with views set as Container."
                )),
          this._bg || (this._bg = _(t)),
          (this._bg.cursor = "text"),
          (this._bg.interactive = !0),
          this.addChildAt(this._bg, 0),
          this.inputField || this.init(),
          this.options.addMask &&
            (this.inputMask &&
              ((this.inputField.mask = null),
              (this._cursor.mask = null),
              this.inputMask.destroy()),
            (e = this.options) != null &&
            e.nineSliceSprite &&
            typeof t == "string"
              ? (this.inputMask = new o.NineSliceSprite({
                  texture: o.Texture.from(t),
                  leftWidth: this.options.nineSliceSprite[0],
                  topHeight: this.options.nineSliceSprite[1],
                  rightWidth: this.options.nineSliceSprite[2],
                  bottomHeight: this.options.nineSliceSprite[3],
                }))
              : t instanceof o.Sprite
              ? (this.inputMask = new o.Sprite(t.texture))
              : t instanceof o.Graphics
              ? (this.inputMask = t.clone(!0))
              : (this.inputMask = _(t)),
            (this.inputField.mask = this.inputMask),
            (this._cursor.mask = this.inputMask),
            this.addChildAt(this.inputMask, 0));
      }

      get bg() {
        return this._bg;
      }

      _add(t) {
        this.editing &&
          ((this.options.maxLength &&
            this.value.length >= this.options.maxLength) ||
            ((this.value = this.value + t), this.onChange.emit(this.value)));
      }

      _delete() {
        if (!this.editing || this.value.length === 0) return;
        const t = this.value.split("");
        t.pop(), (this.value = t.join("")), this.onChange.emit(this.value);
      }

      _startEditing() {
        this.options.cleanOnFocus && (this.value = ""),
          (this.tick = 0),
          (this.editing = !0),
          (this.placeholder.visible = !1),
          (this._cursor.alpha = 1),
          o.isMobile.any && this.createInputField(),
          this.align();
      }

      createInputField() {
        var t, i;
        this.input &&
          (this.input.removeEventListener("blur", this.stopEditingBinding),
          this.input.removeEventListener("keyup", this.onKeyUpBinding),
          this.input.removeEventListener("input", this.onInputBinding),
          (t = this.input) == null || t.blur(),
          (i = this.input) == null || i.remove(),
          (this.input = null));
        const e = document.createElement("input");
        document.body.appendChild(e),
          (e.style.position = "fixed"),
          (e.style.left = `${this.getGlobalPosition().x}px`),
          (e.style.top = `${this.getGlobalPosition().y}px`),
          (e.style.opacity = "0.0000001"),
          (e.style.width = `${this._bg.width}px`),
          (e.style.height = `${this._bg.height}px`),
          (e.style.border = "none"),
          (e.style.outline = "none"),
          (e.style.background = "white"),
          o.isMobile.android.device
            ? setTimeout(() => {
                e.focus(), e.click();
              }, 100)
            : (e.focus(), e.click()),
          e.addEventListener("blur", this.stopEditingBinding),
          e.addEventListener("keyup", this.onKeyUpBinding),
          e.addEventListener("input", this.onInputBinding),
          (this.input = e),
          this.align();
      }

      handleActivation() {
        this.stopEditing(),
          this.activation && (this._startEditing(), (this.activation = !1));
      }

      stopEditing() {
        var t, i;
        this.editing &&
          ((this._cursor.alpha = 0),
          (this.editing = !1),
          this.inputField.text === "" && (this.placeholder.visible = !0),
          this.value.length === 0 && (this.placeholder.visible = !0),
          o.isMobile.any &&
            ((t = this.input) == null || t.blur(),
            (i = this.input) == null || i.remove(),
            (this.input = null)),
          this.align(),
          this.onEnter.emit(this.value));
      }

      update(t) {
        this.editing &&
          ((this.tick += t * 0.1),
          (this._cursor.alpha = Math.round(Math.sin(this.tick) * 0.5 + 0.5)));
      }

      align() {
        if (!this._bg) return;
        const t = this.getAlign();
        this.inputField.anchor.set(t, 0.5),
          (this.inputField.x =
            this._bg.width * t +
            (t === 1 ? -this.paddingRight : this.paddingLeft)),
          (this.inputField.y =
            this._bg.height / 2 + this.paddingTop - this.paddingBottom),
          this.placeholder.anchor.set(t, 0.5),
          (this.placeholder.x =
            this._bg.width * t +
            (t === 1 ? -this.paddingRight : this.paddingLeft)),
          (this.placeholder.y = this._bg.height / 2),
          (this._cursor.x = this.getCursorPosX()),
          (this._cursor.y = this.inputField.y);
      }

      getAlign() {
        const t = this._bg.width * 0.95,
          i = this.paddingLeft + this.paddingRight - 10;
        if (this.inputField.width + i > t) return this.editing ? 1 : 0;
        switch (this.options.align) {
          case "left":
            return 0;
          case "center":
            return 0.5;
          case "right":
            return 1;
          default:
            return 0;
        }
      }

      getCursorPosX() {
        switch (this.getAlign()) {
          case 0:
            return this.inputField.x + this.inputField.width;
          case 0.5:
            return this.inputField.x + this.inputField.width * 0.5;
          case 1:
            return this.inputField.x;
          default:
            return 0;
        }
      }

      set value(t) {
        (this.inputField.text = t),
          t.length !== 0
            ? (this.placeholder.visible = !1)
            : (this.placeholder.visible = !this.editing),
          this.align();
      }

      get value() {
        return this.inputField.text;
      }

      set padding(t) {
        var i, e, h, n, r, l, d, a, u, p, x, y;
        typeof t == "number" &&
          ((this.paddingTop = t),
          (this.paddingRight = t),
          (this.paddingBottom = t),
          (this.paddingLeft = t)),
          Array.isArray(t)
            ? ((this.paddingTop = (i = t[0]) != null ? i : 0),
              (this.paddingRight =
                (h = (e = t[1]) != null ? e : t[0]) != null ? h : 0),
              (this.paddingBottom =
                (r = (n = t[2]) != null ? n : t[0]) != null ? r : 0),
              (this.paddingLeft =
                (a = (d = (l = t[3]) != null ? l : t[1]) != null ? d : t[0]) !=
                null
                  ? a
                  : 0))
            : typeof t == "object" &&
              ((this.paddingTop = (u = t.top) != null ? u : 0),
              (this.paddingRight = (p = t.right) != null ? p : 0),
              (this.paddingBottom = (x = t.bottom) != null ? x : 0),
              (this.paddingLeft = (y = t.left) != null ? y : 0));
      }

      get padding() {
        return [
          this.paddingTop,
          this.paddingRight,
          this.paddingBottom,
          this.paddingLeft,
        ];
      }

      destroy(t) {
        this.off("pointertap"),
          o.isMobile.any
            ? window.removeEventListener(
                "touchstart",
                this.handleActivationBinding
              )
            : o.isMobile.any ||
              (window.removeEventListener(
                "click",
                this.handleActivationBinding
              ),
              window.removeEventListener("keyup", this.onKeyUpBinding),
              window.removeEventListener("input", this.onInputBinding)),
          super.destroy(t);
      }

      set width(t) {
        var i;
        (i = this.options) != null && i.nineSliceSprite
          ? (this._bg && (this._bg.width = t),
            this.inputMask &&
              ((this.inputMask.width =
                t - this.paddingLeft - this.paddingRight),
              (this.inputMask.x = this.paddingLeft)),
            this.align())
          : (super.width = t);
      }

      get width() {
        return super.width;
      }

      set height(t) {
        var i;
        (i = this.options) != null && i.nineSliceSprite
          ? (this._bg && (this._bg.height = t),
            this.inputMask &&
              ((this.inputMask.height =
                t - this.paddingTop - this.paddingBottom),
              (this.inputMask.y = this.paddingTop)),
            this.align())
          : (super.height = t);
      }

      get height() {
        return super.height;
      }

      setSize(t, i) {
        var e, h;
        (e = this.options) != null && e.nineSliceSprite
          ? (this._bg && this._bg.setSize(t, i),
            this.inputMask &&
              (typeof t == "object"
                ? ((i = (h = t.height) != null ? h : t.width), (t = t.width))
                : (i = i != null ? i : t),
              this.inputMask.setSize(
                t - this.paddingLeft - this.paddingRight,
                i - this.paddingTop - this.paddingBottom
              ),
              this.inputMask.position.set(this.paddingLeft, this.paddingTop)),
            this.align())
          : super.setSize(t, i);
      }
    }

    var Lt = Object.defineProperty,
      Rt = (s, t, i) =>
        t in s
          ? Lt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      L = (s, t, i) => (Rt(s, typeof t != "symbol" ? t + "" : t, i), i);

    class W extends o.Container {
      constructor(t) {
        var i;
        super(),
          L(this, "options"),
          L(this, "view"),
          L(this, "_type"),
          L(this, "children", []),
          t && this.init(t),
          (i = t == null ? void 0 : t.items) == null ||
            i.forEach((e) => this.addChild(e)),
          this.on("added", () => this.arrangeChildren()),
          this.on("childAdded", () => this.arrangeChildren());
      }

      init(t) {
        (this.options = t),
          t != null && t.type && (this.type = t.type),
          t != null &&
            t.children &&
            t.children.forEach((i) => this.addChild(i));
      }

      set type(t) {
        (this._type = t), this.arrangeChildren();
      }

      get type() {
        return this._type;
      }

      set elementsMargin(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.elementsMargin = t), this.arrangeChildren();
      }

      get elementsMargin() {
        var t, i;
        return (i = (t = this.options) == null ? void 0 : t.elementsMargin) !=
          null
          ? i
          : 0;
      }

      set padding(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.padding = t),
          (this.options.vertPadding = t),
          (this.options.horPadding = t),
          (this.options.leftPadding = t),
          (this.options.rightPadding = t),
          (this.options.topPadding = t),
          (this.options.bottomPadding = t),
          this.arrangeChildren();
      }

      get padding() {
        var t, i;
        return (i = (t = this.options) == null ? void 0 : t.padding) != null
          ? i
          : 0;
      }

      set vertPadding(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.vertPadding = t),
          (this.options.topPadding = t),
          (this.options.bottomPadding = t),
          this.arrangeChildren();
      }

      get vertPadding() {
        var t, i, e;
        return (e =
          (i = (t = this.options) == null ? void 0 : t.vertPadding) != null
            ? i
            : this.padding) != null
          ? e
          : 0;
      }

      set horPadding(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.horPadding = t),
          (this.options.leftPadding = t),
          (this.options.rightPadding = t),
          this.arrangeChildren();
      }

      get horPadding() {
        var t, i, e;
        return (e =
          (i = (t = this.options) == null ? void 0 : t.horPadding) != null
            ? i
            : this.padding) != null
          ? e
          : 0;
      }

      set leftPadding(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.leftPadding = t), this.arrangeChildren();
      }

      get leftPadding() {
        var t, i;
        return (i = (t = this.options) == null ? void 0 : t.leftPadding) != null
          ? i
          : this.horPadding;
      }

      set rightPadding(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.rightPadding = t), this.arrangeChildren();
      }

      get rightPadding() {
        var t, i;
        return (i = (t = this.options) == null ? void 0 : t.rightPadding) !=
          null
          ? i
          : this.horPadding;
      }

      set topPadding(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.topPadding = t), this.arrangeChildren();
      }

      get topPadding() {
        var t, i;
        return (i = (t = this.options) == null ? void 0 : t.topPadding) != null
          ? i
          : this.vertPadding;
      }

      set bottomPadding(t) {
        if (!this.options) throw new Error("List has not been initiated!");
        (this.options.bottomPadding = t), this.arrangeChildren();
      }

      get bottomPadding() {
        var t, i;
        return (i = (t = this.options) == null ? void 0 : t.bottomPadding) !=
          null
          ? i
          : this.vertPadding;
      }

      arrangeChildren() {
        var t, i, e;
        let h = 0,
          n = this.leftPadding,
          r = this.topPadding;
        const l =
          (i = (t = this.options) == null ? void 0 : t.elementsMargin) != null
            ? i
            : 0;
        let d = (e = this.parent) == null ? void 0 : e.width;
        this.rightPadding && (d -= this.rightPadding),
          this.children.forEach((a, u) => {
            switch (this.type) {
              case "vertical":
                (a.y = r), (a.x = n), (r += l + a.height);
                break;
              case "horizontal":
                (a.x = n), (a.y = r), (n += l + a.width);
                break;
              default:
                (a.x = n),
                  (a.y = r),
                  a.x + a.width > d &&
                    u > 0 &&
                    ((r += l + h),
                    (n = this.leftPadding),
                    (a.x = n),
                    (a.y = r),
                    (h = 0)),
                  (h = Math.max(h, a.height)),
                  (n += l + a.width);
                break;
            }
          });
      }

      removeItem(t) {
        const i = this.children[t];
        i && (this.removeChild(i), this.arrangeChildren());
      }
    }

    var zt = Object.defineProperty,
      Ft = (s, t, i) =>
        t in s
          ? zt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      P = (s, t, i) => (Ft(s, typeof t != "symbol" ? t + "" : t, i), i);

    class Wt extends o.Container {
      constructor(t) {
        super(),
          P(this, "target"),
          P(this, "border", new o.Graphics()),
          P(this, "_targetMask"),
          P(this, "maskData"),
          P(this, "borderWidth"),
          P(this, "borderColor"),
          t != null && t.target && this.init(t);
      }

      init({ target: t, mask: i, borderWidth: e, borderColor: h }) {
        this.target && this.removeChild(this.target),
          (this.target = _(t)),
          this.addChild(this.border, this.target),
          i && this.setMask(i),
          e && this.setBorder(e, h);
      }

      setMask(t) {
        (this.maskData = t),
          (this._targetMask = _(t)),
          this.addChild(this._targetMask),
          (this.target.mask = this._targetMask);
      }

      setBorder(t, i) {
        if (
          ((this.borderWidth = t),
          (this.borderColor = i),
          this.showBorder(),
          this.maskData)
        ) {
          const e =
            typeof this.maskData == "string"
              ? o.Sprite.from(this.maskData)
              : this.maskData.clone(!0);
          (e.width += t * 2),
            (e.height += t * 2),
            (this.mask = e),
            this.addChild(e),
            this._targetMask.position.set(t);
        }
      }

      showBorder() {
        const t = this.borderWidth * 2;
        this.border
          .clear()
          .rect(0, 0, this.target.width + t, this.target.height + t)
          .fill(this.borderColor),
          (this.target.x = this.borderWidth),
          (this.target.y = this.borderWidth);
      }

      hideBorder() {
        this.border.clear();
      }
    }

    var Gt = Object.defineProperty,
      Xt = (s, t, i) =>
        t in s
          ? Gt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      I = (s, t, i) => (Xt(s, typeof t != "symbol" ? t + "" : t, i), i);

    class Yt extends o.Container {
      constructor(t) {
        super(),
          I(this, "items", []),
          I(this, "innerView"),
          I(this, "value"),
          I(this, "selected"),
          I(this, "onChange"),
          I(this, "options"),
          t && this.init(t),
          (this.onChange = new v.Signal());
      }

      init(t) {
        var i, e;
        (this.options = t),
          (this.value =
            (i = t.items[t.selectedItem || 0].labelText) == null
              ? void 0
              : i.text),
          (this.selected = (e = t.selectedItem) != null ? e : 0),
          this.innerView
            ? ((this.innerView.type = t.type),
              (this.innerView.elementsMargin = t.elementsMargin))
            : (this.innerView = new W({
                type: t.type,
                elementsMargin: t.elementsMargin,
              })),
          this.addItems(t.items),
          this.addChild(this.innerView),
          this.selectItem(this.selected);
      }

      addItems(t) {
        t.forEach((i, e) => {
          i.onChange.connect(() => this.selectItem(e)),
            this.items.push(i),
            this.innerView.addChild(i);
        });
      }

      removeItems(t) {
        t.forEach((i) => {
          const e = this.items[i];
          e &&
            (e.onChange.disconnectAll(),
            this.innerView.removeChild(e),
            this.items.splice(i, 1));
        });
      }

      selectItem(t) {
        var i, e;
        this.items.forEach((h, n) => {
          h.forceCheck(n === t);
        }),
          this.selected !== t &&
            this.onChange.emit(
              t,
              (i = this.items[t].labelText) == null ? void 0 : i.text
            ),
          (this.value =
            (e = this.options.items[t].labelText) == null ? void 0 : e.text),
          (this.selected = t);
      }
    }

    var Nt = Object.defineProperty,
      Kt = (s, t, i) =>
        t in s
          ? Nt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      A = (s, t, i) => (Kt(s, typeof t != "symbol" ? t + "" : t, i), i);

    class qt {
      constructor(t = {}) {
        A(this, "x"),
          A(this, "ax"),
          A(this, "dx"),
          A(this, "tx"),
          A(this, "_options"),
          (this.x = 0),
          (this.ax = 0),
          (this.dx = 0),
          (this.tx = 0),
          (this._options = t),
          (this._options.max = t.max || 160),
          (this._options.damp = t.damp || 0.8),
          (this._options.springiness = t.springiness || 0.1);
      }

      update() {
        (this.ax = (this.tx - this.x) * this._options.springiness),
          (this.dx += this.ax),
          (this.dx *= this._options.damp),
          this.dx < -this._options.max
            ? (this.dx = -this._options.max)
            : this.dx > this._options.max && (this.dx = this._options.max),
          (this.x += this.dx);
      }

      reset() {
        (this.x = 0), (this.ax = 0), (this.dx = 0), (this.tx = 0);
      }

      get max() {
        return this._options.max;
      }

      set max(t) {
        this._options.max = t;
      }

      get damp() {
        return this._options.damp;
      }

      set damp(t) {
        this._options.damp = t;
      }

      get springiness() {
        return this._options.springiness;
      }

      set springiness(t) {
        this._options.springiness = t;
      }
    }

    var Jt = Object.defineProperty,
      Qt = (s, t, i) =>
        t in s
          ? Jt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      O = (s, t, i) => (Qt(s, typeof t != "symbol" ? t + "" : t, i), i);
    let Zt = class {
      constructor() {
        O(this, "done"),
          O(this, "to"),
          O(this, "_spring"),
          O(this, "_pos"),
          O(this, "_speed"),
          O(this, "_correctSpeed"),
          (this._spring = new qt()),
          (this._pos = 0),
          (this.to = 0);
      }

      start(t, i, e) {
        (this._speed = t),
          (this._pos = i),
          (this.to = e),
          (this.done = !1),
          (this._spring.x = this._pos),
          (this._spring.tx = this.to);
        const h = this.to - this._pos,
          n = Math.abs(h) / h,
          r = Math.abs(this._speed) / this._speed;
        n !== r ? (this._correctSpeed = !0) : (this._correctSpeed = !1);
      }

      update() {
        if (this._correctSpeed)
          (this._speed *= 0.6),
            Math.abs(this._speed) < 2 && (this._correctSpeed = !1),
            (this._pos += this._speed),
            (this._spring.x = this._pos);
        else {
          const t = this.to - this._pos;
          Math.abs(t) < 0.05
            ? ((this._pos = this.to), (this.done = !0))
            : ((this._spring.tx = this.to),
              this._spring.update(),
              (this._pos = this._spring.x));
        }
        return this._pos;
      }

      cancel() {}
    };
    var jt = Object.defineProperty,
      ti = (s, t, i) =>
        t in s
          ? jt(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      b = (s, t, i) => (ti(s, typeof t != "symbol" ? t + "" : t, i), i);

    class et {
      constructor(t = {}) {
        b(this, "position", 0),
          b(this, "constrain", !0),
          b(this, "min", 0),
          b(this, "max", 0),
          b(this, "maxSpeed", 400),
          b(this, "_ease"),
          b(this, "_offset", 0),
          b(this, "_prev", 0),
          b(this, "_speed", 0),
          b(this, "_hasStopped"),
          b(this, "_targetSpeed", 0),
          b(this, "_speedChecker", 0),
          b(this, "_grab", 0),
          b(this, "_activeEase");
        var i, e, h;
        (this.constrain = (i = t.constrain) != null ? i : !0),
          (this.maxSpeed = (e = t.maxSpeed) != null ? e : 400),
          (this._ease = (h = t.ease) != null ? h : new Zt());
      }

      set value(t) {
        (this._speed = 0), (this.position = t);
      }

      get value() {
        return this.position;
      }

      grab(t) {
        (this._grab = t),
          (this._offset = this.position - t),
          (this._speedChecker = 0),
          (this._targetSpeed = this._speed = 0),
          (this._hasStopped = !1);
      }

      hold(t) {
        this._speedChecker++,
          (this.position = t + this._offset),
          this._speedChecker > 1 &&
            (this._targetSpeed = this.position - this._prev),
          (this._speed += (this._targetSpeed - this._speed) / 2),
          this._speed > this.maxSpeed
            ? (this._speed = this.maxSpeed)
            : this._speed < -this.maxSpeed && (this._speed = -this.maxSpeed),
          (this._prev = this.position),
          this.constrain &&
            ((this._activeEase = null),
            this.position > this.min
              ? (this.position -= (this.position - this.min) / 1.5)
              : this.position < this.max &&
                (this.position += (this.max - this.position) / 1.5));
      }

      slide(t = !1) {
        this._hasStopped ||
          (this.constrain ? this._updateConstrain(t) : this._updateDefault());
      }

      get moveAmount() {
        return -(this.position - this._offset - this._grab);
      }

      _updateDefault() {
        (this._speed *= 0.9),
          (this.position += this._speed),
          (this._speed < 0 ? this._speed * -1 : this._speed) < 0.01 &&
            (this._hasStopped = !0);
      }

      _updateConstrain(t = !1) {
        const i = this.max;
        t
          ? (this.value > 0 && (this.value = 0),
            this.value > 0 && (this.value = 0),
            this.value < this.max && (this.value = this.max),
            this.value < this.max && (this.value = this.max))
          : this.position > this.min || this.position < i || this._activeEase
          ? (this._activeEase ||
              ((this._activeEase = this._ease),
              this.position > this.min
                ? this._activeEase.start(this._speed, this.position, this.min)
                : this._activeEase.start(this._speed, this.position, i)),
            (this.position = this._activeEase.update()),
            this._activeEase.done &&
              ((this.position = this._activeEase.to),
              (this._speed = 0),
              (this._activeEase = null)))
          : this._updateDefault();
      }
    }

    var ii = Object.defineProperty,
      ei = (s, t, i) =>
        t in s
          ? ii(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      C = (s, t, i) => (ei(s, typeof t != "symbol" ? t + "" : t, i), i);

    class si {
      constructor(t) {
        C(this, "xAxis"),
          C(this, "yAxis"),
          C(this, "_isDown"),
          C(this, "_globalPosition"),
          C(this, "_frame"),
          C(this, "_bounds"),
          C(this, "_dirty"),
          C(this, "disableEasing", !1);
        var i;
        (this.xAxis = new et({
          ease: t.xEase,
          maxSpeed: t.maxSpeed,
          constrain: t.constrain,
        })),
          (this.yAxis = new et({
            ease: t.yEase,
            maxSpeed: t.maxSpeed,
            constrain: t.constrain,
          })),
          (this.disableEasing = (i = t.disableEasing) != null ? i : !1),
          (this._frame = new o.Rectangle()),
          (this._bounds = new o.Rectangle()),
          (this._globalPosition = new o.Point());
      }

      pointerDown(t) {
        (this._globalPosition = t),
          this.xAxis.grab(t.x),
          this.yAxis.grab(t.y),
          (this._isDown = !0);
      }

      pointerUp() {
        this._isDown = !1;
      }

      pointerMove(t) {
        this._globalPosition = t;
      }

      update() {
        this._dirty &&
          ((this._dirty = !1),
          (this.xAxis.min = this._bounds.left),
          (this.xAxis.min = this._bounds.right - this._frame.width),
          (this.xAxis.min = this._bounds.top),
          (this.xAxis.min = this._bounds.bottom - this._frame.height)),
          this._isDown
            ? (this.xAxis.hold(this._globalPosition.x),
              this.yAxis.hold(this._globalPosition.y))
            : (this.xAxis.slide(this.disableEasing),
              this.yAxis.slide(this.disableEasing));
      }

      resize(t, i) {
        (this._frame.x = 0),
          (this._frame.width = t),
          (this._frame.y = 0),
          (this._frame.height = i),
          (this._dirty = !0);
      }

      setBounds(t, i, e, h) {
        (this._bounds.x = t),
          (this._bounds.width = i - t),
          (this._bounds.y = e),
          (this._bounds.height = h - e),
          (this._dirty = !0);
      }

      get x() {
        return this.xAxis.value;
      }

      get y() {
        return this.yAxis.value;
      }
    }

    var hi = Object.defineProperty,
      ni = (s, t, i) =>
        t in s
          ? hi(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      c = (s, t, i) => (ni(s, typeof t != "symbol" ? t + "" : t, i), i);

    class st extends o.Container {
      constructor(t) {
        super(),
          c(this, "background"),
          c(this, "borderMask"),
          c(this, "lastWidth"),
          c(this, "lastHeight"),
          c(this, "__width", 0),
          c(this, "__height", 0),
          c(this, "_dimensionChanged", !1),
          c(this, "list"),
          c(this, "_trackpad"),
          c(this, "isDragging", 0),
          c(this, "interactiveStorage", []),
          c(this, "visibleItems", []),
          c(this, "pressedChild"),
          c(this, "ticker", o.Ticker.shared),
          c(this, "options"),
          c(this, "stopRenderHiddenItemsTimeout"),
          c(this, "onMouseScrollBinding", this.onMouseScroll.bind(this)),
          c(this, "dragStarTouchPoint"),
          c(this, "isOver", !1),
          c(this, "proximityRange"),
          c(this, "proximityStatusCache", []),
          c(this, "lastScrollX"),
          c(this, "lastScrollY"),
          c(this, "proximityCheckFrameCounter", 0),
          c(this, "onProximityChange", new v.Signal()),
          c(this, "onScroll", new v.Signal()),
          t && this.init(t),
          this.ticker.add(this.update, this);
      }

      init(t) {
        var i, e, h;
        (this.options = t),
          this.setBackground(t.background),
          (this.__width = t.width | this.background.width),
          (this.__height = t.height | this.background.height),
          (this.proximityRange = (i = t.proximityRange) != null ? i : 0),
          this.list || ((this.list = new W()), super.addChild(this.list)),
          this.list.init({
            type: t.type,
            elementsMargin: t.elementsMargin,
            padding: t.padding,
            vertPadding: t.vertPadding,
            horPadding: t.horPadding,
            topPadding: t.topPadding,
            bottomPadding: t.bottomPadding,
            leftPadding: t.leftPadding,
            rightPadding: t.rightPadding,
          }),
          this.addItems(t.items),
          this.hasBounds && (this.addMask(), this.makeScrollable()),
          (this._trackpad.xAxis.value = 0),
          (this._trackpad.yAxis.value = 0),
          (this.options.globalScroll = (e = t.globalScroll) != null ? e : !0),
          (this.options.shiftScroll = (h = t.shiftScroll) != null ? h : !1),
          this.resize();
      }

      get hasBounds() {
        return !!this.__width || !!this.__height;
      }

      addItems(t) {
        t != null && t.length && t.forEach((i) => this.addItem(i));
      }

      removeItems() {
        (this.proximityStatusCache.length = 0), this.list.removeChildren();
      }

      addItem(...t) {
        if (t.length > 1) t.forEach((i) => this.addItem(i));
        else {
          const i = t[0];
          (!i.width || !i.height) &&
            console.error("ScrollBox item should have size"),
            (i.eventMode = "static"),
            this.list.addChild(i),
            this.proximityStatusCache.push(!1),
            this.options.disableDynamicRendering ||
              (i.renderable = this.isItemVisible(i));
        }
        return this.resize(), t[0];
      }

      removeItem(t) {
        this.list.removeItem(t),
          this.proximityStatusCache.splice(t, 1),
          this.resize();
      }

      isItemVisible(t, i = 0) {
        const e = this.options.type === "vertical" || !this.options.type;
        let h = !1;
        const n = this.list;
        if (e) {
          const r = t.y + n.y;
          r + t.height >= -i && r <= this.options.height + i && (h = !0);
        } else {
          const r = t.x + n.x;
          r + t.width >= -i && r <= this.options.width + i && (h = !0);
        }
        return h;
      }

      get items() {
        var t, i;
        return (i = (t = this.list) == null ? void 0 : t.children) != null
          ? i
          : [];
      }

      setBackground(t) {
        this.background && this.removeChild(this.background),
          (this.options.background = t),
          (this.background = new o.Graphics()),
          this.addChildAt(this.background, 0),
          this.resize();
      }

      addMask() {
        this.borderMask ||
          ((this.borderMask = new o.Graphics()),
          super.addChild(this.borderMask),
          (this.mask = this.borderMask)),
          this.resize();
      }

      makeScrollable() {
        this._trackpad ||
          (this._trackpad = new si({
            disableEasing: this.options.disableEasing,
          })),
          this.on("pointerdown", (t) => {
            this.renderAllItems(),
              (this.isDragging = 1),
              (this.dragStarTouchPoint = this.worldTransform.applyInverse(
                t.global
              )),
              this._trackpad.pointerDown(this.dragStarTouchPoint);
            const i = this.list.worldTransform.applyInverse(t.global);
            this.visibleItems.forEach((e) => {
              e.x < i.x &&
                e.x + e.width > i.x &&
                e.y < i.y &&
                e.y + e.height > i.y &&
                (this.pressedChild = e);
            });
          }),
          this.on("pointerup", () => {
            (this.isDragging = 0),
              this._trackpad.pointerUp(),
              this.restoreItemsInteractivity(),
              (this.pressedChild = null),
              this.stopRenderHiddenItems();
          }),
          this.on("pointerover", () => {
            this.isOver = !0;
          }),
          this.on("pointerout", () => {
            this.isOver = !1;
          }),
          this.on("pointerupoutside", () => {
            (this.isDragging = 0),
              this._trackpad.pointerUp(),
              this.restoreItemsInteractivity(),
              (this.pressedChild = null),
              this.stopRenderHiddenItems();
          }),
          this.on("globalpointermove", (t) => {
            var i, e;
            if (!this.isDragging) return;
            const h = this.options.type !== "horizontal",
              n = this.worldTransform.applyInverse(t.global);
            if (this.dragStarTouchPoint) {
              const r = (i = this.options.dragTrashHold) != null ? i : 10;
              if (this.options.type === "horizontal") {
                const l = n.x - this.dragStarTouchPoint.x;
                Math.abs(l) > r && (this.isDragging = 2);
              } else {
                const l = n.y - this.dragStarTouchPoint.y;
                Math.abs(l) > r && (this.isDragging = 2);
              }
            }
            (this.dragStarTouchPoint && this.isDragging !== 2) ||
              (this._trackpad.pointerMove(n),
              this.pressedChild &&
                (this.revertClick(this.pressedChild),
                (this.pressedChild = null)),
              (e = this.onScroll) == null ||
                e.emit(h ? this.scrollY : this.scrollX));
          }),
          document.addEventListener("wheel", this.onMouseScrollBinding, !0);
      }

      setInteractive(t) {
        this.eventMode = t ? "static" : "auto";
      }

      get listHeight() {
        return (
          this.list.height + this.list.topPadding + this.list.bottomPadding
        );
      }

      get listWidth() {
        return this.list.width + this.list.leftPadding + this.list.rightPadding;
      }

      resize(t = !1) {
        if (this.hasBounds) {
          if (
            (this.renderAllItems(),
            this.borderMask &&
              (t ||
                this._dimensionChanged ||
                this.lastWidth !== this.listWidth ||
                this.lastHeight !== this.listHeight))
          ) {
            this.options.width || (this.__width += this.listWidth),
              this.options.height || (this.__height += this.listHeight),
              this.borderMask
                .clear()
                .roundRect(
                  0,
                  0,
                  this.__width,
                  this.__height,
                  this.options.radius | 0
                )
                .fill(16711935)
                .stroke(0),
              (this.borderMask.eventMode = "none");
            const i = this.options.background;
            this.background
              .clear()
              .roundRect(
                0,
                0,
                this.__width,
                this.__height,
                this.options.radius | 0
              )
              .fill({
                color: i != null ? i : 0,
                alpha: i ? 1 : 1e-7,
              }),
              this.options.type === "horizontal"
                ? this.setInteractive(this.listWidth > this.__width)
                : this.setInteractive(this.listHeight > this.__height),
              (this.lastWidth = this.listWidth),
              (this.lastHeight = this.listHeight);
          }
          if (this._trackpad) {
            const i =
                this.borderMask.width -
                this.list.width -
                this.list.leftPadding -
                this.list.rightPadding,
              e =
                this.borderMask.height -
                this.list.height -
                this.list.topPadding -
                this.list.bottomPadding;
            this.options.type === "vertical"
              ? (this._trackpad.yAxis.max = -Math.abs(e))
              : this.options.type === "horizontal"
              ? (this._trackpad.xAxis.max = -Math.abs(i))
              : ((this._trackpad.yAxis.max = -Math.abs(e)),
                (this._trackpad.xAxis.max = -Math.abs(i)));
          }
          this._dimensionChanged
            ? (this.list.arrangeChildren(),
              this.stopRenderHiddenItems(),
              (this._dimensionChanged = !1))
            : this.updateVisibleItems(),
            (this.lastScrollX = null),
            (this.lastScrollY = null);
        }
      }

      onMouseScroll(t) {
        var i, e;
        if (!this.isOver && !this.options.globalScroll) return;
        this.renderAllItems();
        const h = this.options.shiftScroll
          ? typeof t.deltaX != "undefined" || typeof t.deltaY != "undefined"
          : typeof t.deltaX != "undefined";
        if (this.options.type === "horizontal" && h) {
          const n = this.options.shiftScroll ? t.deltaX : t.deltaY,
            r = this.list.x - n;
          if (this.listWidth < this.__width) this._trackpad.xAxis.value = 0;
          else {
            const l = this.__width - this.listWidth,
              d = 0;
            this._trackpad.xAxis.value = Math.min(d, Math.max(l, r));
          }
          (i = this.onScroll) == null || i.emit(this._trackpad.xAxis.value);
        } else if (typeof t.deltaY != "undefined") {
          const n = this.list.y - t.deltaY;
          if (this.listHeight < this.__height) this._trackpad.yAxis.value = 0;
          else {
            const r = this.__height - this.listHeight,
              l = 0;
            this._trackpad.yAxis.value = Math.min(l, Math.max(r, n));
          }
          (e = this.onScroll) == null || e.emit(this._trackpad.yAxis.value);
        }
        this.stopRenderHiddenItems();
      }

      scrollBottom() {
        this.interactive
          ? this.scrollTo(this.list.children.length - 1)
          : this.scrollTop();
      }

      scrollTop() {
        this.renderAllItems(),
          (this._trackpad.xAxis.value = 0),
          (this._trackpad.yAxis.value = 0),
          this.stopRenderHiddenItems();
      }

      renderAllItems() {
        clearTimeout(this.stopRenderHiddenItemsTimeout),
          (this.stopRenderHiddenItemsTimeout = null),
          !this.options.disableDynamicRendering &&
            this.items.forEach((t) => {
              t.renderable = !0;
            });
      }

      stopRenderHiddenItems() {
        this.options.disableDynamicRendering ||
          (this.stopRenderHiddenItemsTimeout &&
            (clearTimeout(this.stopRenderHiddenItemsTimeout),
            (this.stopRenderHiddenItemsTimeout = null)),
          (this.stopRenderHiddenItemsTimeout = setTimeout(
            () => this.updateVisibleItems(),
            2e3
          )));
      }

      updateVisibleItems() {
        (this.visibleItems.length = 0),
          this.items.forEach((t) => {
            (t.renderable = this.isItemVisible(t)), this.visibleItems.push(t);
          });
      }

      scrollTo(t) {
        if (!this.interactive) return;
        const i = this.list.children[t];
        i &&
          (this.renderAllItems(),
          (this._trackpad.xAxis.value =
            this.options.type === "horizontal"
              ? this.__width - i.x - i.width - this.list.rightPadding
              : 0),
          (this._trackpad.yAxis.value =
            !this.options.type || this.options.type === "vertical"
              ? this.__height - i.y - i.height - this.list.bottomPadding
              : 0),
          this.stopRenderHiddenItems());
      }

      scrollToPosition({ x: t, y: i }) {
        (t === void 0 && i === void 0) ||
          (this.renderAllItems(),
          t !== void 0 && (this.scrollX = -t),
          i !== void 0 && (this.scrollY = -i),
          this.stopRenderHiddenItems());
      }

      get height() {
        return this.__height;
      }

      set height(t) {
        (this.__height = t),
          (this._dimensionChanged = !0),
          this.resize(),
          this.scrollTop();
      }

      get width() {
        return this.__width;
      }

      set width(t) {
        (this.__width = t),
          (this._dimensionChanged = !0),
          this.resize(),
          this.scrollTop();
      }

      setSize(t, i) {
        var e;
        typeof t == "object"
          ? ((i = (e = t.height) != null ? e : t.width), (t = t.width))
          : (i = i != null ? i : t),
          (this.__width = t),
          (this.__height = i),
          (this._dimensionChanged = !0),
          this.resize(),
          this.scrollTop();
      }

      getSize(t) {
        return (
          (t = t || { width: 0, height: 0 }),
          (t.width = this.__width),
          (t.height = this.__height),
          t
        );
      }

      get scrollX() {
        return this._trackpad.xAxis.value;
      }

      set scrollX(t) {
        this._trackpad.xAxis.value = t;
      }

      get scrollY() {
        return this._trackpad.yAxis.value;
      }

      set scrollY(t) {
        this._trackpad.yAxis.value = t;
      }

      update() {
        var t;
        if (!this.list) return;
        this._trackpad.update();
        const i = this.options.type === "horizontal" ? "x" : "y";
        this.list[i] !== this._trackpad[i] &&
          (this.list[i] = this._trackpad[i]),
          !this.options.disableProximityCheck &&
            (this._trackpad.x !== this.lastScrollX ||
              this._trackpad.y !== this.lastScrollY) &&
            (this.proximityCheckFrameCounter++,
            this.proximityCheckFrameCounter >=
              ((t = this.options.proximityDebounce) != null ? t : 10) &&
              (this.items.forEach((e, h) => {
                const n = this.isItemVisible(e, this.proximityRange),
                  r = this.proximityStatusCache[h];
                n !== r &&
                  ((this.proximityStatusCache[h] = n),
                  this.onProximityChange.emit({
                    item: e,
                    index: h,
                    inRange: n,
                  }));
              }),
              (this.lastScrollX = this._trackpad.x),
              (this.lastScrollY = this._trackpad.y),
              (this.proximityCheckFrameCounter = 0)));
      }

      destroy(t) {
        this.ticker.remove(this.update, this),
          document.removeEventListener("wheel", this.onMouseScrollBinding, !0),
          this.background.destroy(),
          this.list.destroy(),
          super.destroy(t);
      }

      restoreItemsInteractivity() {
        this.interactiveStorage.forEach((t) => {
          t.item.eventMode = t.eventMode;
        }),
          (this.interactiveStorage.length = 0);
      }

      revertClick(t) {
        t.eventMode !== "auto" &&
          (o.isMobile.any
            ? t.emit("pointerupoutside", null)
            : t.emit("mouseupoutside", null),
          this.interactiveStorage.push({
            item: t,
            eventMode: t.eventMode,
          }),
          (t.eventMode = "auto")),
          t instanceof o.Container &&
            t.children &&
            t.children.forEach((i) => this.revertClick(i));
      }

      get scrollHeight() {
        return this.list.height;
      }

      get scrollWidth() {
        return this.list.width;
      }
    }

    var oi = Object.defineProperty,
      ht = Object.getOwnPropertySymbols,
      ri = Object.prototype.hasOwnProperty,
      li = Object.prototype.propertyIsEnumerable,
      G = (s, t, i) =>
        t in s
          ? oi(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      ai = (s, t) => {
        for (var i in t || (t = {})) ri.call(t, i) && G(s, i, t[i]);
        if (ht) for (var i of ht(t)) li.call(t, i) && G(s, i, t[i]);
        return s;
      },
      T = (s, t, i) => (G(s, typeof t != "symbol" ? t + "" : t, i), i);
    const di = 5;

    class ui extends o.Container {
      constructor(t) {
        super(),
          T(this, "view", new o.Container()),
          T(this, "openButton"),
          T(this, "closeButton"),
          T(this, "openView"),
          T(this, "scrollBox"),
          T(this, "value"),
          T(this, "onSelect"),
          this.addChild(this.view),
          (this.onSelect = new v.Signal()),
          t && this.init(t);
      }

      init({
        closedBG: t,
        textStyle: i,
        TextClass: e,
        items: h,
        openBG: n,
        selected: r,
        selectedTextOffset: l,
        scrollBox: d,
        visibleItems: a,
      }) {
        var u, p;
        (e = e != null ? e : o.Text),
          this.openView &&
            this.openView !== n &&
            this.view.removeChild(this.openView),
          this.openButton
            ? ((this.openButton.defaultView = _(t)),
              (this.openButton.textView = new e({
                text: h != null && h.items ? h.items[0] : "",
                style: i,
              })),
              (this.openButton.textOffset = l))
            : ((this.openButton = new $({
                defaultView: _(t),
                text: new e({
                  text: h != null && h.items ? h.items[0] : "",
                  style: i,
                }),
                textOffset: l,
              })),
              this.openButton.onPress.connect(() => this.toggle()),
              this.addChild(this.openButton)),
          this.openView !== n &&
            ((this.openView = _(n)),
            (this.view.visible = !1),
            this.view.addChild(this.openView)),
          this.closeButton
            ? ((this.closeButton.defaultView = new o.Graphics()
                .rect(0, 0, this.openButton.width, this.openButton.height)
                .fill({
                  color: 0,
                  alpha: 1e-5,
                })),
              (this.closeButton.textView = new e({
                text: h != null && h.items ? h.items[0] : "",
                style: i,
              })),
              (this.openButton.textOffset = l))
            : ((this.closeButton = new $({
                defaultView: new o.Graphics()
                  .rect(0, 0, this.openButton.width, this.openButton.height)
                  .fill({
                    color: 0,
                    alpha: 1e-5,
                  }),
                text: new e({
                  text: h != null && h.items ? h.items[0] : "",
                  style: i,
                }),
                textOffset: l,
              })),
              this.closeButton.onPress.connect(() => this.toggle()),
              this.view.addChild(this.closeButton)),
          this.scrollBox
            ? this.scrollBox.removeItems()
            : ((this.scrollBox = new st()), this.view.addChild(this.scrollBox)),
          this.scrollBox.init(
            ai(
              {
                type: "vertical",
                elementsMargin: 0,
                width: this.openButton.width,
                height: this.openButton.height * (a != null ? a : di),
                radius: 0,
                padding: 0,
              },
              d
            )
          ),
          (this.scrollBox.y = this.openButton.height),
          d != null &&
            d.offset &&
            ((this.scrollBox.x = (u = d.offset.x) != null ? u : 0),
            (this.scrollBox.y += (p = d.offset.y) != null ? p : 0)),
          this.addItems(h, r);
      }

      addItems(t, i = 0) {
        this.convertItemsToButtons(t).forEach((e, h) => {
          const n = e.text;
          h === i && ((this.openButton.text = n), (this.closeButton.text = n)),
            e.onPress.connect(() => {
              (this.value = h),
                this.onSelect.emit(h, n),
                (this.openButton.text = n),
                (this.closeButton.text = n),
                this.close();
            }),
            this.scrollBox.addItem(e);
        });
      }

      removeItem(t) {
        this.scrollBox.removeItem(t);
      }

      toggle() {
        (this.view.visible = !this.view.visible),
          (this.openButton.visible = !this.openButton.visible);
      }

      open() {
        (this.view.visible = !0), (this.openButton.visible = !1);
      }

      close() {
        (this.view.visible = !1), (this.openButton.visible = !0);
      }

      convertItemsToButtons({
        items: t,
        backgroundColor: i,
        hoverColor: e,
        width: h,
        height: n,
        textStyle: r,
        TextClass: l,
        radius: d,
      }) {
        l = l != null ? l : o.Text;
        const a = [];
        return (
          t.forEach((u) => {
            const p = new o.Graphics().roundRect(0, 0, h, n, d).fill(i),
              x = e != null ? e : i,
              y = new o.Graphics().roundRect(0, 0, h, n, d).fill(x),
              M = new l({ text: u, style: r }),
              B = new $({ defaultView: p, hoverView: y, text: M });
            a.push(B);
          }),
          a
        );
      }
    }

    var pi = Object.defineProperty,
      nt = Object.getOwnPropertySymbols,
      ci = Object.prototype.hasOwnProperty,
      gi = Object.prototype.propertyIsEnumerable,
      X = (s, t, i) =>
        t in s
          ? pi(s, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            })
          : (s[t] = i),
      vi = (s, t) => {
        for (var i in t || (t = {})) ci.call(t, i) && X(s, i, t[i]);
        if (nt) for (var i of nt(t)) gi.call(t, i) && X(s, i, t[i]);
        return s;
      },
      Y = (s, t, i) => (X(s, typeof t != "symbol" ? t + "" : t, i), i);

    class wi extends Z {
      constructor(t) {
        var i;
        super(
          vi(
            {
              slider1: t.slider,
              value1: t.value,
            },
            t
          )
        ),
          Y(this, "sliderOptions"),
          Y(this, "onUpdate", new v.Signal()),
          Y(this, "onChange", new v.Signal()),
          (this.sliderOptions = t),
          (this.step = t.step || 1),
          (this.value = (i = t.value) != null ? i : this.min),
          this.updateSlider();
      }

      get value() {
        return this._value1;
      }

      set value(t) {
        var i;
        t !== this._value1 &&
          (t < this.min && (t = this.min),
          t > this.max && (t = this.max),
          (this._value1 = t),
          this.updateSlider(),
          (i = this.onUpdate) == null || i.emit(this.value));
      }

      set max(t) {
        (super.max = t), this.updateSlider();
      }

      get max() {
        return super.max;
      }

      set min(t) {
        (super.min = t), this.updateSlider();
      }

      get min() {
        return super.min;
      }

      set step(t) {
        (super.step = t), this.updateSlider();
      }

      get step() {
        return super.step;
      }

      set slider(t) {
        (this.slider1 = t), this.updateSlider();
      }

      update(t) {
        var i;
        if ((super.update(t), !this.dragging)) return;
        const e = t.currentTarget,
          { x: h } = e.parent.worldTransform.applyInverse(t.global),
          n = h / (((i = this.bg) == null ? void 0 : i.width) || 1),
          r = this.min + n * (this.max - this.min);
        this.value = Math.round(r / this.step) * this.step;
      }

      change() {
        var t;
        (t = this.onChange) == null || t.emit(this.value);
      }

      updateSlider() {
        var t, i, e, h, n, r, l, d;
        if (
          ((this.progress =
            ((((t = this.value) != null ? t : this.min) - this.min) /
              (this.max - this.min)) *
            100),
          (this._slider1.x =
            (((i = this.bg) == null ? void 0 : i.width) / 100) * this.progress -
            this._slider1.width / 2),
          (this._slider1.y = ((e = this.bg) == null ? void 0 : e.height) / 2),
          (h = this.sliderOptions) != null && h.showValue)
        ) {
          this.value1Text.text = `${Math.round(this.value)}`;
          const a = this._slider1.x + this._slider1.width / 2,
            u = this._slider1.y;
          (this.value1Text.x =
            a +
            ((r =
              (n = this.sliderOptions.valueTextOffset) == null
                ? void 0
                : n.x) != null
              ? r
              : 0)),
            (this.value1Text.y =
              u +
              ((d =
                (l = this.sliderOptions.valueTextOffset) == null
                  ? void 0
                  : l.y) != null
                ? d
                : 0));
        }
      }

      set width(t) {
        (super.width = t), this.updateSlider();
      }

      get width() {
        return super.width;
      }

      set height(t) {
        (super.height = t), this.updateSlider();
      }

      get height() {
        return super.height;
      }

      setSize(t, i) {
        super.setSize(t, i), this.updateSlider();
      }
    }

    return (
      (w.Button = N),
      (w.ButtonContainer = K),
      (w.CheckBox = xt),
      (w.CircularProgressBar = Vt),
      (w.DoubleSlider = Mt),
      (w.FancyButton = $),
      (w.Input = $t),
      (w.List = W),
      (w.MaskedFrame = Wt),
      (w.ProgressBar = Q),
      (w.RadioGroup = Yt),
      (w.ScrollBox = st),
      (w.Select = ui),
      (w.Slider = wi),
      (w.Switcher = J),
      w
    );
  })({}, PIXI, typedSignals, tweedle_js));
//# sourceMappingURL=pixi-ui.js.map
