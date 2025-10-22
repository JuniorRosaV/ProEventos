import {
  AnimationBuilder
} from "./chunk-C7ALEBQW.js";
import {
  animate,
  style
} from "./chunk-JSPI25BQ.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgModule,
  Output,
  Renderer2,
  setClassMetadata,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-ZCDEZXDQ.js";

// node_modules/ngx-bootstrap/collapse/fesm2022/ngx-bootstrap-collapse.mjs
var COLLAPSE_ANIMATION_TIMING = "400ms cubic-bezier(0.4,0.0,0.2,1)";
var expandAnimation = [style({
  height: 0,
  visibility: "hidden"
}), animate(COLLAPSE_ANIMATION_TIMING, style({
  height: "*",
  visibility: "visible"
}))];
var collapseAnimation = [style({
  height: "*",
  visibility: "visible"
}), animate(COLLAPSE_ANIMATION_TIMING, style({
  height: 0,
  visibility: "hidden"
}))];
var _CollapseDirective = class _CollapseDirective {
  set display(value) {
    this._display = value;
    if (value === "none") {
      this.hide();
      return;
    }
    this.isAnimated ? this.toggle() : this.show();
  }
  /** A flag indicating visibility of content (shown or hidden) */
  set collapse(value) {
    this.collapseNewValue = value;
    if (!this._player || this._isAnimationDone) {
      this.isExpanded = value;
      this.toggle();
    }
  }
  get collapse() {
    return this.isExpanded;
  }
  constructor(_el, _renderer, _builder) {
    this._el = _el;
    this._renderer = _renderer;
    this.collapsed = new EventEmitter();
    this.collapses = new EventEmitter();
    this.expanded = new EventEmitter();
    this.expands = new EventEmitter();
    this.isExpanded = true;
    this.collapseNewValue = true;
    this.isCollapsed = false;
    this.isCollapse = true;
    this.isCollapsing = false;
    this.isAnimated = false;
    this._display = "block";
    this._stylesLoaded = false;
    this._COLLAPSE_ACTION_NAME = "collapse";
    this._EXPAND_ACTION_NAME = "expand";
    this._factoryCollapseAnimation = _builder.build(collapseAnimation);
    this._factoryExpandAnimation = _builder.build(expandAnimation);
  }
  ngAfterViewChecked() {
    this._stylesLoaded = true;
    if (!this._player || !this._isAnimationDone) {
      return;
    }
    this._player.reset();
    this._renderer.setStyle(this._el.nativeElement, "height", "*");
  }
  /** allows to manually toggle content visibility */
  toggle() {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }
  /** allows to manually hide content */
  hide() {
    this.isCollapsing = true;
    this.isExpanded = false;
    this.isCollapsed = true;
    this.isCollapsing = false;
    this.collapses.emit(this);
    this._isAnimationDone = false;
    this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
        this.show();
        return;
      }
      this.collapsed.emit(this);
      this._renderer.setStyle(this._el.nativeElement, "display", "none");
    });
  }
  /** allows to manually show collapsed content */
  show() {
    this._renderer.setStyle(this._el.nativeElement, "display", this._display);
    this.isCollapsing = true;
    this.isExpanded = true;
    this.isCollapsed = false;
    this.isCollapsing = false;
    this.expands.emit(this);
    this._isAnimationDone = false;
    this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
        this.hide();
        return;
      }
      this.expanded.emit(this);
      this._renderer.removeStyle(this._el.nativeElement, "overflow");
    });
  }
  animationRun(isAnimated, action) {
    if (!isAnimated || !this._stylesLoaded) {
      return (callback) => callback();
    }
    this._renderer.setStyle(this._el.nativeElement, "overflow", "hidden");
    this._renderer.addClass(this._el.nativeElement, "collapse");
    const factoryAnimation = action === this._EXPAND_ACTION_NAME ? this._factoryExpandAnimation : this._factoryCollapseAnimation;
    if (this._player) {
      this._player.reset();
    }
    this._player = factoryAnimation.create(this._el.nativeElement);
    this._player.play();
    return (callback) => this._player?.onDone(callback);
  }
};
_CollapseDirective.ɵfac = function CollapseDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CollapseDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(AnimationBuilder));
};
_CollapseDirective.ɵdir = ɵɵdefineDirective({
  type: _CollapseDirective,
  selectors: [["", "collapse", ""]],
  hostVars: 9,
  hostBindings: function CollapseDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-hidden", ctx.isCollapsed);
      ɵɵclassProp("collapse", ctx.isCollapse)("in", ctx.isExpanded)("show", ctx.isExpanded)("collapsing", ctx.isCollapsing);
    }
  },
  inputs: {
    display: "display",
    isAnimated: "isAnimated",
    collapse: "collapse"
  },
  outputs: {
    collapsed: "collapsed",
    collapses: "collapses",
    expanded: "expanded",
    expands: "expands"
  },
  exportAs: ["bs-collapse"]
});
var CollapseDirective = _CollapseDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseDirective, [{
    type: Directive,
    args: [{
      selector: "[collapse]",
      exportAs: "bs-collapse",
      host: {
        "[class.collapse]": "true"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: AnimationBuilder
  }], {
    collapsed: [{
      type: Output
    }],
    collapses: [{
      type: Output
    }],
    expanded: [{
      type: Output
    }],
    expands: [{
      type: Output
    }],
    isExpanded: [{
      type: HostBinding,
      args: ["class.in"]
    }, {
      type: HostBinding,
      args: ["class.show"]
    }],
    isCollapsed: [{
      type: HostBinding,
      args: ["attr.aria-hidden"]
    }],
    isCollapse: [{
      type: HostBinding,
      args: ["class.collapse"]
    }],
    isCollapsing: [{
      type: HostBinding,
      args: ["class.collapsing"]
    }],
    display: [{
      type: Input
    }],
    isAnimated: [{
      type: Input
    }],
    collapse: [{
      type: Input
    }]
  });
})();
var _CollapseModule = class _CollapseModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _CollapseModule,
      providers: []
    };
  }
};
_CollapseModule.ɵfac = function CollapseModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CollapseModule)();
};
_CollapseModule.ɵmod = ɵɵdefineNgModule({
  type: _CollapseModule,
  imports: [CollapseDirective],
  exports: [CollapseDirective]
});
_CollapseModule.ɵinj = ɵɵdefineInjector({});
var CollapseModule = _CollapseModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseModule, [{
    type: NgModule,
    args: [{
      imports: [CollapseDirective],
      exports: [CollapseDirective]
    }]
  }], null, null);
})();
export {
  CollapseDirective,
  CollapseModule
};
//# sourceMappingURL=ngx-bootstrap_collapse.js.map
