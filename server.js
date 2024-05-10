/*jshint esversion: 6*/
'use strict';

const net = require("net");

const server = net.createServer();
server.on("connection", socket => {
  console.log("New connection to the server");

  socket.on("data", data => {
    console.log(data.toString('utf8'));
    socket.write("Got your message!");
  });

  socket.on('end', () => {
    console.log("Ending Transaction");
    server.close();
  });
});

server.listen({
  port: 11001,
  host:"127.0.0.1",
}, () => {
  console.log("Opened Server on", server.address());
});
