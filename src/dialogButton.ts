// A more customized button.
export interface DialogButton {
  // One of the preset types of the button, see PresetButtonType.
  type?: string;
  // Used to identify a button if `type` is not set.
  name?: string;
  // Button content.
  text?: string;
  // qing-button style.
  style?: string;
}
