const fs = require('fs');
const _ = require('lodash');
const cheerio = require('cheerio');

const regex = /^(<link rel="stylesheet" href="styles.(.*).css">)/g;
const pathFile = __dirname + '/dist/jip-app/index.html';
let contentHtml = fs.readFileSync(pathFile, 'utf8');

let find = (content, regex) => {
  let m;
  while ((m = regex.exec(content)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    if(!_.isEmpty(m[0])) {
      return m[0];
    }
  }
};

let rewrite = (fileName, newContent) => {
  fs.writeFile(fileName, newContent, 'utf8', function (err) {
    if (err) return console.log(err);
  });
}

const found = find(contentHtml, regex);
if(!_.isEmpty(found)) {
  console.log('found', found);
  contentHtml = contentHtml.replace(found, '');
  rewrite(pathFile, contentHtml);
  let $ = cheerio.load(contentHtml);
  $('head').append(found);
  rewrite(pathFile, $.html());
  console.log('rewrite the head with a css tag')
}else{
  console.log('nothing found')
}
