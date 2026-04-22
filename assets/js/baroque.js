// Alexander Chen's "Baroque.Me" (Bach Cello Suite BWV 1007 Prelude)
// Modern rewrite: Web Audio API, requestAnimationFrame, ES6, no Flash / jQuery / Modernizr.
// Original: http://baroque.me — https://www.youtube.com/watch?v=JTWp25pzFCc
//
// Renders 8 strings and 2 wheels with 4 orbiting nubs. The nubs pluck the strings
// as they cross them; each string has a pitch assigned from the current 8-note
// window of the song. Bezier curves give the strings their oscillation shape.

const TOTAL_NOTES = 38;
const TOTAL_THREADS = 8;
const BPM_NORM = 145;
const NOTE_UNIT = 2;
const HALF_STEP = 0.94921875;
const MAX_LENGTH = 590;
const MIN_LENGTH = MAX_LENGTH * Math.pow(HALF_STEP, TOTAL_NOTES - 1);
const WHEEL_RADIUS = 172;
const WHEEL_QUARTER_SEG = Math.sqrt(2 * WHEEL_RADIUS * WHEEL_RADIUS);
const HEIGHT_ALL_THREADS = WHEEL_QUARTER_SEG;
const NUBS = 4;
const CLEAR_RECT_MARG = 50;
const FPS_BACKGROUND = 2;
// Intro pacing: the original used 12.5s to sync with network-paced audio loading.
// We keep it generous so the "tuning up" intro — where strings pluck in at
// intermediate pitches as they climb to their targets — remains the aura of
// mystery that makes people lean in and recognize the Prelude as it emerges.
// Longer intro with a wider activation ramp — the Prelude gets discovered
// through sparse, curious plucks on a few strings, more of them join the
// conversation, and only near the end do all eight settle on the song's
// opening pitches. Matches the original's "playing with notes" feel.
const LOAD_TIME_OVERALL = 24.0;
const TIME_BETWEEN_LOAD = 0.35;
// Spread string activation over 70% of the intro (was 40%): eligibility
// starts earlier and finishes later, giving each string a longer personal
// climb instead of bunching them all together.
const INCR_LOAD_RAMP_LO = 0.2;
const INCR_LOAD_RAMP_HI = 0.9;
// Smaller random pitch step per call (was 1–3): each string advances in
// gentler increments so the plucks sound like hesitant exploration rather
// than a fast tune-up.
const INCR_LOAD_MAX_STEP = 1;
// If something goes sideways and the intro can't finish naturally, this is how
// long after rLoad hits 1 we wait before nudging stuck strings to their target.
const INTRO_SAFETY_DELAY = 4.0;
const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;

const MOUSE_SPEED_MIN = 70;
const MOUSE_SPEED_MAX = 1500;

const SLACK_LONG = 10;
const SLACK_SHORT = 10;
const CURVATURE_RATIO = 0.45;
const OSCILLATION_SPEED_LOW = 1.2;
const OSCILLATION_SPEED_HIGH = 3;
const AMPLITUDE_DAMPEN_LOW = 0.92;
const AMPLITUDE_DAMPEN_HIGH = 0.87;
const VOLUME_MIN = 0.5;
const VOLUME_MAX = 0.7;
const PAN_LEFT = -0.3;
const PAN_RIGHT = 0.3;

const RAD_NORM = 6;
const EASE_ORBIT_LOADER = 0.003;
const EASE_CENTER_LOADER = 0.03;
const EASE_ORBIT_EXIT_LOADER = 0.1;
const EASE_CENTER_EXIT_LOADER = 0.1;
const ORBIT_LOADER = 35;
const TRAIL_PTS = 24;
const TRAIL_SAMPLE = 4;
const PLUCK_FRAME_MAX = 2;
const SPD_GRAB = 4;
const SPD_IGNORE_MAX = 80;

const MIDI_MAP = new Array(73);
for (let m = 36; m <= 72; m++) MIDI_MAP[m] = m - 36;

