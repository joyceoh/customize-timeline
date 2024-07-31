const { Pool } = require('pg');
const PG_URI = 'postgresql://postgres.uihwpavpfhjvmrdiyosy:l9dPzPBSWFAiO3gN@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
    connectionString: PG_URI
})

//should put in png of schema

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}