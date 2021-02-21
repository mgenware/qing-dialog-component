/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { aTimeout } from './lib';
import { buttonContainerClass, QingDialog, CloseReason } from '../dist/main';

const allButtonsSel = `.${buttonContainerClass} > qing-button`;

it('Button click event', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['yes', 'no', 'cancel']}>
      <div>Hello World</div>
    </qing-dialog>
  `)) as QingDialog;

  const listener1 = oneEvent(el, 'buttonClick');
  (el.shadowRoot!.querySelectorAll(allButtonsSel)[0] as HTMLElement).click();
  const { detail: detail1 } = await listener1;
  expect(detail1).to.deep.eq({
    type: 'yes',
    text: 'Yes',
  });

  const listener2 = oneEvent(el, 'buttonClick');
  (el.shadowRoot!.querySelectorAll(allButtonsSel)[1] as HTMLElement).click();
  const { detail: detail2 } = await listener2;
  expect(detail2).to.deep.eq({
    type: 'no',
    text: 'No',
  });
});

it('Dismissed by button', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok']} }}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  el.open = true;
  await aTimeout();
  const closed = oneEvent(el, 'closed');

  (el.shadowRoot!.querySelectorAll(allButtonsSel)[0] as HTMLElement).click();
  await closed;

  expect(el.hasAttribute('open')).to.eq(false);
  expect(el.closeReason).to.eq(CloseReason.button);
  expect(el.closeReasonData).to.deep.eq({
    type: 'ok',
    text: 'OK',
  });
});

it('Set a `defaultButtonIndex`', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok', 'no', 'cancel']} .defaultButtonIndex=${2}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  el.open = true;
  await aTimeout();

  expect(el.shadowRoot!.activeElement).to.eq(el.shadowRoot!.querySelectorAll(allButtonsSel)[2]);
});

it('`defaultButtonIndex` defaults to 0', async () => {
  const el = (await fixture(html`
    <qing-dialog dialogTitle="Title" .buttons=${['ok', 'no']}>
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `)) as QingDialog;

  el.open = true;
  await aTimeout();

  expect(el.shadowRoot!.activeElement).to.eq(el.shadowRoot!.querySelectorAll(allButtonsSel)[0]);
});
