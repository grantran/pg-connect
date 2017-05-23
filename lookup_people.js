const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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

client.connect((err) => {
  if (err) throw err;

  console.log('Searching..');
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text OR first_name = $1::text",[person], (err, results) => {
      if (err) throw err;

      console.log(`Found ${results.rows.length} person(s) by the name ${person} :`);
      reformatResults(results.rows);
      client.end(); 
    });
});

