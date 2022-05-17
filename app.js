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
    this.currentKick = "sounds/kick-classic.wav";
    this.currentSnare = "sounds/snare-acoustic.wav";
    this.currentHihat = "sounds/hihat-acoustic.wav";
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.speedSlider = document.querySelector(".speed-slider");
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

  muteSound(e) {
    const targetClass = e.target.classList;
    targetClass.toggle("active");
    const trackIndex = e.target.dataset.track;

    if (targetClass.contains("active")) {
      switch (trackIndex) {
        case "0":
          this.kickSound.volume = 0;
          break;
        case "1":
          this.snareSound.volume = 0;
          break;
        case "2":
          this.hihatSound.volume = 0;
          break;
      }
    } else {
      switch (trackIndex) {
        case "0":
          this.kickSound.volume = 1;
          break;
        case "1":
          this.snareSound.volume = 1;
          break;
        case "2":
          this.hihatSound.volume = 1;
          break;
      }
    }
  }

  changeSpeed(e) {
    const speedText = document.querySelector(".speed-value");
    speedText.innerText = e.target.value;
  }

  updateSpeed(e) {
    this.trackSpeed = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
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

track.muteBtn.forEach((mute) => {
  mute.addEventListener("click", (e) => track.muteSound(e));
});

track.speedSlider.addEventListener("input", (e) => {
  track.changeSpeed(e);
});

track.speedSlider.addEventListener("change", (e) => {
  track.updateSpeed(e);
});
