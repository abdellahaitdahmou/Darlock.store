const fs = require('fs');

const html = fs.readFileSync('wdlinkma.html', 'utf8');
const imgs = [...html.matchAll(/<img[^>]+src="([^"]+\/wp-content\/uploads\/[^"]+)"[^>]*>/g)].map(m => m[1]);
console.log(Array.from(new Set(imgs)));
