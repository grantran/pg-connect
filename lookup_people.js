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

let person = process.argv[2];
console.log(person);

client.connect((err) => {
  if (err) throw err;

  console.log('Searching..');
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text OR first_name = $1::text",[person], (err, results) => {
      if (err) throw err;

      console.log(`Found ${results.rows.length} person(s) by the name ${person} :`);
      console.log(results.rows[0]);
      client.end(); 
    });
});

