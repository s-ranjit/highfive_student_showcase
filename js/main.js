/*scroll animation*/
const hero = document.querySelector('#hero img');

window.addEventListener("scroll",() => {
  let scrollY = window.scrollY;
  let scale = Math.max(0.2, 1 - scrollY / 300);

  hero.style.transform = `scale(${scale})`;
});

/*vedio*/
const playerCon = document.querySelector("#player-container");
const player = document.querySelector("video");
const videoControls = document.querySelector("#video-controls");
const playButton = document.querySelector("#play-button");
const pauseButton = document.querySelector("#pause-button");
const stopButton = document.querySelector("#stop-button");
const volumeSlider = document.querySelector("#change-vol");
const fullScreen = document.querySelector("#full-screen");

// console.log(playerCon);

// if user has JS, then remove default controls and show custom
player.controls = false;
videoControls.classList.remove("hidden");

// functions
function playVideo() {
    console.log("Play Video Called!");
    player.play();
}
function pauseVideo() {
    console.log("Pause Video Called!");
    player.pause();
}
function stopVideo() {
    player.pause();
    player.currentTime = 1;
}
function changeVolume() {
   player.volume = volumeSlider.value; 
}

function toggleFullScreen() {
    if(document.fullscreenElement) {
        document.exitFullscreen();
    } else {
    playerCon.requestFullscreen();
    }
    }
function showControls() {
    videoControls.classList.remove('hide');
}

function hideControls() {
    videoControls.classList.add('hide');
}

// Event Listeners
playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);
stopButton.addEventListener("click", stopVideo);
fullScreen.addEventListener("click", toggleFullScreen);
videoControls.addEventListener("mouseenter", showControls);
videoControls.addEventListener("mouseleave", hideControls);
player.addEventListener("mouseenter", showControls);
player.addEventListener("mouseleave", hideControls);
volumeSlider.addEventListener("input", changeVolume); 