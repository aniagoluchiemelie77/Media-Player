// script.js
const audioDiv = document.getElementById("audio");
const togglePlayButton = document.getElementById("togglePlay");
const togglePlayIcon = document.getElementById("toggleIcon");
const nowPlaying = document.getElementById("nowPlaying");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const playlistBtn = document.getElementById("playlist");
const cover = document.getElementById("cover");
const sidebarBtns = document.querySelectorAll('.playlist_songnames');
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
    nowPlaying.textContent = `${song.title} by ${song.author}`;
    title.textContent = song.title;
    artist.textContent = song.author;
    totalTime.textContent = song.duration;
    audioDiv.src = song.audio;
    sidebarBtns.forEach(btn => {
        btn.textContent = song.title;
    });
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
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
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
    progressPercent.style.background = "#25d1ff";
}
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