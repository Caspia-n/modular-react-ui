function isDebugEnabled() {
  return process.env.NEXT_PUBLIC_DEBUG_LOGGING === 'true';
}

export const logger = {
  debug: (...args: unknown[]) => {
    if (!isDebugEnabled()) return;
    console.debug('[modular-react-ui]', ...args);
  },
  info: (...args: unknown[]) => {
    if (!isDebugEnabled()) return;
    console.info('[modular-react-ui]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (!isDebugEnabled()) return;
    console.warn('[modular-react-ui]', ...args);
  },
  error: (...args: unknown[]) => {
    console.error('[modular-react-ui]', ...args);
  }
};
