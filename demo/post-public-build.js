import * as mfs from 'm-fs';
import * as fs from 'fs';

const publicFiles = await mfs.subFiles('./public');
const mainJS = publicFiles[0];
if (!mainJS) {
  console.error(`main.[hash].js not found in files:\n${publicFiles}`);
  process.exit(1);
}

let indexHTML = await mfs.readTextFileAsync('./index.html');

// Inject `main.js`.
indexHTML = indexHTML.replace(
  '<script type="module" src="./main.js"></script>',
  `<script src="./${mainJS}"></script>`,
);

// INject `modern-normalize.css`.
indexHTML = indexHTML.replace(
  '</head>',
  '<link rel="stylesheet" href="./modern-normalize.css">\n</head>',
);

await Promise.all([
  mfs.writeFileAsync('./public/index.html', indexHTML),
  fs.promises.copyFile(
    './node_modules/modern-normalize/modern-normalize.css',
    './public/modern-normalize.css',
  ),
]);
