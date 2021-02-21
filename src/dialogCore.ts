import { html, customElement, css, property, LitElement } from 'lit-element';

export const overlayClass = 'overlay';
export const overlayBackClass = 'overlay-background';

const openProp = 'open';

export enum QingDialogCloseReason {
  key = 1,
  button,
}

@customElement('qing-dialog-core')
export class QingDialogCore extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

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
        max-height: 100vh;
        max-width: 100vw;
        color: black;
        background-color: white;
        padding: 0;
      }

      @media (min-width: 768px) {
        .overlay {
          width: 80%;
        }
      }
    `;
  }

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) closeOnEsc = false;
  @property({ type: Boolean, reflect: true }) closeOnEnter = false;

  closeReason?: QingDialogCloseReason;
  closeReasonData?: unknown;

  firstUpdated() {
    if (!this.shadowRoot) {
      throw new Error('Unexpected undefined shadowRoot');
    }
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  render() {
    return html`
      <div
        style="display: ${this.open ? 'flex' : 'none'}"
        class=${overlayBackClass}
        part=${overlayBackClass}
      >
        <div class=${overlayClass} part=${overlayClass}>
          <slot></slot>
        </div>
      </div>
    `;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has(openProp)) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!!changedProperties.get(openProp) !== this.open) {
        // Make sure call to `updated` is finished first.
        setTimeout(() => this.handleOpenChanged(), 0);
      }
    }
  }

  close(closeReason?: QingDialogCloseReason, closeReasonData?: unknown) {
    this.closeReason = closeReason;
    this.closeReasonData = closeReasonData;
    this.open = false;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.escKeyPressed();
      if (this.closeOnEsc) {
        this.close(QingDialogCloseReason.key, 'Esc');
      }
    }
    if (e.key === 'Enter') {
      this.enterKeyPressed();
      if (this.closeOnEnter) {
        this.close(QingDialogCloseReason.key, 'Enter');
      }
    }
  }

  private handleOpenChanged() {
    if (this.open) {
      this.dispatchEvent(new CustomEvent('shown', { composed: true }));
      this.closeReason = undefined;
      this.closeReasonData = undefined;
    } else {
      this.dispatchEvent(new CustomEvent('closed', { composed: true }));
    }
  }

  private enterKeyPressed() {
    this.dispatchEvent(
      new CustomEvent<boolean>('enterKeyPressed', {
        detail: this.open,
      }),
    );
  }

  private escKeyPressed() {
    this.dispatchEvent(
      new CustomEvent<boolean>('escKeyPressed', {
        detail: this.open,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qing-dialog-core': QingDialogCore;
  }
  interface GlobalEventHandlersEventMap {
    shown: CustomEvent;
    closed: CustomEvent;
    enterKeyPressed: CustomEvent;
    escKeyPressed: CustomEvent;
  }
}
