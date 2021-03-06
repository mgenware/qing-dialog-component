# qing-dialog-component (WIP)

[![Build Status](https://github.com/mgenware/qing-dialog-component/workflows/Build/badge.svg)](https://github.com/mgenware/qing-dialog-component/actions)
[![Pages Status](https://github.com/mgenware/qing-dialog-component/workflows/Pages/badge.svg)](https://github.com/mgenware/qing-dialog-component/actions)
[![npm version](https://img.shields.io/npm/v/qing-dialog-component.svg?style=flat-square)](https://npmjs.com/package/qing-dialog-component)
[![Node.js Version](http://img.shields.io/node/v/qing-dialog-component.svg?style=flat-square)](https://nodejs.org/en/)

Dialog component for [qing](https://github.com/mgenware/qing)

## Demo

[Demo](https://mgenware.github.io/qing-dialog-component/)

## Installation

> qing-dialog-component is based on [qing-button](https://github.com/mgenware/qing-button) and lit-element

```sh
yarn add qing-dialog-component qing-button lit-element
```

## Usage

### Dialog size

Dialog size is fully customizable. By default, height defaults to auto (fits content size), width defaults to `100vw`. You might need to add some CSS to fit your use case, some examples:

```css
/** Example 1 **/
/** 80% of screen width on medium or large screens */
@media (min-width: 768px) {
  qing-dialog::part(overlay) {
    width: 80%;
  }
}

/** Example 2 **/
/** Auto width with min and max values on medium or large screens */
@media (min-width: 768px) {
  qing-dialog::part(overlay) {
    width: auto;
    max-width: min(100vw, 1000px);
    min-width: 400px;
  }
}

/** Example 3 **/
/** Fullscreen dialog with margins **/
qing-dialog::part(overlay) {
  display: flex;
  width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
}
@media (min-width: 768px) {
  qing-dialog::part(overlay) {
    display: flex;
    width: calc(100vw - 4rem);
    height: calc(100vh - 4rem);
  }
}
```

### Properties

```ts
// A group of pre-defined button types.
type PresetButtonType = 'ok' | 'yes' | 'no' | 'cancel';

// A more customized button if `PresetButtonType` doesn't fit.
// A customized dialog button.
interface DialogButton {
  // One of the preset types of the button, 'ok' | 'yes' | 'no' | 'cancel'.
  type?: string;
  // Used to identify a button if `type` is not set.
  name?: string;
  // Button content.
  text?: string;
  // qing-button style.
  style?: string;
  // Defaults to `true`. If true, clicking on the button closes the dialog.
  autoClose?: boolean;
}

// The reason a dialog is closed.
enum CloseReason {
  key = 1,
  button,
}

// `closed` event detail.
interface CloseReasonDetail {
  // The reason a dialog is closed, can be 'key' or 'button' or
  // `undefined` if it's closed programmatically.
  reason?: CloseReason;
  // Extra data for `reason`.
  // For `CloseReason.key`, it's key name.
  // For `CloseReason.button`, it's the `DialogButton` triggered the dismissal.
  data?: unknown;
}

// Dialog component: <qing-dialog>
class QingDialog {
  // Set localized button strings.
  static localizedButtonStrings: Record<string, string>;
  /**
   * Defaults to:
   * {
   *   yes: 'Yes',
   *   no: 'No',
   *   ok: 'OK',
   *   cancel: 'Cancel',
   * }
   */

  // Whether the dialog is visible.
  open: boolean;
  // Bottom buttons.
  buttons: (PresetButtonType | DialogButton)[];
  // Index of the default button, defaults to 0 (first button).
  defaultButtonIndex: number;
  // Index of the cancel button.
  // A cancel button will be clicked when user presses Esc key.
  cancelButtonIndex: number;

  // ------- Events -------

  // Fires when `open` property changes.
  shown: CustomEvent;
  closed: CustomEvent;

  // Fires when dialog button is clicked.
  buttonClick: CustomEvent<DialogButton>;
}
```

### CSS Shadow Parts

- Element containers:
  - `overlay-background`, `overlay`
- Top-level elements:
  - `content`, `footer`
- Footer elements:
  - `footer-buttons`: footer button container
  - `footer-button`: individual footer buttons

### Autofocus

Use `requestFocus` event to auto focus an element when the dialog shows up, example:

```js
html`
  <qing-dialog
    .buttons=${['ok']}
    @requestFocus=${() => {
      this.shadowRoot.getElementById('textInput').focus();
    }}
  >
    <form>
      <input type="text" id="textInput" />
    </form>
  </qing-dialog>
`;
```

## Build Instructions

> This project uses [daizong](https://github.com/mgenware/daizong) to manage scripts. You need to run scripts through daizong via `yarn r <script>` or `npm run r <script>`.

### For development

- `yarn r dev` starts the development mode, which watches and compiles all source files including tests files.
- `yarn r serve` starts demo page in browser in development mode.
- `yarn r t` runs tests in development mode (requires build files).
- `yarn r tw` runs tests in development + watch mode (requires build files).

> Tip: You can keep 3 terminal tabs open to run the 3 scripts above during development.

### For production

- `yarn r build` cleans, lints, compiles the project and runs tests.

### Other scripts

You do not need to manually run these scripts, they are already integrated into other scripts.

- `yarn r lint` lints the project using ESLint, auto triggered by `yarn r build`.
- `yarn r clean` deletes all build artifacts, auto triggered by `yarn r dev` or `yarn r build`.

### No `prepublishOnly`

The `prepublishOnly` script was removed, we recommend using [np](https://github.com/sindresorhus/np) to publish packages, which will automatically run `yarn test`, which runs `yarn r build` before publishing.
