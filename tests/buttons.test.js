import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { PresetButton } from '../dist/main';

it('Button click event', async () => {
  const el = await fixture(html`
    <qing-dialog
      dialogTitle="Title"
      .buttons=${[PresetButton.yes, PresetButton.no, PresetButton.cancel]}
    >
      <div>Hello World</div>
    </qing-dialog>
  `);

  const listener1 = oneEvent(el, 'onButtonClick');
  el.shadowRoot.querySelectorAll('.button-container > lit-button')[0].click();
  const { detail: detail1 } = await listener1;
  expect(detail1.text).to.eq('Yes');

  const listener2 = oneEvent(el, 'onButtonClick');
  el.shadowRoot.querySelectorAll('.button-container > lit-button')[1].click();
  const { detail: detail2 } = await listener2;
  expect(detail2.text).to.eq('No');
});
