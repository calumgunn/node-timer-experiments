const { Client } = require('node-osc');
const NanoTimer = require('nanotimer');
const client = new Client('127.0.0.1', 57120);
const timer = new NanoTimer();

let count = 0;

const bang = () => {
  console.log('Bang!');
  client.send('/bang', '');

  if (++count === 32) {
    timer.clearInterval();
    count = 0;
  }
};

const loopScript = ['200m', '100m', '50m', '5m', '2m'];
let currentScript = 0;

const loop = (interval) => {
  console.log(`Interval: ${interval}s`);

  timer.setInterval(bang, '', interval, (err) => {
    if (err) { console.warn(err); }

    const nextIndex = ++currentScript;
    if (loopScript[nextIndex]) {
      timer.setTimeout(loop, [loopScript[nextIndex]], '1s');
    } else {
      console.log('Done!');
      client.close();
      return process.exit();
    }
  });
};

const start = () => {
  loop(loopScript[currentScript]);
};

start();
