// script.js
const audio = document.getElementById("audio");
const togglePlayButton = document.getElementById("togglePlay");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
};

const getSongs = async (token) => {
    const result = await fetch('https://api.spotify.com/v1/playlists/{playlist_id}/tracks', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.items.map(item => ({
        title: item.track.name,
        artist: item.track.artists[0].name,
        cover: item.track.album.images[0].url,
        src: item.track.preview_url
    }));
};

const updatePlayer = (song) => {
    audio.src = song.src;
    cover.src = song.cover;
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.addEventListener("loadedmetadata", () => {
        totalTime.textContent = formatTime(audio.duration);
    });
};

let songs = [];
let currentSongIndex = 0;

const init = async () => {
    const token = await getToken();
    songs = await getSongs(token);

    updatePlayer(songs[currentSongIndex]);
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

togglePlayButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        togglePlayButton.textContent = "Pause";
    } else {
        audio.pause();
        togglePlayButton.textContent = "Play";
    }
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updatePlayer(songs[currentSongIndex]);
    audio.play();
    togglePlayButton.textContent = "Pause";
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer(songs[currentSongIndex]);
    audio.play();
    togglePlayButton.textContent = "Pause";
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
    togglePlayButton.textContent = "Play";
});

init();

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCuZXFf6dL18IFeeyN4ntTHORNgo39ZNKaszIDCDqHlLQIsrd6XOilcDKMv7saE39BHhkY5kZ6h8_aujvjqD6FBiOQD8RxxlR5c4QnqUxTSMY_h8ZfKBl8HdC8OAdxlB0ELeDuSyYlMnX_lXIKvmTwXDV8OrPXqCAS1HYey0fc2jC2iLYcXyqz2BqzJA6EL44FFAG8_69WZykFWCuoTaYkyXPcpofAzP89xgSYu1E-roMUourvEV1G5rohN3NsRB3zSSRD77YR5zSovesLUlhmy06qM5-x0eo84CuxRJTNRFVc_906DCaYb';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:6YYnBEMEaj960IX1evcTun','spotify:track:1N8G6PUj14v0VG8evbRSxp','spotify:track:3MldGIMtPcupNBI4Dnxolr','spotify:track:5cz3AU3Wj61FKMwlU1vS2v','spotify:track:4Dhzd0IhCdR0mEJ0GE2xOm'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My top tracks playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
const playlistId = '2LIt9shmB0cFuPH8TAmT1L';

<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/2LIt9shmB0cFuPH8TAmT1L?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: '360px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>