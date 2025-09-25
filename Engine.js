// This handles the game loop

import { WINDOW_WIDTH, WINDOW_HEIGHT, TARGET_FPS, MAX_DELTA_TIME } from "./config.js";
import { Particle } from "./Particle.js";

export default class Engine 
{
	constructor(canvasId = "gameWindow")
	{
		// Initialize canvas variables
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = WINDOW_WIDTH;
		this.canvas.height = WINDOW_HEIGHT;

		// Shift origin to center of canvas
    	this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

		// Particles and input handling
		this.particles = []		// array of particles
		this.input();
	}

	input()
	{
		this.canvas.addEventListener("click", (e) =>
		{
			let min = 8;	// If min < 8, program will sometimes create triangle particles
			let max = 20;
			let numPoints = Math.floor(Math.random() * (max - min + 1)) + min; // randomize number of points per particle
			
			if (numPoints % 2 == 0) { numPoints++; }	// ensures numPoints is an odd number
			
			// Creates particle
			const position = { x: e.offsetX, y: e.offsetY };
			const p = new Particle(this.canvas, numPoints, position);
			this.particles.push(p);

			// Debug statements
			console.log("Number of points:", numPoints);
			console.log("Mouse click at:", position);
			console.log("Particle created at:", p.m_centerCoordinate);
			console.log("Particles after click:", this.particles.length);
			
		});
	}

	run()
	{
		const loop = (now) =>
		{
			this.update(1 / TARGET_FPS);
			this.draw();
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}

	update(dt)
	{
		this.particles.forEach((p) => p.update(dt));
		this.particles = this.particles.filter((p) => p.m_ttl > 0);
	}

	draw()
	{
    	this.ctx.setTransform(1, 0, 0, 1, 0, 0);  // reset transform
    	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    	// reapply transform
    	this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    	this.particles.forEach((p) => p.draw());
	}
}