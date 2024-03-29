// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/party.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys =ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
       pool: {
         min: 2,
         max: 10,
       },
    migrations: {
       directory: './data/migrations',
    }
  }
};
