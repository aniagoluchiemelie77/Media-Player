// script.js
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
const audio = new Audio(songs[currentSongIndex].audio);
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
const updatePlayer = (song) => {
    audio.src = song.audio;
    audio.load();
    title.textContent = song.title;
    artist.textContent = `By: ${song.author}`;
    totalTime.textContent = `${song.duration}`;
    cover.src = song.cover;
}
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
togglePlayButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        togglePlayIcon.classList.remove("fa-play");
        togglePlayIcon.classList.remove("fa-repeat");
        togglePlayIcon.classList.add("fa-pause");
    } else {
        audio.pause();
        togglePlayIcon.classList.remove("fa-pause");
        togglePlayIcon.classList.add("fa-play");
    }
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updatePlayer(songs[currentSongIndex]);
    audio.play();
    togglePlayIcon.className = "fa-pause";
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer(songs[currentSongIndex]);
    audio.play();
    togglePlayIcon.className = "fa-pause";
});

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
    currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
    togglePlayIcon.className = "fa-repeat";
});

function playMusic(){
    
}