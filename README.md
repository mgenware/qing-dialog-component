# qing-dialog-component (WIP)

[![Build Status](https://github.com/mgenware/qing-button/workflows/Build/badge.svg)](https://github.com/mgenware/qing-dialog-component/actions)
[![npm version](https://img.shields.io/npm/v/qing-dialog-component.svg?style=flat-square)](https://npmjs.com/package/qing-dialog-component)
[![Node.js Version](http://img.shields.io/node/v/qing-dialog-component.svg?style=flat-square)](https://nodejs.org/en/)

Dialog component for [qing](https://github.com/mgenware/qing), based on [qing-button](https://github.com/mgenware/qing-button) and lit-element, mobile friendly.

## Demo

[Demo](https://mgenware.github.io/qing-dialog-component/)

## Installation

> qing-dialog-component is based on [qing-button](https://github.com/mgenware/qing-button) and lit-element

```sh
yarn add qing-dialog-component qing-button lit-element
```

## Usage

### Properties

```typescript
// A group of builtin button types.
export type PresetButtonType = 'ok' | 'yes' | 'no' | 'cancel';

// The dialog component accepts an array of buttons, each can be a
// preset `PresetButtonType` or a more customized `DialogButton`
// (see type definition below).
export type DialogButtonType = PresetButtonType | DialogButton;

// Contains information on how `openChanged` event is triggered.
export interface OpenChangedArgs {
  open?: boolean;
  button?: DialogButton;
}

// Dialog component: <qing-dialog>
class QingDialog {
  // Indicates whether the dialog is visible.
  open: boolean;
  // Bottom buttons of the dialog.
  buttons: DialogButtonType[];
  // Index of default button, defaults to 0 (first button).
  defaultButtonIndex: number;
  // Index of cancel button.
  // A cancel button will be clicked when user presses Esc key.
  cancelButtonIndex: number;

  // ------- Events -------

  // Fires when `open` property changes.
  openChanged: CustomEvent<OpenChangedArgs>;
  shown: CustomEvent<OpenChangedArgs>;
  closed: CustomEvent<OpenChangedArgs>;

  // Fires when dialog button is clicked.
  buttonClick: CustomEvent<DialogButton>;
}

// A more customized button.
export interface DialogButton {
  // One of the preset types of the button, see PresetButtonType.
  type?: PresetButtonType;
  // Used to identify a button if `type` is not set.
  name?: string;
  // Button content.
  text?: string;
  // qing-button style.
  style?: string;
}
```

### CSS Shadow Parts

- Element containers:
  - `overlay-background`, `overlay`.
- Top-level elements:
  - `content`, `footer`
- Footer elements:
  - `footer-buttons`: footer button container.
  - `footer-button`: individual footer buttons.

### Autofocus

Use `openChanged` event to auto focus an element when the dialog shows up, example:

```js
html`
  <qing-dialog
    .buttons=${['ok']}
    @openChanged=${(e) => {
      if (e.detail.open) {
        // If the dialog is open, set focus on the specified element.
        this.shadowRoot.getElementById('textInput').focus();
      }
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
