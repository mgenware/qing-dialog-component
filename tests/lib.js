export function kEvent(element, eventName, k) {
  if (!k || k < 0) {
    throw new Error(`"k" must be a positive number, got ${k}`);
  }
  return new Promise(resolve => {
    let count = 0;
    const events = [];
    function listener(ev) {
      count++;
      events.push(ev.detail);
      if (count >= k) {
        resolve(events);
        element.removeEventListener(eventName, listener);
      }
    }
    element.addEventListener(eventName, listener);
  });
}

export function aTimeout() {
  return new Promise(resolve => {
    setTimeout(resolve, 10);
  });
}
