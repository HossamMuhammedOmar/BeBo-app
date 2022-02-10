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

  activeThePads() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activePads = document.querySelectorAll(`.p${step}`);
    activePads.forEach((pad) => {
      pad.style.animation = `startTrack 0.2s alternate ease-in-out 2`;
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.trackSpeed) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const track = new TrackKit();

track.pads.forEach((pad) => {
  pad.addEventListener("click", track.activeThePads);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

track.play.addEventListener("click", () => track.start());
