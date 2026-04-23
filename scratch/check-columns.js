const { createClient } = require('@libsql/client')
const client = createClient({ url: 'file:sqlite.db' })

async function main() {
  const result = await client.execute("PRAGMA table_info(products);")
  console.log('Columns:', result.rows.map(r => r.name))
}

main().catch(console.error)
