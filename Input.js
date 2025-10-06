
import Engine from "./Engine.js";
import { changeMusic, muteSound } from "./Music.js";
import { changeCharacter } from "./Animation.js";

const engine = new Engine("window");
engine.run();

//    +---------------------------+
//    |       HANDLING CLICKS     |
//    +---------------------------+
// Change Character Button
document.getElementById("characterButton").addEventListener("click", changeCharacter);      // Switches character when change character button is clicked.
document.getElementById("characterButton").addEventListener("touchstart", changeCharacter); // Switches character when change character button is tapped.

// Change Music Button
document.getElementById("musicButton").addEventListener("click", changeMusic);              // Switches music track when change music button is clicked.
document.getElementById("musicButton").addEventListener("touchstart", changeMusic);         // Switches music track when change music button is tapped.

// Mute Volume Button
document.getElementById("volumeButton").addEventListener("click", muteSound);               // Mutes volume when volume button is clicked.
document.getElementById("volumeButton").addEventListener("touchstart", muteSound);          // Mutes volume when volume button is tapped.


// Special Event Button
document.getElementById("specialButton").addEventListener("click", () => engine.specialEvent());        // Activates special event when special button is clicked.
document.getElementById("specialButton").addEventListener("touchstart", () => engine.specialEvent());   // Activates special event when special button is clicked.


//    +---------------------------+
//    |       HANDLING KEYS       |
//    +---------------------------+
const keyPress = {};    // Stores whether key was pressed or released as (true/false) in an array

document.addEventListener("keydown", (e) =>    
{
    if (keyPress[e.code]) return;   // If key is held down, mark as pressed (true)
    keyPress[e.code] = true;        // If key wasn't presed already (false), mark as pressed (true)

    switch (e.code)                    // When one of the following keys are pressed, do:
    {
        case "Space":               // When "Space" is pressed, activate special event.
            engine.specialEvent();
            break;
        case "KeyA":                // When "A" is pressed, change to previous character.
            changeCharacter(false);
            break;
        case "KeyD":                // When "D" is pressed, change to next character.
            changeCharacter();
            break;
        case "ArrowLeft":           // When left arrow key is pressed, change to previous track.
            changeMusic(false);
            break;
        case "ArrowRight":          // When right arrow key is pressed, change to next track.
            changeMusic();
            break;    
        case "KeyM":                // When "M" is pressed, mute sound.
            muteSound();
            break;        
    }
});

document.addEventListener("keyup", (e) => { keyPress[e.code] = false; }); // Marks the key pressed as released, this prevents function call spam.



// ==============================================================================================================================================================================
//    +---------------------------+
//    |       QUARANTINED         |   // Quarantined because code is functional, but outdated. Changed for more efficient solution.
//    +---------------------------+
/*let spacePressed = false;
document.addEventListener("keydown", (e) => { if (e.code === "Space" && !spacePressed) { spacePressed = true; changeCharacter(); }}); // Switches character when spacebar is tapped.
document.addEventListener("keyup", (e) => { if (e.code === "Space") spacePressed = false; }); // Toggle to prevent epileptic pony spam.

let isPressed = false;
document.addEventListener("keydown", (e) => // Switches music track forwards/backwards when left/right arrow key is pressed.
{ 
    if (e.code === "KeyA" && !isPressed)
    { 
        isPressed = true; 
        changeCharacter(false); 
    }
    else if (e.code === "KeyD" && !isPressed)
    { 
        isPressed = true; 
        changeCharacter(); 
    }
});
document.addEventListener("keyup", (e) => { if (e.code === "KeyA" || e.code === "KeyD" ) isPressed = false; });

let keyPressed = false;
document.addEventListener("keydown", (e) => // Switches music track forwards/backwards when left/right arrow key is pressed.
{ 
    if (e.code === "ArrowLeft" && !keyPressed)
    { 
        keyPressed = true; 
        changeMusic(false); 
    }
    else if (e.code === "ArrowRight" && !keyPressed)
    { 
        keyPressed = true; 
        changeMusic(); 
    }
});
document.addEventListener("keyup", (e) => { if (e.code === "ArrowLeft" || e.code === "ArrowRight" ) keyPressed = false; }); // Toggle to prevent auditory cognitohazard levels of music spam.

let isMuted = false;
document.addEventListener("keydown", (e) => { if (e.code === "KeyM" && !isMuted) { isMuted = true; muteSound(); }});
document.addEventListener("keyup", (e) => { if (e.code === "KeyM") isMuted = false; }); // Toggle to prevent auditory cognitohazard levels of music spam.
*/
