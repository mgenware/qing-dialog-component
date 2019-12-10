# qing-dialog (WIP)

Dialog component for [qing](https://github.com/mgenware/qing), built with lit-element.

**Work in progress, not released yet, stay tuned!**

## Installation

```sh
yarn add qing-dialog
```

## Usage

Properties:

```typescript
// Dialog component - <qing-dialog>.
class QingDialog {
  // Indicates whether the dialog is visible.
  isOpen: boolean;
  // The heading of the dialog.
  dialogTitle: string;
  // Bottom buttons of the dialog.
  buttons: Array<PresetButton | DialogButton>;
}

// Core dialog component - <qing-dialog-core>
// Use named slot to customize content.
// Supported slots: `header`, `content`, and `footer`.
class QingDialogCore {
  // Indicates whether the dialog is visible.
  isOpen: boolean;
}
```

CSS variables:

- `--min-width`: minimum width of dialog view.

### Development

- `yarn dev` build the project in dev mode
- `yarn build` build and lint the project in production mode
- `yarn demo` run the demo in browser (you have to build the project first)
