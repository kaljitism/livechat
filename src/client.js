const net = require('node:net');
const readline = require('node:readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clientSocket = net.createConnection({
  host: '127.0.0.1',
  port: 11_001,
}, async () => {
  console.log('Connected to the server');
  
  const message = await rl.question('Enter your message: ');
  clientSocket.write(message);
});

clientSocket.on('data', (data) => {
  console.log(data.toString('utf8'));
});

clientSocket.on('error', (error) => {
  console.log(error.toString());
});

clientSocket.on('end', () => {});
