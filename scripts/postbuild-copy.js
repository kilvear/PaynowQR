const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '../dist/paynowqr.umd.js');
const targetDir = path.resolve(__dirname, '../webapp/vendor');
const target = path.join(targetDir, 'paynowqr.umd.js');

try {
  if (!fs.existsSync(source)) {
    throw new Error(`Source bundle not found at ${source}`);
  }
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(source, target);
  console.log(`Copied ${source} -> ${target}`);
} catch (err) {
  console.error('Failed to copy PaynowQR bundle for webapp:', err.message);
  process.exitCode = 1;
}
