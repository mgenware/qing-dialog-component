/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html, fixture, expect } from 'qing-t';
import '../dist/main';
import { QingOverlay } from '../dist/main';
import { aTimeout } from './lib';

it('height = auto, width = full', async () => {
  const el = await fixture<QingOverlay>(html` <qing-overlay open><p>test</p></qing-overlay> `);
  await aTimeout();

  const rect = el.shadowRoot!.querySelector('.overlay')!.getBoundingClientRect();
  expect(rect.x).to.eq(0);
  expect(rect.y).to.greaterThan(0);
  expect(rect.width).to.greaterThan(0);
  expect(rect.height).to.greaterThan(0);
});

it('Inner overlay has flex attrs set', async () => {
  const el = await fixture<QingOverlay>(html` <qing-overlay open><p>test</p></qing-overlay> `);
  await aTimeout();

  const styles = window.getComputedStyle(el.shadowRoot!.querySelector('.overlay')!);
  expect(styles.display).to.eq('flex');
  expect(styles.flexDirection).to.eq('column');
});
