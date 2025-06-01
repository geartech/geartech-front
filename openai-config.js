/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'api', 'services');

function replaceInFile(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const replaced = text.replace(/from '\.\.\/core\/request'/g, "from '../../utils/requestCustom'");
    if (text !== replaced) {
        fs.writeFileSync(filePath, replaced, 'utf8');
        console.log(`Patched: ${filePath}`);
    }
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.ts')) {
            replaceInFile(fullPath);
        }
    });
}

walkDir(dir);
