
import Engine from "./Engine.js";
import { changeMusic, muteSound } from "./Music.js";
import { changeCharacter } from "./Animation.js";

const engine = new Engine("window");
engine.run();

// Change Character Button
document.getElementById("characterButton").addEventListener("click", changeCharacter); // Switches character when change character button is clicked.
document.getElementById("characterButton").addEventListener("touchstart", changeCharacter); // Switches character when change character button is tapped.

let spacePressed = false;
document.addEventListener("keydown", (e) => { if (e.code === "Space" && !spacePressed) { spacePressed = true; changeCharacter(); }}); // Switches character when spacebar is tapped.
document.addEventListener("keyup", (e) => { if (e.code === "Space") spacePressed = false; }); // Toggle to prevent epileptic pony spam.

// Change Music Button
document.getElementById("musicButton").addEventListener("click", changeMusic); // Switches music track when change music button is clicked.
document.getElementById("musicButton").addEventListener("touchstart", changeMusic); // Switches music track when change music button is tapped.

// Mute Volume Button
document.getElementById("volumeButton").addEventListener("click", muteSound);
document.getElementById("volumeButton").addEventListener("touchstart", muteSound);

// Special Event Button
document.getElementById("specialButton").addEventListener("click", () => engine.specialEvent()); // Activates special event when special button is clicked.
document.getElementById("specialButton").addEventListener("touchstart", () => engine.specialEvent()); // Activates special event when special button is clicked.
