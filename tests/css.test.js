import { html, fixture, expect } from '@open-wc/testing';
import { buttonContainerClass } from '../dist/main';

it('Alignment defaults to centered', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${['ok']}
      ><p>test</p></qing-dialog
    >
  `);

  expect(
    getComputedStyle(el.shadowRoot.querySelector(`.${buttonContainerClass}`))
      .justifyContent,
  ).to.eq('center');
});

it('--dialog-button-container-justify-content', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${['ok']}
      ><p>test</p></qing-dialog
    >
  `);
  expect(
    getComputedStyle(el.shadowRoot.querySelector(`.${buttonContainerClass}`))
      .justifyContent,
  ).to.eq('center');
});
