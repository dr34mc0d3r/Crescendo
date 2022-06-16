const knex = require("knex");

const connectToSqlite3 = knex({
  client: 'sqlite3',
  connection: {
    filename: "./Crescendo.sqlite3"
  },
  useNullAsDefault: true
  // If one prefers that undefined keys are replaced with NULL instead of DEFAULT one may give useNullAsDefault configuration parameter
  // http://knexjs.org/guide/query-builder.html#insert
});

module.exports =  connectToSqlite3;
