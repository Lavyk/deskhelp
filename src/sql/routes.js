const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var cors = require("cors");


const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "99helpdesk_db",
});

/*var whitelist = ['http://localhost:3030/users']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}*/
var app = express();
app.use(cors());

// Criando uma rota GET que retorna os dados da tabela usuários.
/* app.get("/users", function (req, res) {
  // Conectando ao banco.
  connection.getConnection(function (err, connection) {
    // Executando a query MySQL (selecionar todos os dados da tabela usuário).
    connection.query("SELECT * FROM users", function (error, results, fields) {
      // Caso ocorra algum erro, não irá executar corretamente.if (error) throw error;

      // Pegando a 'resposta' do servidor pra nossa requisição. Ou seja, aqui ele vai mandar nossos dados.
      res.send(results);
    });
  });
}); */


// Iniciando o servidor.
var io = require('socket.io')(http);
var http = require('http').createServer(app);

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
