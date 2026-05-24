/* ============================================
   MUSIC PLAYER
   ============================================ */

const musicList = ["./ido.mp3"];
let musicIndex = 0;
let audio = new Audio(musicList[musicIndex]);
audio.loop = false;

let musicStarted = false;
let isPlaying = false;

const toggleBtn = document.getElementById("music-toggle");
const iconOn = document.getElementById("icon-on");
const iconOff = document.getElementById("icon-off");

/* ---- Icon Update ---- */
function updateIcon() {
  if (isPlaying) {
    iconOn.style.display = "block";
    iconOff.style.display = "none";
    toggleBtn.classList.add("playing");
    toggleBtn.setAttribute("aria-pressed", "true");
    toggleBtn.setAttribute("title", "T&#693;&#790;t nh&#693;&#790;c");
  } else {
    iconOn.style.display = "none";
    iconOff.style.display = "block";
    toggleBtn.classList.remove("playing");
    toggleBtn.setAttribute("aria-pressed", "false");
    toggleBtn.setAttribute("title", "B&#790;t nh&#693;&#790;c");
  }
}

/* ---- Play / Pause ---- */
function safePlay() {
  return audio.play()
    .then(() => {
      musicStarted = true;
      isPlaying = true;
      updateIcon();
    })
    .catch((err) => {
      console.debug("Audio play blocked or failed:", err);
      throw err;
    });
}

function pauseMusic() {
  audio.pause();
  isPlaying = false;
  updateIcon();
}

/* ---- Auto-next track ---- */
audio.addEventListener("ended", function () {
  musicIndex = (musicIndex + 1) % musicList.length;
  audio.src = musicList[musicIndex];
  audio.play()
    .then(() => {
      isPlaying = true;
      updateIcon();
    })
    .catch(() => {
      isPlaying = false;
      updateIcon();
    });
});

/* ---- Start music on first user gesture ---- */
function startMusicOnFirstGesture() {
  if (musicStarted) return;
  safePlay().catch(() => {});
}

document.addEventListener("touchstart", startMusicOnFirstGesture, { once: true, passive: true });
document.addEventListener("mousedown", startMusicOnFirstGesture, { once: true });
document.addEventListener("wheel", startMusicOnFirstGesture, { once: true });

/* ---- Toggle button events ---- */
toggleBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  if (!musicStarted) {
    safePlay().catch(() => { isPlaying = false; updateIcon(); });
    return;
  }
  if (isPlaying) {
    pauseMusic();
  } else {
    safePlay().catch(() => { isPlaying = false; updateIcon(); });
  }
});

/* ---- Init state ---- */
isPlaying = false;
updateIcon();

/* ---- Keyboard accessibility (Enter / Space) ---- */
toggleBtn.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleBtn.click();
  }
});


/* ============================================
   PROTECT COPY / DEVTOOLS  (đã tắt để debug)
   ============================================ */

/* Block right-click context menu */
// window.oncontextmenu = function () { return false; };

/* Block Ctrl+U (View Source) */
// document.onkeydown = function (e) {
//   if ((e.ctrlKey || e.metaKey) && e.which == 85) {
//     e.preventDefault();
//     return false;
//   }
// };

/* Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U */
// document.addEventListener("keydown", function (event) {
//   if (
//     event.key === "F12" ||
//     (event.ctrlKey && event.shiftKey && event.key === "I") ||
//     (event.ctrlKey && event.shiftKey && event.key === "J") ||
//     (event.ctrlKey && event.key === "U")
//   ) {
//     event.preventDefault();
//     alert("Kh&#7943;ng &#272;&#791;c ph&#790;p!");
//   }
// });
