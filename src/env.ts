declare global {
  interface Window {
    env: any;
  }
}

// change with your own variables
type EnvType = {
  VITE_API_BASE_URL: string;
  VITE_MODE: string;
};

export const env: EnvType =
  import.meta.env.VITE_MODE === 'development'
    ? { ...import.meta.env }
    : { ...import.meta.env, ...window.env };