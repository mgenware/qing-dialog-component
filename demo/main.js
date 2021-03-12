import { html, LitElement, css } from '../node_modules/lit-element';
import '../node_modules/qing-button/dist/main';
import '../dist/main';

const sharedStyles = css`
  button {
    background-color: #e7e7e7;
    color: black;
    border: 0;
    border-radius: 0;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.6rem 0.9rem;
    transition: all 0.3s ease 0s;
  }
  button:hover {
    opacity: 0.8;
  }
  button:active,
  button.selected {
    filter: brightness(80%);
  }
  button:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  button:focus {
    box-shadow: inset 0 0 0 0.2rem var(--button-outline-color, #8dc3eb);
    outline: none;
  }
`;

class DynamicContent extends LitElement {
  render() {
    return html` <h2>Title</h2>
      <p>
        <span id="span">Hello world <button @click=${this.handleClick}>Expand</button></span>
      </p>`;
  }

  handleClick() {
    this.shadowRoot.getElementById(
      'span',
    ).textContent = `The div element has no special meaning at all. It represents its children. It can be
    used with the class, lang, and title attributes to mark up semantics common to a group
    of consecutive elements. The div element has no special meaning at all. It represents
    its children. It can be used with the class, lang, and title attributes to mark up
    semantics common to a group of consecutive elements. The div element has no special
    meaning at all. It represents its children. It can be used with the class, lang, and
    title attributes to mark up semantics common to a group of consecutive elements.`;
  }
}

DynamicContent.styles = [
  sharedStyles,
  css`
    :host {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }
  `,
];

customElements.define('dynamic-content', DynamicContent);

export class ExampleApp extends LitElement {
  render() {
    return html`
      <div id="main">
        <h2>Layouts</h2>
        ${this.r('Width: 80%, Height: auto', 'layout-w-80')}
        ${this.r('Width: auto + min value, Height: auto', 'layout-auto-min-width')}
        ${this.r('Fullscreen with margins', 'layout-full-margins')}
        <h2>Events</h2>
        ${this.r('Handle events', 'handle-events', undefined, (e) =>
          alert(e.detail ? 'Opening' : 'Closing'),
        )}
        <h2>Focus</h2>
        ${this.r(
          'Focus',
          'focus',
          html` <h2>Title</h2>
            <p>Hello world</p>
            <p>
              <input type="text" value="name" id="textInput" />
            </p>`,
          (e) => {
            if (e.detail) {
              this.shadowRoot.getElementById('textInput').focus();
            }
          },
        )}
        <h2>Styles</h2>
        ${this.r(
          'Long text',
          'long-text',
          html`<h2>Long text</h2>
            <pre style="overflow-y: auto">
${`${'2020 is coming. '.repeat(20)}\n`.repeat(500)}</pre
            >`,
        )}
        ${this.r('Border styles', 'border-styles')}
        ${this.rElement(
          'Themes',
          'themes',
          html` <qing-overlay id="themes">
            <h2>Title</h2>
            <p>
              <button @click=${this.handleLightBtnClick}>Light</button>
              <button @click=${this.handleDarkBtnClick}>Dark</button>
              <button
                @click=${() => this.shadowRoot.getElementById('themes').removeAttribute('open')}
              >
                Close
              </button>
            </p>
          </qing-overlay>`,
        )}
      </div>
    `;
  }

  r(text, id, content, handler) {
    const btnID = `${id}-btn`;
    return html`
      <p>
        <button @click=${() => this.shadowRoot.getElementById(id).setAttribute('open', '')}>
          ${text}
        </button>
      </p>
      <qing-overlay
        id=${id}
        @escKeyDown=${() => this.shadowRoot.getElementById(id).removeAttribute('open')}
        @openChanged=${(e) => {
          if (e.detail) {
            // Focus the OK button first.
            this.shadowRoot.getElementById(btnID).focus();
          }
          if (handler) {
            handler(e);
          }
        }}
      >
        ${content ?? html`<dynamic-content></dynamic-content>`}
        <p style="text-align:center">
          <button
            id=${btnID}
            @click=${() => this.shadowRoot.getElementById(id).removeAttribute('open')}
          >
            OK
          </button>
        </p>
      </qing-overlay>
    `;
  }

  rElement(text, id, content) {
    return html`
      <p>
        <button @click=${() => this.shadowRoot.getElementById(id).setAttribute('open', '')}>
          ${text}
        </button>
      </p>
      ${content}
    `;
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
}

ExampleApp.styles = [
  sharedStyles,
  css`
    qing-overlay::part(overlay) {
      padding: 0.625rem 1.25rem;
    }

    @media (min-width: 768px) {
      qing-overlay::part(overlay) {
        width: 80%;
      }

      qing-overlay#layout-auto-min-width::part(overlay) {
        width: auto;
        min-width: 400px;
        max-width: min(100vw, 1000px);
      }
    }

    qing-overlay#layout-full-margins::part(overlay) {
      width: calc(100vw - 1rem);
      height: calc(100vh - 1rem);
    }
    @media (min-width: 768px) {
      qing-overlay#layout-full-margins::part(overlay) {
        width: calc(100vw - 4rem);
        height: calc(100vh - 4rem);
      }
    }

    h2 {
      margin-bottom: 0;
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
    #themes button {
      border: 1px solid #818181;
      color: var(--default-fore-color);
      background-color: var(--default-btn-back-color);
    }
  `,
];

customElements.define('example-app', ExampleApp);