// Bach Cello Suite No. 1 in G major, BWV 1007, Prelude — MIDI notes for 8-voice decomposition.
// -1 = rest.
const SONG = [
  43, 50, 59, 57, 59, 50, 59, 50, 43, 50, 59, 57, 59, 50, 59, 50,
  43, 52, 60, 59, 60, 52, 60, 52, 43, 52, 60, 59, 60, 52, 60, 52,
  43, 54, 60, 59, 60, 54, 60, 54, 43, 54, 60, 59, 60, 54, 60, 54,
  43, 55, 59, 57, 59, 55, 59, 55, 43, 55, 59, 57, 59, 55, 59, 54,
  43, 52, 59, 57, 59, 55, 54, 55, 52, 55, 54, 55, 47, 50, 49, 47,
  49, 55, 57, 55, 57, 55, 57, 55, 49, 55, 57, 55, 57, 55, 57, 55,
  54, 57, 62, 61, 62, 57, 55, 57, 54, 57, 55, 57, 50, 54, 52, 50,
  40, 47, 55, 54, 55, 47, 55, 47, 40, 47, 55, 54, 55, 47, 55, 47,
  40, 49, 50, 52, 50, 49, 47, 45, 55, 54, 52, 62, 61, 59, 57, 55,
  54, 52, 50, 62, 57, 62, 54, 57, 50, 52, 54, 57, 55, 54, 52, 50,
  56, 50, 53, 52, 53, 50, 56, 50, 59, 50, 53, 52, 53, 50, 56, 50,
  48, 52, 57, 59, 60, 57, 52, 50, 48, 52, 57, 59, 60, 57, 54, 52,
  51, 54, 51, 54, 57, 54, 57, 54, 51, 54, 51, 54, 57, 54, 57, 54,
  55, 54, 52, 55, 54, 55, 57, 54, 55, 54, 52, 50, 48, 47, 45, 43,
  42, 48, 50, 48, 50, 48, 50, 48, 42, 48, 50, 48, 50, 48, 50, 48,
  43, 47, 53, 52, 53, 47, 53, 47, 43, 47, 53, 52, 53, 47, 53, 47,
  43, 48, 52, 50, 52, 48, 52, 48, 43, 48, 52, 50, 52, 48, 52, 48,
  43, 54, 60, 59, 60, 54, 60, 54, 43, 54, 60, 59, 60, 54, 60, 54,
  43, 50, 59, 57, 59, 55, 54, 52, 50, 48, 47, 45, 43, 42, 40, 38,
  37, 45, 52, 54, 55, 52, 54, 55, 37, 45, 52, 54, 55, 52, 54, 55,
  36, 45, 50, 52, 54, 50, 52, 54, 36, 45, 50, 52, 54, 50, 52, 54,
  36, 45, 50, 54, 57, 61, 62, -1, -1, 45, 47, 48, 50, 52, 54, 55,
  57, 54, 50, 52, 54, 55, 57, 59, 60, 57, 54, 55, 57, 59, 60, 62,
  63, 62, 61, 62, 62, 60, 59, 60, 60, 57, 54, 52, 50, 45, 47, 48,
  38, 45, 50, 54, 57, 59, 60, 57, 59, 55, 50, 48, 47, 43, 45, 47,
  38, 43, 47, 50, 55, 57, 59, 55, 61, 59, 57, 58, 58, 57, 56, 57,
  57, 55, 54, 55, 55, 52, 49, 47, 45, 49, 52, 55, 57, 61, 62, 61,
  62, 57, 54, 52, 54, 57, 50, 54, 45, 50, 49, 47, 45, 43, 42, 40,
  38, -1, 60, 59, 57, 55, 54, 52, 50, 60, 59, 57, 55, 54, 52, 50,
  48, 59, 57, 55, 54, 52, 50, 48, 47, 57, 55, 54, 52, 50, 48, 47,
  45, 55, 54, 52, 54, 57, 50, 57, 52, 57, 54, 57, 55, 57, 52, 57,
  54, 57, 50, 57, 55, 57, 52, 57, 54, 57, 50, 57, 55, 57, 52, 57,
  54, 57, 50, 57, 52, 57, 54, 57, 55, 57, 57, 57, 59, 57, 50, 57,
  57, 57, 59, 57, 60, 57, 50, 57, 59, 57, 60, 57, 62, 57, 59, 57,
  60, 57, 59, 57, 60, 57, 57, 57, 59, 57, 57, 57, 59, 57, 55, 57,
  57, 57, 55, 57, 57, 57, 54, 57, 55, 57, 54, 57, 55, 57, 52, 57,
  54, 57, 50, 52, 53, 50, 54, 50, 55, 50, 56, 50, 57, 50, 58, 50,
  59, 50, 60, 50, 61, 50, 62, 50, 63, 50, 64, 50, 65, 50, 66, 50,
  67, 59, 50, 59, 67, 59, 67, 59, 67, 59, 50, 59, 67, 59, 67, 59,
  67, 57, 50, 57, 67, 57, 67, 57, 67, 57, 50, 57, 67, 57, 67, 57,
  66, 60, 50, 60, 66, 60, 66, 60, 66, 60, 50, 60, 66, 60, 66, 60,
  43, -1, -1, -1, -1, -1, -1, 67, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];
const TOTAL_NOTES_IN_SONG = SONG.length;

// ---------- utilities ----------
const lerp = (a, b, f) => a + (b - a) * f;
const lim = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
const sign = (a) => a >= 0 ? 1 : -1;

function lineIntersect(e, b, o, n) {
  const d = b.y - e.y, a = n.y - o.y, l = e.x - b.x, k = o.x - n.x;
  const g = b.x * e.y - e.x * b.y, f = n.x * o.y - o.x * n.y;
  const h = d * k - a * l;
  if (h === 0) return null;
  const j = (l * f - k * g) / h;
  const m = (a * g - d * f) / h;
  const seg1 = Math.pow(e.x - b.x, 2) + Math.pow(e.y - b.y, 2);
  const seg2 = Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2);
  if (Math.pow(j - b.x, 2) + Math.pow(m - b.y, 2) > seg1) return null;
  if (Math.pow(j - e.x, 2) + Math.pow(m - e.y, 2) > seg1) return null;
  if (Math.pow(j - n.x, 2) + Math.pow(m - n.y, 2) > seg2) return null;
  if (Math.pow(j - o.x, 2) + Math.pow(m - o.y, 2) > seg2) return null;
  return { x: j, y: m };
}

