import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'global.TMDB_TOKEN': JSON.stringify(env.VITE_TMDB_TOKEN)
    }
  };
});