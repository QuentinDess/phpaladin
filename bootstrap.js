import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register ts-node ESM loader
register('ts-node/esm', pathToFileURL('./'));

// Now import your main TS file (must use dynamic import here)
import('./src/main.ts').catch(err => {
  console.error(err);
  process.exit(1);
});
