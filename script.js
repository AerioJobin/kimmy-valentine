const tulipBtn = document.getElementById("tulipBtn");
const wishlistAudio = document.getElementById("wishlistAudio");
const timerEl = document.getElementById("timer");
const audioHint = document.getElementById("audioHint");

const startDate = new Date("June 30, 2025 02:40:00").getTime();
let hasStartedAudio = false;

const pad = (value) => String(value).padStart(2, "0");

const updateTimer = () => {
  const now = new Date().getTime();
  const distance = now - startDate;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerEl.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
};

updateTimer();
setInterval(updateTimer, 1000);

const showAudioHint = (message) => {
  if (!audioHint) return;
  audioHint.textContent = message;
};

const startExperience = () => {
  tulipBtn.classList.add("bloom");

  if (!hasStartedAudio) {
    wishlistAudio
      .play()
      .then(() => {
        hasStartedAudio = true;
        showAudioHint("");
      })
      .catch(() => {
        hasStartedAudio = false;
        showAudioHint("Tap again to start the music, or check the audio file.");
      });
  }
};

tulipBtn.addEventListener("click", startExperience);

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => observer.observe(el));

// Wishes functionality
const wishJarCard = document.getElementById("wishJarCard");
const jarFill = document.getElementById("jarFill");
const wishCount = document.getElementById("wishCount");
const playlistToggle = document.getElementById("playlistToggle");
const playlistTip = document.getElementById("playlistTip");

const playlistTips = [
  "A soft song that feels like your hug.",
  "Music for the quiet moments we love.",
  "Every note reminds me of you.",
  "Our soundtrack, playing just for us."
];

let currentTipIndex = 0;
let wishes = JSON.parse(localStorage.getItem("wishes")) || [];

const updateJarAndCount = () => {
  const percentage = Math.min((wishes.length / 100) * 100, 100);
  jarFill.style.height = percentage + "%";
  wishCount.textContent = wishes.length;
};

const addWish = () => {
  wishes.push({ id: Date.now(), created: new Date() });
  localStorage.setItem("wishes", JSON.stringify(wishes));
  updateJarAndCount();
  createHeart();
};

const createHeart = () => {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = "♥";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animation = `float ${2 + Math.random() * 1}s ease-in forwards`;
  
  const card = document.querySelector(".wishes-grid");
  if (card) {
    card.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
};

wishJarCard.addEventListener("click", addWish);

playlistToggle.addEventListener("click", () => {
  currentTipIndex = (currentTipIndex + 1) % playlistTips.length;
  playlistTip.textContent = playlistTips[currentTipIndex];
});

updateJarAndCount();
