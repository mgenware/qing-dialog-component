import {
  html,
  customElement,
  css,
  property,
  LitElement,
  TemplateResult,
} from 'lit-element';
import './dialogCore';
import { DialogButton, PresetButton } from './dialogButton';
import 'lit-button';
import { classMap } from 'lit-html/directives/class-map';

// Default localized strings for dialog button types.
const defaultLocalizedButtonStrings = new Map<PresetButton, string>();
defaultLocalizedButtonStrings.set(PresetButton.ok, 'OK');
defaultLocalizedButtonStrings.set(PresetButton.yes, 'Yes');
defaultLocalizedButtonStrings.set(PresetButton.no, 'No');
defaultLocalizedButtonStrings.set(PresetButton.cancel, 'Cancel');

const defaultButtonClass = '__qing_default_button';
const cancelButtonClass = '__qing_cancel_button';

// Contains information on how `onIsOpenChange` event is triggered.
export interface IsOpenChangeEventInfo {
  isOpen?: boolean;
  isCancelled?: boolean;
  button?: DialogButton;
}

// Helper functions for DialogButton.
export function dialogButton(
  id: string,
  text: string,
  style: string,
  isDefault: boolean,
  isCancel: boolean,
): DialogButton {
  return new DialogButton(id, text, style, isDefault, isCancel);
}

export function presetButton(
  presetBtn: PresetButton,
  style?: string,
  isDefault?: boolean,
  isCancel?: boolean,
): DialogButton {
  return dialogButton(
    presetBtn,
    QingDialog.localizedButtonStrings.get(presetBtn) || '',
    style || '',
    isDefault || false,
    isCancel || false,
  );
}

@customElement('qing-dialog')
export class QingDialog extends LitElement {
  static get styles() {
    return css`
      qing-dialog-core {
        --max-width: 500px;
      }

      .button-container {
        display: var(--buttons-display, flex);
        justify-content: var(--buttons-justify-content, center);
      }
    `;
  }

  static localizedButtonStrings = defaultLocalizedButtonStrings;

  @property() dialogTitle = '';
  @property({ type: Boolean, reflect: true }) isOpen = false;
  @property({ type: Array }) buttons: Array<DialogButton | PresetButton> = [];
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
        <h2 slot="header">${this.dialogTitle}</h2>
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
          const btn =
            btnSrc instanceof DialogButton ? btnSrc : presetButton(btnSrc);
          return html`
            <lit-button
              class=${classMap({
                [btn.style || '_']: !!btn.style,
                [defaultButtonClass]: btn.isDefault,
                [cancelButtonClass]: btn.isCancel,
              })}
              @click=${() => this.handleButtonClick(btn)}
              >${btn.text}</lit-button
            >
          `;
        })}
      </div>
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
    const detail = this.isOpenChangeEventInfo || {};
    detail.isOpen = e.detail;
    this.dispatchEvent(
      new CustomEvent<IsOpenChangeEventInfo>('onIsOpenChange', {
        detail,
      }),
    );
  }
}
