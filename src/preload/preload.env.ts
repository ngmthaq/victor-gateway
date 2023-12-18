export const env = {
  mode: () => process.env.NODE_ENV,
  get: (key: string): string | undefined => {
    const env: Record<string, string> = {};
    for (const key in process.env) {
      if (Object.prototype.hasOwnProperty.call(process.env, key)) {
        const value = process.env[key];
        if (key.startsWith("ELECTRON_PUBLIC_")) {
          env[key] = value;
        }
      }
    }
    return env[key];
  },
};
