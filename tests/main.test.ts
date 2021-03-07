/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect, oneEvent } from 'qing-t';
import { aTimeout } from './lib';
import '../dist/main';
import { QingOverlay } from '../dist/main';

it('Core properties', async () => {
  const el = await fixture<QingOverlay>(html`
    <qing-overlay dialogTitle="Greetings" .buttons=${['ok']}><p>test</p></qing-overlay>
  `);

  expect(el.innerHTML).to.eq('<p>test</p>');
  expect(el.getAttribute('dialogTitle')).to.eq('Greetings');
});

it('shown', async () => {
  const el = (await fixture(html`
    <qing-overlay dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-overlay>
  `)) as QingOverlay;

  const shown = oneEvent(el, 'shown');
  el.open = true;
  await shown;

  expect(el.hasAttribute('open')).to.eq(true);
  expect(el.getAttribute('open')).to.eq('');
});

it('Dismissed programmatically', async () => {
  const el = await fixture<QingOverlay>(html`
    <qing-overlay dialogTitle="Title" .buttons=${['ok']} .cancelButtonIndex=${0} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-overlay>
  `);

  const closed = oneEvent(el, 'closed');
  el.open = true;
  await aTimeout();

  el.open = false;
  await closed;
});

it('Focus', async () => {
  const el = (await fixture(html`
    <qing-overlay dialogTitle="Title" .buttons=${['ok']}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-overlay>
  `)) as QingOverlay;

  el.addEventListener('requestFocus', () => {
    document.getElementById('textInput')!.focus();
  });
  el.open = true;
  await aTimeout();

  expect(document.activeElement).to.eq(document.getElementById('textInput'));
});

it('Reopen', async () => {
  const el = (await fixture(html`
    <qing-overlay dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-overlay>
  `)) as QingOverlay;

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
