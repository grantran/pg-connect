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

const person = process.argv[2];

const reformatResults = function (resultsRow) {
  resultsRow.forEach((item, index) => {
    let firstName = item.first_name;
    let lastName = item.last_name;
    let birthDate = item.birthdate.toString().substring(0,15);
    console.log(`- ${index +1}: ${firstName} ${lastName}, born '${birthDate}'`);
  });
}

knex.select('*').from('famous_people').whereIn('first_name', person).
orWhereIn('last_name',person).
asCallback(function(err, rows) {
    if (err) throw err;

    console.log(`Found ${rows.length} person(s) by the name ${person} :`);
    reformatResults(rows);
  });


knex.destroy();