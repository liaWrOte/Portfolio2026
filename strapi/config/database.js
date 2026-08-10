const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('PGHOST'),
          port: env.int('PGPORT', 5432),
          database: env('PGDATABASE'),
          user: env('PGUSER'),
          password: env('PGPASSWORD'),
          ssl: { rejectUnauthorized: false },
        },
      },
    };
  }

  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};
