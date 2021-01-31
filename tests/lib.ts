export function kEvent(element: HTMLElement, eventName: string, k: number): Promise<unknown[]> {
  if (!k || k < 0) {
    throw new Error(`"k" must be a positive number, got ${k}`);
  }
  return new Promise((resolve) => {
    let count = 0;
    const details: unknown[] = [];
    function listener(ev: Event) {
      count++;
      details.push((ev as any).detail);
      if (count >= k) {
        resolve(details);
        element.removeEventListener(eventName, listener);
      }
    }
    element.addEventListener(eventName, listener);
  });
}

export function aTimeout() {
  return new Promise((resolve) => {
    setTimeout(resolve, 10);
  });
}
