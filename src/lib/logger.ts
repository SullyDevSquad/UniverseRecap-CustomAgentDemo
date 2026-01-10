export type LogLevel = 'info' | 'warn' | 'error';

export function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const base = {
    level,
    message,
    ...(meta ? { meta } : {}),
    timestamp: new Date().toISOString(),
  };

  // Intentionally basic (demo will standardize usage in routes).
  if (level === 'error') {
    console.error(JSON.stringify(base));
    return;
  }

  if (level === 'warn') {
    console.warn(JSON.stringify(base));
    return;
  }

  console.log(JSON.stringify(base));
}

export function info(message: string, meta?: Record<string, unknown>) {
  log('info', message, meta);
}
