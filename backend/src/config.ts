export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DATABASE_HOST || 'postgres',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || '1',
    password: process.env.DATABASE_PASSWORD || '2',
    name: process.env.DATABASE_NAME || 'afisha',
    schema: process.env.DATABASE_SCHEMA || 'public',
  },
};

console.log('Database config:', {
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  name: config.db.name,
  schema: config.db.schema,
});
