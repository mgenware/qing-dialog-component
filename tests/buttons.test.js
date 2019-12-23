import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../dist/main';

it('Button click event', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['yes', 'no', 'cancel']}>
      <div>Hello World</div>
    </qing-dialog>
  `);

  const listener1 = oneEvent(el, 'onButtonClick');
  el.shadowRoot.querySelectorAll('.button-container > lit-button')[0].click();
  const { detail: detail1 } = await listener1;
  expect(detail1).to.deep.eq({
    type: 'yes',
    text: 'Yes',
  });

  const listener2 = oneEvent(el, 'onButtonClick');
  el.shadowRoot.querySelectorAll('.button-container > lit-button')[1].click();
  const { detail: detail2 } = await listener2;
  expect(detail2).to.deep.eq({
    type: 'no',
    text: 'No',
  });
});
