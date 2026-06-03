const fs = require('fs');
const html = fs.readFileSync('wdlinkma.html', 'utf8');

const targetTitles = ['WD04', 'WD07P', 'WD10P', 'WD12', 'WD24', 'WD2P'];

targetTitles.forEach(title => {
  // Find index of title
  const idx = html.indexOf(`>${title}</a></h3>`);
  if (idx !== -1) {
    // extract previous 2000 chars
    const chunk = html.substring(Math.max(0, idx - 2000), idx);
    const imgMatch = chunk.match(/<img[^>]+src="([^"]+)"/g);
    if (imgMatch) {
      // take the last one
      const lastImg = imgMatch[imgMatch.length - 1];
      const src = lastImg.match(/src="([^"]+)"/)[1];
      console.log(`${title}: ${src}`);
    } else {
      console.log(`${title}: NO IMAGE MATCH`);
    }
  } else {
    console.log(`${title}: NOT FOUND`);
  }
});
