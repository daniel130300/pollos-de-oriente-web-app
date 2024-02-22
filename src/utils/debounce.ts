type DebouncedFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => void;

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
  immediate?: boolean
): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout!);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}