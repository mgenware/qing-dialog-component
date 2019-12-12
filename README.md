# qing-dialog (WIP)

Dialog component for [qing](https://github.com/mgenware/qing), built with lit-element, mobile friendly.

**Work in progress, not released yet, stay tuned!**

## Installation

```sh
yarn add qing-dialog
```

## Usage

Properties:

```typescript
// Dialog component: <qing-dialog>
class QingDialog {
  // Indicates whether the dialog is visible.
  isOpen: boolean;
  // The heading of the dialog.
  dialogTitle: string;
  // Bottom buttons of the dialog.
  buttons: Array<PresetButton | DialogButton>;

  // ------- Events -------

  // Fires when `isOpen` property changes.
  onIsOpenChange: CustomEvent<boolean>;
  // Fires when dialog button is clicked.
  onButtonClick: CustomEvent<DialogButton>;
}

// Core dialog component: <qing-dialog-core>
// Uses named slots to customize the content.
//   Supported slots: `header`, `content`, and `footer`.
class QingDialogCore {
  // Indicates whether the dialog is visible.
  isOpen: boolean;

  // ------- Events -------

  // Fires when `isOpen` property changes.
  onIsOpenChange: CustomEvent<boolean>;
}
```

CSS variables:

- `--max-width`: maximum width of the dialog, defaults to `100%` on small screens, `80%` on large screens.
- `--dialog-padding`: padding of the dialog.
- `--dialog-header-padding`, `--dialog-content-padding`, `--dialog-footer-padding` padding of different parts of the dialog.

### Build instructions

- `yarn dev` builds the project in dev mode
- `yarn build` builds and lints the project in production mode
- `yarn demo` runs the demo in browser (you have to build the project first)