// ---------- Audio ----------
class AudioEngine {
  constructor(baseURL) {
    this.ctx = new AudioContext();
    this.baseURL = baseURL;
    this.buffers = new Array(TOTAL_NOTES);
    this.ready = false;
    this.loadedCount = 0;
    // Master volume — Machine updates this every frame to create the "reveal"
    // envelope: quiet during tuning, gradual ramp up, full volume mid-song.
    // That way the Prelude emerges instead of appearing abruptly.
    this.masterVolume = 1.0;
  }

  async loadAll(onProgress) {
    const urls = [];
    for (let i = 0; i < TOTAL_NOTES; i++) {
      const n = String(i).padStart(2, "0");
      urls.push(`${this.baseURL}/harp_${n}.mp3`);
    }
    await Promise.all(urls.map(async (url, i) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const data = await res.arrayBuffer();
      this.buffers[i] = await this.ctx.decodeAudioData(data);
      this.loadedCount++;
      if (onProgress) onProgress(this.loadedCount, TOTAL_NOTES);
    }));
    this.ready = true;
  }

  play(noteIdx, volume, pan) {
    if (!this.ready) return;
    const buf = this.buffers[noteIdx];
    if (!buf) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const gain = this.ctx.createGain();
    gain.gain.value = volume;
    src.connect(gain);
    if (typeof this.ctx.createStereoPanner === "function") {
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = lim(pan, -1, 1);
      gain.connect(panner);
      panner.connect(this.ctx.destination);
    } else {
      gain.connect(this.ctx.destination);
    }
    src.start();
  }

  resume() { if (this.ctx.state === "suspended") return this.ctx.resume(); }
}

// ---------- Thread (string) ----------
class Thread {
  constructor(yp, pitchInd, str, hex, ind, cv, machine) {
    this.yp0 = this.yp1 = yp;
    this.pitchInd = pitchInd;
    this.len = 0;
    this.ind = ind;
    this.str = str;
    this.hex = hex;
    this.ampPxMin = 3;
    this.t = 0;
    this.amp = 0;
    this.rStrength = 0;
    this.isGrabbed = false;
    this.isOsc = false;
    this.isFirstOsc = false;
    this.isShifting = false;
    this.carGrab = null;
    this.pt0 = { x: 0, y: 0 };
    this.pt1 = { x: 0, y: 0 };
    this.xc = this.yc = 0;
    this.xg = this.yg = 0;
    this.xd = this.yd = 0;
    this.rPitch = 0;
    this.cv = cv;
    this.m = machine;
    this._updPos();
  }

  setTargetPitch(a) {
    let b;
    if (a === -1) { this.pitchInd = -1; b = 0; }
    else {
      this.pitchInd = a;
      this.rPitch = this.pitchInd / (TOTAL_NOTES - 1);
      b = this.m.arrLength[this.pitchInd];
    }
    if (b !== this.len) { this.isShifting = true; this.lenTarg = b; }
  }

  _setLength(a) { this.len = a; this._updPos(); }

  _updShifting() {
    const a = (this.lenTarg - this.len) * 0.2;
    if (Math.abs(a) < 1) { this._setLength(this.lenTarg); this.isShifting = false; }
    else this._setLength(this.len + a);
  }

  _updPos() {
    this.xp0 = -this.len / 2;
    this.xp1 = this.len / 2;
    this.pt0.x = this.xp0; this.pt0.y = this.yp0;
    this.pt1.x = this.xp1; this.pt1.y = this.yp1;
    this.dx = this.xp1 - this.xp0;
    this.dy = this.yp1 - this.yp0;
    this.xMid = this.xp0 + this.dx * 0.5;
    this.yMid = this.yp0 + this.dy * 0.5;
    this.ang = Math.atan2(this.dy, this.dx);
    this.angPerp = Math.PI / 2 - this.ang;
    this.xc = this.xMid; this.yc = this.yMid;
    this.distMax = lerp(SLACK_SHORT, SLACK_LONG, (this.len - MIN_LENGTH) / (MAX_LENGTH - MIN_LENGTH));
    this.freq = lerp(OSCILLATION_SPEED_LOW, OSCILLATION_SPEED_HIGH, this.rPitch);
    this.ampDamp = lerp(AMPLITUDE_DAMPEN_LOW, AMPLITUDE_DAMPEN_HIGH, this.rPitch);
    this.ampMax = this.distMax;
    this.sinAng = Math.sin(this.ang);
    this.cosAng = Math.cos(this.ang);
    this.sinPerp = Math.sin(this.angPerp);
    this.cosPerp = Math.cos(this.angPerp);
  }

