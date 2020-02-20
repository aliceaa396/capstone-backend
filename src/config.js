module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/fitness-app',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}

