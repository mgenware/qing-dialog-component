import { TemplateResult, html } from 'lit-element';
// eslint-disable-next-line import/no-extraneous-dependencies
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// A group of builtin dialog icons.
export type IconType = 'error' | 'success' | 'warning';

export interface IconOptions {
  type: IconType;
  size?: number;
  color?: string;
}

function defaultColorForIconType(type: IconType): string | null {
  switch (type) {
    case 'error':
      return '#e03d3d';
    case 'success':
      return '#3ba62d';
    case 'warning':
      return '#dba932';
    default:
      return null;
  }
}

function getSVGElementHTML(type: IconType, size: number, iconSVG: string, color?: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(iconSVG, 'image/svg+xml');
  const element = doc.documentElement;
  element.style.verticalAlign = 'middle';
  element.style.fill = color ?? defaultColorForIconType(type) ?? 'black';
  element.setAttribute('class', `icon-${type}`);
  element.setAttribute('width', size.toString());
  element.setAttribute('height', size.toString());
  return element.outerHTML;
}

function getIconSVG(type: IconType): string | null {
  switch (type) {
    case 'error':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';

    case 'success':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>';

    case 'warning':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';

    default:
      return null;
  }
}

export function iconElement(opts: IconOptions): TemplateResult {
  const { type } = opts;
  const iconSVG = getIconSVG(type);
  if (!iconSVG) {
    return html``;
  }
  const svgHTML = getSVGElementHTML(type, opts.size ?? 48, iconSVG, opts.color);

  return html`<span>${unsafeHTML(svgHTML)}</span>`;
}
