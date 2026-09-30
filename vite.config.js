import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    const stat = fs.lstatSync(fromPath);
    if (stat.isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else if (stat.isDirectory()) {
      copyFolderSync(fromPath, toPath);
    }
  });
}

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    {
      name: 'copy-static-assets',
      closeBundle() {
        copyFolderSync('js', 'dist/js');
        copyFolderSync('css', 'dist/css');
        if (fs.existsSync('assets')) {
          copyFolderSync('assets', 'dist/assets');
        }
      },
    },
  ],
});
