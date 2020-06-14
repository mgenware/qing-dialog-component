import { html, customElement, css, property, LitElement } from 'lit-element';

export const overlay = 'overlay';
export const overlayBack = 'overlay-background';
export const overlayHeader = 'overlay-header';
export const overlayContent = 'overlay-content';
export const overlayFooter = 'overlay-footer';

@customElement('qing-dialog-core')
export class QingDialogCore extends LitElement {
  static get styles() {
    return css`
      .overlay-background {
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        align-items: center;
        justify-content: center;
      }

      .overlay {
        display: flex;
        max-height: 100vh;
        max-width: 100vw;
        flex-direction: column;
        color: black;
        background-color: white;
        padding: 0.625rem 1.25rem;
        flex-basis: 100%;
      }

      .overlay-header {
        margin: 0;
      }

      .overlay-content {
        display: flex;
        flex-flow: column;
        overflow: auto;
        margin: 0;
      }

      .overlay-footer {
        margin: 0;
      }

      /**  */
      @media (min-width: 768px) {
        .overlay {
          flex-basis: 80%;
        }
      }
    `;
  }

  @property({ type: Boolean, reflect: true }) isOpen = false;
  @property({ type: Boolean, reflect: true }) closeOnEsc = false;
  @property({ type: Boolean, reflect: true }) closeOnEnter = false;

  firstUpdated() {
    if (!this.shadowRoot) {
      throw new Error('Unexpected undefined shadowRoot');
    }
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  render() {
    return html`
      <div
        style="display: ${this.isOpen ? 'flex' : 'none'}"
        class=${overlayBack}
        part=${overlayBack}
      >
        <div class=${overlay} part=${overlay}>
          <div class=${overlayHeader} part=${overlayHeader}>
            <slot name="header"></slot>
          </div>
          <div class=${overlayContent} part=${overlayContent}>
            <slot name="content"></slot>
          </div>
          <div class=${overlayFooter} part=${overlayFooter}>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('isOpen')) {
      // Important! `!!changedProperties.get('isOpen')` converts undefined to false, to avoid
      // unnecessary event during initialization.
      if (!!changedProperties.get('isOpen') !== this.isOpen) {
        // Make sure call to `updated` is finished first.
        setTimeout(() => this.onCoreIsOpenChange(), 0);
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.onEscKeyPressed();
      if (this.closeOnEsc) {
        this.isOpen = false;
      }
    }
    if (e.key === 'Enter') {
      this.onEnterKeyPressed();
      if (this.closeOnEnter) {
        this.isOpen = false;
      }
    }
  }

  private onCoreIsOpenChange() {
    this.dispatchEvent(
      new CustomEvent<boolean>('onCoreIsOpenChange', {
        detail: this.isOpen,
      }),
    );
  }

  private onEnterKeyPressed() {
    this.dispatchEvent(
      new CustomEvent<boolean>('onEnterKeyPressed', {
        detail: this.isOpen,
      }),
    );
  }

  private onEscKeyPressed() {
    this.dispatchEvent(
      new CustomEvent<boolean>('onEscKeyPressed', {
        detail: this.isOpen,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qing-dialog-core': QingDialogCore;
  }
}
