import { useEffect, useRef, useState } from 'react';
import './GlassCursor.css';

const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const TEXT_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'li', 'a', 'button', 'label', 'strong', 'em']);

function findTextAncestor(el: Element | null): HTMLElement | null {
  let node: Element | null = el;
  while (node && node !== document.body) {
    if (TEXT_TAGS.has(node.tagName.toLowerCase())) return node as HTMLElement;
    node = node.parentElement;
  }
  return null;
}

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
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const handleMouseLeave = () => {
      setVisible(false);
      unzoom();
    };
    const handleMouseEnter = () => setVisible(true);

    const unzoom = () => {
      if (zoomedEl.current) {
        zoomedEl.current.style.transform = '';
        zoomedEl.current.style.transformOrigin = '';
        zoomedEl.current = null;
      }
    };

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

      // Real text magnification: use actual mouse pos for accurate hit detection
      const el = document.elementFromPoint(pos.current.x, pos.current.y);
      const target = findTextAncestor(el);

      if (target !== zoomedEl.current) {
        // Restore previous
        if (zoomedEl.current) {
          zoomedEl.current.style.transform = '';
          zoomedEl.current.style.transformOrigin = '';
          zoomedEl.current.style.zIndex = '';
        }
        // Zoom new target
        if (target) {
          const rect = target.getBoundingClientRect();
          const ox = pos.current.x - rect.left;
          const oy = pos.current.y - rect.top;
          target.style.transformOrigin = `${ox}px ${oy}px`;
          target.style.transform = 'scale(1.3)';
          target.style.zIndex = '10';
          target.style.transition = 'transform 0.12s ease';
        }
        zoomedEl.current = target;
      } else if (target) {
        // Update transform-origin live as cursor moves within the element
        const rect = target.getBoundingClientRect();
        const ox = pos.current.x - rect.left;
        const oy = pos.current.y - rect.top;
        target.style.transformOrigin = `${ox}px ${oy}px`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    raf.current = requestAnimationFrame(animate);

    const addHoverListeners = () => {
      const els = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .interactive'
      );
      els.forEach((el) => {
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
      unzoom();
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
