const fs = require('fs');

const html = fs.readFileSync('wdlinkma.html', 'utf8');

const products = [];
// This regex looks for product blocks in WooCommerce
const blockRegex = /<li class="product[^>]*>([\s\S]*?)<\/li>/g;
let match;
while ((match = blockRegex.exec(html)) !== null) {
  const block = match[1];
  
  // Title and Link
  const titleMatch = block.match(/<h3 class="wd-entities-title"><a href="([^"]+)">([^<]+)<\/a><\/h3>/);
  if (!titleMatch) continue;
  const link = titleMatch[1];
  const title = titleMatch[2].trim();
  
  // Image
  const imgMatch = block.match(/<img[^>]*src="([^"]+)"[^>]*class="attachment-woocommerce_thumbnail/);
  const img = imgMatch ? imgMatch[1] : '';
  
  // Price
  const priceMatch = block.match(/<span class="woocommerce-Price-amount amount"><bdi>([^<]+)/);
  const price = priceMatch ? priceMatch[1].replace('&nbsp;', ' ') : '';
  
  products.push({ link, title, img, price });
}

console.log(JSON.stringify(products, null, 2));
