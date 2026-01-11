const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i"); 
const player = document.querySelector(".player");

let isPlaying = false;
let isShuffle = false;
let songIndex = 0;

const songs = [
  {
    title: "Dreams",
    artist: "Artist One",
    src: "assets/music/song1.mp3",
    cover: "assets/images/cover1.jpg"
  },
  {
    title: "Waves",
    artist: "Artist Two",
    src: "assets/music/song2.mp3",
    cover: "assets/images/cover2.jpg"
  },
  {
    title: "Night Sky",
    artist: "Artist Three",
    src: "assets/music/song3.mp3",
    cover: "assets/images/cover3.jpg"
  }
];

/* ---------- LOAD SONG ---------- */
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
  updatePlaylistUI();
}

/* ---------- PLAY / PAUSE ---------- */
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  player.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  player.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

/* ---------- NEXT / PREV ---------- */
function nextSong() {
  if (isShuffle) {
    playRandomSong();
  } else {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  }
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

/* ---------- SHUFFLE ---------- */
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#4338ca" : "";

  if (isShuffle) {
    playRandomSong();
  }
});

function playRandomSong() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * songs.length);
  } while (newIndex === songIndex);

  songIndex = newIndex;
  loadSong(songs[songIndex]);
  playSong();
}

/* ---------- PROGRESS ---------- */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progressContainer.addEventListener("click", e => {
  audio.currentTime =
    (e.offsetX / progressContainer.clientWidth) * audio.duration;
});

/* ---------- VOLUME ---------- */
volume.addEventListener("input", e => {
  audio.volume = e.target.value;
});

/* ---------- AUTOPLAY ---------- */
audio.addEventListener("ended", nextSong);

/* ---------- PLAYLIST ---------- */
songs.forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} — ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = i;
    loadSong(song);
    playSong();
  });
  playlistEl.appendChild(li);
});

function updatePlaylistUI() {
  [...playlistEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === songIndex);
  });
}

/* ---------- DARK MODE ---------- */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

/* ---------- TIME FORMAT ---------- */
function formatTime(time) {
  if (!time) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ---------- INIT ---------- */
loadSong(songs[songIndex]);
