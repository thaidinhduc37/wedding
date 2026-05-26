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
  return audio
    .play()
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
  audio
    .play()
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

document.addEventListener("touchstart", startMusicOnFirstGesture, {
  once: true,
  passive: true,
});
document.addEventListener("mousedown", startMusicOnFirstGesture, {
  once: true,
});
document.addEventListener("wheel", startMusicOnFirstGesture, { once: true });

/* ---- Toggle button events ---- */
toggleBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  if (!musicStarted) {
    safePlay().catch(() => {
      isPlaying = false;
      updateIcon();
    });
    return;
  }
  if (isPlaying) {
    pauseMusic();
  } else {
    safePlay().catch(() => {
      isPlaying = false;
      updateIcon();
    });
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
   1. ANIMATION ON SCROLL
   ============================================ */

function initAnimationOnScroll() {
  const animatedElements = document.querySelectorAll(".ladi-animation-hidden");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("ladi-animation-hidden");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initAnimationOnScroll);

/* ============================================
   2. FORM SUBMIT HANDLER
   ============================================ */

function initFormHandler() {
  const form = document.querySelector("#FORM2 .ladi-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: form.querySelector('input[name="name"]')?.value || "",
      message: form.querySelector('textarea[name="message"]')?.value || "",
      attendance: form.querySelector('select[name="form_item7"]')?.value || "",
      guestType: form.querySelector('select[name="form_item9"]')?.value || "",
      quantity: form.querySelector('input[placeholder="Số lượng tham dự cùng?"]')?.value || "",
      timestamp: new Date().toISOString(),
    };

    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên!");
      return;
    }

    if (!formData.attendance) {
      alert("Vui lòng chọn xác nhận tham dự!");
      return;
    }

    if (!formData.guestType) {
      alert("Vui lòng chọn khách mời của ai!");
      return;
    }

    saveFormData(formData);
    openPopup("POPUP1");
    form.reset();
  });
}

function saveFormData(data) {
  try {
    const existingData = JSON.parse(localStorage.getItem("weddingForms")) || [];
    existingData.push(data);
    localStorage.setItem("weddingForms", JSON.stringify(existingData));
    console.log("Form data saved:", data);
  } catch (err) {
    console.error("Error saving form data:", err);
  }
}

document.addEventListener("DOMContentLoaded", initFormHandler);

/* ============================================
   3. POPUP SHOW/HIDE LOGIC
   ============================================ */

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  const backdrop = document.getElementById("backdrop-popup");

  if (!popup || !backdrop) return;

  popup.parentElement.style.display = "block";
  backdrop.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  const backdrop = document.getElementById("backdrop-popup");
  const popupParent = popup?.parentElement;

  if (popupParent) popupParent.style.display = "none";

  const allPopups = document.querySelectorAll(".ladi-popup").length;
  const visiblePopups = Array.from(document.querySelectorAll(".ladi-popup")).filter(
    (p) => p.parentElement.style.display !== "none"
  ).length;

  if (visiblePopups === 0) {
    backdrop.style.display = "none";
    document.body.style.overflow = "";
  }
}

function initPopupHandlers() {
  const backdrop = document.getElementById("backdrop-popup");
  if (backdrop) {
    backdrop.addEventListener("click", function () {
      document.querySelectorAll(".ladi-popup").forEach((popup) => {
        if (popup.parentElement.style.display !== "none") {
          closePopup(popup.id);
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", initPopupHandlers);

/* ============================================
   4. GALLERY NAVIGATION
   ============================================ */

function initGallery() {
  const gallery = document.getElementById("GALLERY2");
  if (!gallery) return;

  let currentIndex = 0;
  const viewItems = gallery.querySelectorAll(".ladi-gallery-view-item");
  const controlItems = gallery.querySelectorAll(".ladi-gallery-control-item");
  const totalItems = viewItems.length;

  function updateGallery(newIndex) {
    viewItems.forEach((item) => item.classList.remove("selected"));
    controlItems.forEach((item) => item.classList.remove("selected"));

    viewItems[newIndex].classList.add("selected");
    controlItems[newIndex].classList.add("selected");
    currentIndex = newIndex;
  }

  controlItems.forEach((item) => {
    item.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      updateGallery(index);
    });
  });

  const leftArrow = gallery.querySelector(".ladi-gallery-view-arrow-left");
  const rightArrow = gallery.querySelector(".ladi-gallery-view-arrow-right");

  if (leftArrow) {
    leftArrow.addEventListener("click", function () {
      const newIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateGallery(newIndex);
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", function () {
      const newIndex = (currentIndex + 1) % totalItems;
      updateGallery(newIndex);
    });
  }
}

document.addEventListener("DOMContentLoaded", initGallery);

/* ============================================
   5. COUNTDOWN TIMER
   ============================================ */

function initCountdown() {
  const countdownEl = document.getElementById("COUNTDOWN1");
  if (!countdownEl) return;

  const endTime = 1786161600000;
  const countdownItems = countdownEl.querySelectorAll(
    ".ladi-countdown-item"
  );

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = Math.max(0, endTime - now);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const values = [days, hours, minutes, seconds];

    countdownItems.forEach((item, index) => {
      const span = item.querySelector("span");
      if (span) {
        span.textContent = String(values[index]).padStart(2, "0");
      }
    });

    if (timeLeft > 0) {
      requestAnimationFrame(updateCountdown);
    }
  }

  updateCountdown();
}

document.addEventListener("DOMContentLoaded", initCountdown);

/* ============================================
   6. MUSIC AUTOPLAY ON SCROLL (Optional)
   ============================================ */

function initMusicAutoplayOnScroll() {
  let musicTriggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !musicTriggered && musicStarted) {
          if (!isPlaying) {
            safePlay().catch(() => {});
          }
          musicTriggered = true;
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroSection = document.getElementById("SECTION1");
  if (heroSection) {
    observer.observe(heroSection);
  }
}

document.addEventListener("DOMContentLoaded", initMusicAutoplayOnScroll);

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
