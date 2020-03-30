Testing Nanotimer & OSC.

I'm using SuperCollider to pump out some OSC noise to test this with.
Try this:

```
(
~sample = Buffer.read(s, ~~ANY SAMPLE PATH HERE, PREF A SHORT ONE~~);

SynthDef(\sampler, {
	arg bufnum, amp=1, out=0;
	var sig, env;
	sig = PlayBuf.ar(1, ~sample.bufnum, doneAction: 2);
	Out.ar(out, Splay.ar(sig, 0));
}).add;

f = { |msg, time, addr|
  if(msg[0] == '/bang') {
    Synth(\sampler);
  }
};

thisProcess.addOSCRecvFunc(f);
)
```

Then, in this project:

```
npm install
npm run start
```
