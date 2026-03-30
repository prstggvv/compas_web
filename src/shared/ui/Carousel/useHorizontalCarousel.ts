import { useCallback, useEffect, useRef, useState } from 'react';

export function useHorizontalCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update]);

  const scrollPrev = useCallback(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const step = Math.min(el.clientWidth * 0.85, 380);
    el.scrollBy({ left: -step, behavior: 'smooth' });
  }, []);

  const scrollNext = useCallback(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const step = Math.min(el.clientWidth * 0.85, 380);
    el.scrollBy({ left: step, behavior: 'smooth' });
  }, []);

  return { ref, scrollPrev, scrollNext, canPrev, canNext };
}
