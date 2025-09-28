// Play the default song
const music = document.getElementById("music");
music.play();
music.volume = 0.25;

//	+---------------------------+
//	|	MUSIC INITIALIZATION	|
//	+---------------------------+

const tracks =
{
	TRACK_1:
	{
		title: "My Little Pony Theme Song",
		artist: "Twilight Sparkle",
		file: "MLP_Extended.flac"
	},
	TRACK_2:
	{
		title: "Make A Wish",
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

const playlist = Object.keys(tracks);
let musicIndex = 0;	// Index of the tracklist

let timer = 0;
const cooldown = 300;	// 300ms -> 0.3 s
		
//	+---------------------------+
//	|		CHANGE MUSIC		|
//	+---------------------------+

export function changeMusic()
{
	// Check for cooldown timer
	const now = performance.now();	
	if (now - timer < cooldown) return;	// this prevents a single click or double click from skipping songs twice
	timer = now;

	// Change current track
	musicIndex = (musicIndex + 1) % playlist.length;
	const key = playlist[musicIndex]; 
  	const track = tracks[key];              
  	music.src = `./assets/music/${track.file}`;
  	music.play();

	console.log(`Current track: ${track.title}`);
}

//	+---------------------------+
//	|		MUTE BUTTON			|
//	+---------------------------+

let isMuted = false;

export function muteSound()
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
	console.log((isMuted) ? "Volume is muted." : "Volume is unmuted.");
}