  redraw() {
    if (this.len === 0 || isNaN(this.xp1)) return;
    const xo = this.m.xo, yo = this.m.yo;
    this.cv.beginPath();
    this.cv.lineCap = "round";
    this.cv.strokeStyle = this.hex;
    this.cv.lineWidth = this.str;
    if (this.isGrabbed || this.isFirstOsc) { this.xd = this.xg; this.yd = this.yg; }
    else { this.xd = this.xc; this.yd = this.yc; }
    if (isNaN(this.xd)) return;
    const dx0 = this.xd - this.xp0, dy0 = this.yd - this.yp0;
    const dx1 = this.xp1 - this.xd, dy1 = this.yp1 - this.yd;
    const d0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
    const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const dxB0 = CURVATURE_RATIO * d0 * this.cosAng;
    const dyB0 = CURVATURE_RATIO * d0 * this.sinAng;
    const dxB1 = CURVATURE_RATIO * d1 * this.cosAng;
    const dyB1 = CURVATURE_RATIO * d1 * this.sinAng;
    this.cv.moveTo(this.xp0 + xo, this.yp0 + yo);
    this.cv.bezierCurveTo(
      this.xd - dxB0 + xo, this.yd - dyB0 + yo,
      this.xd + dxB1 + xo, this.yd + dyB1 + yo,
      this.xp1 + xo, this.yp1 + yo,
    );
    this.cv.stroke();
    this.cv.closePath();
  }

  upd() {
    if (this.isShifting) this._updShifting();
    if (!this.isGrabbed && this.isOsc) this._updOsc();
  }

  _updOsc() {
    if (this.isFirstOsc) {
      const a = this.xg1 - this.xg;
      const b = this.yg1 - this.yg;
      this.xg += a * 0.8;
      this.yg += b * 0.8;
      if (Math.abs(a) < 2 && Math.abs(b) < 2) {
        this.t = 0;
        this.oscDir = 1;
        this.isFirstOsc = false;
        if (sign(a) !== sign(this.sinAng)) this.oscDir *= -1;
      }
    } else {
      this.t += this.freq * this.oscDir;
      const g = Math.sin(this.t);
      this.amp *= this.ampDamp;
      this.xc = this.xMid + g * this.sinAng * this.amp;
      this.yc = this.yMid - g * this.cosAng * this.amp;
      if (this.amp <= 0.15) { this.amp = 0; this.isOsc = false; }
    }
  }

  pluck(g, c, forceMax) {
    this.xgi = this.xg = g;
    this.ygi = this.yg = c;
    const n = 0 - this.xp0, i = 0 - this.yp0;
    const j = Math.sqrt(n * n + i * i);
    this.rGrab = lim(j / this.len, 0, 1);
    this.rHalf = this.rGrab <= 0.5 ? this.rGrab / 0.5 : 1 - (this.rGrab - 0.5) / 0.5;
    const b = this.distMax * this.rHalf;
    const a = forceMax ? 1 : this.m.rSpdAvg;
    this.distPerp = (1 - a) * b;
    this.rStrength = forceMax ? 1 : lim(Math.abs(this.distPerp) / this.distMax, 0, 1);
    if (this.distPerp < this.ampPxMin) this.distPerp = this.ampPxMin;
    this.xg = this.xgi + this.distPerp * this.cosPerp;
    this.yg = this.ygi + this.distPerp * this.sinPerp;
    this.xc = this.xMid; this.yc = this.yMid;
    if (this.isOsc) {
      this.rStrength = lim((this.rStrength * 0.5) + (this.amp / this.ampMax), 0, 1);
      this.amp = this.rStrength * this.ampMax;
    } else {
      this.amp = this.rStrength * this.ampMax;
      this._startOsc();
    }
    const pan = this.m.xAsRatio(g);
    this._playNote(this.rStrength, pan);
  }

  _startOsc() {
    this.xg1 = this.xp0 + this.rGrab * this.dx;
    this.yg1 = this.yp0 + this.rGrab * this.dy;
    this.xg0 = this.xg; this.yg0 = this.yg;
    this.t = 0;
    this.isFirstOsc = this.isOsc = true;
  }

  _playNote(strength, panRatio) {
    if (this.pitchInd === -1) return;
    const vol = VOLUME_MIN + strength * (VOLUME_MAX - VOLUME_MIN);
    const pan = PAN_LEFT + panRatio * (PAN_RIGHT - PAN_LEFT);
    this.m.audio.play(this.pitchInd, vol, pan);
  }
}

// ---------- Wheel ----------
class Wheel {
  constructor(xp, yp, ind, cv) {
    this.ind = ind;
    this.xp = xp;
    this.yp = yp;
    this.rot = Math.PI * 0.25;
    this.cv = cv;
    this.sinAng = Math.sin(this.rot);
    this.cosAng = Math.cos(this.rot);
  }
  setRot(a) { this.rot = a; this.sinAng = Math.sin(a); this.cosAng = Math.cos(a); }
  upd() { this.nub0.upd(); this.nub1.upd(); }
  redraw() { this.nub0.redraw(); this.nub1.redraw(); }
}

