const fs = require('fs');
let html = fs.readFileSync('chemistry-quiz.html', 'utf-8');

// Read the generated questions
const questions = fs.readFileSync('gen-2008-output.txt', 'utf-8');

// Replace the empty QUESTION_BANK
const bankStart = html.indexOf('const QUESTION_BANK = [');
const bracketStart = html.indexOf('[', bankStart);
let depth = 1;
let pos = bracketStart + 1;
while (depth > 0 && pos < html.length) {
    if (html[pos] === '[') depth++;
    else if (html[pos] === ']') depth--;
    pos++;
}
const bracketEnd = pos;

const newBank = '[\n' + questions + '\n]';
html = html.substring(0, bracketStart) + newBank + html.substring(bracketEnd);

// Fix outdated console.log
html = html.replace(
  '覆盖 7 大知识模块（含 2025 中考真题）',
  '含历年中考真题'
);

fs.writeFileSync('chemistry-quiz.html', html, 'utf-8');
console.log('Questions inserted successfully!');

const count = (html.match(/"id": "hn2008_/g) || []).length;
console.log('2008 questions count:', count);
