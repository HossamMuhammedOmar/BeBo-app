class TrackKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.index = 0;
    this.trackSpeed = 250;
    this.play = document.querySelector(".play");
    this.isPlaying = null;
    this.currentKick = "/sounds/kick-classic.wav";
    this.currentSnare = "/sounds/snare-acoustic.wav";
    this.currentHihat = "/sounds/hihat-acoustic.wav";
    this.selects = document.querySelectorAll("select");
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
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateButtonText() {
    if (!this.isPlaying) {
      this.play.innerText = "STOP";
      this.play.classList.add("active");
    } else {
      this.play.innerText = "PLAY";
      this.play.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectName = e.target.name;
    const selectValue = e.target.value;
    switch (selectName) {
      case "kick-select":
        this.kickSound.src = selectValue;
        break;
      case "snare-select":
        this.snareSound.src = selectValue;
        break;

      case "hihat-select":
        this.hihatSound.src = selectValue;
        break;
    }
  }
}

const track = new TrackKit();

track.pads.forEach((pad) => {
  pad.addEventListener("click", track.activeThePads);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

track.play.addEventListener("click", () => {
  track.updateButtonText();
  track.start();
});

track.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    track.changeSound(e);
  });
});
