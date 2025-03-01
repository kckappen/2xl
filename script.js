let stories = {
    jurassic: {
        title: "Jurassic Park: Chaos in Jurassic Park",
        tracks: [
            "https://archive.org/download/track2_201909/Track%201.mp3",
            "https://archive.org/download/track2_201909/Track%202.mp3",
            "https://archive.org/download/track2_201909/Track%203.mp3",
            "https://archive.org/download/track2_201909/Track%204.mp3"
        ]
    },
    batmanCarnival: {
        title: "Batman: Carnival of Crime",
        tracks: [
            "https://archive.org/download/BatmanCarnivalOfCrimeTrack1/Track1.mp3",
            "https://archive.org/download/BatmanCarnivalOfCrimeTrack1/Track2.mp3",
            "https://archive.org/download/BatmanCarnivalOfCrimeTrack1/Track3.mp3",
            "https://archive.org/download/BatmanCarnivalOfCrimeTrack1/Track4.mp3"
        ]
    },
    talesCryptkeeper: {
        title: "Tales from the Cryptkeeper: If Wishes Were Hornets",
        tracks: [
            "https://archive.org/download/talesfromthecryptifwisheswerehornets/Track%201.mp3",
            "https://archive.org/download/talesfromthecryptifwisheswerehornets/Track%202.mp3",
            "https://archive.org/download/talesfromthecryptifwisheswerehornets/Track%203.mp3",
            "https://archive.org/download/talesfromthecryptifwisheswerehornets/Track%204.mp3"
        ]
    },
    batmanSizzling: {
        title: "Batman: The Sizzling Scheme",
        tracks: [
            "https://archive.org/download/Batman_The_Sizzling_Scheme/Track%201.mp3",
            "https://archive.org/download/Batman_The_Sizzling_Scheme/Track%202.mp3",
            "https://archive.org/download/Batman_The_Sizzling_Scheme/Track%203.mp3",
            "https://archive.org/download/Batman_The_Sizzling_Scheme/Track%204.mp3"
        ]
    }
};

let tracks = [
    document.getElementById("track1"),
    document.getElementById("track2"),
    document.getElementById("track3"),
    document.getElementById("track4")
];

let currentTimestamp = 0;  
let currentTrackIndex = 0;
let isPlaying = false;

function changeStory() {
    let selectedStory = document.getElementById("storySelector").value;
    let story = stories[selectedStory];

    document.getElementById("storyTitle").innerText = story.title;

    for (let i = 0; i < 4; i++) {
        tracks[i].src = story.tracks[i];
    }

    stopTracks();
    currentTimestamp = 0;
}

function playTrack(trackIndex) {
    tracks[currentTrackIndex].pause();
    currentTimestamp = tracks[currentTrackIndex].currentTime;

    currentTrackIndex = trackIndex;
    tracks[currentTrackIndex].currentTime = currentTimestamp;
    tracks[currentTrackIndex].play();
    isPlaying = true;
}

function togglePlayPause() {
    let playPauseButton = document.querySelector('button.play-pause');

    if (isPlaying) {
        tracks[currentTrackIndex].pause();
        playPauseButton.classList.remove('pause');
        isPlaying = false;
    } else {
        tracks[currentTrackIndex].play();
        playPauseButton.classList.add('pause');
        isPlaying = true;
    }
}

function stopTracks() {
    for (let track of tracks) {
        track.pause();
        track.currentTime = 0;
    }
    currentTimestamp = 0;
    isPlaying = false;
}

function adjustVolume() {
    let volume = document.getElementById("volumeControl").value;
    for (let track of tracks) {
        track.volume = volume;
    }
}

function seekTrack() {
    let progressSlider = document.getElementById("timeControl");
    let progress = progressSlider.value;

    let newTime = (progress / 100) * tracks[currentTrackIndex].duration;
    tracks[currentTrackIndex].currentTime = newTime;
    currentTimestamp = newTime;
}

function updateProgressSlider() {
    let currentTime = tracks[currentTrackIndex].currentTime;
    let duration = tracks[currentTrackIndex].duration;
    let progress = (currentTime / duration) * 100;

    document.getElementById("timeControl").value = progress;
}

setInterval(updateProgressSlider, 100);