// ---------- Nub ----------
class Nub {
  constructor(ind, indAll, machine, wheel, cv) {
    this.wheel = wheel;
    this.machine = machine;
    this.ind = ind;
    this.indAll = indAll;
    this.cv = cv;
    this.xpOrbit = this.xpOrbitTarg = wheel.xp;
    this.ypOrbit = this.ypOrbitTarg = wheel.yp;
    this.orbit = this.orbitTarg = WHEEL_RADIUS;
    this.rad = RAD_NORM;
    this.radTarg = RAD_NORM;
    this.velX = 0; this.velY = 0;
    this.dampVel = 0.93;
    this.arrTrail = new Array(TRAIL_PTS);
    this.frameCt = indAll;
    this.spd = 0;
    this.hasEntered = false;
    this.isLoading = false;
    this.isFirstRun = true;
    this.isTossing = false;
    this.pt0 = { x: 0, y: 0 };
    this.pt1 = { x: 0, y: 0 };
    this.xp0 = this.xp1 = 0;
    this.yp0 = this.yp1 = 0;
    this.easeOrbit = EASE_ORBIT_LOADER;
    this.easeCenter = EASE_CENTER_LOADER;
  }

  upd() {
    if (!this.hasEntered) return;
    this._updPos();
    this._updInteract();
  }

  _updInteract() {
    if (this.isFirstRun) { this.isFirstRun = false; return; }
    if (this.spd > SPD_IGNORE_MAX) return;
    let hits = 0;
    for (let b = 0; b < this.machine.arrThreads.length; b++) {
      const d = this.machine.arrThreads[b];
      const e = lineIntersect(this.pt0, this.pt1, d.pt0, d.pt1);
      if (!e) continue;
      const a = e.x, c = e.y;
      if (!d.isGrabbed && !isNaN(a) && !isNaN(c) && this.spd > SPD_GRAB) {
        d.pluck(a, c, true);
        hits++;
        if (hits > PLUCK_FRAME_MAX) break;
      }
    }
  }

  _updPos() {
    this.velX *= this.dampVel;
    this.velY *= this.dampVel;
    if (Math.abs(this.velX) < 0.5) this.velX = 0;
    if (Math.abs(this.velY) < 0.5) this.velY = 0;

    if (this.rad !== this.radTarg) {
      const e = this.radTarg - this.rad;
      if (Math.abs(e) < 1) this.rad = this.radTarg;
      else this.rad += e * 0.4;
    }

    this.isTossing = Math.abs(this.velX) > 0 || Math.abs(this.velY) > 0;

    if (this.isTossing) {
      this.xp1 = this.xp0 + this.velX;
      this.yp1 = this.yp0 + this.velY;
      this.xpOrbit = this.xp1; this.ypOrbit = this.yp1;
      this.orbit = 0;
    } else {
      this.xpOrbitTarg = this.wheel.xp;
      this.ypOrbitTarg = this.wheel.yp;

      if (this.orbit !== this.orbitTarg) {
        this.orbit += (this.orbitTarg - this.orbit) * this.easeOrbit;
        if (Math.abs(this.orbitTarg - this.orbit) < 1) this.orbit = this.orbitTarg;
      }
      if (this.xpOrbit !== this.xpOrbitTarg) {
        this.xpOrbit += (this.xpOrbitTarg - this.xpOrbit) * this.easeCenter;
        if (Math.abs(this.xpOrbitTarg - this.xpOrbit) < 1) this.xpOrbit = this.xpOrbitTarg;
      }
      if (this.ypOrbit !== this.ypOrbitTarg) {
        this.ypOrbit += (this.ypOrbitTarg - this.ypOrbit) * this.easeCenter;
        if (Math.abs(this.ypOrbitTarg - this.ypOrbit) < 1) this.ypOrbit = this.ypOrbitTarg;
      }

      let xpw, ypw;
      if (this.ind === 0) {
        xpw = this.xpOrbit + this.wheel.cosAng * this.orbit;
        ypw = this.ypOrbit + this.wheel.sinAng * this.orbit;
      } else {
        xpw = this.xpOrbit - this.wheel.cosAng * this.orbit;
        ypw = this.ypOrbit - this.wheel.sinAng * this.orbit;
      }

      if (this.isFirstRun) {
        this.xp0 = this.xp1 = xpw;
        this.yp0 = this.yp1 = ypw;
        for (let a = 0; a < TRAIL_PTS; a++) this.arrTrail[a] = { x: xpw, y: ypw };
      }

      this.xp1 = xpw; this.yp1 = ypw;
    }

    this.dx = this.xp1 - this.xp0;
    this.dy = this.yp1 - this.yp0;
    this.pt0.x = this.xp0; this.pt0.y = this.yp0;
    this.pt1.x = this.xp1; this.pt1.y = this.yp1;
    this.xp0 = this.xp1; this.yp0 = this.yp1;
    this.spd = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if (this.frameCt % TRAIL_SAMPLE === 0) {
      this.arrTrail.shift();
      this.arrTrail[TRAIL_PTS - 1] = { x: this.xp0, y: this.yp0 };
    }
    // Expand the machine's dirty-rect so clearRect() wipes the nub's orbit path
    // (not just the thread band). Without this, nubs leave a permanent trail.
    for (let a = 0; a < this.arrTrail.length; a++) {
      this.machine.checkBoxLimit(this.arrTrail[a].x, this.arrTrail[a].y);
    }
    this.frameCt++;
  }

