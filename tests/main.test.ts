/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { aTimeout } from './lib';
import { DialogButton, QingDialog } from '../dist/main';

it('Core properties', async () => {
  const el = await fixture<QingDialog>(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${['ok']}><p>test</p></qing-dialog>
  `);

  expect(el.innerHTML).to.eq('<p>test</p>');
  expect(el.getAttribute('dialogTitle')).to.eq('Greetings');
  expect(el.defaultButtonIndex).to.eq(0);
  expect(el.cancelButtonIndex).to.eq(undefined);
});

it('shown', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  const shown = oneEvent(el, 'shown');
  el.open = true;
  await shown;

  expect(el.hasAttribute('open')).to.eq(true);
  expect(el.getAttribute('open')).to.eq('');
});

it('Dismissed by Esc', async () => {
  const el = await fixture<QingDialog>(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} .cancelButtonIndex=${0} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const closed = oneEvent(el, 'closed');
  el.open = true;
  await aTimeout();

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  const e = await closed;
  expect(el.hasAttribute('open')).to.eq(false);

  const detail = e.detail as DialogButton;
  // Cancel button gets clicked when Esc is down.
  expect(detail).to.deep.eq({ type: 'ok', text: 'OK' });
});

it('Cannot be dismissed by Esc when no cancel button is present', async () => {
  const el = await fixture<QingDialog>(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok', 'cancel']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const open = oneEvent(el, 'shown');
  el.open = true;
  await aTimeout();

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  await open;
  expect(el.hasAttribute('open')).to.eq(true);
});

it('Dismissed programmatically', async () => {
  const el = await fixture<QingDialog>(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} .cancelButtonIndex=${0} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const closed = oneEvent(el, 'closed');
  el.open = true;
  await aTimeout();

  el.open = false;
  const e = await closed;
  const detail = e.detail as DialogButton;
  expect(el.hasAttribute('open')).to.eq(false);
  expect(detail).to.eq(null);
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

  el.addEventListener('requestFocus', () => {
    document.getElementById('textInput')!.focus();
  });
  el.open = true;
  await aTimeout();

  expect(document.activeElement).to.eq(document.getElementById('textInput'));
});

it('Reopen', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  const shown = oneEvent(el, 'shown');
  el.open = true;
  await shown;

  const closed = oneEvent(el, 'closed');
  el.open = false;
  await closed;

  const reopen = oneEvent(el, 'shown');
  el.open = true;
  await reopen;

  expect(el.hasAttribute('open')).to.eq(true);
  expect(el.getAttribute('open')).to.eq('');
});
