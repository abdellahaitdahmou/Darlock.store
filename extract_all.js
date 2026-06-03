const fs = require('fs');

const html = fs.readFileSync('wdlinkma.html', 'utf8');

const products = [];
// Let's use a simpler approach. Split by `<li class="product` or something similar,
// or just find all `wd-entities-title`.
const blocks = html.split('<div class="product-wrapper">');

// The first block doesn't contain a product usually
for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  
  // Title
  const titleMatch = block.match(/<h3 class="wd-entities-title"><a href="([^"]+)">([^<]+)<\/a><\/h3>/);
  if (!titleMatch) continue;
  const link = titleMatch[1];
  const title = titleMatch[2].trim();
  
  // Image
  // Match src of the img element with class attachment-woocommerce_thumbnail
  const imgMatch = block.match(/<img width="[^"]+" height="[^"]+" src="([^"]+)"/);
  const img = imgMatch ? imgMatch[1] : '';
  
  // Price (optional, just take it if present)
  const priceMatch = block.match(/<bdi>([^<]+)/);
  const price = priceMatch ? priceMatch[1].replace('&nbsp;', ' ') : '';
  
  products.push({
    title,
    link,
    img,
    price
  });
}

console.log(JSON.stringify(products, null, 2));
