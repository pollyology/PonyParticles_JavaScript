// This file handles all the character animations and their settings

//	+-------------------------------+
//	|		CHARACTER SETTINGS		|
//	+-------------------------------+
const characters = // The list of characters
{
	"rainbow-dash":
	{
		name: "rainbow-dash",
		color: "rgb(154, 218, 248)",   // light blue
		image: new Image()
	},
	"fluttershy":
	{
		name: "fluttershy",
		color: "rgb(253, 175, 192)",   // pink
		image: new Image()
	},
	"pinkie-pie":
	{
		name: "pinkie-pie",
		color: "rgb(246, 171, 199)",   // bright pink
		image: new Image()
	},
	"twilight-sparkle":
	{
		name: "twilight-sparkle",
		color: "rgb(199, 157, 215)", // purple
		image: new Image()
	}
};

//	+-------------------------------+
//	|		INITIALIZATION			|
//	+-------------------------------+

for (const key in characters)	// loop through all characters
{
	characters[key].image.src = `./assets/animation/${characters[key].name}.gif`	// preload all gifs into images key
}

const characterMap = Object.keys(characters);
let characterIndex = 0;	// Index of the character list

//	+-------------------------------+
//	|		CHANGE CHARACTER		|
//	+-------------------------------+

function changeCharacter()
{
	characterIndex = (characterIndex + 1) % characterMap.length;	// Increments index by 1 and loops through array without going out-of-bounds
	const key = characterMap[characterIndex];
	const currentCharacter = characters[key]; // Current character we are accessing by index

	// Change image source to the filename of current character
	document.getElementById("bg").src = currentCharacter.image.src;
	document.body.style.backgroundColor = currentCharacter.color;
}

document.getElementById("changeCharacterButton").addEventListener("click", changeCharacter); // Switches character when change character button is clicked.
document.getElementById("changeCharacterButton").addEventListener("touchstart", changeCharacter); // Switches character when change character button is tapped.

// To Do: 9/25
// Adjust animations to fit screen better
// Add playlist button
// Add special buttons