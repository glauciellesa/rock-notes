
let timeout = null as any;

export function debounce(fnc: Function, delayMs?: number) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fnc();
  }, delayMs || 500);
};
