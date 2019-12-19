export type PresetButtonType = 'ok' | 'yes' | 'no' | 'cancel';

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
