const fs = require('fs');
const path = require('path');

const root = __dirname;
const out = path.join(root, 'www');

if (fs.existsSync(out)) {
  fs.rmSync(out, { recursive: true, force: true });
}
fs.mkdirSync(out, { recursive: true });

const items = ['index.html', 'src'];
for (const item of items) {
  const src = path.join(root, item);
  const dst = path.join(out, item);
  if (!fs.existsSync(src)) {
    console.error('AVISO: nao encontrado:', item);
    continue;
  }
  fs.cpSync(src, dst, { recursive: true });
}

console.log('Build concluido: www/');
