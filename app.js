class TrackKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.index = 0;
    this.trackSpeed = 150;
    this.play = document.querySelector(".play");
  }

  repeat() {
    let step = this.index % 8;
    const activePad = document.querySelectorAll(`.p${step}`);
    this.index++;
  }

  start() {
    const interval = (60 / this.trackSpeed) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }

  activeThePads() {
    this.pads.forEach((pad) => {
      pad.addEventListener("click", () => {
        pad.classList.toggle("active");
      });
    });
  }
}

const testTracks = new TrackKit();
testTracks.play.addEventListener("click", () => testTracks.activeThePads());
