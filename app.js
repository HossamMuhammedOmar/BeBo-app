const kickTrack = document.querySelector("#kick-select");
const snareTrack = document.querySelector("#snare-select");
const hitHatTrack = document.querySelector("#hithat-select");

kickTrack.addEventListener("click", (e) => {
  console.log(e.target.value);
});

// for (let option of selector) {
//   console.log(option);
// }
