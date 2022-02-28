var readline = require('readline');
const { Service } = require('../dist/sdkBuilder.node.js');

const CMD_EXIT = 'END';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const service = new Service();

rl.on('line', function (line) {
  const [cmd, ...args] = line.split(' ');

  // End process
  if (cmd === CMD_EXIT) process.exit();
  // Parse command
  service.parseCommand(cmd, args);
});
