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

/* swiper sliders */
   const SLIDES_PER_GROUP = 3;

   const GROUPS = [
     { title: 'GROUP #1', names: 'RIN, SITU, LINH, HANNAH, KINGSLEY' },
     { title: 'GROUP #2', names: 'AMY, ZAKIA, LAILA, JOSEPHINE' },
     { title: 'GROUP #3', names: 'CHANYA, KETTLEWELL, JULIANA, HARLOWE' }
   ];
   
   const swiper = new Swiper('.swiper-container', {
     loop: true,
     loopFillGroupWithBlank: true,
     speed: 700,
     grabCursor: true,
     spaceBetween: 0,
     centeredSlides: false,
     slidesPerView: 1,
     slidesPerGroup: 1,
     breakpoints: {
       768:  {
         slidesPerView: 3,
         slidesPerGroup: SLIDES_PER_GROUP,
         spaceBetween: 20,
         centeredSlides: false
       },
       1200: {
         slidesPerView: 3,
         slidesPerGroup: SLIDES_PER_GROUP,
         spaceBetween: 20,
         centeredSlides: false
       }
     },
     autoplay: {
       delay: 3000,
       disableOnInteraction: false,
       pauseOnMouseEnter: true
     }
   });
   
/* group caption */
   const captionTitle = document.querySelector('.group-caption__title');
   const captionNames = document.querySelector('.group-caption__names');
   
   function updateCaption() {
     const realIndex = swiper.realIndex;
     const groupIndex = Math.floor(realIndex / SLIDES_PER_GROUP) % GROUPS.length;
     const groupData = GROUPS[groupIndex];
   
     captionTitle.style.opacity = 0;
     captionNames.style.opacity = 0;
   
     setTimeout(() => {
       captionTitle.textContent = groupData.title;
       captionNames.textContent = groupData.names;
       captionTitle.style.opacity = 1;
       captionNames.style.opacity = 1;
     }, 200);
   }
   
   updateCaption();
   swiper.on('slideChange', updateCaption);
   
/* functional buttons */
   const prevBtn = document.querySelector('.button-container .red-btn:first-child');
   const nextBtn = document.querySelector('.button-container .red-btn:last-child');
   
   function addNavEvents(button, goPrev) {
     function action() {
       goPrev ? swiper.slidePrev() : swiper.slideNext();
     }
   
     button?.addEventListener('click', action);
     button?.addEventListener('keydown', e => {
       if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         action();
       }
     });
   }
   
   addNavEvents(prevBtn, true);
   addNavEvents(nextBtn, false);
   