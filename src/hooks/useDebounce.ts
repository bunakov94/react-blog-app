import { useCallback, useRef } from 'react';

export default function useDebounce(callback: Function, delay: number) {
  const timer = useRef();

  return useCallback(
    (val: string) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      // @ts-ignore
      timer.current = setTimeout(() => {
        callback(val);
      }, delay);
    },
    [callback, delay],
  );
}
