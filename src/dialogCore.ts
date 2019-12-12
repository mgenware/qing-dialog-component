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
        padding: 10px 20px;
        flex-basis: var(--dialog-max-width);
      }

      .overlay-header {
        display: flex;
      }

      .overlay-content {
        display: flex;
        flex-flow: column;
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
      }

      .overlay-footer {
        display: flex;
        padding-top: 20px;
      }
    `;
  }

  @property({ type: Boolean, reflect: true }) isOpen = false;

  firstUpdated() {
    if (!this.shadowRoot) {
      throw new Error('Unexpected undefined shadowRoot');
    }
    document.addEventListener('keyup', e => this.handleKeyUp(e));
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
        this.onIsOpenChange();
      }
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.isOpen = false;
    }
  }

  private onIsOpenChange() {
    this.dispatchEvent(
      new CustomEvent<boolean>('onIsOpenChange', {
        bubbles: true,
        composed: true,
        detail: this.isOpen,
      }),
    );
  }
}
