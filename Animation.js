// This file handles all the character animations and their settings

//	+-------------------------------+
//	|		CHARACTER SETTINGS		|
//	+-------------------------------+
const characters = // The list of characters
{
	"Rainbow Dash":
	{
		name: "rainbow-dash",
		color: "rgb(154, 218, 248)",   // light blue
		image: new Image(),
		scale: 0.5,
		offset: { x: -75, y: 0}
	},
	"Fluttershy":
	{
		name: "fluttershy",
		color: "rgb(253, 175, 192)",   // pink
		image: new Image(),
		scale: 1.0,
		offset: { x: -5, y: 10}
	},
	"Pinkie Pie":
	{
		name: "pinkie-pie",
		color: "rgb(246, 171, 199)",   // bright pink
		image: new Image(),
		scale: 0.55,
		offset: { x: -20, y: 0}
	},
	"Twilight Sparkle":
	{
		name: "twilight-sparkle",
		color: "rgb(199, 157, 215)", // purple
		image: new Image(),
		scale: 1.0,
		offset: { x: -10, y: 15}
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

export function changeCharacter()
{
	characterIndex = (characterIndex + 1) % characterMap.length;	// Increments index by 1 and loops through array without going out-of-bounds
	const key = characterMap[characterIndex];
	const currentCharacter = characters[key]; // Current character we are accessing by index

	// Apply settings of the selected character to background
	const { scale, offset } = currentCharacter;
	document.getElementById("container").style.backgroundColor = currentCharacter.color;
	document.getElementById("bg").src = currentCharacter.image.src;
	document.getElementById("bg").style.transform = `translate(-50%, -50%) scale(${scale}) translate(${offset.x}px, ${offset.y}px)`;

	console.log(`Switched pony to ${key}!`);

}

// To Do: 9/28
// Adjust animations to fit screen better
// Add playlist button
// Add special buttons
// add logic to change image based on click ( music and volume button )