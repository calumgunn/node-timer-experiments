const { Client } = require('node-osc');
const NanoTimer = require('nanotimer');
const client = new Client('127.0.0.1', 57120);
const prompt = require('prompt');
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

let loopScript = ['200m', '100m', '50m', '5m', '2m'];
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

const createLoopScript = (ms) => {
  return [
    `${ms}m`,
    `${ms/2}m`,
    `${ms/4}m`,
    `${ms/8}m`,
    `${ms/16}m`,
  ];
}

const start = () => {
  prompt.start();
  prompt.get(['bpm'], (err, result) => {
    if (err) {
      console.warn(err);
      return process.exit();
    }

    let bpm = parseInt(result.bpm);
    const bpmInMs = 60000 / bpm;
    loopScript = createLoopScript(bpmInMs);

    loop(loopScript[currentScript]);
  });
};

start();
