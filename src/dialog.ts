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
import {
  overlayClass,
  overlayBackClass,
  QingDialogCore,
  QingDialogCloseReason,
} from './dialogCore';
import { DialogButton } from './dialogButton';

// Default localized strings for dialog button types.
let localizedButtonStrings = new Map<string, string>();
localizedButtonStrings.set('ok', 'OK');
localizedButtonStrings.set('yes', 'Yes');
localizedButtonStrings.set('no', 'No');
localizedButtonStrings.set('cancel', 'Cancel');

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

  static get localizedButtonStrings(): Map<string, string> {
    return localizedButtonStrings;
  }

  static set localizedButtonString(value: Map<string, string>) {
    localizedButtonStrings = value;
  }

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) buttons: (string | DialogButton)[] = [];
  @property({ type: Number }) defaultButtonIndex = 0;
  @property({ type: Number }) cancelButtonIndex?: number;

  #coreElement!: QingDialogCore;

  firstUpdated() {
    this.#coreElement = this.shadowRoot!.getElementById(coreID) as QingDialogCore;
  }

  get closeReason(): QingDialogCloseReason | undefined {
    return this.#coreElement.closeReason;
  }

  get closeReasonData(): unknown {
    return this.#coreElement.closeReasonData;
  }

  render() {
    return html`
      <qing-dialog-core
        id=${coreID}
        exportparts=${[overlayClass, overlayBackClass].join(', ')}
        ?open=${this.open}
        @enterKeyPressed=${this.handleEnterKeyPressed}
        @escKeyPressed=${this.handleEscKeyPressed}
        @shown=${this.handleShown}
        @closed=${this.handleClosed}
      >
        <div class="dialog">
          <slot part="content"></slot>
          <div part="footer">${this.renderButtons()}</div>
        </div>
      </qing-dialog-core>
    `;
  }

  close(closeReason?: QingDialogCloseReason, closeReasonData?: unknown) {
    this.#coreElement.close(closeReason, closeReasonData);
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
            btn.text = QingDialog.localizedButtonStrings.get(btn.type);
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
    this.close(QingDialogCloseReason.button, btn);
  }

  private handleEscKeyPressed() {
    if (this.open) {
      this.getCancelButtonElement()?.click();
    }
  }

  private handleEnterKeyPressed() {
    if (this.open) {
      this.getDefaultButtonElement()?.click();
    }
  }

  private handleShown() {
    this.open = true;
    this.getDefaultButtonElement()?.focus();
    this.dispatchEvent(new CustomEvent('requestFocus'));
  }

  private handleClosed() {
    this.open = false;
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
