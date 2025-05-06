export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'admin',
    name: process.env.DATABASE_NAME || 'films',
    schema: process.env.DATABASE_SCHEMA || 'public',
  },
};

console.log(`Database config: ${JSON.stringify(config.db)}`);
