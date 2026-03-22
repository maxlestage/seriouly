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

// Styles that may come from ancestor CSS selectors — copy them explicitly
const INHERITED = [
  'text-align', 'color', 'font-size', 'font-family', 'font-weight',
  'font-style', 'line-height', 'letter-spacing', 'word-spacing',
  '-webkit-text-fill-color', 'background-clip', '-webkit-background-clip',
  'background-image',
];

const GlassCursor = () => {
  const cursorRef     = useRef<HTMLDivElement>(null);
  const innerRef      = useRef<HTMLDivElement>(null);
  const trailRef      = useRef<HTMLDivElement>(null);
  const trailInnerRef = useRef<HTMLDivElement>(null);
  const lensRef       = useRef<HTMLDivElement>(null);
  const pos        = useRef({ x: -200, y: -200 });
  const trailPos   = useRef({ x: -200, y: -200 });
  const raf        = useRef<number>(0);
  const zoomedEl   = useRef<HTMLElement | null>(null);
  const lensClone  = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  if (isTouchDevice()) return null;

  useEffect(() => {
    const clearLens = () => {
      if (lensRef.current) {
        lensRef.current.innerHTML = '';
        lensRef.current.classList.remove('active');
      }
      // Restore mask on original element
      if (zoomedEl.current) {
        zoomedEl.current.style.maskImage = '';
        (zoomedEl.current.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = '';
      }
      zoomedEl.current = null;
      lensClone.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const handleMouseLeave = () => { setVisible(false); clearLens(); };
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

      const el = document.elementFromPoint(pos.current.x, pos.current.y);
      const target = findTextAncestor(el);
      const lens = lensRef.current;

      if (lens && target) {
        const rect = target.getBoundingClientRect();
        // Trail center = loupe center in viewport coords
        const tx = trailPos.current.x;
        const ty = trailPos.current.y;

        // Rebuild clone only when element changes
        if (target !== zoomedEl.current) {
          const clone = target.cloneNode(true) as HTMLElement;
          // Copy styles that may come from ancestor CSS selectors
          const cs = getComputedStyle(target);
          INHERITED.forEach(p => {
            try { clone.style.setProperty(p, cs.getPropertyValue(p)); } catch { /* noop */ }
          });
          clone.style.position = 'absolute';
          clone.style.margin = '0';
          clone.style.transform = 'none';
          clone.style.transition = 'none';
          lens.innerHTML = '';
          lens.appendChild(clone);
          lensClone.current = clone;
          zoomedEl.current = target;
          lens.classList.add('active');
        }

        // Mask out the original element inside the loupe circle (prevents doubling).
        // mask-image: transparent inside circle = original hidden there; black = visible.
        const mx = tx - rect.left;
        const my = ty - rect.top;
        const maskVal = `radial-gradient(circle at ${mx}px ${my}px, transparent 66px, black 72px)`;
        target.style.maskImage = maskVal;
        (target.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = maskVal;

        // Position clone every frame so loupe-center maps to the text at cursor
        // glass-trail is 140×140 with margin -70/-70, so its local center = (70, 70)
        // Clone left/top: offset from glass-trail's viewport top-left = (tx-70, ty-70)
        const clone = lensClone.current;
        if (clone) {
          clone.style.left  = `${rect.left - tx + 70}px`;
          clone.style.top   = `${rect.top  - ty + 70}px`;
          clone.style.width = `${rect.width}px`;
          // Scale origin = trail center in clone-local coords → maps to (70,70) in glass-trail
          clone.style.transformOrigin = `${tx - rect.left}px ${ty - rect.top}px`;
          clone.style.transform = 'scale(2)';
        }
      } else if (lens) {
        clearLens();
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
    };
  }, [visible]);

  return (
    <>
      <div ref={trailRef} className="gc-wrap" style={{ opacity: visible ? 1 : 0 }}>
        <div ref={trailInnerRef} className="glass-trail">
          {/* Lens interior: clipped to the circle, shows zoomed text clone */}
          <div ref={lensRef} className="glass-trail__lens" />
        </div>
      </div>
      <div ref={cursorRef} className="gc-wrap" style={{ opacity: visible ? 1 : 0 }}>
        <div ref={innerRef} className="glass-cursor" />
      </div>
    </>
  );
};

export default GlassCursor;
