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
      ${this.renderButton('Basic', 'basic')}

      <qing-dialog
        id="handle-events"
        dialogTitle="Greetings"
        .buttons=${[PresetButton.ok]}
        @onButtonClick=${() => alert('You clicked OK!')}
        @onIsOpenChange=${() => alert('isOpen changed.')}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Handle events', 'handle-events')}

      <qing-dialog
        id="max-width"
        dialogTitle="Title"
        .buttons=${[PresetButton.ok]}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Max width', 'max-width')}

      <hr />
      <h2><code>qing-dialog-core</code></h2>
      <div>
        <qing-dialog-core id="core-minimal">
          <div slot="header">Header</div>
          <div slot="content">Press Esc to exit</div>
          <div slot="footer">Footer</div>
        </qing-dialog-core>
        ${this.renderButton('Core - Minimal', 'core-minimal')}
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
  #max-width {
    --dialog-max-width: 400px;
  }
`;

customElements.define('demo-app', DemoApp);
