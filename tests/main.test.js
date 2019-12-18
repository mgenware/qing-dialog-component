import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { kEvent, aTimeout } from './lib';
import { PresetButton } from '../dist/main';

it('Core properties', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${[PresetButton.ok]}
      ><p>test</p></qing-dialog
    >
  `);

  expect(el.innerHTML).to.eq('<p>test</p>');
});

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

it('onIsOpenChange fires after the dialog is shown', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${[PresetButton.ok]} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const listener = oneEvent(el, 'onIsOpenChange');
  el.setAttribute('isOpen', '');
  const { detail } = await listener;

  expect(detail).to.deep.eq({ isOpen: true });
  expect(el.hasAttribute('isOpen')).to.eq(true);
  expect(el.getAttribute('isOpen')).to.eq('');
});

it('Dismissed by button', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${[PresetButton.ok]} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const listener = kEvent(el, 'onIsOpenChange', 2);
  el.setAttribute('isOpen', '');
  await aTimeout();

  el.shadowRoot.querySelectorAll('.button-container > lit-button')[0].click();

  const events = await listener;
  expect(el.hasAttribute('isOpen')).to.eq(false);
  expect(events[0]).to.deep.eq({ isOpen: true });
  expect(events[1]).to.deep.eq({
    isOpen: false,
    button: {
      id: 'ok',
      isCancel: false,
      isDefault: false,
      style: '',
      text: 'OK',
    },
  });
});

it('Dismissed by Esc', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${[PresetButton.ok]} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const listener = kEvent(el, 'onIsOpenChange', 2);
  el.setAttribute('isOpen', '');
  await aTimeout();

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  const events = await listener;
  expect(el.hasAttribute('isOpen')).to.eq(false);
  expect(events[0]).to.deep.eq({ isOpen: true });
  expect(events[1]).to.deep.eq({
    isOpen: false,
    isCancelled: true,
  });
});
