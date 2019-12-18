import { html, customElement, css, property, LitElement } from 'lit-element';

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
        flex-direction: column;

        background-color: white;
        padding: var(--dialog-padding, 10px 20px);
        flex-basis: var(--dialog-max-width, 100%);
      }

      .overlay-header {
        padding: var(--dialog-header-padding);
      }

      .overlay-content {
        display: flex;
        flex-flow: column;
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        padding: var(--dialog-content-padding, 0 0 1rem 0);
      }

      .overlay-footer {
        padding: var(--dialog-footer-padding);
      }

      /**  */
      @media (min-width: 768px) {
        .overlay {
          flex-basis: var(--dialog-max-width, 80%);
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
    document.addEventListener('keydown', e => this.handleKeyDown(e));
  }

  render() {
    return html`
      <div
        style="display: ${this.isOpen ? 'flex' : 'none'}"
        class="overlay-background"
      >
        <div class="overlay" id="overlay">
          <div class="overlay-header">
            <slot name="header"></slot>
          </div>
          <div class="overlay-content">
            <slot name="content"></slot>
          </div>
          <div class="overlay-footer">
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
