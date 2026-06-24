import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const MYSQL = process.env.MYSQL_BIN || 'C:\\xampp\\mysql\\bin\\mysql.exe';
const USER = process.env.MYSQL_USER || 'root';
const PASS = process.env.MYSQL_PASSWORD || '';

const runMysql = (sql: string) => {
  const args = ['-u', USER, '--default-character-set=utf8mb4'];
  if (PASS) args.push(`-p${PASS}`);
  const result = spawnSync(MYSQL, args, { input: sql, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || 'mysql failed');
};

if (!existsSync(MYSQL)) throw new Error(`MySQL executable not found: ${MYSQL}`);
runMysql(readFileSync('database/schema.sql', 'utf8'));
console.log('Database schema was applied. Runtime data is managed through Laravel API.');
