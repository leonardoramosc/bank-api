
export default {
  jwtSecret: process.env.JWT_SECRET || 'secrettoken12345',
  DB: {
    USER: process.env.DB_USER || 'postgres',
    HOST: process.env.DB_HOST || 'localhost',
    PASSWORD: process.env.DB_PASSWORD || '12345',
    NAME: process.env.DB_NAME || 'bank',
    PORT: process.env.DB_PORT || '5432',
  }
}
