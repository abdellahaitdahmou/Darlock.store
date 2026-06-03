const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
envFile.split('\n').forEach(line => {
  if(line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if(line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
});

const supabaseUrl = url;
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Starting migration...");
  try {
    const data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
    console.log(`Found ${data.length} products to migrate.`);
    
    // Map camelCase to lowercase for postgres
    const mappedData = data.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      originalprice: p.originalPrice,
      discountedprice: p.discountedPrice,
      savingspercent: p.savingsPercent,
      description: p.description,
      features: p.features,
      rating: p.rating,
      reviewcount: p.reviewCount,
      badge: p.badge,
      popular: p.popular,
      imageurl: p.imageUrl,
      images: p.images || []
    }));
    
    // Clear existing products first just in case
    const { error: delError } = await supabase.from('products').delete().neq('id', 'dummy');
    if (delError) console.warn("Delete warning (might be fine if empty):", delError.message);

    const { error } = await supabase.from('products').insert(mappedData);
    
    if (error) {
      console.error("Migration failed:", error);
    } else {
      console.log("Migration successful! 12 products inserted.");
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

migrate();
