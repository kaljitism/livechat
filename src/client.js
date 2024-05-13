const net = require('node:net');
const readline = require('node:readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (direction) => {
  // Process.stdout is a WriteStream.
  // dir = 1; clears everything to the right from cursor
  // dir = -1; clears everything to the left from cursor
  // dir = 0; clears entire line
  
  return new Promise((resolve) => {
    process.stdout.clearLine(direction, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const clientSocket = net.createConnection({
  host: '127.0.0.1',
  port: 11_001,
}, async () => {
  console.log('Connected to the server');
  
  const ask = async () => {
    const message = await rl.question('Enter your message: ');
    await moveCursor(0, -1);
    // clear the current line where cursor is at
    await clearLine(0);
    clientSocket.write(message);
  };
  
  await ask();
  
  clientSocket.on('data', async (data) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);
    console.log(data.toString('utf8'));
    
    await ask();
  });
  
  clientSocket.on('error', (error) => {
    console.log(error.toString());
  });
  
  clientSocket.on('end', () => {});
});
