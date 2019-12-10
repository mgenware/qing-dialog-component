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
        modalTitle="Greetings"
        .buttons=${[PresetButton.ok]}
      >
        <div>Hello World</div>
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

        <qing-dialog-core id="core-min-width">
          <div slot="header">Header</div>
          <div slot="content">Press Esc to exit</div>
          <div slot="footer">Footer</div>
        </qing-dialog-core>
        ${this.renderButton('Core - Min-width', 'core-min-width')}
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
  #core-min-width {
    --min-width: 300px;
  }
`;

customElements.define('demo-app', DemoApp);
