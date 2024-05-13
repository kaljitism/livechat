const net = require('node:net');

// Socket[Duplex Stream] Connections
const socketConnections = [];

// Event Emitter Object
const server = net.createServer();

// Event Handlers
server.on('connection', (serverSocket) => {
  console.log(`${serverSocket.remoteAddress}:${serverSocket.remotePort} connected`);
  socketConnections.push(serverSocket);

  serverSocket.on('data', (data) => {
    for (const socket of socketConnections) {
      const userInfo = socket.remotePort + ':' + socket.remoteAddress;
      socket.write(`${userInfo}: ${data.toString('utf8')}`);
    }

    console.log(`${serverSocket.remotePort + ':' + serverSocket.remoteAddress
    }: ${data.toString('utf8')}`);
  });
  
  serverSocket.on('error', (error) => {
    console.log(`${serverSocket.remoteAddress} ERROR: ${error.message}}`);
  });

  serverSocket.on('close', () => {
    console.log(`${serverSocket.remoteAddress} disconnected`);
  });
});

server.listen({
  host: '127.0.0.1',
  port: 11_001,
}, () => {
  console.log('Opened Server on', server.address());
});
