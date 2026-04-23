const { createClient } = require('@libsql/client')
const client = createClient({ url: 'file:sqlite.db' })

async function main() {
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table';")
  console.log('Tables:', tables.rows.map(r => r.name))
  
  const productsCount = await client.execute("SELECT COUNT(*) as count FROM products;")
  console.log('Count in "products":', productsCount.rows[0].count)
  
  try {
    const ProductCount = await client.execute("SELECT COUNT(*) as count FROM Product;")
    console.log('Count in "Product":', ProductCount.rows[0].count)
  } catch (e) {
    console.log('"Product" table does not exist or error')
  }
}

main().catch(console.error)
