/*jshint esversion: 6*/
'use strict';

const net = require("net");

const client = net.createConnection({
  host: "127.0.0.1",
  port: 11001,
}, ()=> {
  client.write(Buffer.from("Hi, I am trying to connect.."));

  client.on("data", data => {
    console.log(data.toString('utf8'));
    client.end(() => {
      client.destroy();
    });
  });
});
