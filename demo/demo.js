import { html, LitElement, css } from '../node_modules/lit-element';
import '../node_modules/lit-button/dist/main';
import { PresetButton } from '../dist/main';
import '../dist/main';

export class DemoApp extends LitElement {
  render() {
    return html`
      <h2><code>qing-dialog</code></h2>
      <qing-dialog
        id="basic"
        dialogTitle="Greetings"
        .buttons=${[PresetButton.ok]}
      >
        <div>
          The div element has no special meaning at all. It represents its
          children. It can be used with the class, lang, and title attributes to
          mark up semantics common to a group of consecutive elements. The div
          element has no special meaning at all. It represents its children. It
          can be used with the class, lang, and title attributes to mark up
          semantics common to a group of consecutive elements. The div element
          has no special meaning at all. It represents its children. It can be
          used with the class, lang, and title attributes to mark up semantics
          common to a group of consecutive elements.
        </div>
      </qing-dialog>
      ${this.renderButton('Minimal', 'basic')}
      <hr />
      <h2><code>qing-dialog-core</code></h2>
      <div>
        <qing-dialog-core id="core-minimal">
          <div slot="header">Header</div>
          <div slot="content">Press Esc to exit</div>
          <div slot="footer">Footer</div>
        </qing-dialog-core>
        ${this.renderButton('Core - Minimal', 'core-minimal')}

        <qing-dialog-core id="core-max-width">
          <div slot="header">Header</div>
          <div slot="content">Press Esc to exit</div>
          <div slot="footer">Footer</div>
        </qing-dialog-core>
        ${this.renderButton('Core - Max-width', 'core-max-width')}
      </div>
    `;
  }

  renderButton(text, modalID) {
    return html`
      <p>
        <button @click=${() => this.handleButtonClick(modalID)}>${text}</button>
      </p>
    `;
  }

  handleButtonClick(modalID) {
    this.shadowRoot.getElementById(modalID).setAttribute('isOpen', `${true}`);
  }
}

DemoApp.styles = css`
  #core-max-width {
    --max-width: 300px;
  }
`;

customElements.define('demo-app', DemoApp);
