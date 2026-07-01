export const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Clamp a value between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Map a value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Smooth lerp
 */
export const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

/**
 * Format number with K suffix
 */
export const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

/**
 * Debounce
 */
export const debounce = (fn, delay) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Get initials from a name
 */
export const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase();

/**
 * Random between min and max (inclusive)
 */
export const random = (min, max) => Math.random() * (max - min) + min;
