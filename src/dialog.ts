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
import { overlay, overlayBack } from './dialogCore';
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

// Contains information on how `openChanged` event is triggered.
export interface OpenChangedArgs {
  open?: boolean;
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

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) buttons: (string | DialogButton)[] = [];
  @property({ type: Number }) defaultButtonIndex = 0;
  @property({ type: Number }) cancelButtonIndex?: number;

  private OpenChangedArgs?: OpenChangedArgs;

  render() {
    return html`
      <qing-dialog-core
        exportparts=${[overlay, overlayBack].join(', ')}
        ?open=${this.open}
        @onEnterKeyPressed=${this.handleEnterKeyPressed}
        @onEscKeyPressed=${this.handleEscKeyPressed}
        @onCoreopenChange=${this.handleCoreopenChange}
      >
        <div class="dialog">
          <slot part="content"></slot>
          <div part="footer">${this.renderButtons()}</div>
        </div>
      </qing-dialog-core>
    `;
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
    this.setopen(false, { button: btn });
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

  private setopen(open: boolean, info: OpenChangedArgs) {
    this.OpenChangedArgs = info;
    this.open = open;
  }

  private handleCoreopenChange(e: CustomEvent<boolean>) {
    const detail = { ...this.OpenChangedArgs };
    this.OpenChangedArgs = undefined;
    const open = e.detail;
    detail.open = open;
    if (open) {
      // Set focus to default button if needed.
      // This must happens before `openChanged` event fires cuz user may update focus
      // on `openChanged` handlers.
      this.getDefaultButtonElement()?.focus();
    }
    const eventArgs = { detail };
    this.dispatchEvent(new CustomEvent<OpenChangedArgs>('openChanged', eventArgs));
    this.dispatchEvent(new CustomEvent<OpenChangedArgs>(open ? 'shown' : 'closed', eventArgs));
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
    openChanged: CustomEvent<OpenChangedArgs>;
  }
}
