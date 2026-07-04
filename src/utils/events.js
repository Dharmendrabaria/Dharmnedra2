// Lightweight global event bus — zero dependencies, zero re-renders
const _handlers = {};

export const emit = (event, data) => {
  (_handlers[event] || []).forEach(fn => fn(data));
};

export const on = (event, fn) => {
  if (!_handlers[event]) _handlers[event] = [];
  _handlers[event].push(fn);
  return () => {
    _handlers[event] = _handlers[event].filter(h => h !== fn);
  };
};
