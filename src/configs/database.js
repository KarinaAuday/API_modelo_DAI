import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'provinces_db',
});

console.log('🔗 [Database] Configuración:');
console.log(`   User: ${process.env.DB_USER}`);
console.log(`   Host: ${process.env.DB_HOST}`);
console.log(`   Port: ${process.env.DB_PORT}`);
console.log(`   Database: ${process.env.DB_NAME}`);

pool.on('connect', () => {
  console.log('✅ [Database] Conexión establecida');
});

pool.on('error', (err) => {
  console.error('❌ [Database] Error:', err.message);
});

export default pool;
