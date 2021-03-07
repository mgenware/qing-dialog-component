# qing-overlay (WIP)

[![Build Status](https://github.com/mgenware/qing-overlay/workflows/Build/badge.svg)](https://github.com/mgenware/qing-overlay/actions)
[![Pages Status](https://github.com/mgenware/qing-overlay/workflows/Pages/badge.svg)](https://github.com/mgenware/qing-overlay/actions)
[![npm version](https://img.shields.io/npm/v/qing-overlay.svg?style=flat-square)](https://npmjs.com/package/qing-overlay)
[![Node.js Version](http://img.shields.io/node/v/qing-overlay.svg?style=flat-square)](https://nodejs.org/en/)

Display an overlay on screen

## Demo

[Demo](https://mgenware.github.io/qing-overlay/)

## Installation

> qing-overlay is based on lit-element

```sh
yarn add qing-overlay lit-element
```

## Usage

### A minimal example

```html
<qing-overlay>
  <h2>Title</h2>
  <p>Hello world</p>
</qing-overlay>
```

### Overlay size

Overlay size is fully customizable. By default, height defaults to auto (fits content size), width defaults to `100vw` (mobile first design). You might need to add some CSS to fit your use case. Some examples:

```css
/** Example 1 **/
/** 80% of screen width on medium or large screens */
@media (min-width: 768px) {
  qing-overlay::part(overlay) {
    width: 80%;
  }
}

/** Example 2 **/
/** Auto width with min and max values on medium or large screens */
@media (min-width: 768px) {
  qing-overlay::part(overlay) {
    width: auto;
    max-width: min(100vw, 1000px);
    min-width: 400px;
  }
}

/** Example 3 **/
/** Fullscreen dialog with margins **/
qing-overlay::part(overlay) {
  width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
}
@media (min-width: 768px) {
  qing-overlay::part(overlay) {
    width: calc(100vw - 4rem);
    height: calc(100vh - 4rem);
  }
}
```

### Attributes

- `open`: `boolean` indicates whether the overlay is open. Default is `false`.

### Events

```ts
class QingOverlay {
  // Fires whenever `open` attribute changes.
  openChanged: CustomEvent<boolean>;
  // Fires when Esc key is pressed when overlay has focus.
  escKeyDown: CustomEvent;
  // Fires when Enter key is pressed when overlay has focus.
  enterKeyDown: CustomEvent;
}
```

### CSS Shadow Parts

- `overlay-background` the background view of the overlay.
- `overlay` the overlay itself.

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
