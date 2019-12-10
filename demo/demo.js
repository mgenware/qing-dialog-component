import { html, LitElement, css } from '../node_modules/lit-element';
import '../dist/main';

export class DemoApp extends LitElement {
  render() {
    return html`
      <div>
        <qing-dialog id="minimal">
          <div slot="header">Header</div>
          <div slot="content">Content</div>
          <div slot="footer">Footer</div>
        </qing-dialog>
        ${this.renderButton('Minimal style', 'minimal')}

        <qing-dialog id="min-width">
          <div slot="header">Header</div>
          <div slot="content">Content</div>
          <div slot="footer">Footer</div>
        </qing-dialog>
        ${this.renderButton('Min-width', 'min-width')}
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
  #min-width {
    --min-width: 300px;
  }
`;

customElements.define('demo-app', DemoApp);
