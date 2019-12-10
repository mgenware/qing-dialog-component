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

const defaultLocalizedButtonStrings = new Map<PresetButton, string>();
defaultLocalizedButtonStrings.set(PresetButton.ok, 'OK');
defaultLocalizedButtonStrings.set(PresetButton.yes, 'Yes');
defaultLocalizedButtonStrings.set(PresetButton.no, 'No');
defaultLocalizedButtonStrings.set(PresetButton.cancel, 'Cancel');

@customElement('qing-dialog')
export class QingDialog extends LitElement {
  static get styles() {
    return css`
      qing-dialog-core {
        --max-width: 500px;
      }
    `;
  }

  static localizedButtonStrings = defaultLocalizedButtonStrings;

  @property() dialogTitle = '';
  @property({ type: Boolean, reflect: true }) isOpen = false;
  @property({ type: Array }) buttons: Array<DialogButton | PresetButton> = [];

  firstUpdated() {
    if (!this.shadowRoot) {
      throw new Error('Unexpected undefined shadowRoot');
    }
  }

  render() {
    return html`
      <qing-dialog-core .isOpen=${this.isOpen}>
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
      <div class="modal-footer">
        ${buttons.map(btnSrc => {
          const btn =
            btnSrc instanceof DialogButton
              ? btnSrc
              : this.buttonFromPreset(btnSrc);
          return html`
            <lit-button class=${btn.style}>${btn.text}</lit-button>
          `;
        })}
      </div>
    `;
  }

  private buttonFromPreset(presetBtn: PresetButton): DialogButton {
    return new DialogButton(
      QingDialog.localizedButtonStrings.get(presetBtn) || '',
      '',
      false,
      false,
    );
  }
}
