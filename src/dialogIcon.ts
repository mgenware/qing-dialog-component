// A group of builtin dialog icons.
export type DialogIconType = 'error' | 'success' | 'warning';
const IconSize = 50;

function defaultColorForIconType(type: DialogIconType): string {
  switch (type) {
    case 'error':
      return '#e03d3d';
    case 'success':
      return '#3ba62d';
    case 'warning':
      return '#dba932';
  }
}

export class DialogIconData {
  public svg: string;

  constructor(public type: DialogIconType, public size: number, svg: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const element = doc.documentElement;
    element.style.verticalAlign = 'middle';
    element.style.fill = defaultColorForIconType(type);
    element.setAttribute('width', size.toString());
    element.setAttribute('height', size.toString());
    this.svg = element.outerHTML;
  }
}

export function iconTypeToData(type: DialogIconType): DialogIconData | null {
  switch (type) {
    case 'error':
      return new DialogIconData(
        type,
        IconSize,
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`,
      );

    case 'success':
      return new DialogIconData(
        type,
        IconSize,
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>`,
      );

    case 'warning':
      return new DialogIconData(
        type,
        IconSize,
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
      );
  }
  return null;
}