  enter() {
    this.hasEntered = true;
    this.isLoading = true;
    switch (this.indAll) {
      case 0:
        this.xpOrbit = -150; this.ypOrbit = this.machine.height * 0.6;
        this.orbit = ORBIT_LOADER * 0.3; break;
      case 1:
        this.xpOrbit = this.machine.width; this.ypOrbit = -this.machine.height * 0.9;
        this.orbit = ORBIT_LOADER * 5.5; break;
      case 2:
        this.xpOrbit = -this.machine.width * 1.5; this.ypOrbit = this.machine.height;
        this.orbit = ORBIT_LOADER * 6; break;
      case 3:
        this.xpOrbit = this.machine.width * 1.2; this.ypOrbit = -this.machine.height * 0.8;
        this.orbit = ORBIT_LOADER * 1.5; break;
    }
    this.radTarg = RAD_NORM;
    this.orbitTarg = WHEEL_RADIUS;
    this.easeOrbit = EASE_ORBIT_LOADER;
    this.easeCenter = EASE_CENTER_LOADER;
  }

  exitLoader() {
    this.isLoading = false;
    this.orbitTarg = WHEEL_RADIUS;
    this.easeOrbit = EASE_ORBIT_EXIT_LOADER;
    this.easeCenter = EASE_CENTER_EXIT_LOADER;
    this.radTarg = RAD_NORM;
  }

  redraw() {
    if (!this.hasEntered) return;
    this.cv.beginPath();
    this.cv.fillStyle = "#FFFFFF";
    this.cv.arc(this.xp1 + this.machine.xo, this.yp1 + this.machine.yo, this.rad, 0, 2 * Math.PI);
    this.cv.fill();
    this.cv.closePath();
  }
}

// ---------- Machine ----------
class Machine {
  constructor(canvasEl, audio) {
    this.canvasEl = canvasEl;
    this.cv = canvasEl.getContext("2d");
    this.audio = audio;
    this.arrThreads = [];
    this.arrLength = [];
    this.arrNubs = new Array(4);
    this.arrPitchStart = new Array(TOTAL_THREADS);
    this.bpm = BPM_NORM;
    this.bps = BPM_NORM / 60;
    this.rSpd = 0;
    this.rSpdAvg = 0;
    this.indGroup = 0;
    this.isIntro = true;
    this.isIntroDone = false;
    this.noteSongRdPrev = 0;
    this.threadsInPlace = false;
    this.xbLimitMin = -MAX_LENGTH * 0.5;
    this.xbLimitMax = MAX_LENGTH * 0.5;
    this.ybLimitMin = -HEIGHT_ALL_THREADS * 0.5;
    this.ybLimitMax = HEIGHT_ALL_THREADS * 0.5;
    this.width = 0;
    this.height = 0;
    this.xo = 0;
    this.yo = 0;
    this.rLoad = 0;
    this.wasResized = false;
    this.tLoadPrev = 0;
  }

  resize() {
    // Reference "world" size the physics was tuned for. MAX_LENGTH is 590,
    // wheels sit at +/-WHEEL_RADIUS (172), so ~800x500 comfortably fits.
    const WORLD_W = 800;
    const WORLD_H = 500;

    const parent = this.canvasEl.parentElement || this.canvasEl;
    const rect = parent.getBoundingClientRect();
    const cssW = Math.max(1, Math.round(rect.width));
    const cssH = Math.max(1, Math.round(rect.height || cssW * 0.625));
    const dpr = window.devicePixelRatio || 1;

    // Shrink the world to fit, never enlarge.
    const fit = Math.min(cssW / WORLD_W, cssH / WORLD_H, 1);

    // Only set the buffer size. CSS (.baroqueStage canvas { width: 100% })
    // handles the element's visual size — don't set inline style.width/height
    // or CSS won't be able to reclaim control when the parent shrinks/grows.
    this.canvasEl.width = Math.round(cssW * dpr);
    this.canvasEl.height = Math.round(cssH * dpr);

    // setTransform maps world coords → device pixels in one shot: scale for
    // the fit factor AND the device-pixel-ratio. Every moveTo/stroke/arc in
    // the draw code stays in world space (xp + xo etc.).
    this._renderScale = dpr * fit;
    this.cv.setTransform(this._renderScale, 0, 0, this._renderScale, 0, 0);

    this.width = cssW / fit;
    this.height = cssH / fit;
    this.xo = Math.round(this.width / 2);
    this.yo = Math.round(this.height / 2);
    this.wasResized = true;
  }

