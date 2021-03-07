/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect } from 'qing-t';
import { QingOverlay } from '../dist/main';

it('height = auto, width = full', async () => {
  const el = (await fixture(html`
    <qing-overlay dialogTitle="Greetings" open .buttons=${['ok']}><p>test</p></qing-overlay>
  `)) as QingOverlay;

  const rect = el
    .shadowRoot!.querySelector('qing-overlay-core')!
    .shadowRoot!.querySelector('.overlay')!
    .getBoundingClientRect();
  expect(rect.x).to.eq(0);
  expect(rect.y).to.greaterThan(0);
  expect(rect.width).to.greaterThan(0);
  expect(rect.height).to.greaterThan(0);
});
