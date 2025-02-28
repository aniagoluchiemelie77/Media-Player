// script.js
const audioDiv = document.getElementById("audio");
const togglePlayButton = document.getElementById("togglePlay");
const togglePlayIcon = document.getElementById("toggleIcon");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const playlistBtn = document.getElementById("playlist");
const cover = document.getElementById("cover");
const sidebar = document.getElementById("sidebar");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const replayBtn = document.getElementById('repeat');
const songs = [
    {
      title: "Joro",
      author: "Wizkid",
      audio: "audioFiles/joro.mp3",
      duration: "4:23",
      cover: "images/joroimg.jpg"
    },
    {
      title: "On the Low",
      author: "Burna Bow",
      audio: "audioFiles/onthelow.mp3",
      duration: "3:05",
      cover: "images/onthelowImg.jpg"
    },
    {
        title: "Jerusalema",
        author: "Nomcebo Zikode ft Master KG",
        audio: "audioFiles/jerusalema.mp3",
        duration: "4:15",
        cover: "images/jerusalemaimg.jpg"
      },
      {
        title: "Constantly",
        author: "Hyce, BoyPee & Brown Joel",
        audio: "audioFiles/constantly.mp3",
        duration: "3:13",
        cover: "images/constantlyimg.jpg"
      },
      {
        title: "I'm a Mess",
        author: "Omah Lay",
        audio: "audioFiles/mess.mp3",
        duration: "2:34",
        cover: "images/omahlayimg.jpg"
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
    updatePlaylist();
}
function playPauseSong() {
    if (audio.paused) {
        audio.play();
        togglePlayIcon.classList.remove("fa-play");
        togglePlayIcon.classList.add("fa-pause");
    } else {
        audio.pause();
        togglePlayIcon.classList.remove("fa-pause");
        togglePlayIcon.classList.add("fa-play");
    }
}
function onClickOutside (element) {
    document.addEventListener('click', e => {
        if (!element.contains(e.target)) {
            element.classList.add("hidden");
        } else return;
    });
  };
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    togglePlayIcon.classList.add("fa-pause");
}
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    togglePlayIcon.classList.add("fa-pause");
}
function replaySong() {
    audio.currentTime = 0;
    audio.play();
    togglePlayIcon.classList.add("fa-pause");
}
function updateProgress() {
    const progressPercent = (audioDiv.currentTime / audioDiv.duration) * 100;
    progress.value = progressPercent;
}
function updateCurrentTime() {
    const currentTimer = Math.floor(audioDiv.currentTime);
    const minutes = Math.floor(currentTimer / 60);
    const seconds = currentTimer % 60;
    currentTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
function updatePlaylist() {
    sidebar.innerHTML = "";
    const currentSong = songs[currentSongIndex];
    const h1 = document.createElement("h1");
    h1.textContent = `Now Playing: ${currentSong.title} by ${currentSong.author}`;
    sidebar.appendChild(h1);
    const playlistContainer = document.createElement("div");
    playlistContainer.className = "playlist_container";
    songs.forEach((song, index) => {
        if (index !== currentSongIndex) {
            const button = document.createElement("button");
            button.textContent = `${song.title} - ${song.author}`;
            button.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(songs[currentSongIndex]);
                audio.play();
                togglePlayIcon.classList.add("fa-pause");
            });
            playlistContainer.appendChild(button);
        }
    });
    sidebar.appendChild(playlistContainer);
};
updatePlaylist();
audioDiv.addEventListener("timeupdate", updateCurrentTime);
togglePlayButton.addEventListener('click', playPauseSong);
prevButton.addEventListener('click', prevSong);
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
    currentTime.textContent = formatTime(audio.currentTime);
});
nextButton.addEventListener('click', nextSong);
replayBtn.addEventListener('click', replaySong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener("ended", () => {
    togglePlayIcon.classList.add("fa-repeat");
    nextSong();
});
playlistBtn.addEventListener('click', () => {
    sidebar.classList.remove("hidden");
});
onClickOutside (sidebar);
loadSong(currentSongIndex);