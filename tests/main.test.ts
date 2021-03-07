/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect, oneEvent } from 'qing-t';
import '../dist/main';
import { QingOverlay } from '../dist/main';
import { aTimeout } from './lib';

const openChanged = 'openChanged';
const escKeyDown = 'escKeyDown';
const enterKeyDown = 'enterKeyDown';

it('Default state', async () => {
  const el = await fixture<QingOverlay>(html` <qing-overlay><p>test</p></qing-overlay> `);

  expect(el.innerHTML).to.eq('<p>test</p>');
  expect(el.getAttribute('open')).to.eq(null);
});

it('openChanged', async () => {
  const el = (await fixture(html`
    <qing-overlay>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-overlay>
  `)) as QingOverlay;

  const shown = oneEvent(el, openChanged);
  el.open = true;
  let e = await shown;
  expect(e.detail).to.eq(true);
  expect(el.getAttribute('open')).to.eq('');

  const closed = oneEvent(el, openChanged);
  el.open = false;
  e = await closed;
  expect(e.detail).to.eq(false);
  expect(el.getAttribute('open')).to.eq(null);

  const reopen = oneEvent(el, openChanged);
  el.open = true;
  e = await reopen;
  expect(e.detail).to.eq(true);
  expect(el.getAttribute('open')).to.eq('');
});

it('Keydown events', async () => {
  const el = (await fixture(html`
    <qing-overlay open>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-overlay>
  `)) as QingOverlay;

  await aTimeout();

  const escDown = oneEvent(el, escKeyDown);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  await escDown;

  const enterDown = oneEvent(el, enterKeyDown);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  await enterDown;
});
