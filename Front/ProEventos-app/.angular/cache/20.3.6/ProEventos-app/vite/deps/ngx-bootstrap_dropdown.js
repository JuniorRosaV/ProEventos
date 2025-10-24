import {
  ComponentLoaderFactory
} from "./chunk-P4WDLOMQ.js";
import {
  AnimationBuilder
} from "./chunk-WPLKAPHN.js";
import {
  animate,
  style
} from "./chunk-JSPI25BQ.js";
import {
  NgClass
} from "./chunk-JDQEZ7D2.js";
import "./chunk-ZMLREZMJ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1
} from "./chunk-6RQQVQ7T.js";
import {
  filter
} from "./chunk-SI3RN3KH.js";

// node_modules/ngx-bootstrap/dropdown/fesm2022/ngx-bootstrap-dropdown.mjs
var _c0 = ["*"];
var _c1 = (a0) => ({
  dropdown: a0
});
var _BsDropdownConfig = class _BsDropdownConfig {
  constructor() {
    this.autoClose = true;
    this.insideClick = false;
    this.isAnimated = false;
    this.stopOnClickPropagation = false;
  }
};
_BsDropdownConfig.ɵfac = function BsDropdownConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownConfig)();
};
_BsDropdownConfig.ɵprov = ɵɵdefineInjectable({
  token: _BsDropdownConfig,
  factory: _BsDropdownConfig.ɵfac,
  providedIn: "root"
});
var BsDropdownConfig = _BsDropdownConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _BsDropdownState = class _BsDropdownState {
  constructor() {
    this.direction = "down";
    this.autoClose = true;
    this.insideClick = false;
    this.isAnimated = false;
    this.stopOnClickPropagation = false;
    this.isOpenChange = new EventEmitter();
    this.isDisabledChange = new EventEmitter();
    this.toggleClick = new EventEmitter();
    this.counts = 0;
    this.dropdownMenu = new Promise((resolve) => {
      this.resolveDropdownMenu = resolve;
    });
  }
};
_BsDropdownState.ɵfac = function BsDropdownState_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownState)();
};
_BsDropdownState.ɵprov = ɵɵdefineInjectable({
  token: _BsDropdownState,
  factory: _BsDropdownState.ɵfac,
  providedIn: "platform"
});
var BsDropdownState = _BsDropdownState;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownState, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], () => [], null);
})();
var DROPDOWN_ANIMATION_TIMING = "220ms cubic-bezier(0, 0, 0.2, 1)";
var dropdownAnimation = [style({
  height: 0,
  overflow: "hidden"
}), animate(DROPDOWN_ANIMATION_TIMING, style({
  height: "*",
  overflow: "hidden"
}))];
var _BsDropdownContainerComponent = class _BsDropdownContainerComponent {
  get direction() {
    return this._state.direction;
  }
  constructor(_state, cd, _renderer, _element, _builder) {
    this._state = _state;
    this.cd = cd;
    this._renderer = _renderer;
    this._element = _element;
    this.isOpen = false;
    this._factoryDropDownAnimation = _builder.build(dropdownAnimation);
    this._subscription = _state.isOpenChange.subscribe((value) => {
      this.isOpen = value;
      const dropdown = this._element.nativeElement.querySelector(".dropdown-menu");
      this._renderer.addClass(this._element.nativeElement.querySelector("div"), "open");
      if (dropdown) {
        this._renderer.addClass(dropdown, "show");
        if (dropdown.classList.contains("dropdown-menu-right") || dropdown.classList.contains("dropdown-menu-end")) {
          this._renderer.setStyle(dropdown, "left", "auto");
          this._renderer.setStyle(dropdown, "right", "0");
        }
        if (this.direction === "up") {
          this._renderer.setStyle(dropdown, "top", "auto");
          this._renderer.setStyle(dropdown, "transform", "translateY(-101%)");
        }
      }
      if (dropdown && this._state.isAnimated) {
        this._factoryDropDownAnimation.create(dropdown).play();
      }
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }
  /** @internal */
  _contains(el) {
    return this._element.nativeElement.contains(el);
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
};
_BsDropdownContainerComponent.ɵfac = function BsDropdownContainerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownContainerComponent)(ɵɵdirectiveInject(BsDropdownState), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(AnimationBuilder));
};
_BsDropdownContainerComponent.ɵcmp = ɵɵdefineComponent({
  type: _BsDropdownContainerComponent,
  selectors: [["bs-dropdown-container"]],
  hostAttrs: [2, "display", "block", "position", "absolute", "z-index", "1040"],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 9,
  consts: [[3, "ngClass"]],
  template: function BsDropdownContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0);
      ɵɵprojection(1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassProp("dropup", ctx.direction === "up")("show", ctx.isOpen)("open", ctx.isOpen);
      ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c1, ctx.direction === "down"));
    }
  },
  dependencies: [NgClass],
  encapsulation: 2,
  changeDetection: 0
});
var BsDropdownContainerComponent = _BsDropdownContainerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-dropdown-container",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgClass],
      host: {
        style: "display:block;position: absolute;z-index: 1040"
      },
      template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `
    }]
  }], () => [{
    type: BsDropdownState
  }, {
    type: ChangeDetectorRef
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: AnimationBuilder
  }], null);
})();
var _BsDropdownDirective = class _BsDropdownDirective {
  /**
   * Indicates that dropdown will be closed on item or document click,
   * and after pressing ESC
   */
  set autoClose(value) {
    this._state.autoClose = value;
  }
  get autoClose() {
    return this._state.autoClose;
  }
  /**
   * Indicates that dropdown will be animated
   */
  set isAnimated(value) {
    this._state.isAnimated = value;
  }
  get isAnimated() {
    return this._state.isAnimated;
  }
  /**
   * This attribute indicates that the dropdown shouldn't close on inside click when autoClose is set to true
   */
  set insideClick(value) {
    this._state.insideClick = value;
  }
  get insideClick() {
    return this._state.insideClick;
  }
  /**
   * Disables dropdown toggle and hides dropdown menu if opened
   */
  set isDisabled(value) {
    this._isDisabled = value;
    this._state.isDisabledChange.emit(value);
    if (value) {
      this.hide();
    }
  }
  get isDisabled() {
    return this._isDisabled;
  }
  /**
   * Returns whether or not the popover is currently being shown
   */
  get isOpen() {
    if (this._showInline) {
      return this._isInlineOpen;
    }
    return this._dropdown.isShown;
  }
  set isOpen(value) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }
  get _showInline() {
    return !this.container;
  }
  constructor(_elementRef, _renderer, _viewContainerRef, _cis, _state, _config, _builder) {
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._viewContainerRef = _viewContainerRef;
    this._cis = _cis;
    this._state = _state;
    this._config = _config;
    this.dropup = false;
    this._isInlineOpen = false;
    this._isDisabled = false;
    this._subscriptions = [];
    this._isInited = false;
    this._state.autoClose = this._config.autoClose;
    this._state.insideClick = this._config.insideClick;
    this._state.isAnimated = this._config.isAnimated;
    this._state.stopOnClickPropagation = this._config.stopOnClickPropagation;
    this._factoryDropDownAnimation = _builder.build(dropdownAnimation);
    this._dropdown = this._cis.createLoader(this._elementRef, this._viewContainerRef, this._renderer).provide({
      provide: BsDropdownState,
      useValue: this._state
    });
    this.onShown = this._dropdown.onShown;
    this.onHidden = this._dropdown.onHidden;
    this.isOpenChange = this._state.isOpenChange;
  }
  ngOnInit() {
    if (this._isInited) {
      return;
    }
    this._isInited = true;
    this._dropdown.listen({
      // because of dropdown inline mode
      outsideClick: false,
      triggers: this.triggers,
      show: () => this.show()
    });
    this._subscriptions.push(this._state.toggleClick.subscribe((value) => this.toggle(value)));
    this._subscriptions.push(this._state.isDisabledChange.pipe(filter((value) => value)).subscribe(() => this.hide()));
  }
  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  show() {
    if (this.isOpen || this.isDisabled) {
      return;
    }
    if (this._showInline) {
      if (!this._inlinedMenu) {
        this._state.dropdownMenu.then((dropdownMenu) => {
          this._dropdown.attachInline(dropdownMenu.viewContainer, dropdownMenu.templateRef);
          this._inlinedMenu = this._dropdown._inlineViewRef;
          this.addBs4Polyfills();
          if (this._inlinedMenu) {
            this._renderer.addClass(this._inlinedMenu.rootNodes[0].parentNode, "open");
          }
          this.playAnimation();
        }).catch();
      }
      this.addBs4Polyfills();
      this._isInlineOpen = true;
      this.onShown.emit(true);
      this._state.isOpenChange.emit(true);
      this.playAnimation();
      return;
    }
    this._state.dropdownMenu.then((dropdownMenu) => {
      const _dropup = this.dropup || typeof this.dropup !== "undefined" && this.dropup;
      this._state.direction = _dropup ? "up" : "down";
      const _placement = this.placement || (_dropup ? "top start" : "bottom start");
      this._dropdown.attach(BsDropdownContainerComponent).to(this.container).position({
        attachment: _placement
      }).show({
        content: dropdownMenu.templateRef,
        placement: _placement
      });
      this._state.isOpenChange.emit(true);
    }).catch();
  }
  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  hide() {
    if (!this.isOpen) {
      return;
    }
    if (this._showInline) {
      this.removeShowClass();
      this.removeDropupStyles();
      this._isInlineOpen = false;
      this.onHidden.emit(true);
    } else {
      this._dropdown.hide();
    }
    this._state.isOpenChange.emit(false);
  }
  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover. With parameter <code>true</code> allows toggling, with parameter <code>false</code>
   * only hides opened dropdown. Parameter usage will be removed in ngx-bootstrap v3
   */
  toggle(value) {
    if (this.isOpen || !value) {
      return this.hide();
    }
    return this.show();
  }
  /** @internal */
  _contains(event) {
    return this._elementRef.nativeElement.contains(event.target) || this._dropdown.instance && this._dropdown.instance._contains(event.target);
  }
  navigationClick(event) {
    const ref = this._elementRef.nativeElement.querySelector(".dropdown-menu");
    if (!ref) {
      return;
    }
    const firstActive = this._elementRef.nativeElement.ownerDocument.activeElement;
    const allRef = ref.querySelectorAll(".dropdown-item");
    switch (event.keyCode) {
      case 38:
        if (this._state.counts > 0) {
          allRef[--this._state.counts].focus();
        }
        break;
      case 40:
        if (this._state.counts + 1 < allRef.length) {
          if (firstActive.classList !== allRef[this._state.counts].classList) {
            allRef[this._state.counts].focus();
          } else {
            allRef[++this._state.counts].focus();
          }
        }
        break;
      default:
    }
    event.preventDefault();
  }
  ngOnDestroy() {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
    this._dropdown.dispose();
  }
  addBs4Polyfills() {
    this.addShowClass();
    this.checkRightAlignment();
    this.addDropupStyles();
  }
  playAnimation() {
    if (this._state.isAnimated && this._inlinedMenu) {
      setTimeout(() => {
        if (this._inlinedMenu) {
          this._factoryDropDownAnimation.create(this._inlinedMenu.rootNodes[0]).play();
        }
      });
    }
  }
  addShowClass() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.addClass(this._inlinedMenu.rootNodes[0], "show");
    }
  }
  removeShowClass() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.removeClass(this._inlinedMenu.rootNodes[0], "show");
    }
  }
  checkRightAlignment() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      const isRightAligned = this._inlinedMenu.rootNodes[0].classList.contains("dropdown-menu-right") || this._inlinedMenu.rootNodes[0].classList.contains("dropdown-menu-end");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "left", isRightAligned ? "auto" : "0");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "right", isRightAligned ? "0" : "auto");
    }
  }
  addDropupStyles() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "top", this.dropup ? "auto" : "100%");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "transform", this.dropup ? "translateY(-101%)" : "translateY(0)");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "bottom", "auto");
    }
  }
  removeDropupStyles() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], "top");
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], "transform");
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], "bottom");
    }
  }
};
_BsDropdownDirective.ɵfac = function BsDropdownDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory), ɵɵdirectiveInject(BsDropdownState), ɵɵdirectiveInject(BsDropdownConfig), ɵɵdirectiveInject(AnimationBuilder));
};
_BsDropdownDirective.ɵdir = ɵɵdefineDirective({
  type: _BsDropdownDirective,
  selectors: [["", "bsDropdown", ""], ["", "dropdown", ""]],
  hostVars: 6,
  hostBindings: function BsDropdownDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown.arrowDown", function BsDropdownDirective_keydown_arrowDown_HostBindingHandler($event) {
        return ctx.navigationClick($event);
      })("keydown.arrowUp", function BsDropdownDirective_keydown_arrowUp_HostBindingHandler($event) {
        return ctx.navigationClick($event);
      });
    }
    if (rf & 2) {
      ɵɵclassProp("dropup", ctx.dropup)("open", ctx.isOpen)("show", ctx.isOpen);
    }
  },
  inputs: {
    placement: "placement",
    triggers: "triggers",
    container: "container",
    dropup: "dropup",
    autoClose: "autoClose",
    isAnimated: "isAnimated",
    insideClick: "insideClick",
    isDisabled: "isDisabled",
    isOpen: "isOpen"
  },
  outputs: {
    isOpenChange: "isOpenChange",
    onShown: "onShown",
    onHidden: "onHidden"
  },
  exportAs: ["bs-dropdown"],
  features: [ɵɵProvidersFeature([BsDropdownState, ComponentLoaderFactory, BsDropdownConfig])]
});
var BsDropdownDirective = _BsDropdownDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDropdown], [dropdown]",
      exportAs: "bs-dropdown",
      providers: [BsDropdownState, ComponentLoaderFactory, BsDropdownConfig],
      standalone: true,
      host: {
        "[class.dropup]": "dropup",
        "[class.open]": "isOpen",
        "[class.show]": "isOpen"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }, {
    type: BsDropdownState
  }, {
    type: BsDropdownConfig
  }, {
    type: AnimationBuilder
  }], {
    placement: [{
      type: Input
    }],
    triggers: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    dropup: [{
      type: Input
    }],
    autoClose: [{
      type: Input
    }],
    isAnimated: [{
      type: Input
    }],
    insideClick: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    isOpen: [{
      type: Input
    }],
    isOpenChange: [{
      type: Output
    }],
    onShown: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }],
    navigationClick: [{
      type: HostListener,
      args: ["keydown.arrowDown", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.arrowUp", ["$event"]]
    }]
  });
})();
var _BsDropdownMenuDirective = class _BsDropdownMenuDirective {
  constructor(_state, _viewContainer, _templateRef) {
    _state.resolveDropdownMenu({
      templateRef: _templateRef,
      viewContainer: _viewContainer
    });
  }
};
_BsDropdownMenuDirective.ɵfac = function BsDropdownMenuDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownMenuDirective)(ɵɵdirectiveInject(BsDropdownState), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(TemplateRef));
};
_BsDropdownMenuDirective.ɵdir = ɵɵdefineDirective({
  type: _BsDropdownMenuDirective,
  selectors: [["", "bsDropdownMenu", ""], ["", "dropdownMenu", ""]],
  exportAs: ["bs-dropdown-menu"]
});
var BsDropdownMenuDirective = _BsDropdownMenuDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownMenuDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDropdownMenu],[dropdownMenu]",
      exportAs: "bs-dropdown-menu",
      standalone: true
    }]
  }], () => [{
    type: BsDropdownState
  }, {
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }], null);
})();
var _BsDropdownToggleDirective = class _BsDropdownToggleDirective {
  constructor(_changeDetectorRef, _dropdown, _element, _renderer, _state) {
    this._changeDetectorRef = _changeDetectorRef;
    this._dropdown = _dropdown;
    this._element = _element;
    this._renderer = _renderer;
    this._state = _state;
    this.isOpen = false;
    this._subscriptions = [];
    this._subscriptions.push(this._state.isOpenChange.subscribe((value) => {
      this.isOpen = value;
      if (value) {
        this._documentClickListener = this._renderer.listen("document", "click", (event) => {
          if (this._state.autoClose && event.button !== 2 && !this._element.nativeElement.contains(event.target) && !(this._state.insideClick && this._dropdown._contains(event))) {
            this._state.toggleClick.emit(false);
            this._changeDetectorRef.detectChanges();
          }
        });
        this._escKeyUpListener = this._renderer.listen(this._element.nativeElement, "keyup.esc", () => {
          if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
            this._changeDetectorRef.detectChanges();
          }
        });
      } else {
        this._documentClickListener && this._documentClickListener();
        this._escKeyUpListener && this._escKeyUpListener();
      }
    }));
    this._subscriptions.push(this._state.isDisabledChange.subscribe((value) => this.isDisabled = value || void 0));
  }
  onClick(event) {
    if (this._state.stopOnClickPropagation) {
      event.stopPropagation();
    }
    if (this.isDisabled) {
      return;
    }
    this._state.toggleClick.emit(true);
  }
  ngOnDestroy() {
    if (this._documentClickListener) {
      this._documentClickListener();
    }
    if (this._escKeyUpListener) {
      this._escKeyUpListener();
    }
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
};
_BsDropdownToggleDirective.ɵfac = function BsDropdownToggleDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownToggleDirective)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(BsDropdownDirective), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(BsDropdownState));
};
_BsDropdownToggleDirective.ɵdir = ɵɵdefineDirective({
  type: _BsDropdownToggleDirective,
  selectors: [["", "bsDropdownToggle", ""], ["", "dropdownToggle", ""]],
  hostVars: 3,
  hostBindings: function BsDropdownToggleDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function BsDropdownToggleDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("aria-haspopup", true)("disabled", ctx.isDisabled)("aria-expanded", ctx.isOpen);
    }
  },
  exportAs: ["bs-dropdown-toggle"]
});
var BsDropdownToggleDirective = _BsDropdownToggleDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDropdownToggle],[dropdownToggle]",
      exportAs: "bs-dropdown-toggle",
      host: {
        "[attr.aria-haspopup]": "true"
      },
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: BsDropdownDirective
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: BsDropdownState
  }], {
    isDisabled: [{
      type: HostBinding,
      args: ["attr.disabled"]
    }],
    isOpen: [{
      type: HostBinding,
      args: ["attr.aria-expanded"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var _BsDropdownModule = class _BsDropdownModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _BsDropdownModule,
      providers: []
    };
  }
};
_BsDropdownModule.ɵfac = function BsDropdownModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownModule)();
};
_BsDropdownModule.ɵmod = ɵɵdefineNgModule({
  type: _BsDropdownModule,
  imports: [BsDropdownDirective, BsDropdownContainerComponent, BsDropdownMenuDirective, BsDropdownToggleDirective],
  exports: [BsDropdownMenuDirective, BsDropdownToggleDirective, BsDropdownDirective]
});
_BsDropdownModule.ɵinj = ɵɵdefineInjector({});
var BsDropdownModule = _BsDropdownModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownModule, [{
    type: NgModule,
    args: [{
      imports: [BsDropdownDirective, BsDropdownContainerComponent, BsDropdownMenuDirective, BsDropdownToggleDirective],
      exports: [BsDropdownMenuDirective, BsDropdownToggleDirective, BsDropdownDirective]
    }]
  }], null, null);
})();
export {
  BsDropdownConfig,
  BsDropdownContainerComponent,
  BsDropdownDirective,
  BsDropdownMenuDirective,
  BsDropdownModule,
  BsDropdownState,
  BsDropdownToggleDirective
};
//# sourceMappingURL=ngx-bootstrap_dropdown.js.map
