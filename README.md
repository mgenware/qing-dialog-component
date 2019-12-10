# qing-dialog

Dialog component for [qing](https://github.com/mgenware/qing), built with lit-element.

## Installation

```sh
yarn add qing-dialog
```

## Usage

Properties:

```typescript
class QingDialog {
  isOpen: boolean;
}
```

CSS variables:

- `--min-width`: minimum width of dialog view.

### Development

- `yarn dev` build the project in dev mode
- `yarn build` build and lint the project in production mode
- `yarn demo` run the demo in browser (you have to build the project first)
