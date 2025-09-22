// This handles the game loop

import { WINDOW_WIDTH, WINDOW_HEIGHT, MAX_DELTA_TIME } from "./config.js";

export default class Engine 
{
  constructor(canvasId = "gameWindow") 
  {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    // size the canvas
    this.canvas.width = WINDOW_WIDTH;
    this.canvas.height = WINDOW_HEIGHT;

    // timing
    this.lastTime = performance.now();
    this.accum = 0;

    // state placeholders (particles, characters, etc.)
    this.isRunning = false;

    // basic input (we’ll hook this up to spawn particles later)
    this.canvas.addEventListener("click", (e) => {
      // placeholder for now
      console.log("click @", e.offsetX, e.offsetY);
    });
  }

  start()
  {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(now) 
  {
    if (!this.isRunning) return;

    let dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (dt > MAX_DELTA_TIME) dt = MAX_DELTA_TIME; // clamp like your C++ engine

    this.update(dt);
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) 
  {
    // soon: update particles, animation, music, buttons
  }

  draw()
  {
    // clear background (neutral gray for now)
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // soon: draw character frames, particles, UI
  }
}