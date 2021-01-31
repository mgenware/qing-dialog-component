/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { kEvent, aTimeout } from './lib';
import { buttonContainerClass, QingDialog } from '../dist/main';

const allButtonsSel = `.${buttonContainerClass} > qing-button`;

it('Core properties', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${['ok']}><p>test</p></qing-dialog>
  `)) as QingDialog;

  expect(el.innerHTML).to.eq('<p>test</p>');
  expect(el.getAttribute('dialogTitle')).to.eq('Greetings');
  expect(el.defaultButtonIndex).to.eq(0);
  expect(el.cancelButtonIndex).to.eq(undefined);
});

it('isOpenChanged, shown', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  const isOpen = oneEvent(el, 'isOpenChanged');
  const shown = oneEvent(el, 'shown');
  el.isOpen = true;
  const events = await Promise.all([isOpen, shown]);

  // Both isOpenChanged and shown have the same event args.
  expect(events[0].detail).to.deep.eq({ isOpen: true });
  expect(events[1].detail).to.deep.eq({ isOpen: true });
  expect(el.hasAttribute('isOpen')).to.eq(true);
  expect(el.getAttribute('isOpen')).to.eq('');
});

it('Dismissed by button, isOpenChanged, closed', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  el.addEventListener('isOpenChanged', (e: any) => {
    if (e.detail) {
      // Make sure button is not focused.
      document.getElementById('textInput')!.focus();
    }
  });

  const isOpen = kEvent(el, 'isOpenChanged', 2);
  const closed = oneEvent(el, 'closed');
  el.isOpen = true;
  await aTimeout();

  (el.shadowRoot!.querySelectorAll(allButtonsSel)[0] as HTMLElement).click();

  const isOpenEvents = await isOpen;
  expect(el.hasAttribute('isOpen')).to.eq(false);
  expect(isOpenEvents[0]).to.deep.eq({ isOpen: true });
  expect(isOpenEvents[1]).to.deep.eq({
    isOpen: false,
    button: {
      text: 'OK',
      type: 'ok',
    },
  });

  const closedEvent = await closed;
  // Both isOpenChanged and closed have the same event args.
  expect(closedEvent.detail).to.deep.eq({
    isOpen: false,
    button: {
      text: 'OK',
      type: 'ok',
    },
  });
});

it('Dismissed by a cancel button and Esc, isOpenChanged, closed', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} .cancelButtonIndex=${0} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  el.addEventListener('isOpenChanged', (e: any) => {
    if (e.detail) {
      // Make sure button is not focused.
      document.getElementById('textInput')!.focus();
    }
  });

  const isOpen = kEvent(el, 'isOpenChanged', 2);
  const closed = oneEvent(el, 'closed');
  el.isOpen = true;
  await aTimeout();

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  const isOpenEvents = await isOpen;
  expect(el.hasAttribute('isOpen')).to.eq(false);
  expect(isOpenEvents[0]).to.deep.eq({ isOpen: true });
  expect(isOpenEvents[1]).to.deep.eq({
    isOpen: false,
    button: {
      text: 'OK',
      type: 'ok',
    },
  });

  const closedEvent = await closed;
  // Both isOpenChanged and closed have the same event args.
  expect(closedEvent.detail).to.deep.eq({
    isOpen: false,
    button: {
      text: 'OK',
      type: 'ok',
    },
  });
});

it('Cannot be dismissed by Esc when no cancel button is present', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok', 'cancel']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  const isOpen = oneEvent(el, 'isOpenChanged');
  el.isOpen = true;
  await aTimeout();

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  await isOpen;
  expect(el.hasAttribute('isOpen')).to.eq(true);
});

it('Dismissed programmatically', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} .cancelButtonIndex=${0} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  const isOpen = kEvent(el, 'isOpenChanged', 2);
  const closed = oneEvent(el, 'closed');
  el.isOpen = true;
  await aTimeout();

  el.isOpen = false;

  const isOpenEvents = await isOpen;
  expect(el.hasAttribute('isOpen')).to.eq(false);
  expect(isOpenEvents[0]).to.deep.eq({ isOpen: true });
  expect(isOpenEvents[1]).to.deep.eq({ isOpen: false });

  const closedEvent = await closed;
  // Both isOpenChanged and closed have the same event args.
  expect(closedEvent.detail).to.deep.eq({ isOpen: false });
});

it('Focus', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  el.addEventListener('isOpenChanged', (e: any) => {
    if (e.detail) {
      document.getElementById('textInput')!.focus();
    }
  });
  el.isOpen = true;
  await aTimeout();

  expect(document.activeElement).to.eq(document.getElementById('textInput'));
});