  build() {
    let f = MAX_LENGTH;
    for (let e = 0; e < TOTAL_NOTES; e++) { this.arrLength[e] = f; f *= HALF_STEP; }
    const step = WHEEL_QUARTER_SEG / TOTAL_THREADS;
    let a = (TOTAL_THREADS / 2) * step - 0.5 * step;
    for (let e = 0; e < TOTAL_THREADS; e++) {
      this.arrPitchStart[e] = MIDI_MAP[SONG[e]];
      const t = new Thread(a, -1, 3, "#FFFFFF", e, this.cv, this);
      a -= step;
      this.arrThreads.push(t);
    }
    this.wheel0 = new Wheel(WHEEL_RADIUS, 0, 0, this.cv);
    this.wheel1 = new Wheel(-WHEEL_RADIUS, 0, 1, this.cv);
    this.arrNubs[0] = this.wheel0.nub0 = new Nub(0, 0, this, this.wheel0, this.cv);
    this.arrNubs[1] = this.wheel0.nub1 = new Nub(1, 1, this, this.wheel0, this.cv);
    this.arrNubs[2] = this.wheel1.nub0 = new Nub(0, 2, this, this.wheel1, this.cv);
    this.arrNubs[3] = this.wheel1.nub1 = new Nub(1, 3, this, this.wheel1, this.cv);
    this.cv.globalCompositeOperation = "lighter";
    this.arrNubs[0].enter();
  }

  beginLoading() {
    const now = performance.now() / 1000;
    this.t0 = this.tSong0 = this.tNotes0 = this.tLoadPrev = this.tLoading0 = now;
  }

  xAsRatio(a) { return lim(a, 0, this.width) / this.width; }

  checkBoxLimit(x, y) {
    if (x < this.xbMin) this.xbMin = x; else if (x > this.xbMax) this.xbMax = x;
    if (y < this.ybMin) this.ybMin = y; else if (y > this.ybMax) this.ybMax = y;
  }

  setGroup(c) {
    this.indGroup = c;
    for (let i = 0; i < this.arrThreads.length; i++) {
      const b = SONG[this.indGroup + i];
      const pitch = b === -1 ? -1 : MIDI_MAP[b];
      this.arrThreads[i].setTargetPitch(pitch);
    }
  }

  exitLoading() {
    this.isIntro = false;
    for (let a = 0; a < this.arrNubs.length; a++) this.arrNubs[a].exitLoader();
    for (let a = 0; a < this.arrThreads.length; a++) this.arrThreads[a].upd();
  }

  upd() {
    if (this.isIntro) this._updLoading();
    // Reset dirty-rect to the hard thread-band limits; nubs expand it via
    // checkBoxLimit() as they orbit outside that band.
    this.xbMin = this.xbLimitMin;
    this.xbMax = this.xbLimitMax;
    this.ybMin = this.ybLimitMin;
    this.ybMax = this.ybLimitMax;
    this._updTime();
    if (this.wasResized) { this.wasResized = false; this.cv.globalCompositeOperation = "lighter"; }
    this._updWheels();
    this.cv.clearRect(
      this.xo + this.xbMin - CLEAR_RECT_MARG,
      this.yo + this.ybMin - CLEAR_RECT_MARG,
      this.xbMax - this.xbMin + CLEAR_RECT_MARG * 2,
      this.ybMax - this.ybMin + CLEAR_RECT_MARG * 2,
    );
    for (let a = 0; a < this.arrThreads.length; a++) {
      this.arrThreads[a].upd();
      this.arrThreads[a].redraw();
    }
    this.wheel0.nub0.redraw();
    this.wheel0.nub1.redraw();
    this.wheel1.nub0.redraw();
    this.wheel1.nub1.redraw();
  }

  _updTime() {
    this.t1 = performance.now() / 1000;
    this.elapFrame = this.t1 - this.t0;
    this.t0 = this.t1;
    this.elapSong = this.t1 - this.tSong0;
    this.beatSong = this.bps * this.elapSong;
    this.noteSong = this.beatSong * NOTE_UNIT;
    this.noteSongRd = Math.floor(this.noteSong);
    if (this.isIntro) {
      if (this.noteSongRd !== this.noteSongRdPrev) {
        if (this.isIntroDone && this.noteSongRdPrev < this.nextNoteBreak && this.noteSongRd >= this.nextNoteBreak) {
          const frac = this.beatSong % 1;
          this.tSong0 = this.tNotes0 = this.t1 - (frac / this.bps);
          this.exitLoading();
        }
        this.noteSongRdPrev = this.noteSongRd;
      }
    } else {
      if (this.noteSong > this.indGroup + TOTAL_THREADS) {
        this.tNotes0 = this.t1;
        let c = this.indGroup + TOTAL_THREADS;
        if (c >= TOTAL_NOTES_IN_SONG) { c = 0; this.tSong0 = this.t1; }
        this.setGroup(c);
      }
    }
    this.nextNoteBreak = this.noteSongRd + (32 - (this.noteSongRd % 32));
  }

  _updWheels() {
    this.wheel0.setRot((Math.PI * (0.25 + (this.beatSong % 16) / 16 * 2)) % (2 * Math.PI));
    this.wheel1.setRot((Math.PI * (0.25 - (this.beatSong % 16) / 16 * 2)) % (2 * Math.PI));
    this.wheel0.upd();
    this.wheel1.upd();
  }

