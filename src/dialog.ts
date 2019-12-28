import {
  html,
  customElement,
  css,
  property,
  LitElement,
  TemplateResult,
} from 'lit-element';
import './dialogCore';
import { DialogButton, PresetButtonType } from './dialogButton';
import 'lit-button';
import { classMap } from 'lit-html/directives/class-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { DialogIconType, iconTypeToData } from './dialogIcon';

export type DialogButtonType = DialogButton | PresetButtonType;

// Default localized strings for dialog button types.
let localizedButtonStrings = new Map<PresetButtonType, string>();
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
      qing-dialog-core {
        --dialog-max-width: 500px;
      }

      .button-container {
        display: var(--dialog-buttons-display, flex);
        justify-content: var(--dialog-buttons-justify-content, center);
      }

      .icon {
        margin: (--dialog-icon-margin, 0 0 0.8rem 0);
      }
    `;
  }

  static get localizedButtonStrings(): Map<PresetButtonType, string> {
    return localizedButtonStrings;
  }

  static set localizedButtonString(value: Map<PresetButtonType, string>) {
    localizedButtonStrings = value;
  }

  @property() dialogTitle = '';
  @property({ type: Boolean, reflect: true }) isOpen = false;
  @property({ type: Array }) buttons: DialogButtonType[] = [];
  @property() icon?: DialogIconType;
  @property({ type: Number }) defaultButtonIndex = 0;
  @property({ type: Number }) cancelButtonIndex?: number;

  private IsOpenChangedArgs?: IsOpenChangedArgs;

  render() {
    return html`
      <qing-dialog-core
        ?isOpen=${this.isOpen}
        @onEscKeyPressed=${this.handleEscKeyPressed}
        @onCoreIsOpenChange=${this.handleCoreIsOpenChange}
      >
        <h2 slot="header">${this.renderIcon()}${this.dialogTitle}</h2>
        <slot slot="content"></slot>
        <div slot="footer">
          ${this.renderButtons()}
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
      <div class=${buttonContainerClass}>
        ${buttons.map((btnSrc, idx) => {
          const btn = typeof btnSrc === 'string' ? { type: btnSrc } : btnSrc;
          if (btn.type) {
            btn.text = QingDialog.localizedButtonStrings.get(btn.type);
          }
          return html`
            <lit-button
              class=${classMap({
                [btn.style || '_']: !!btn.style,
                [defaultButtonClass]: idx === this.defaultButtonIndex,
                [cancelButtonClass]: idx === this.cancelButtonIndex,
              })}
              @click=${() => this.handleButtonClick(btn)}
              >${btn.text}</lit-button
            >
          `;
        })}
      </div>
    `;
  }

  private renderIcon(): TemplateResult {
    if (!this.icon) {
      return html``;
    }
    const icon = iconTypeToData(this.icon);
    if (!icon) {
      return html``;
    }
    return html`
      ${unsafeHTML(`<span class="icon">${icon.svg}</span>`)}
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

  private setIsOpen(isOpen: boolean, info: IsOpenChangedArgs) {
    this.IsOpenChangedArgs = info;
    this.isOpen = isOpen;
  }

  private handleCoreIsOpenChange(e: CustomEvent<boolean>) {
    const detail = Object.assign({}, this.IsOpenChangedArgs);
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
