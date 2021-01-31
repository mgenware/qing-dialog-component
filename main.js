import { html, LitElement, css } from 'lit-element';
import 'qing-button';
import 'qing-dialog-component';
import { iconElement } from 'qing-dialog-component';

export class ExampleApp extends LitElement {
  render() {
    return html`
      <div id="main">
        <h2><code>qing-dialog</code></h2>
        <qing-dialog id="basic" .buttons=${['ok']} .cancelButtonIndex=${0}>
          <h2>Title</h2>
          <p>
            The div element has no special meaning at all. It represents its children. It can be
            used with the class, lang, and title attributes to mark up semantics common to a group
            of consecutive elements. The div element has no special meaning at all. It represents
            its children. It can be used with the class, lang, and title attributes to mark up
            semantics common to a group of consecutive elements. The div element has no special
            meaning at all. It represents its children. It can be used with the class, lang, and
            title attributes to mark up semantics common to a group of consecutive elements.
          </p>
        </qing-dialog>
        ${this.renderButton('Basic', 'basic')}
        <qing-dialog
          id="handle-events"
          .buttons=${['ok']}
          @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
          @isOpenChanged=${(e) => alert(`isOpen changed to ${JSON.stringify(e.detail)}`)}
          @shown=${() => alert('Shown')}
          @closed=${() => alert('Closed')}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton('Handle events', 'handle-events')}
        <qing-dialog
          id="multiple-btns"
          .buttons=${['yes', 'no', 'cancel']}
          @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton('Multiple buttons', 'multiple-btns')}
        <qing-dialog
          id="focus"
          .buttons=${['ok']}
          @isOpenChanged=${(e) => {
            if (e.detail) {
              this.shadowRoot.getElementById('textInput').focus();
            }
          }}
        >
          <h2>Title</h2>
          <p>Hello world</p>
          <form>
            <input type="text" value="name" id="textInput" />
          </form>
        </qing-dialog>
        ${this.renderButton('Focus', 'focus')}
        <qing-dialog
          id="right-btns"
          .buttons=${['yes', 'no', 'cancel']}
          @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton('Right aligned buttons', 'right-btns')}
        <qing-dialog
          id="default-cancel-buttons"
          .buttons=${['yes', 'no', 'cancel']}
          .cancelButtonIndex=${2}
          @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton('isDefault and isCancel buttons', 'default-cancel-buttons')}
        <qing-dialog id="icon" .buttons=${['ok']}>
          <h2>
            ${iconElement({ type: 'error' })}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton('Icon', 'icon')}
        <qing-dialog id="long-text" dialogTitle="Info" icon="info" .buttons=${['ok']}>
          <h2>
            ${iconElement({ type: 'success' })}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <pre style="overflow-y: auto">${`${'2020 is coming. '.repeat(20)}\n`.repeat(500)}</pre>
        </qing-dialog>
        ${this.renderButton('Long text', 'long-text')}
        <qing-dialog id="border-styles" .buttons=${['ok']}>
          <h2>
            ${iconElement({ type: 'success' })}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton('Border styles', 'border-styles')}
        <qing-dialog id="themes" dialogTitle="Themes" .buttons=${['ok']}>
          <h2>
            ${iconElement({ type: 'success', color: '' })}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <p>
            <button @click=${this.handleLightBtnClick}>Light</button>
            <button @click=${this.handleDarkBtnClick}>Dark</button>
          </p>
        </qing-dialog>
        ${this.renderButton('Themes', 'themes')}
        <qing-dialog
          id="auto-close"
          icon="success"
          @isOpenChanged=${this.handleAutoCloseIsOpenChanged}
          >This will auto-close in 3s</qing-dialog
        >
        ${this.renderButton('Auto-close', 'auto-close')}
        <qing-dialog id="title-and-buttons" .buttons=${['ok']}>
          <h1>Title and buttons</h1>
        </qing-dialog>
        ${this.renderButton('Title and buttons', 'title-and-buttons')}
        <qing-dialog id="title-only"><h1>Title</h1></qing-dialog>
        ${this.renderButton('Title-only', 'title-only')}
        <hr />
        <h2><code>qing-dialog-core</code></h2>
        <div>
          <qing-dialog-core id="core-minimal" closeOnEsc> Press Esc to exit </qing-dialog-core>
          ${this.renderButton('Core - Minimal', 'core-minimal')}
        </div>
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

  get mainElement() {
    return this.shadowRoot.getElementById('main');
  }

  handleLightBtnClick() {
    this.mainElement.classList.remove('theme-dark');
  }

  handleDarkBtnClick() {
    this.mainElement.classList.add('theme-dark');
  }

  handleAutoCloseIsOpenChanged(e) {
    if (!e.detail.isOpen) {
      return;
    }
    setTimeout(() => {
      this.shadowRoot.getElementById('auto-close').isOpen = false;
    }, 3000);
  }
}

ExampleApp.styles = css`
  h2 {
    margin-bottom: 0;
  }
  #max-width {
    --dialog-max-width: 400px;
  }
  #right-btns::part(footer-buttons) {
    justify-content: flex-end;
  }
  #border-styles::part(overlay) {
    border: 4px dashed green;
    border-radius: 10px;
  }
  :host {
    --default-back-color: white;
    --default-fore-color: black;
    --default-btn-back-color: lightgray;
    --default-success-color: #89ec7c;
  }
  .theme-dark {
    --default-back-color: black;
    --default-fore-color: #777777;
    --default-btn-back-color: #1a1a1a;
    --default-success-color: #073f00;
  }
  #themes::part(overlay) {
    color: var(--default-fore-color);
    background-color: var(--default-back-color);
  }
  #themes::part(footer-button) {
    color: var(--default-fore-color);
    background-color: var(--default-btn-back-color);
  }
  #themes .icon-success {
    fill: var(--default-success-color);
  }
  #themes button {
    border: 1px solid #818181;
    color: var(--default-fore-color);
    background-color: var(--default-btn-back-color);
  }
`;

customElements.define('example-app', ExampleApp);
