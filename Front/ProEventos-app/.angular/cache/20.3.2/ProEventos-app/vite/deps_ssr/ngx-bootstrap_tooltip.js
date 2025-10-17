import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  ComponentLoaderFactory,
  OnChange,
  PlacementForBs5,
  PositioningService,
  getBsVer,
  parseTriggers,
  warnOnce
} from "./chunk-IK46U3PZ.js";
import {
  CommonModule
} from "./chunk-SMQMOI4Q.js";
import "./chunk-YJB63RH5.js";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  Renderer2,
  ViewContainerRef,
  require_cjs,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-QLWI7Y6T.js";
import {
  __toESM
} from "./chunk-6DU2HRTW.js";

// ../../../node_modules/tslib/tslib.es6.mjs
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

// ../../../node_modules/ngx-bootstrap/tooltip/fesm2022/ngx-bootstrap-tooltip.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var _c0 = ["*"];
var _TooltipConfig = class _TooltipConfig {
  constructor() {
    this.adaptivePosition = true;
    this.placement = "top";
    this.triggers = "hover focus";
    this.delay = 0;
  }
};
_TooltipConfig.ɵfac = function TooltipConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipConfig)();
};
_TooltipConfig.ɵprov = ɵɵdefineInjectable({
  token: _TooltipConfig,
  factory: _TooltipConfig.ɵfac,
  providedIn: "root"
});
var TooltipConfig = _TooltipConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _TooltipContainerComponent = class _TooltipContainerComponent {
  get _bsVersions() {
    return getBsVer();
  }
  constructor(config) {
    Object.assign(this, config);
  }
  ngAfterViewInit() {
    this.classMap = {
      in: false,
      fade: false
    };
    if (this.placement) {
      if (this._bsVersions.isBs5) {
        this.placement = PlacementForBs5[this.placement];
      }
      this.classMap[this.placement] = true;
    }
    this.classMap[`tooltip-${this.placement}`] = true;
    this.classMap["in"] = true;
    if (this.animation) {
      this.classMap["fade"] = true;
    }
    if (this.containerClass) {
      this.classMap[this.containerClass] = true;
    }
  }
};
_TooltipContainerComponent.ɵfac = function TooltipContainerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipContainerComponent)(ɵɵdirectiveInject(TooltipConfig));
};
_TooltipContainerComponent.ɵcmp = ɵɵdefineComponent({
  type: _TooltipContainerComponent,
  selectors: [["bs-tooltip-container"]],
  hostAttrs: ["role", "tooltip"],
  hostVars: 3,
  hostBindings: function TooltipContainerComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("id", ctx.id);
      ɵɵclassMap("show tooltip in tooltip-" + ctx.placement + " bs-tooltip-" + ctx.placement + " " + ctx.placement + " " + ctx.containerClass);
    }
  },
  ngContentSelectors: _c0,
  decls: 3,
  vars: 0,
  consts: [[1, "tooltip-arrow", "arrow"], [1, "tooltip-inner"]],
  template: function TooltipContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵdomElement(0, "div", 0);
      ɵɵdomElementStart(1, "div", 1);
      ɵɵprojection(2);
      ɵɵdomElementEnd();
    }
  },
  styles: [".tooltip[_nghost-%COMP%]{display:block;pointer-events:none;position:absolute}.tooltip[_nghost-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{position:absolute}"],
  changeDetection: 0
});
var TooltipContainerComponent = _TooltipContainerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-tooltip-container",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class]": '"show tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
        "[attr.id]": "this.id",
        role: "tooltip"
      },
      template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `,
      standalone: true,
      styles: [":host.tooltip{display:block;pointer-events:none;position:absolute}:host.tooltip .tooltip-arrow{position:absolute}\n"]
    }]
  }], () => [{
    type: TooltipConfig
  }], null);
})();
var id = 0;
var _TooltipDirective = class _TooltipDirective {
  /**
   * Returns whether or not the tooltip is currently being shown
   */
  get isOpen() {
    return this._tooltip.isShown;
  }
  set isOpen(value) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }
  /** @deprecated - please use `tooltip` instead */
  set htmlContent(value) {
    warnOnce("tooltipHtml was deprecated, please use `tooltip` instead");
    this.tooltip = value;
  }
  /** @deprecated - please use `placement` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _placement(value) {
    warnOnce("tooltipPlacement was deprecated, please use `placement` instead");
    this.placement = value;
  }
  /** @deprecated - please use `isOpen` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _isOpen(value) {
    warnOnce("tooltipIsOpen was deprecated, please use `isOpen` instead");
    this.isOpen = value;
  }
  get _isOpen() {
    warnOnce("tooltipIsOpen was deprecated, please use `isOpen` instead");
    return this.isOpen;
  }
  /** @deprecated - please use `isDisabled` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _enable(value) {
    warnOnce("tooltipEnable was deprecated, please use `isDisabled` instead");
    this.isDisabled = !value;
  }
  get _enable() {
    warnOnce("tooltipEnable was deprecated, please use `isDisabled` instead");
    return this.isDisabled;
  }
  /** @deprecated - please use `container="body"` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _appendToBody(value) {
    warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
    this.container = value ? "body" : this.container;
  }
  get _appendToBody() {
    warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
    return this.container === "body";
  }
  /** @deprecated - will replaced with customClass */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _popupClass(value) {
    warnOnce("tooltipClass deprecated");
  }
  /** @deprecated - removed */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _tooltipContext(value) {
    warnOnce("tooltipContext deprecated");
  }
  /** @deprecated */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _tooltipPopupDelay(value) {
    warnOnce("tooltipPopupDelay is deprecated, use `delay` instead");
    this.delay = value;
  }
  /** @deprecated -  please use `triggers` instead */
  get _tooltipTrigger() {
    warnOnce("tooltipTrigger was deprecated, please use `triggers` instead");
    return this.triggers;
  }
  set _tooltipTrigger(value) {
    warnOnce("tooltipTrigger was deprecated, please use `triggers` instead");
    this.triggers = (value || "").toString();
  }
  constructor(_viewContainerRef, cis, config, _elementRef, _renderer, _positionService) {
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._positionService = _positionService;
    this.tooltipId = id++;
    this.adaptivePosition = true;
    this.tooltipChange = new EventEmitter();
    this.placement = "top";
    this.triggers = "hover focus";
    this.containerClass = "";
    this.isDisabled = false;
    this.delay = 0;
    this.tooltipAnimation = true;
    this.tooltipFadeDuration = 150;
    this.tooltipStateChanged = new EventEmitter();
    this._tooltip = cis.createLoader(this._elementRef, _viewContainerRef, this._renderer).provide({
      provide: TooltipConfig,
      useValue: config
    });
    Object.assign(this, config);
    this.onShown = this._tooltip.onShown;
    this.onHidden = this._tooltip.onHidden;
  }
  ngOnInit() {
    this._tooltip.listen({
      triggers: this.triggers,
      show: () => this.show()
    });
    this.tooltipChange.subscribe((value) => {
      if (!value) {
        this._tooltip.hide();
      }
    });
    this.onShown.subscribe(() => {
      this.setAriaDescribedBy();
    });
    this.onHidden.subscribe(() => {
      this.setAriaDescribedBy();
    });
  }
  setAriaDescribedBy() {
    this._ariaDescribedby = this.isOpen ? `tooltip-${this.tooltipId}` : void 0;
    if (this._ariaDescribedby) {
      this._renderer.setAttribute(this._elementRef.nativeElement, "aria-describedby", this._ariaDescribedby);
    } else {
      this._renderer.removeAttribute(this._elementRef.nativeElement, "aria-describedby");
    }
  }
  /**
   * Toggles an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  toggle() {
    if (this.isOpen) {
      return this.hide();
    }
    this.show();
  }
  /**
   * Opens an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  show() {
    this._positionService.setOptions({
      modifiers: {
        flip: {
          enabled: this.adaptivePosition
        },
        preventOverflow: {
          enabled: this.adaptivePosition,
          boundariesElement: this.boundariesElement || "scrollParent"
        }
      }
    });
    if (this.isOpen || this.isDisabled || this._delayTimeoutId || !this.tooltip) {
      return;
    }
    const showTooltip = () => {
      if (this._delayTimeoutId) {
        this._delayTimeoutId = void 0;
      }
      this._tooltip.attach(TooltipContainerComponent).to(this.container).position({
        attachment: this.placement
      }).show({
        content: this.tooltip,
        placement: this.placement,
        containerClass: this.containerClass,
        id: `tooltip-${this.tooltipId}`
      });
    };
    const cancelDelayedTooltipShowing = () => {
      if (this._tooltipCancelShowFn) {
        this._tooltipCancelShowFn();
      }
    };
    if (this.delay) {
      if (this._delaySubscription) {
        this._delaySubscription.unsubscribe();
      }
      this._delaySubscription = (0, import_rxjs.timer)(this.delay).subscribe(() => {
        showTooltip();
        cancelDelayedTooltipShowing();
      });
      if (this.triggers) {
        parseTriggers(this.triggers).forEach((trigger) => {
          if (!trigger.close) {
            return;
          }
          this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, trigger.close, () => {
            this._delaySubscription?.unsubscribe();
            cancelDelayedTooltipShowing();
          });
        });
      }
    } else {
      showTooltip();
    }
  }
  /**
   * Closes an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  hide() {
    if (this._delayTimeoutId) {
      clearTimeout(this._delayTimeoutId);
      this._delayTimeoutId = void 0;
    }
    if (!this._tooltip.isShown) {
      return;
    }
    if (this._tooltip.instance?.classMap) {
      this._tooltip.instance.classMap["in"] = false;
    }
    setTimeout(() => {
      this._tooltip.hide();
    }, this.tooltipFadeDuration);
  }
  ngOnDestroy() {
    this._tooltip.dispose();
    this.tooltipChange.unsubscribe();
    if (this._delaySubscription) {
      this._delaySubscription.unsubscribe();
    }
    this.onShown.unsubscribe();
    this.onHidden.unsubscribe();
  }
};
_TooltipDirective.ɵfac = function TooltipDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory), ɵɵdirectiveInject(TooltipConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(PositioningService));
};
_TooltipDirective.ɵdir = ɵɵdefineDirective({
  type: _TooltipDirective,
  selectors: [["", "tooltip", ""], ["", "tooltipHtml", ""]],
  inputs: {
    adaptivePosition: "adaptivePosition",
    tooltip: "tooltip",
    placement: "placement",
    triggers: "triggers",
    container: "container",
    containerClass: "containerClass",
    boundariesElement: "boundariesElement",
    isOpen: "isOpen",
    isDisabled: "isDisabled",
    delay: "delay",
    htmlContent: [0, "tooltipHtml", "htmlContent"],
    _placement: [0, "tooltipPlacement", "_placement"],
    _isOpen: [0, "tooltipIsOpen", "_isOpen"],
    _enable: [0, "tooltipEnable", "_enable"],
    _appendToBody: [0, "tooltipAppendToBody", "_appendToBody"],
    tooltipAnimation: "tooltipAnimation",
    _popupClass: [0, "tooltipClass", "_popupClass"],
    _tooltipContext: [0, "tooltipContext", "_tooltipContext"],
    _tooltipPopupDelay: [0, "tooltipPopupDelay", "_tooltipPopupDelay"],
    tooltipFadeDuration: "tooltipFadeDuration",
    _tooltipTrigger: [0, "tooltipTrigger", "_tooltipTrigger"]
  },
  outputs: {
    tooltipChange: "tooltipChange",
    onShown: "onShown",
    onHidden: "onHidden",
    tooltipStateChanged: "tooltipStateChanged"
  },
  exportAs: ["bs-tooltip"],
  features: [ɵɵProvidersFeature([ComponentLoaderFactory, PositioningService])]
});
var TooltipDirective = _TooltipDirective;
__decorate([OnChange(), __metadata("design:type", Object)], TooltipDirective.prototype, "tooltip", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[tooltip], [tooltipHtml]",
      exportAs: "bs-tooltip",
      standalone: true,
      providers: [ComponentLoaderFactory, PositioningService]
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }, {
    type: TooltipConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: PositioningService
  }], {
    adaptivePosition: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    tooltipChange: [{
      type: Output
    }],
    placement: [{
      type: Input
    }],
    triggers: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    containerClass: [{
      type: Input
    }],
    boundariesElement: [{
      type: Input
    }],
    isOpen: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    onShown: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }],
    htmlContent: [{
      type: Input,
      args: ["tooltipHtml"]
    }],
    _placement: [{
      type: Input,
      args: ["tooltipPlacement"]
    }],
    _isOpen: [{
      type: Input,
      args: ["tooltipIsOpen"]
    }],
    _enable: [{
      type: Input,
      args: ["tooltipEnable"]
    }],
    _appendToBody: [{
      type: Input,
      args: ["tooltipAppendToBody"]
    }],
    tooltipAnimation: [{
      type: Input
    }],
    _popupClass: [{
      type: Input,
      args: ["tooltipClass"]
    }],
    _tooltipContext: [{
      type: Input,
      args: ["tooltipContext"]
    }],
    _tooltipPopupDelay: [{
      type: Input,
      args: ["tooltipPopupDelay"]
    }],
    tooltipFadeDuration: [{
      type: Input
    }],
    _tooltipTrigger: [{
      type: Input,
      args: ["tooltipTrigger"]
    }],
    tooltipStateChanged: [{
      type: Output
    }]
  });
})();
var _TooltipModule = class _TooltipModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _TooltipModule,
      providers: []
    };
  }
};
_TooltipModule.ɵfac = function TooltipModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipModule)();
};
_TooltipModule.ɵmod = ɵɵdefineNgModule({
  type: _TooltipModule,
  imports: [CommonModule, TooltipDirective, TooltipContainerComponent],
  exports: [TooltipDirective]
});
_TooltipModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
var TooltipModule = _TooltipModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, TooltipDirective, TooltipContainerComponent],
      exports: [TooltipDirective]
    }]
  }], null, null);
})();
export {
  TooltipConfig,
  TooltipContainerComponent,
  TooltipDirective,
  TooltipModule
};
//# sourceMappingURL=ngx-bootstrap_tooltip.js.map
