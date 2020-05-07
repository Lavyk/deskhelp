const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var users = [];

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
    socket.on('storeUserInfo', function (data) {
        var userInfo = new Object();

        userInfo.clientId = socket.id;
        userInfo.matricula = data.matricula;
        userInfo.nome = data.nome;
        userInfo.email = data.email;
        userInfo.nivel = data.nivel;
        userInfo.supervisor = data.supervisor;

        users.push(userInfo);

        console.log("[" + userInfo.matricula + "] " + userInfo.nome + " entrou no Helpdesk")
    });


    socket.on("incoming data", (data) => {
        socket.broadcast.emit("outgoing data", { num: data });
    });

    socket.on('disconnect', function (data) {
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