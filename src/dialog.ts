import {
  html,
  customElement,
  property,
  LitElement,
  TemplateResult,
  css,
  unsafeCSS,
} from 'lit-element';
import { overlay, overlayBack } from './dialogCore';
import { DialogButton } from './dialogButton';
import 'qing-button';
import { classMap } from 'lit-html/directives/class-map';

// Default localized strings for dialog button types.
let localizedButtonStrings = new Map<string, string>();
localizedButtonStrings.set('ok', 'OK');
localizedButtonStrings.set('yes', 'Yes');
localizedButtonStrings.set('no', 'No');
localizedButtonStrings.set('cancel', 'Cancel');

export const defaultButtonClass = '__default_button';
export const cancelButtonClass = '__cancel_button';
export const buttonContainerClass = '__button-container';

// Contains information on how `isOpenChanged` event is triggered.
export interface IsOpenChangedArgs {
  isOpen?: boolean;
  button?: DialogButton;
}

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

  @property({ type: Boolean, reflect: true }) isOpen = false;
  @property({ type: Array }) buttons: (string | DialogButton)[] = [];
  @property({ type: Number }) defaultButtonIndex = 0;
  @property({ type: Number }) cancelButtonIndex?: number;

  private isOpenChangedArgs?: IsOpenChangedArgs;

  render() {
    return html`
      <qing-dialog-core
        exportparts=${[overlay, overlayBack].join(', ')}
        ?isOpen=${this.isOpen}
        @onEnterKeyPressed=${this.handleEnterKeyPressed}
        @onEscKeyPressed=${this.handleEscKeyPressed}
        @onCoreIsOpenChange=${this.handleCoreIsOpenChange}
      >
        <div class="dialog">
          <slot part="content"></slot>
          <div part="footer">
            ${this.renderButtons()}
          </div>
        </div>
      </qing-dialog-core>
    `;
  }

  private renderButtons(): TemplateResult {
    const { buttons } = this;
    if (!buttons || !buttons.length) {
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
    this.setIsOpen(false, { button: btn });
  }

  private handleEscKeyPressed() {
    if (this.isOpen) {
      this.getCancelButtonElement()?.click();
    }
  }

  private handleEnterKeyPressed() {
    if (this.isOpen) {
      this.getDefaultButtonElement()?.click();
    }
  }

  private setIsOpen(isOpen: boolean, info: IsOpenChangedArgs) {
    this.isOpenChangedArgs = info;
    this.isOpen = isOpen;
  }

  private handleCoreIsOpenChange(e: CustomEvent<boolean>) {
    const detail = Object.assign({}, this.isOpenChangedArgs);
    this.isOpenChangedArgs = undefined;
    const isOpen = e.detail;
    detail.isOpen = isOpen;
    if (isOpen) {
      // Set focus to default button if needed.
      // This must happens before `isOpenChanged` event fires cuz user may update focus
      // on `isOpenChanged` handlers.
      this.getDefaultButtonElement()?.focus();
    }
    const eventArgs = { detail };
    this.dispatchEvent(
      new CustomEvent<IsOpenChangedArgs>('isOpenChanged', eventArgs),
    );
    this.dispatchEvent(
      new CustomEvent<IsOpenChangedArgs>(
        isOpen ? 'shown' : 'closed',
        eventArgs,
      ),
    );
  }

  private getDefaultButtonElement(): HTMLElement | null {
    const defaultButton = this.shadowRoot?.querySelector(
      `.${defaultButtonClass}`,
    );
    return defaultButton instanceof HTMLElement ? defaultButton : null;
  }

  private getCancelButtonElement(): HTMLElement | null {
    const cancelButton = this.shadowRoot?.querySelector(
      `.${cancelButtonClass}`,
    );
    return cancelButton instanceof HTMLElement ? cancelButton : null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qing-dialog': QingDialog;
  }
}
