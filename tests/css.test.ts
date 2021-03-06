/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect } from '@open-wc/testing';
import { buttonContainerClass, QingDialog } from '../dist/main';

it('Alignment defaults to centered', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${['ok']}><p>test</p></qing-dialog>
  `)) as QingDialog;

  expect(
    getComputedStyle(el.shadowRoot!.querySelector(`.${buttonContainerClass}`)!).justifyContent,
  ).to.eq('center');
});

it('--dialog-button-container-justify-content', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${['ok']}><p>test</p></qing-dialog>
  `)) as QingDialog;

  expect(
    getComputedStyle(el.shadowRoot!.querySelector(`.${buttonContainerClass}`)!).justifyContent,
  ).to.eq('center');
});

it('height = auto, width = full', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Greetings" open .buttons=${['ok']}><p>test</p></qing-dialog>
  `)) as QingDialog;

  const rect = el
    .shadowRoot!.querySelector('qing-dialog-core')!
    .shadowRoot!.querySelector('.overlay')!
    .getBoundingClientRect();
  expect(rect.x).to.eq(0);
  expect(rect.y).to.greaterThan(0);
  expect(rect.width).to.greaterThan(0);
  expect(rect.height).to.greaterThan(0);
});
