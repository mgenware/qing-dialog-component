export enum PresetButton {
  ok = 1,
  yes,
  no,
  cancel,
}

export class DialogButton {
  constructor(
    public text: string,
    public style: string,
    public isDefault: boolean,
    public isCancel: boolean,
  ) {}
}
