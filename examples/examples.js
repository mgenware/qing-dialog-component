import { html, LitElement, css } from '../node_modules/lit-element';
import '../node_modules/lit-button/dist/main';
import '../dist/main';

export class ExamplesView extends LitElement {
  render() {
    return html`
      <h2><code>qing-dialog</code></h2>
      <qing-dialog
        id="basic"
        dialogTitle="Greetings"
        .buttons=${['ok']}
        .cancelButtonIndex=${0}
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
        .buttons=${['ok']}
        @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
        @isOpenChanged=${(e) =>
          alert(`isOpen changed to ${JSON.stringify(e.detail)}`)}
        @shown=${() => alert('Shown')}
        @closed=${() => alert('Closed')}
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
        @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Multiple buttons', 'multiple-btns')}

      <qing-dialog
        id="focus"
        dialogTitle="Title"
        .buttons=${['ok']}
        @isOpenChanged=${(e) => {
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
        @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton('Right aligned buttons', 'right-btns')}

      <qing-dialog
        id="default-cancel-buttons"
        dialogTitle="Title"
        .buttons=${['yes', 'no', 'cancel']}
        .cancelButtonIndex=${2}
        @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
      >
        <div>Hello World</div>
      </qing-dialog>
      ${this.renderButton(
        'isDefault and isCancel buttons',
        'default-cancel-buttons',
      )}

      <qing-dialog
        id="icon"
        dialogTitle="Warning"
        icon="warning"
        .buttons=${['ok']}
      >
        <div>
          This is a warning
        </div>
      </qing-dialog>
      ${this.renderButton('Icon', 'icon')}

      <qing-dialog
        id="long-text"
        dialogTitle="Info"
        icon="info"
        .buttons=${['ok']}
      >
        <pre>${`${'2020 is coming. '.repeat(20)}\n`.repeat(500)}</pre>
      </qing-dialog>
      ${this.renderButton('Long text', 'long-text')}

      <qing-dialog
        id="border-styles"
        dialogTitle="Border styles"
        .buttons=${['ok']}
      >
        Hello world
      </qing-dialog>
      ${this.renderButton('Border styles', 'border-styles')}

      <qing-dialog id="themes" dialogTitle="Themes" .buttons=${['ok']}>
        <p>
          <button @click=${this.handleLightBtnClick}>Light</button>
          <button @click=${this.handleDarkBtnClick}>Dark</button>
        </p>
      </qing-dialog>
      ${this.renderButton('Themes', 'themes')}

      <hr />
      <h2><code>qing-dialog-core</code></h2>
      <div>
        <qing-dialog-core id="core-minimal" closeOnEsc>
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

  handleLightBtnClick() {
    document.body.classList.remove('theme-dark');
  }

  handleDarkBtnClick() {
    document.body.classList.add('theme-dark');
  }
}

ExamplesView.styles = css`
  #max-width {
    --dialog-max-width: 400px;
  }

  #right-btns {
    --dialog-button-container-justify-content: flex-end;
  }

  #border-styles {
    --dialog-border: 4px dashed green;
    --dialog-border-radius: 10px;
  }

  :root {
    --default-back-color: white;
    --default-fore-color: black;
  }

  .theme-dark {
    --default-back-color: black;
    --default-fore-color: #777777;
  }

  #themes {
    --dialog-background-color: var(--default-back-color);
    --dialog-color: var(--default-fore-color);
  }
`;

customElements.define('examples-view', ExamplesView);
