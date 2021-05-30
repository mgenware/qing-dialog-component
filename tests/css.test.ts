/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect } from 'qing-t';
import '../dist/main.js';
import { QingOverlay } from '../dist/main.js';
import { aTimeout } from './lib.js';

it('Internal overlay attrs', async () => {
  const el = await fixture<QingOverlay>(html` <qing-overlay open><p>test</p></qing-overlay> `);
  await aTimeout();

  const styles = window.getComputedStyle(el.shadowRoot!.querySelector('.overlay')!);
  expect(styles.display).to.eq('flex');
  expect(styles.flexDirection).to.eq('column');
  expect(styles.padding).to.eq('0px');
});

it('Internal overlay background attrs', async () => {
  const el = await fixture<QingOverlay>(html` <qing-overlay open><p>test</p></qing-overlay> `);
  await aTimeout();

  const styles = window.getComputedStyle(el.shadowRoot!.querySelector('.overlay-background')!);
  expect(styles.zIndex).to.eq('1000');
});

it('height = auto, width = full', async () => {
  const el = await fixture<QingOverlay>(html` <qing-overlay open><p>test</p></qing-overlay> `);
  await aTimeout();

  const rect = el.shadowRoot!.querySelector('.overlay')!.getBoundingClientRect();
  expect(rect.x).to.eq(0);
  expect(rect.y).to.greaterThan(0);
  expect(rect.width).to.greaterThan(0);
  expect(rect.height).to.greaterThan(0);
});

it('--overlay-z-index', async () => {
  const el = await fixture<QingOverlay>(
    html` <qing-overlay style="--overlay-z-index:99" open><p>test</p></qing-overlay> `,
  );
  await aTimeout();

  const styles = window.getComputedStyle(el.shadowRoot!.querySelector('.overlay-background')!);
  expect(styles.zIndex).to.eq('99');
});
