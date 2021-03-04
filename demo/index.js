import { html, LitElement, css } from '../node_modules/lit-element';
import '../node_modules/qing-button/dist/main';
import '../dist/main';
import { iconElement } from '../dist/main';

export class ExamplesView extends LitElement {
  render() {
    return html`
      <div id="main">
        <h2>Layouts</h2>
        ${this.r(
          'Basic',
          html`<qing-dialog id="basic" .buttons=${['ok']} .cancelButtonIndex=${0}>
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
          </qing-dialog>`,
        )}
        ${this.r(
          'Handle events',
          html` <qing-dialog
            id="handle-events"
            .buttons=${['ok']}
            @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
            @shown=${() => alert('Shown')}
            @closed=${() => alert('Closed')}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Multiple buttons',
          html` <qing-dialog
            id="multiple-btns"
            .buttons=${['yes', 'no', 'cancel']}
            @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Focus',
          html` <qing-dialog
            id="focus"
            .buttons=${['ok']}
            @requestFocus=${() => {
              this.shadowRoot.getElementById('textInput').focus();
            }}
          >
            <h2>Title</h2>
            <p>Hello world</p>
            <p>
              <input type="text" value="name" id="textInput" />
            </p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Right aligned buttons',
          html` <qing-dialog
            id="right-btns"
            .buttons=${['yes', 'no', 'cancel']}
            @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`,
        )}
        ${this.r(
          'isDefault and isCancel buttons',
          html` <qing-dialog
            id="default-cancel-buttons"
            .buttons=${['yes', 'no', 'cancel']}
            .cancelButtonIndex=${2}
            @buttonClick=${(btn) => alert(`You clicked ${btn.detail.text}!`)}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Icon',
          html` <qing-dialog id="icon" .buttons=${['ok']}>
            <h2>
              ${iconElement({ type: 'error' })}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <p>Hello world</p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Long text',
          html` <qing-dialog id="long-text" dialogTitle="Info" icon="info" .buttons=${['ok']}>
            <h2>
              ${iconElement({ type: 'success' })}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <pre style="overflow-y: auto">${`${'2020 is coming. '.repeat(20)}\n`.repeat(500)}</pre>
          </qing-dialog>`,
        )}
        ${this.r(
          'Border styles',
          html` <qing-dialog id="border-styles" .buttons=${['ok']}>
            <h2>
              ${iconElement({ type: 'success' })}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <p>Hello world</p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Themes',
          html` <qing-dialog id="themes" dialogTitle="Themes" .buttons=${['ok']}>
            <h2>
              ${iconElement({ type: 'success', color: '' })}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <p>
              <button @click=${this.handleLightBtnClick}>Light</button>
              <button @click=${this.handleDarkBtnClick}>Dark</button>
            </p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Auto-close',
          html` <qing-dialog id="auto-close" icon="success" @shown=${this.handleAutoCloseShown}
            >This will auto-close in 3s</qing-dialog
          >`,
        )}
        ${this.r(
          'Close programically',
          html` <qing-dialog
            id="close-programically"
            .buttons=${[{ type: 'ok', autoClose: false }]}
            @requestFocus=${() => {
              this.shadowRoot.getElementById('nameInput').focus();
            }}
            @buttonClick=${() => {
              const input = this.shadowRoot.getElementById('nameInput').value;
              if (input === 'liu') {
                this.shadowRoot.getElementById('close-programically').open = false;
              } else {
                alert('Name is not liu');
              }
            }}
          >
            <h3>Only liu can close this dialog, try entering liu below and clicking ok</h3>
            <p>
              Name:<br />
              <input type="text" value="" id="nameInput" />
            </p>
          </qing-dialog>`,
        )}
        ${this.r(
          'Title and buttons',
          html` <qing-dialog id="title-and-buttons" .buttons=${['ok']}>
            <h1>Title and buttons</h1>
          </qing-dialog>`,
        )}
        ${this.r('Title-only', html` <qing-dialog id="title-only"><h1>Title</h1></qing-dialog>`)}
        ${this.r(
          'A minimal overlay',
          html` <qing-dialog-core id="core-minimal"> Hello world </qing-dialog-core>`,
        )}
      </div>
    `;
  }

  r(text, modal) {
    return html`
      <p>
        <button @click=${this.handleButtonClick}>${text}</button>
        ${modal}
      </p>
    `;
  }

  handleButtonClick(e) {
    const btn = e.target;
    const p = btn.parentElement;
    // <qing-dialog> is the second child of the <p>.
    const dialog = p.children[1];
    dialog.setAttribute('open', '');
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

  handleAutoCloseShown() {
    setTimeout(() => {
      this.shadowRoot.getElementById('auto-close').open = false;
    }, 3000);
  }
}

ExamplesView.styles = css`
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

customElements.define('examples-view', ExamplesView);
