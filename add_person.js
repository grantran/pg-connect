const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : 'vagrant'
  }
});

const first_name = process.argv[2]; 
const last_name = process.argv[3];
const birthdate = process.argv[4];

knex('famous_people').insert({
  first_name: first_name,
  last_name: last_name,
  birthdate: birthdate
}).then();

knex.destroy();