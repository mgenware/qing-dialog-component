import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { kEvent, aTimeout } from './lib';
import '../dist/main';

it('Core properties', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${['ok']}
      ><p>test</p></qing-dialog
    >
  `);

  expect(el.innerHTML).to.eq('<p>test</p>');
  expect(el.getAttribute('dialogTitle')).to.eq('Greetings');
});

it('isOpenChanged fires after the dialog is shown', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const listener = oneEvent(el, 'isOpenChanged');
  el.setAttribute('isOpen', '');
  const { detail } = await listener;

  expect(detail).to.deep.eq({ isOpen: true });
  expect(el.hasAttribute('isOpen')).to.eq(true);
  expect(el.getAttribute('isOpen')).to.eq('');
});

it('Dismissed by Esc', async () => {
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

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  const events = await listener;
  expect(el.hasAttribute('isOpen')).to.eq(false);
  expect(events[0]).to.deep.eq({ isOpen: true });
  expect(events[1]).to.deep.eq({
    isOpen: false,
    isCancelled: true,
  });
});

it('Focus', async () => {
  const el = await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  el.addEventListener('isOpenChanged', e => {
    if (e.detail) {
      document.getElementById('textInput').focus();
    }
  });
  el.setAttribute('isOpen', '');
  await aTimeout();

  expect(document.activeElement).to.eq(document.getElementById('textInput'));
});
