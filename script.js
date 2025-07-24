"use strict";
const audioDiv = document.getElementById("audio");
const togglePlayButton = document.getElementById("togglePlay");
const togglePlayIcon = document.getElementById("toggleIcon");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const replayBtn = document.getElementById("repeat");
const playlistContainer = document.getElementById("playlistItems");
const addSongBtn = document.getElementById("addSongButton");
const popup = document.getElementById("popup");
const closePopupIcon = document.querySelector(".popup-header i");
const addSongForm = document.getElementById("addSongForm");

const songs = [
  {
    title: "Joro",
    author: "Wizkid",
    audio: "audioFiles/joro.mp3",
    duration: "4:23",
    cover: "images/joroimg.jpg",
  },
  {
    title: "On the Low",
    author: "Burna Boy",
    audio: "audioFiles/onthelow.mp3",
    duration: "3:05",
    cover: "images/onthelowImg.jpg",
  },
  {
    title: "Jerusalema",
    author: "Nomcebo Zikode ft Master KG",
    audio: "audioFiles/jerusalema.mp3",
    duration: "4:15",
    cover: "images/jerusalemaimg.jpg",
  },
  {
    title: "Constantly",
    author: "Hyce, BoyPee & Brown Joel",
    audio: "audioFiles/constantly.mp3",
    duration: "3:13",
    cover: "images/constantlyimg.jpg",
  },
  {
    title: "I'm a Mess",
    author: "Omah Lay",
    audio: "audioFiles/mess.mp3",
    duration: "2:34",
    cover: "images/omahlayimg.jpg",
  },
];

let currentSongIndex = 0;
function loadSong(index) {
  const song = songs[index];
  cover.src = song.cover;
  title.textContent = song.title;
  artist.textContent = song.author;
  totalTime.textContent = song.duration;
  audioDiv.src = song.audio;
}
function playPauseSong() {
  if (audioDiv.paused) {
    audioDiv.play();
    togglePlayIcon.classList.remove("fa-play");
    togglePlayIcon.classList.add("fa-pause");
  } else {
    audioDiv.pause();
    togglePlayIcon.classList.remove("fa-pause");
    togglePlayIcon.classList.add("fa-play");
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioDiv.play();
  togglePlayIcon.classList.add("fa-pause");
  renderPlaylist();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioDiv.play();
  togglePlayIcon.classList.add("fa-pause");
  renderPlaylist();
}

function replaySong() {
  audioDiv.currentTime = 0;
  audioDiv.play();
  togglePlayIcon.classList.add("fa-pause");
}
function updateProgress() {
  const progressPercent = (audioDiv.currentTime / audioDiv.duration) * 100;
  progress.value = progressPercent;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
function updateCurrentTime() {
  currentTime.textContent = formatTime(audioDiv.currentTime);
}
function renderPlaylist() {
  playlistContainer.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.className = "playlist-item";
    li.dataset.index = index;
    li.innerHTML = `
            <span class="song-title">${song.title}</span>
            <i class="fa fa-trash" aria-hidden="true" data-index="${index}"></i>
        `;
    if (index === currentSongIndex) {
      li.classList.add("current");
    }
    playlistContainer.appendChild(li);
  });
}

function resetForm() {
  document.getElementById("songTitle").value = "";
  document.getElementById("songArtist").value = "";
  document.getElementById("songUrl").value = "";
}

playlistContainer.addEventListener("click", (e) => {
  const item = e.target.closest(".playlist-item");
  const index = item?.dataset?.index;
  if (index !== undefined && !e.target.classList.contains("fa-trash")) {
    currentSongIndex = parseInt(index);
    loadSong(currentSongIndex);
    audioDiv.play();
    togglePlayIcon.classList.remove("fa-play");
    togglePlayIcon.classList.add("fa-pause");
    renderPlaylist();
  }

  if (e.target.classList.contains("fa-trash")) {
    const deleteIndex = parseInt(e.target.dataset.index);
    songs.splice(deleteIndex, 1);
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
    loadSong(currentSongIndex);
    renderPlaylist();
  }
});

addSongBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopupIcon.addEventListener("click", () => {
  popup.style.display = "none";
  resetForm();
});
addSongForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("songTitle").value.trim();
  const artist = document.getElementById("songArtist").value.trim();
  const audioUrl = document.getElementById("songUrl").value.trim();
  const coverFile = document.getElementById("songCover").files[0];

  document.querySelectorAll(".error-message").forEach((msg) => msg.remove());
  let hasError = false;
  const showError = (element, message) => {
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "14px";
    error.textContent = message;
    element.parentElement.appendChild(error);
    hasError = true;
  };
  const newAudio = new Audio(audioUrl);
  let durationFormatted = "0:00";
  newAudio.addEventListener("loadedmetadata", () => {
    const durationSeconds = newAudio.duration;
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    durationFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  });

  if (!title)
    showError(document.getElementById("songTitle"), "Title is required");
  if (!artist)
    showError(document.getElementById("songArtist"), "Artist name is required");
  if (!audioUrl)
    showError(document.getElementById("songUrl"), "Audio URL is required");
  if (!coverFile)
    showError(document.getElementById("songCover"), "Cover image is required");

  if (hasError) return;

  // Use placeholder cover or convert local file URL (could later expand this with object URLs)
  const newSong = {
    title,
    author: artist,
    audio: audioUrl,
    duration: durationFormatted,
    cover: coverFile
      ? URL.createObjectURL(coverFile)
      : "images/default-cover.jpg",
  };

  songs.push(newSong);
  renderPlaylist();
  popup.style.display = "none";
  resetForm();
});

audioDiv.addEventListener("timeupdate", () => {
  updateCurrentTime();
  updateProgress();
});

progress.addEventListener("input", () => {
  audioDiv.currentTime = (progress.value / 100) * audioDiv.duration;
  currentTime.textContent = formatTime(audioDiv.currentTime);
});

togglePlayButton.addEventListener("click", playPauseSong);
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
replayBtn.addEventListener("click", replaySong);

audioDiv.addEventListener("ended", () => {
  togglePlayIcon.classList.add("fa-repeat");
  nextSong();
});
d;
loadSong(currentSongIndex);
renderPlaylist();
