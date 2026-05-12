import fs from 'fs';
import path from 'path';

const dir = './src';

const replacements = {
  '#0d5c73': '#1B2A47', // Navy
  '#147a96': '#273A5E', // Navy Light
  '#0a4a5c': '#0F182B', // Navy Dark
  '#f5c842': '#F5A623', // Gold
  '#f7d468': '#F7B74D', // Gold Light
  '#e0b330': '#D48F1E', // Gold Dark
  '#ff7b7b': '#E08E79', // Coral
  '#ff9999': '#E6A795'  // Coral Light
};

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldColor, newColor] of Object.entries(replacements)) {
        // Case insensitive replacement
        const regex = new RegExp(oldColor, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, newColor);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

walkDir(dir);
