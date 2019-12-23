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

// Default localized strings for dialog button types.
let localizedButtonStrings = new Map<PresetButtonType, string>();
localizedButtonStrings.set('ok', 'OK');
localizedButtonStrings.set('yes', 'Yes');
localizedButtonStrings.set('no', 'No');
localizedButtonStrings.set('cancel', 'Cancel');

const defaultButtonClass = '__qing_default_button';
const cancelButtonClass = '__qing_cancel_button';

// Contains information on how `onIsOpenChange` event is triggered.
export interface IsOpenChangeEventInfo {
  isOpen?: boolean;
  isCancelled?: boolean;
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
  @property({ type: Array }) buttons: Array<
    DialogButton | PresetButtonType
  > = [];
  @property() icon?: DialogIconType;
  isOpenChangeEventInfo?: IsOpenChangeEventInfo;

  firstUpdated() {
    if (!this.shadowRoot) {
      throw new Error('Unexpected undefined shadowRoot');
    }
  }

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
      <div class="button-container">
        ${buttons.map(btnSrc => {
          const btn = typeof btnSrc === 'string' ? { type: btnSrc } : btnSrc;
          if (btn.type) {
            btn.text = QingDialog.localizedButtonStrings.get(btn.type);
          }
          return html`
            <lit-button
              class=${classMap({
                [btn.style || '_']: !!btn.style,
                [defaultButtonClass]: !!btn.isDefault,
                [cancelButtonClass]: !!btn.isCancel,
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
      new CustomEvent<DialogButton>('onButtonClick', {
        detail: btn,
      }),
    );
    this.setIsOpen(false, { button: btn });
  }

  private handleEscKeyPressed() {
    if (this.isOpen) {
      this.setIsOpen(false, {
        isCancelled: true,
      });
    }
  }

  private setIsOpen(isOpen: boolean, info: IsOpenChangeEventInfo) {
    this.isOpenChangeEventInfo = info;
    this.isOpen = isOpen;
  }

  private handleCoreIsOpenChange(e: CustomEvent<boolean>) {
    const detail = Object.assign({}, this.isOpenChangeEventInfo);
    detail.isOpen = e.detail;
    this.dispatchEvent(
      new CustomEvent<IsOpenChangeEventInfo>('onIsOpenChange', {
        detail,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qing-dialog': QingDialog;
  }
}
