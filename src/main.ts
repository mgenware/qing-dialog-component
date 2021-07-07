import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';

export const overlayClass = 'overlay';
export const overlayBackClass = 'overlay-background';

const openProp = 'open';

@customElement('qing-overlay')
export class QingOverlay extends LitElement {
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
        z-index: var(--overlay-z-index, 1000);
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        align-items: center;
        justify-content: center;
      }

      .overlay {
        max-height: 100vh;
        max-width: 100vw;
        width: 100vw;
        color: black;
        background-color: white;
        display: flex;
        flex-direction: column;
      }
    `;
  }

  @property({ type: Boolean, reflect: true }) open = false;

  firstUpdated() {
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
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
        setTimeout(() => this.onOpenChanged(), 0);
      }
    }
  }

  private onOpenChanged() {
    this.dispatchEvent(new CustomEvent<boolean>('openChanged', { detail: this.open }));
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (!this.open) {
      return;
    }
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.dispatchEvent(new CustomEvent('escKeyDown'));
    } else if (e.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('enterKeyDown'));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qing-overlay': QingOverlay;
  }
}
