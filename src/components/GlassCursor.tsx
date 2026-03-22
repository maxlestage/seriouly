import { useEffect, useRef, useState } from 'react';
import './GlassCursor.css';

const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const TEXT_TAGS = new Set([
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'span', 'li', 'a', 'button', 'label', 'strong', 'em',
]);

function findTextAncestor(el: Element | null): HTMLElement | null {
  let node: Element | null = el;
  while (node && node !== document.body) {
    if (TEXT_TAGS.has(node.tagName.toLowerCase())) return node as HTMLElement;
    node = node.parentElement;
  }
  return null;
}

// Styles that may come from ancestor selectors and need explicit copying
const INHERITED = [
  'text-align', 'color', 'font-size', 'font-family', 'font-weight',
  'font-style', 'line-height', 'letter-spacing', 'word-spacing',
  '-webkit-text-fill-color', 'background-clip', '-webkit-background-clip',
  'background-image', 'background',
];

const GlassCursor = () => {
  const cursorRef     = useRef<HTMLDivElement>(null);
  const innerRef      = useRef<HTMLDivElement>(null);
  const trailRef      = useRef<HTMLDivElement>(null);
  const trailInnerRef = useRef<HTMLDivElement>(null);
  const pos      = useRef({ x: -200, y: -200 });
  const trailPos = useRef({ x: -200, y: -200 });
  const raf      = useRef<number>(0);
  const zoomedEl = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  if (isTouchDevice()) return null;

  useEffect(() => {
    // position:fixed overlay — escapes every overflow:hidden/clip in the tree
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;pointer-events:none;z-index:9997;opacity:0;transition:opacity 0.1s ease;overflow:visible;';
    document.body.appendChild(overlay);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const handleMouseLeave = () => {
      setVisible(false);
      overlay.style.opacity = '0';
      zoomedEl.current = null;
    };
    const handleMouseEnter = () => setVisible(true);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.1;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.1;

      if (trailRef.current) {
        trailRef.current.style.transform =
          `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }

      // Hit-test at actual cursor position (not trail — no lag)
      const el = document.elementFromPoint(pos.current.x, pos.current.y);
      const target = findTextAncestor(el);

      if (target) {
        const rect = target.getBoundingClientRect();
        const ox = pos.current.x - rect.left;
        const oy = pos.current.y - rect.top;

        // Rebuild clone only when we move to a new element
        if (target !== zoomedEl.current) {
          const clone = target.cloneNode(true) as HTMLElement;
          // Copy ancestor-inherited styles so clone looks right outside its original context
          const cs = getComputedStyle(target);
          INHERITED.forEach(p => {
            try { clone.style.setProperty(p, cs.getPropertyValue(p)); } catch { /* skip */ }
          });
          clone.style.margin = '0';
          clone.style.transform = 'none';
          clone.style.transition = 'none';
          overlay.innerHTML = '';
          overlay.appendChild(clone);
          zoomedEl.current = target;
        }

        // Position overlay exactly over the original element, then scale from cursor point
        overlay.style.left   = `${rect.left}px`;
        overlay.style.top    = `${rect.top}px`;
        overlay.style.width  = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
        overlay.style.transformOrigin = `${ox}px ${oy}px`;
        overlay.style.transform = 'scale(1.5)';
        overlay.style.opacity = '1';
      } else {
        overlay.style.opacity = '0';
        zoomedEl.current = null;
      }

      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    raf.current = requestAnimationFrame(animate);

    const addHoverListeners = () => {
      document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .interactive'
      ).forEach((el) => {
        el.addEventListener('mouseenter', () => {
          innerRef.current?.classList.add('cursor--hover');
          trailInnerRef.current?.classList.add('trail--hover');
        });
        el.addEventListener('mouseleave', () => {
          innerRef.current?.classList.remove('cursor--hover');
          trailInnerRef.current?.classList.remove('trail--hover');
        });
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      overlay.remove();
    };
  }, [visible]);

  return (
    <>
      <div ref={trailRef} className="gc-wrap" style={{ opacity: visible ? 1 : 0 }}>
        <div ref={trailInnerRef} className="glass-trail" />
      </div>
      <div ref={cursorRef} className="gc-wrap" style={{ opacity: visible ? 1 : 0 }}>
        <div ref={innerRef} className="glass-cursor" />
      </div>
    </>
  );
};

export default GlassCursor;
