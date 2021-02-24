/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  html,
  customElement,
  property,
  LitElement,
  TemplateResult,
  css,
  unsafeCSS,
} from 'lit-element';
import 'qing-button';
// eslint-disable-next-line import/no-extraneous-dependencies
import { classMap } from 'lit-html/directives/class-map';
import './dialogCore';
import { overlayClass, overlayBackClass } from './dialogCore';
import { DialogButton } from './dialogButton';

// Default localized strings for dialog button types.
let localizedButtonStrings: Record<string, string> = {};
localizedButtonStrings.ok = 'OK';
localizedButtonStrings.yes = 'Yes';
localizedButtonStrings.no = 'No';
localizedButtonStrings.cancel = 'Cancel';

export const defaultButtonClass = '__default_button';
export const cancelButtonClass = '__cancel_button';
export const buttonContainerClass = '__button-container';

const coreID = 'core';

@customElement('qing-dialog')
export class QingDialog extends LitElement {
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

      .dialog {
        display: flex;
        max-height: 100vh;
        max-width: 100vw;
        flex-direction: column;
        padding: 0.625rem 1.25rem;
      }

      .${unsafeCSS(buttonContainerClass)} {
        display: flex;
        justify-content: center;
      }

      .${unsafeCSS(buttonContainerClass)} qing-button {
        margin: 0 0.33rem;
      }

      .${unsafeCSS(buttonContainerClass)} qing-button::part(button) {
        margin: 0;
      }
    `;
  }

  static get localizedButtonStrings(): Record<string, string> {
    return localizedButtonStrings;
  }

  static set localizedButtonString(value: Record<string, string>) {
    localizedButtonStrings = value;
  }

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) buttons: (string | DialogButton)[] = [];
  @property({ type: Number, reflect: true }) defaultButtonIndex = 0;
  @property({ type: Number, reflect: true }) cancelButtonIndex?: number;

  private closeButton?: DialogButton;

  firstUpdated() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    return html`
      <qing-dialog-core
        id=${coreID}
        exportparts=${[overlayClass, overlayBackClass].join(', ')}
        ?open=${this.open}
        @openChanged=${this.handleOpenChanged}
      >
        <div class="dialog">
          <slot part="content"></slot>
          <div part="footer">${this.renderButtons()}</div>
        </div>
      </qing-dialog-core>
    `;
  }

  close(btn: DialogButton) {
    this.closeButton = btn;
    this.open = false;
  }

  private renderButtons(): TemplateResult {
    const { buttons } = this;
    if (!buttons.length) {
      return html``;
    }
    return html`
      <div class=${buttonContainerClass} part="footer-buttons">
        ${buttons.map((btnSrc, idx) => {
          const btn = typeof btnSrc === 'string' ? { type: btnSrc } : btnSrc;
          if (btn.type) {
            btn.text = QingDialog.localizedButtonStrings[btn.type];
          }
          return html`
            <qing-button
              exportparts="button: footer-button"
              class=${classMap({
                [btn.style || '_']: !!btn.style,
                [defaultButtonClass]: idx === this.defaultButtonIndex,
                [cancelButtonClass]: idx === this.cancelButtonIndex,
              })}
              @click=${() => this.handleButtonClick(btn)}
              >${btn.text}</qing-button
            >
          `;
        })}
      </div>
    `;
  }

  private handleButtonClick(btn: DialogButton) {
    this.dispatchEvent(
      new CustomEvent<DialogButton>('buttonClick', {
        detail: btn,
      }),
    );
    this.close(btn);
  }

  private handleOpenChanged(e: CustomEvent<boolean>) {
    this.open = e.detail;
    if (this.open) {
      this.getDefaultButtonElement()?.focus();
      this.dispatchEvent(new CustomEvent('requestFocus'));
      this.dispatchEvent(new CustomEvent('shown'));
    } else {
      this.dispatchEvent(
        new CustomEvent<DialogButton>('closed', { composed: true, detail: this.closeButton }),
      );
      this.closeButton = undefined;
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.open) {
      return;
    }
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.getCancelButtonElement()?.click();
    }
    if (e.key === 'Enter') {
      this.getDefaultButtonElement()?.click();
    }
  }

  private getDefaultButtonElement(): HTMLElement | null {
    const defaultButton = this.shadowRoot?.querySelector(`.${defaultButtonClass}`);
    return defaultButton instanceof HTMLElement ? defaultButton : null;
  }

  private getCancelButtonElement(): HTMLElement | null {
    const cancelButton = this.shadowRoot?.querySelector(`.${cancelButtonClass}`);
    return cancelButton instanceof HTMLElement ? cancelButton : null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qing-dialog': QingDialog;
  }
  interface GlobalEventHandlersEventMap {
    shown: CustomEvent;
    closed: CustomEvent;
    requestFocus: CustomEvent;
  }
}
