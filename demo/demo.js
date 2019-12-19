import { html, LitElement, css } from '../node_modules/lit-element';
import '../node_modules/lit-button/dist/main';
import '../dist/main';

export class DemoApp extends LitElement {
  render() {
    return html`
      <h2><code>qing-dialog</code></h2>
      <qing-dialog id="basic" dialogTitle="Greetings" .buttons=${['ok']}>
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
        .buttons=${['ok']}
        @onButtonClick=${btn => alert(`You clicked ${btn.detail.text}!`)}
        @onIsOpenChange=${e =>
          alert(`isOpen changed to ${JSON.stringify(e.detail)}`)}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Handle events', 'handle-events')}

      <qing-dialog id="max-width" dialogTitle="Title" .buttons=${['ok']}>
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Max width', 'max-width')}

      <qing-dialog
        id="multiple-btns"
        dialogTitle="Title"
        .buttons=${['yes', 'no', 'cancel']}
        @onButtonClick=${btn => alert(`You clicked ${btn.detail.text}!`)}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Multiple buttons', 'multiple-btns')}

      <qing-dialog
        id="focus"
        dialogTitle="Title"
        .buttons=${['ok']}
        @onIsOpenChange=${e => {
          if (e.detail) {
            this.shadowRoot.getElementById('textInput').focus();
          }
        }}
      >
        <div>Hello World</div>
        <form>
          <input type="text" value="name" id="textInput" />
        </form>
      </qing-dialog>
      ${this.renderButton('Focus', 'focus')}

      <qing-dialog
        id="right-btns"
        dialogTitle="Title"
        .buttons=${['yes', 'no', 'cancel']}
        @onButtonClick=${btn => alert(`You clicked ${btn.detail.text}!`)}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Right aligned buttons', 'right-btns')}

      <qing-dialog
        id="default-cancel-buttons"
        dialogTitle="Title"
        .buttons=${['yes', 'no', 'cancel']}
        @onButtonClick=${btn => alert(`You clicked ${btn.detail.text}!`)}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton(
        'isDefault and isCancel buttons',
        'default-cancel-buttons',
      )}

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

  #right-btns {
    --buttons-justify-content: flex-end;
  }
`;

customElements.define('demo-app', DemoApp);
