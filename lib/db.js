import { Pool } from 'pg';

const pool = new Pool({
  user: 'default',
  host: 'ep-little-smoke-a1uedtw5-pooler.ap-southeast-1.aws.neon.tech',
  database: 'verceldb',
  password: 'JjCw2VKPN5nc',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});


export const query = (text, params) => pool.query(text, params);
