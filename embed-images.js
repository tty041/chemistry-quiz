const fs = require('fs');
const imgDir = 'C:/Users/14878/Desktop/claude/images';

function toBase64(f) {
  return 'data:image/png;base64,' + fs.readFileSync(imgDir + '/' + f).toString('base64');
}

const imgs = {
  'img_01.png': toBase64('img_01.png'),
  'img_02.png': toBase64('img_02.png'),
  'img_03.png': toBase64('img_03.png'),
  'img_04.png': toBase64('img_04.png'),
  'img_05.png': toBase64('img_05.png'),
  'img_06.png': toBase64('img_06.png'),
  'img_07.png': toBase64('img_07.png'),
  'img_08.png': toBase64('img_08.png'),
  'img_09.png': toBase64('img_09.png'),
};

const imgTag = (src) => `<div class="q-img"><img src="${src}" style="max-width:100%;margin:8px 0;border-radius:8px;"></div>`;

let html = fs.readFileSync('chemistry-quiz.html', 'utf-8');

// Parse QUESTION_BANK using eval-like approach, modify questions, re-stringify
const bankMatch = html.match(/const QUESTION_BANK = (\[[\s\S]*?\]);/);
if (!bankMatch) { console.log('QUESTION_BANK not found!'); process.exit(1); }

const bank = eval(bankMatch[1]);

const qMap = {
  'hn2008_05': { img: imgs['img_01.png'] },
  'hn2008_07': { img: imgs['img_02.png'] },
  'hn2008_09': { img: imgs['img_03.png'] },
  'hn2008_17': { img: imgs['img_04.png'] },
  'hn2008_20': { img: imgs['img_05.png'] + '||' + imgs['img_06.png'] }, // two images
  'hn2008_21': { img: imgs['img_09.png'] },
  'hn2008_22': { img: imgs['img_07.png'] },
  'hn2008_23': { img: imgs['img_08.png'] },
};

bank.forEach(q => {
  const info = qMap[q.id];
  if (!info) return;
  if (info.img.includes('||')) {
    // Two images for Q20
    const parts = info.img.split('||');
    q.question += imgTag(parts[0]) + imgTag(parts[1]);
  } else {
    q.question += imgTag(info.img);
  }
  console.log('Added image to: ' + q.id);
});

// Rebuild JSON and replace in HTML
const bankStart = html.indexOf('const QUESTION_BANK = [');
const bracketStart = html.indexOf('[', bankStart);
let depth = 1, pos = bracketStart + 1;
while (depth > 0 && pos < html.length) {
  if (html[pos] === '[') depth++;
  else if (html[pos] === ']') depth--;
  pos++;
}
const newBank = JSON.stringify(bank, null, 2);
html = html.substring(0, bracketStart) + newBank + html.substring(pos);
fs.writeFileSync('chemistry-quiz.html', html, 'utf-8');
console.log('Done!');
