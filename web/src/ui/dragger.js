/**
 * Pointer drag + tap helper used by the team builder, player lists and any
 * other screen that supports drag-to-swap. Works with touch, pen and mouse via
 * Pointer Events and falls back to plain taps on tiny targets.
 */
export class Dragger {
  constructor() {
    this.dragging = null;
    this.ghost = null;
    this.onMove = this.onMove.bind(this);
    this.onUp = this.onUp.bind(this);
  }

  attach(node, handlers = {}) {
    node.classList.add('draggable');
    const start = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      const rect = node.getBoundingClientRect();
      this.dragging = {
        node,
        handlers,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
        pointerId: event.pointerId,
        offsetX: event.clientX - rect.left - rect.width / 2,
        offsetY: event.clientY - rect.top - rect.height / 2,
      };
      node.setPointerCapture && node.setPointerCapture(event.pointerId);
      window.addEventListener('pointermove', this.onMove, { passive: false });
      window.addEventListener('pointerup', this.onUp);
      window.addEventListener('pointercancel', this.onUp);
      if (handlers.onDragStart) handlers.onDragStart(node);
    };
    node.addEventListener('pointerdown', start);
    node._dragStart = start;
  }

  onMove(event) {
    const drag = this.dragging;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 8) return;
    if (!drag.moved) {
      drag.moved = true;
      drag.node.classList.add('dragging');
      this.createGhost(drag);
    }
    if (this.ghost) {
      this.ghost.style.left = `${event.clientX - drag.offsetX}px`;
      this.ghost.style.top = `${event.clientY - drag.offsetY}px`;
    }
    this.highlight(event.clientX, event.clientY);
    event.preventDefault();
  }

  createGhost(drag) {
    const ghost = drag.node.cloneNode(true);
    const rect = drag.node.getBoundingClientRect();
    ghost.classList.add('drag-ghost');
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.appendChild(ghost);
    this.ghost = ghost;
  }

  highlight(x, y) {
    if (!this.ghost) return;
    this.ghost.style.display = 'none';
    const target = document.elementFromPoint(x, y);
    this.ghost.style.display = '';
    const slot = target && target.closest ? target.closest('.pitch-slot, .slot-drop, [data-slot]') : null;
    if (this.lastHighlight && this.lastHighlight !== slot) this.lastHighlight.classList.remove('drop-target');
    if (slot) {
      slot.classList.add('drop-target');
      this.lastHighlight = slot;
    }
  }

  onUp(event) {
    const drag = this.dragging;
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    window.removeEventListener('pointercancel', this.onUp);
    if (!drag) return;
    this.dragging = null;
    drag.node.classList.remove('dragging');
    if (this.ghost) {
      this.ghost.remove();
      this.ghost = null;
    }
    if (this.lastHighlight) {
      this.lastHighlight.classList.remove('drop-target');
    }
    if (!drag.moved) {
      if (drag.handlers.onTap) drag.handlers.onTap(drag.node);
      return;
    }
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const slot = target && target.closest ? target.closest('.pitch-slot, [data-slot]') : null;
    if (slot && slot.dataset.slot !== undefined && drag.handlers.onDrop) {
      drag.handlers.onDrop(slot.dataset.slot, slot);
    } else if (target && drag.handlers.onDropNode) {
      drag.handlers.onDropNode(target);
    }
  }

  dispose() {
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    window.removeEventListener('pointercancel', this.onUp);
  }
}

export default Dragger;
