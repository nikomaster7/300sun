const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [lang, scale] of [['en',1],['es',1]]) {
    const p = await b.newPage({ viewport: { width: 1080, height: 800 }, deviceScaleFactor: +process.argv[2] || 1 });
    await p.goto('file://' + __dirname + '/offer.html?lang=' + lang);
    await p.evaluate(() => document.fonts.ready);
    const el = await p.$('.canvas');
    await el.screenshot({ path: `${process.argv[3] || '.'}/espanglishfun-${lang}.png` });
    console.log(lang, await p.evaluate(() => document.querySelector('.canvas').offsetHeight));
  }
  await b.close();
})();
