//--------------------------------------------------------------------------
//-- mohayonao-scheduler.js
//--------------------------------------------------------------------------

const { Client } = require('node-osc');
const client = new Client('127.0.0.1', 57120);

const WebAudioScheduler = require("web-audio-scheduler");
const sched = new WebAudioScheduler();

let masterGain = null;

const metronome = (e) => {
  const t0 = e.playbackTime;

  sched.insert(t0 + 0.000, bang);
  sched.insert(t0 + 0.500, bang);
  sched.insert(t0 + 1.000, bang);
  sched.insert(t0 + 1.500, bang);
  sched.insert(t0 + 1.750, bang);
  sched.insert(t0 + 2.000, metronome);
}

const bang = (id) => {
  console.log('Bang!');
  console.log(id);
  client.send('/bang', '');
};

sched.start(metronome);
