# qing-dialog-component (WIP)

[![Build Status](https://img.shields.io/travis/mgenware/qing-dialog-component.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/qing-dialog-component)
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

// Contains information on how `isOpenChanged` event is triggered.
export interface IsOpenChangedArgs {
  isOpen?: boolean;
  button?: DialogButton;
}

// Dialog component: <qing-dialog>
class QingDialog {
  // Indicates whether the dialog is visible.
  isOpen: boolean;
  // Bottom buttons of the dialog.
  buttons: DialogButtonType[];
  // Index of default button, defaults to 0 (first button).
  defaultButtonIndex: number;
  // Index of cancel button.
  // A cancel button will be clicked when user presses Esc key.
  cancelButtonIndex: number;

  // ------- Events -------

  // Fires when `isOpen` property changes.
  isOpenChanged: CustomEvent<IsOpenChangedArgs>;
  shown: CustomEvent<IsOpenChangedArgs>;
  closed: CustomEvent<IsOpenChangedArgs>;

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

Use `isOpenChanged` event to auto focus an element when the dialog shows up, example:

```js
html`
  <qing-dialog
    .buttons=${['ok']}
    @isOpenChanged=${(e) => {
      if (e.detail.isOpen) {
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

### Build Instructions

> This project uses [daizong](https://github.com/mgenware/daizong) to manage scripts. You need to run scripts through daizong via `yarn r <script>` or `npm run r <script>`.

- `yarn r dev` compiles, and watches files in dev mode
- `yarn r serve` runs the demo page in browser (you have to build the project first)
- `yarn r build` builds, lints and tests the project in production mode
