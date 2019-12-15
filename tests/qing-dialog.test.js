import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { PresetButton } from '../dist/main';

it('Core properties', async () => {
  const ele = await fixture(html`
    <qing-dialog dialogTitle="Greetings" .buttons=${[PresetButton.ok]}
      ><p>test</p></qing-dialog
    >
  `);

  expect(ele.innerHTML).to.eq('<p>test</p>');
});

it('click event', async () => {
  const ele = await fixture(html`
    <qing-dialog
      id="multiple-btns"
      dialogTitle="Title"
      .buttons=${[PresetButton.yes, PresetButton.no, PresetButton.cancel]}
    >
      <div>Hello World</div>
    </qing-dialog>
  `);

  const listener1 = oneEvent(ele, 'onButtonClick');
  ele.shadowRoot.querySelectorAll('.button-container > lit-button')[0].click();
  const { detail: detail1 } = await listener1;
  expect(detail1.text).to.eq('Yes');

  const listener2 = oneEvent(ele, 'onButtonClick');
  ele.shadowRoot.querySelectorAll('.button-container > lit-button')[1].click();
  const { detail: detail2 } = await listener2;
  expect(detail2.text).to.eq('No');
});

it('onIsOpenChange fires after the dialog is shown', async () => {
  const ele = await fixture(html`
    <qing-dialog
      id="focus"
      dialogTitle="Title"
      .buttons=${[PresetButton.ok]}
      }}
    >
      <div>Hello World</div>
      <form>
        <input type="text" value="name" id="textInput" />
      </form>
    </qing-dialog>
  `);

  const listener = oneEvent(ele, 'onIsOpenChange');
  ele.setAttribute('isOpen', '');
  const { detail } = await listener;
  expect(detail).to.deep.eq({ isOpen: true });
});
