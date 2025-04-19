import './loadEnv'
const config = {
  IsLocal: process.env.NODE_ENV === 'local',
  IsProd: process.env.NODE_ENV === 'prod',
  // winston lore:
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
  TempFileDir: `${__dirname}/../../${process.env.TEMP_UPLOAD_DIR}`,
  logDir: process.env.LOG_DIR,
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DB_HOSTNAME,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql2',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
};

export default config;