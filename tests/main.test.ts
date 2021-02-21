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

it('openChanged, shown', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  const open = oneEvent(el, 'openChanged');
  const shown = oneEvent(el, 'shown');
  el.open = true;
  const events = await Promise.all([open, shown]);

  // Both openChanged and shown have the same event args.
  expect(events[0].detail).to.deep.eq({ open: true });
  expect(events[1].detail).to.deep.eq({ open: true });
  expect(el.hasAttribute('open')).to.eq(true);
  expect(el.getAttribute('open')).to.eq('');
});

it('Dismissed by button, openChanged, closed', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  el.addEventListener('openChanged', () => {
    // Make sure button is not focused.
    document.getElementById('textInput')!.focus();
  });

  const open = kEvent(el, 'openChanged', 2);
  const closed = oneEvent(el, 'closed');
  el.open = true;
  await aTimeout();

  (el.shadowRoot!.querySelectorAll(allButtonsSel)[0] as HTMLElement).click();

  const openEvents = await open;
  expect(el.hasAttribute('open')).to.eq(false);
  expect(openEvents[0]).to.deep.eq({ open: true });
  expect(openEvents[1]).to.deep.eq({
    open: false,
    button: {
      text: 'OK',
      type: 'ok',
    },
  });

  const closedEvent = await closed;
  // Both openChanged and closed have the same event args.
  expect(closedEvent.detail).to.deep.eq({
    open: false,
    button: {
      text: 'OK',
      type: 'ok',
    },
  });
});

it('Dismissed by a cancel button and Esc, openChanged, closed', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} .cancelButtonIndex=${0} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  el.addEventListener('openChanged', () => {
    // Make sure button is not focused.
    document.getElementById('textInput')!.focus();
  });

  const open = kEvent(el, 'openChanged', 2);
  const closed = oneEvent(el, 'closed');
  el.open = true;
  await aTimeout();

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  const openEvents = await open;
  expect(el.hasAttribute('open')).to.eq(false);
  expect(openEvents[0]).to.deep.eq({ open: true });
  expect(openEvents[1]).to.deep.eq({
    open: false,
    button: {
      text: 'OK',
      type: 'ok',
    },
  });

  const closedEvent = await closed;
  // Both openChanged and closed have the same event args.
  expect(closedEvent.detail).to.deep.eq({
    open: false,
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

  const open = oneEvent(el, 'openChanged');
  el.open = true;
  await aTimeout();

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  await open;
  expect(el.hasAttribute('open')).to.eq(true);
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

  const open = kEvent(el, 'openChanged', 2);
  const closed = oneEvent(el, 'closed');
  el.open = true;
  await aTimeout();

  el.open = false;

  const openEvents = await open;
  expect(el.hasAttribute('open')).to.eq(false);
  expect(openEvents[0]).to.deep.eq({ open: true });
  expect(openEvents[1]).to.deep.eq({ open: false });

  const closedEvent = await closed;
  // Both openChanged and closed have the same event args.
  expect(closedEvent.detail).to.deep.eq({ open: false });
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

  el.addEventListener('openChanged', () => {
    document.getElementById('textInput')!.focus();
  });
  el.open = true;
  await aTimeout();

  expect(document.activeElement).to.eq(document.getElementById('textInput'));
});
