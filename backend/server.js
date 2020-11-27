const express = require('express');
const app = express ();
const server = require('http').createServer (app);
const postgres = require('postgres')

app.use('/', express.static('www'));
app.get('/', function (req, res) {
   res.send('Hello World');
})

server.listen (9000, () => {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/test', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

const sql = postgres('postgres://doadmin:ms9axdl0dx93krdb@db-postgresql-fra1-54507-do-user-8314748-0.b.db.ondigitalocean.com:25060/internatnyportal')

 app.get('/typy', async function (req, res) {
	var tmp =  await sql`select * from ciselnik_typ`
   res.send(tmp);
})




