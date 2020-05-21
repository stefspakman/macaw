import { Component, h, Element, State, Prop, Watch, Event, EventEmitter, Method } from "@stencil/core";
import { ResizeObserver } from 'resize-observer';

@Component({
  tag: 'twc-header',
  styleUrl: './toucan-header.scss',
  shadow: true,
})
export class ToucanHeader {
  @Element() el: HTMLElement;
  @State() header: HTMLElement;
  @State() headerHeight: number = 0;
  @State() headerOffsetHeight: string = '0px';
  @State() lastScrollPosition: number = 0;
  @State() headerTopHeight: number = 0;
  @State() scrollDown: boolean = true;
  @State() headerTopVisible: boolean = true;
  @Prop({
    reflectToAttr: true,
    mutable: true,
  }) sticky: boolean = false;
  @Prop({
    reflectToAttr: true,
    mutable: true,
  }) visible: boolean = true;
  @Prop({
    mutable: true,
  }) visibility: 'always' | 'to-top' | 'hidden' = 'always';
  @Prop({
    mutable: true,
  }) transitionStyle: 'slide' | 'fade' = 'slide';
  @Event({
    bubbles: true,
    composed: true,
  }) twcHeaderInit: EventEmitter<object>;
  @Event({
    bubbles: true,
    composed: true,
  }) twcHeaderHeight: EventEmitter<object>;
  @Event({
    bubbles: true,
    composed: true,
  }) twcHeaderSticky: EventEmitter<object>;
  @Event({
    bubbles: true,
    composed: true,
  }) twcHeaderVisible: EventEmitter<object>;

  @Watch('headerHeight')
  headerHeightChanged(newValue: string, oldValue: string) {
    if (newValue === oldValue) {
      return;
    }
    this.twcHeaderHeight.emit(this.getSettings());
    this.headerOffsetHeight = `${this.headerHeight}px`
  }

  @Watch('sticky')
  stickyChanged(newValue: string, oldValue: string) {
    if (newValue === oldValue) {
      return;
    }
    this.twcHeaderSticky.emit(this.getSettings());
    this.setHeaderVisibility();
  }

  @Watch('scrollDown')
  scrollDirectionChanged(newValue: string, oldValue: string) {
    if (newValue === oldValue) {
      return;
    }
    this.twcHeaderVisible.emit(this.getSettings());
    this.setHeaderVisibility();
  }

  @Watch('visible')
  visibleChanged(newValue: string, oldValue: string) {
    if (newValue === oldValue) {
      return;
    }
    if (!this.visible && this.visibility !== 'always') {
      this.header.classList.add('hide');
      return;
    }
    this.header.classList.remove('hide');
  }

  @Watch('visibility')
  visibilityChanged(newValue: string, oldValue: string) {
    if (newValue === oldValue) {
      return;
    }
    this.scrollDown = false;
    this.setHeaderVisibility();
  }

  /**
   * Change the settings of the Toucan Header Component, returns the current settings.
   * @param {object} settings
   * @returns {promise}
   */
  @Method()
  async setSettings(settings) {
    if (settings.visibility) {
      this.visibility = settings.visibility; 
    }
    if (settings.transitionStyle) {
      this.transitionStyle = settings.transitionStyle;
    }
    return this.getSettings();
  }

  /**
   * Returns the current settings.
   * @returns {promise}
   */
  @Method()
  async getSettings() {
    return {
      height: this.headerHeight,
      sticky: this.sticky,
      visible: this.visible,
    };
  }

  setHeaderVisibility() {
    this.visible = !((this.sticky && this.scrollDown) || (this.sticky && this.visibility === 'hidden'));
  }

  componentDidLoad() {
    this.sticky = false;
    this.header = this.el.shadowRoot.querySelector('#twcHeader');
    this.headerHeight = this.header.clientHeight;
    const headerTop = this.el.shadowRoot.querySelector('#twcHeaderTop');
    this.headerTopHeight = headerTop ? headerTop.clientHeight : 0;
    const resizeObserver = new ResizeObserver((entries) => {
      this.headerHeight = entries[0].target.clientHeight;
    });
    resizeObserver.observe(this.header);
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.twcHeaderInit.emit(this.el);
  }

  componentDidUnload() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const scrollPosition = window.pageYOffset;
    this.scrollDown = scrollPosition > this.lastScrollPosition;
    this.setHeaderState(scrollPosition);
    this.lastScrollPosition = scrollPosition;
  }

  setHeaderState(scrollPosition) {
    if (this.visibility === 'always' && scrollPosition > this.headerTopHeight) {
      this.sticky = true;
      return;
    }
    if (scrollPosition > (this.headerHeight + this.headerTopHeight)) {
      this.sticky = true;
      return;
    }
    if (scrollPosition <= this.headerTopHeight) {
      this.sticky = false;
    }
  }

  render() {
    return [
      <header class="twc-header">
        <div
            id="twcHeaderTop"
          >
          <slot name="top"></slot>
        </div>
        <div
          id="twcHeaderSpacer"
          class="header-wrapper"
          style={{ height: this.headerOffsetHeight }}
        >
          <div
            id="twcHeader"
            class={`
              header
              header--${this.transitionStyle}
              header--visibility-${this.visibility}
            `}
          >
            <slot></slot>
          </div>
        </div>
      </header>
    ]
  }
}
