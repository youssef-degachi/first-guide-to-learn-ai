import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  const environment=loadEnv(mode,process.cwd(),'VITE_');
  const base=process.env.VITE_BASE_PATH || environment.VITE_BASE_PATH || '/';
  if(!base.startsWith('/')||!base.endsWith('/')||/[?#]/.test(base)) throw new Error('VITE_BASE_PATH must be a path with leading and trailing slashes, such as /learn/.');
  return { plugins: [react()], base, build: { outDir: 'dist' } };
});
