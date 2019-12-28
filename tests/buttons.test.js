import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { kEvent, aTimeout } from './lib';
import { buttonContainerClass } from '../dist/main';

const allButtonsSel = `.${buttonContainerClass} > lit-button`;

it('Button click event', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['yes', 'no', 'cancel']}>
      <div>Hello World</div>
    </qing-dialog>
  `);

  const listener1 = oneEvent(el, 'buttonClick');
  el.shadowRoot.querySelectorAll(allButtonsSel)[0].click();
  const { detail: detail1 } = await listener1;
  expect(detail1).to.deep.eq({
    type: 'yes',
    text: 'Yes',
  });

  const listener2 = oneEvent(el, 'buttonClick');
  el.shadowRoot.querySelectorAll(allButtonsSel)[1].click();
  const { detail: detail2 } = await listener2;
  expect(detail2).to.deep.eq({
    type: 'no',
    text: 'No',
  });
});

it('Dismissed by button', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const listener = kEvent(el, 'isOpenChanged', 2);
  el.setAttribute('isOpen', '');
  await aTimeout();

  el.shadowRoot.querySelectorAll(allButtonsSel)[0].click();

  const events = await listener;
  expect(el.hasAttribute('isOpen')).to.eq(false);
  expect(events[0]).to.deep.eq({ isOpen: true });
  expect(events[1]).to.deep.eq({
    isOpen: false,
    button: {
      type: 'ok',
      text: 'OK',
    },
  });
});

it('Set a `defaultButtonIndex`', async () => {
  const el = await fixture(html`
    <qing-dialog
      dialogTitle="Title"
      .buttons=${['ok', 'no', 'cancel']}
      .defaultButtonIndex=${2}
    >
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  el.setAttribute('isOpen', '');
  await aTimeout();

  expect(el.shadowRoot.activeElement).to.eq(
    el.shadowRoot.querySelectorAll(allButtonsSel)[2],
  );
});

it('`defaultButtonIndex` defaults to 0', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok', 'no']}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  el.setAttribute('isOpen', '');
  await aTimeout();

  expect(el.shadowRoot.activeElement).to.eq(
    el.shadowRoot.querySelectorAll(allButtonsSel)[0],
  );
});
