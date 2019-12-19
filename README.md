# qing-dialog (WIP)

[![Build Status](https://img.shields.io/travis/mgenware/qing-dialog.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/qing-dialog)
[![npm version](https://img.shields.io/npm/v/qing-dialog.svg?style=flat-square)](https://npmjs.com/package/qing-dialog)
[![Node.js Version](http://img.shields.io/node/v/qing-dialog.svg?style=flat-square)](https://nodejs.org/en/)

Dialog component for [qing](https://github.com/mgenware/qing), built with lit-element, mobile friendly.

**Work in progress, not released yet, stay tuned!**

## Installation

```sh
yarn add qing-dialog
```

## Usage

### Properties

```typescript
// A group of builtin button types.
export type PresetButtonType = 'ok' | 'yes' | 'no' | 'cancel';

// A group of builtin dialog icons.
export type DialogIconType = 'error' | 'success' | 'warning';

// Dialog component: <qing-dialog>
class QingDialog {
  // Indicates whether the dialog is visible.
  isOpen: boolean;
  // The heading of the dialog.
  dialogTitle: string;
  // Bottom buttons of the dialog.
  buttons: Array<PresetButtonType | DialogButton>;
  // Icon of the dialog.
  icon: DialogIconType;

  // ------- Events -------

  // Fires when `isOpen` property changes.
  onIsOpenChange: CustomEvent<boolean>;
  // Fires when dialog button is clicked.
  onButtonClick: CustomEvent<DialogButton>;
}

export interface DialogButton {
  // One of the preset types of the button, see PresetButtonType.
  type?: PresetButtonType;
  // Used to identify a button if `type` is not set.
  name?: string;
  // Button content.
  text?: string;
  // lit-button style.
  style?: string;
  // If true, this button is clicked when Enter key is pressed.
  isDefault?: boolean;
  // If true, this button is clicked when Esc key is pressed.
  isCancel?: boolean;
}
```

### CSS variables

- `--dialog-max-width` maximum width of the dialog, defaults to `100%` on small screens, `80%` on large screens.
- `--dialog-padding` padding of the dialog.
- `--dialog-header-padding`, `--dialog-content-padding`, `--dialog-footer-padding` padding of different parts of the dialog.
- `--dialog-buttons-display` CSS `display` value of the dialog buttons container `div`, defaults to `flex`.
- `--dialog-buttons-justify-content` alignment of the dialog buttons:
  - `flex-end` the default value, aligned to the right.
  - `flex-start` aligned to the left.
  - `center` centered.
- `--dialog-icon-margin` margin of the dialog icon.
- Icon colors:
  - `--dialog-icon-error`, `--dialog-icon-warning`, `--dialog-icon-success`.

### Autofocus

Use `onIsOpenChange` event to auto focus an element when the dialog shows up, example:

```js
html`
  <qing-dialog
    dialogTitle="Title"
    .buttons=${['ok']}
    @onIsOpenChange=${e => {
      if (e.detail) {
        // If dialog is open, set focus on a specified element.
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

## Build instructions

- `yarn dev` builds the project in dev mode
- `yarn build` builds and lints the project in production mode
- `yarn demo` runs the demo in browser (you have to build the project first)
- `yarn test` runs UI tests