  _updLoading() {
    const tNow = performance.now() / 1000;
    this.rLoad = (tNow - this.tLoading0) / LOAD_TIME_OVERALL;
    if (this.rLoad >= 1) this.rLoad = 1;
    if (tNow - this.tLoadPrev > TIME_BETWEEN_LOAD) {
      this.tLoadPrev = tNow;
      this._incrLoad();
    }
  }

  _incrLoad() {
    // Progressive nub entry
    if (this.rLoad > 0.15) {
      if (!this.arrNubs[2].hasEntered) this.arrNubs[2].enter();
      if (!this.arrNubs[0].hasEntered) this.arrNubs[0].enter();
    }
    if (this.rLoad > 0.85 && !this.arrNubs[1].hasEntered) this.arrNubs[1].enter();
    if (this.rLoad > 0.97 && !this.arrNubs[3].hasEntered) this.arrNubs[3].enter();

    // Progressive thread tune-up
    const e = this.rLoad < INCR_LOAD_RAMP_LO
      ? 0
      : Math.min(1, (this.rLoad - INCR_LOAD_RAMP_LO) / (INCR_LOAD_RAMP_HI - INCR_LOAD_RAMP_LO));
    const k = e * TOTAL_THREADS;
    let d = Math.floor(Math.random() * 0.999 * k);
    let f = 0;
    for (let g = 0; g < TOTAL_THREADS; g++) {
      if (g > k) break;
      const a = this.arrPitchStart[d];
      const b = this.arrThreads[d];
      if (b.pitchInd === a) {
        d = (d + 1) % TOTAL_THREADS;
        f++;
      } else {
        const c = k === 0 ? 1 : 1 + Math.round(Math.random() * INCR_LOAD_MAX_STEP);
        const off = Math.floor(lerp(-3, 0, this.rLoad));
        let m = b.pitchInd + c + off;
        if (m < 0) m = 0;
        if (m > a) m = a;
        if (this.audio.loadedCount > 0 && this.audio.loadedCount - 1 >= m) {
          b.setTargetPitch(m);
          break;
        }
      }
    }
    if (f === TOTAL_THREADS) this.threadsInPlace = true;

    // Safety net: the probabilistic selection above occasionally leaves a string
    // stuck at pitchInd=-1 forever. Only engage after the intro has naturally
    // run its full length (rLoad=1 for at least INTRO_SAFETY_DELAY seconds), so
    // the deliberate tuning-up pacing is preserved.
    if (this.rLoad >= 1) {
      if (!this._rLoadFullSince) this._rLoadFullSince = (performance.now() / 1000);
      const sinceFull = (performance.now() / 1000) - this._rLoadFullSince;
      if (sinceFull >= INTRO_SAFETY_DELAY && this.audio.ready && !this.isIntroDone) {
        for (let i = 0; i < this.arrThreads.length; i++) {
          const t = this.arrThreads[i];
          const target = this.arrPitchStart[i];
          if (t.pitchInd !== target) t.setTargetPitch(target);
        }
        this.threadsInPlace = true;
      }
    }

    if (this.threadsInPlace && this.audio.ready && this.rLoad >= 1 && !this.isIntroDone) {
      this.isIntroDone = true;
    }
  }
}

// ---------- Bootstrap ----------
async function init() {
  const canvas = document.getElementById("main-canvas");
  if (!canvas) return;

  const audio = new AudioEngine("/assets/audio");
  const machine = new Machine(canvas, audio);
  machine.resize();
  machine.build();
  machine.beginLoading();

  // ResizeObserver catches both window resizes and layout shifts (webfonts
  // loading, stylesheet settling, orientation change) — more reliable than
  // window.resize alone, which doesn't fire when a parent element changes size
  // due to the document's own reflow.
  let resizeTimer = 0;
  const kick = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => machine.resize(), 60);
  };
  const stage = canvas.parentElement;
  if (stage && "ResizeObserver" in window) {
    new ResizeObserver(kick).observe(stage);
  } else {
    window.addEventListener("resize", kick);
  }
  // One more pass after full load in case webfonts shift the layout.
  window.addEventListener("load", () => machine.resize());

  // Autoplay policies: AudioContext starts suspended on page load. A visible
  // hint tells visitors they can unlock sound; any first pointer/key/touch
  // interaction resumes it and fades the hint out.
  const hint = document.getElementById("baroque-hint");
  const showHint = () => { if (hint) hint.hidden = false; };
  const hideHint = () => {
    if (!hint) return;
    hint.classList.add("is-hiding");
    setTimeout(() => hint.remove(), 700);
  };
  if (audio.ctx.state === "suspended") showHint();

  let unlocked = false;
  const unlock = async () => {
    if (unlocked) return;
    unlocked = true;
    try { await audio.resume(); } catch {}
    hideHint();
  };
  document.addEventListener("pointerdown", unlock, { once: true, passive: true });
  document.addEventListener("touchstart", unlock, { once: true, passive: true });
  document.addEventListener("keydown", unlock, { once: true });

  audio.loadAll().catch((err) => console.warn("audio load failed:", err));

  let lastFrame = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (now - lastFrame < FRAME_MS) return;
    lastFrame = now;
    try { machine.upd(); } catch (e) { console.error(e); }
  }
  requestAnimationFrame(frame);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
