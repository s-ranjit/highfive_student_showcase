/* countdown */
const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

const eventTime = new Date(`2026-04-23T16:30:00-04:00`);

function updateCountdown() {
  const currentTime = new Date();
  const diff = eventTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;

}
updateCountdown();
setInterval(updateCountdown, 1000);

/* header navigation close */
const hamburger = document.querySelector('#hamburger');
const navLinks = document.querySelectorAll('#header-nav nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.checked = false;
  });
})

/*video*/
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

/*-----------------------
project exhibition 
----------------------*/

// How many slides belong to one group (used for captions)
const SLIDES_PER_GROUP = 3;

// Groups information for captions
const GROUPS = [
  { title: 'GROUP #1', names: 'RIN, SITU, LINH, HANNAH, KINGSLEY' },
  { title: 'GROUP #2', names: 'ABC, SDC, SJK, ALN, KIN' },
  { title: 'GROUP #3', names: 'SJK, LKA, KOP, QJA, LNS' }
];

// Initialize Swiper slider
const swiper = new Swiper('.swiper-container', {
  loop: true,
  speed: 700, // transition speed
  grabCursor: true,
  spaceBetween: 20,
  centeredSlides: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  breakpoints: {
    768:  { slidesPerView: 3, slidesPerGroup: SLIDES_PER_GROUP },
    1200: { slidesPerView: 3, slidesPerGroup: SLIDES_PER_GROUP }
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  }
});

// Elements for captions
const captionTitle = document.querySelector('.group-caption__title');
const captionNames = document.querySelector('.group-caption__names');

// Update caption text with fade effect
function updateCaption(realIndex) {
  const groupIndex = Math.floor(realIndex / SLIDES_PER_GROUP) % GROUPS.length;
  const groupData = GROUPS[groupIndex];

  if (captionTitle && captionNames) {
    // fade out first
    captionTitle.style.opacity = 0;
    captionNames.style.opacity = 0;

    setTimeout(() => {
      // change text
      captionTitle.textContent = groupData.title;
      captionNames.textContent = groupData.names;

      // fade back in
      captionTitle.style.opacity = 1;
      captionNames.style.opacity = 1;
    }, 200);
  }
}

// Run once at the start and then whenever the slide changes
updateCaption(swiper.realIndex);
swiper.on('slideChange', function () {
  updateCaption(swiper.realIndex);
});

// Navigation buttons
const prevBtn = document.querySelector('.button-container .red-btn:first-child');
const nextBtn = document.querySelector('.button-container .red-btn:last-child');

// Helper: check if we are on mobile
function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches;
}

// Count total real slides (ignore duplicates from loop)
const realSlides = document.querySelectorAll(
  '.swiper-container .swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)'
);
let totalRealSlides = realSlides.length;
let totalGroups = Math.max(1, Math.ceil(totalRealSlides / SLIDES_PER_GROUP));

// Get current group index
function getCurrentGroup() {
  return Math.floor(swiper.realIndex / SLIDES_PER_GROUP);
}

// Go to a specific group
function gotoGroup(groupIndex) {
  const normalized = (groupIndex % totalGroups + totalGroups) % totalGroups;
  let targetIndex = normalized * SLIDES_PER_GROUP;
  swiper.slideToLoop(targetIndex, 600);
  //console.log("Go to group:", groupIndex + 1);
}

// Add navigation for prev/next
function addNavEvents(button, goPrev) {
  function action() {
    if (isMobile()) {
      let nextIndex = getCurrentGroup() + (goPrev ? -1 : 1);
      gotoGroup(nextIndex);
    } else {
      goPrev ? swiper.slidePrev() : swiper.slideNext();
    }
  }

  button?.addEventListener('click', action);
  button?.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  });
}

// Attach events to both buttons
addNavEvents(prevBtn, true);
addNavEvents(nextBtn, false);

