import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useTriggerCbOnEscapeKeyForAnElement = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: Function,
) => {
  useEffect(() => {
    if (ref.current && ref.current?.tabIndex < 0) {
      // eslint-disable-next-line
      ref.current.tabIndex = 0;
    }
  });

  useEffect(() => {
    const bodyEscapeKeyHandler = (e: KeyboardEvent) => {
      // eslint-disable-next-line
      ref.current &&  ref.current?.contains(e.target as Node) && e.key === "Escape" && callback();
    };
    document.body.addEventListener('keydown', bodyEscapeKeyHandler);
    return () => {
      document.body.removeEventListener('keydown', bodyEscapeKeyHandler);
    };
  });
};
