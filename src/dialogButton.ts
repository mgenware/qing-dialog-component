export enum PresetButton {
  ok = 'ok',
  yes = 'yes',
  no = 'no',
  cancel = 'cancel',
}

export class DialogButton {
  constructor(
    public id: string,
    public text: string,
    public style: string,
    public isDefault: boolean,
    public isCancel: boolean,
  ) {}
}
