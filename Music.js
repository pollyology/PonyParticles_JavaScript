// Play the default song
const music = document.getElementById("music");
music.play();
music.volume = 0.25;

//	+---------------------------+
//	|	MUSIC INITIALIZATION	|
//	+---------------------------+

const playlist =
{
	TRACK_1:
	{
		title: "My Little Pony Theme Song",
		artist: "Twilight Sparkle",
		file: "MLP_Extended.flac"
	},
	TRACK_2:
	{
		title: "My Little Pony Theme Song",
		artist: "Pinkie Pie",
		file: "Make_A_Wish_Extended.flac"
	},
	TRACK_3:
	{
		title: "Remember Summer Days",
		artist: "Anri",
		file: "Remember_Summer_Days.flac"
	}
}

const playlistMap = Object.keys(playlist);
let musicIndex = 0;	// Index of the tracklist

let timer = 0;
const cooldown = 300;	// 300ms -> 0.3 s
		
//	+---------------------------+
//	|		MUSIC BUTTON		|
//	+---------------------------+

function changeMusic()
{
	// Check for cooldown timer
	const now = performance.now();	
	if (now - timer < cooldown) return;	// this prevents a single click or double click from skipping songs twice
	timer = now;

	// Change current track
	musicIndex = (musicIndex + 1) % playlistMap.length;
	const key = playlistMap[musicIndex]; 
  	const track = playlist[key];              
  	music.src = `./assets/music/${track.file}`;
  	music.play();
}

document.getElementById("changeMusicButton").addEventListener("click", () => // Switches music track when change music button is clicked.
{
	changeMusic();
});

document.getElementById("changeMusicButton").addEventListener("touchstart", () => // Switches music track when change music button is tapped.
{
	changeMusic();
});

//	+---------------------------+
//	|		MUTE BUTTON			|
//	+---------------------------+

let isMuted = false;

function muteSound()
{
	if (isMuted)
	{
		music.volume = 0.25;
		isMuted = false;
	}
	else
	{
		music.volume = 0.0;
		isMuted = true;
	}
}

document.getElementById("muteVolumeButton").addEventListener("click", muteSound);
document.getElementById("muteVolumeButton").addEventListener("touchstart", muteSound);
