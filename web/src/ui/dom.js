/** Tiny DOM helpers shared by every screen. */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'dataset' && typeof value === 'object') Object.assign(node.dataset, value);
    else node.setAttribute(key, value === true ? '' : String(value));
  }
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(typeof child === 'string' || typeof child === 'number' ? document.createTextNode(String(child)) : child);
  }
  return node;
}

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function clear(node) {
  while (node && node.firstChild) node.removeChild(node.firstChild);
  return node;
}

export function bar(fraction, className = '') {
  const width = Math.max(0, Math.min(1, fraction)) * 100;
  return el('div', { class: `bar ${className}` }, [el('i', { style: { width: `${width}%` } })]);
}

export function statRow(label, value, max = 99) {
  return el('div', { class: 'stat-row' }, [
    el('span', { class: 'stat-label', text: label }),
    el('span', { class: 'stat-value', text: String(value) }),
    bar(value / max, value >= 80 ? 'good' : value >= 60 ? 'mid' : 'low'),
  ]);
}

/** Formats numbers with thin separators: 12500 -> 12 500 */
export function money(value) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatClockShort(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function vibrate(ms = 20) {
  if (navigator.vibrate) {
    try { navigator.vibrate(ms); } catch { /* not supported */ }
  }
}

/** Adds a press animation + click sound to any button. */
export function bindButton(node, handler, { audio = null, sound = 'click' } = {}) {
  let pressed = false;
  const down = () => {
    pressed = true;
    node.classList.add('pressed');
  };
  const cancel = () => {
    pressed = false;
    node.classList.remove('pressed');
  };
  node.classList.add('btn');
  node.addEventListener('pointerdown', down);
  node.addEventListener('pointerleave', cancel);
  node.addEventListener('pointercancel', cancel);
  node.addEventListener('click', (event) => {
    node.classList.remove('pressed');
    node.classList.add('clicked');
    setTimeout(() => node.classList.remove('clicked'), 180);
    if (audio && sound) audio.play(sound);
    vibrate(12);
    if (pressed || event.detail === 0) handler(event);
    pressed = false;
  });
  return node;
}
