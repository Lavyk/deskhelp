const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require("mysql");

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "99helpdesk_db",
});

con.connect(function (err) {
  if (err) console.log("[BD] Não conectado");
  else {
    console.log("[BD] Conectado!");
  }
});

var users = [];

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", (socket) => {
  socket.on("storeUserInfo", function (data) {
    const sql = "SELECT * FROM users WHERE email = '" + data.email + "'";
    con.query(sql, function (err, result, fields) {
      if (err) {
        io.to(socket.id).emit("login result", { result: "erroDB" });
      } else {

        if (result.length > 0) {
          io.to(socket.id).emit("login result", "sucessoDB");
          var userInfo = new Object();
          userInfo.clientId = socket.id;
          userInfo.matricula = result[0].matricula;
          userInfo.nome = result[0].nome;
          userInfo.email = result[0].email;
          userInfo.cargo = result[0].cargo;
          userInfo.supervisor = result[0].supervisor;

          users.push(userInfo);
          io.to(socket.id).emit("login result", { result: "sucessoDB", nome: userInfo.nome, matricula: userInfo.matricula, email: userInfo.email, cargo: userInfo.cargo });
          console.log(
            "[" +
            userInfo.matricula +
            "] " +
            userInfo.nome +
            " entrou no Helpdesk"
          );
        } else {
          io.to(socket.id).emit("login result", { result: "nullUserDB" });
        }
      }
    });
  });

  socket.on("disconnect", function (data) {
    for (var i = 0, len = users.length; i < len; ++i) {
      var c = users[i];
      if (c.clientId == socket.id) {
        users.splice(i, 1);
        break;
      }
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
