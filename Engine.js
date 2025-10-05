// This handles the game loop

import { WINDOW_WIDTH, WINDOW_HEIGHT, TARGET_FPS, MAX_DELTA_TIME } from "./config.js";
import { Particle } from "./Particle.js";

export default class Engine 
{
	constructor(canvasId = "window")
	{
	  	// Adjust the container CSS
	  	const container = document.getElementById("container");
    	container.style.width  = WINDOW_WIDTH + "px";
    	container.style.height = WINDOW_HEIGHT + "px";
  
		// Initialize canvas variables
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = WINDOW_WIDTH;
		this.canvas.height = WINDOW_HEIGHT;
		this.canvas.style.width = WINDOW_WIDTH;
		this.canvas.style.height = WINDOW_HEIGHT;

		// Shift origin to center of canvas
    	this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

		// Initialize array to hold particles
		this.particles = [];
		this.timeSinceLastParticle = 0;
		
		// Input handling
		this.mouseLeftPressed = false;
		this.mousePreviouslyClicked = false;
		this.mousePos = { x: 0, y: 0 };
		this.lastMousePos = { x: 0, y: 0 };

		// Track mouse state
		this.canvas.addEventListener("mousedown", (e) =>	// When mouse button is clicked.
		{
			if (e.button === 0) this.mouseLeftPressed = true;
			this.mousePos = { x: e.offsetX, y: e.offsetY };
		});
		this.canvas.addEventListener("mouseup", (e) => 		// When mouse button is released.
		{
			if (e.button === 0) this.mouseLeftPressed = false;
			this.mousePos = { x: e.offsetX, y: e.offsetY };
		});
		this.canvas.addEventListener("mousemove", (e) => 	// When mouse is moved.
		{
			this.mousePos = { x: e.offsetX, y: e.offsetY };
		});

		// Track touch state (for mobile devices)
		this.canvas.addEventListener("touchstart", (e) => 	// When screen is touched.
		{
			e.preventDefault();		// prevents scrolling/zoom
			const touch = e.touches[0];	// only registers first touch/finger
			this.mouseLeftPressed = true;
			this.mousePos = { 	x: touch.clientX - this.canvas.offsetLeft, 
								y: touch.clientY - this.canvas.offsetTop };
		});
		this.canvas.addEventListener("touchend", (e) => 	// When touch is released.
		{
			this.mouseLeftPressed = false;
			this.mousePos = { x: e.offsetX, y: e.offsetY };
		});
		this.canvas.addEventListener("touchmove", (e) => 	// When touching and moving across screen.
		{
			e.preventDefault();
			const touch = e.touches[0];
			this.mousePos = { 	x: touch.clientX - this.canvas.offsetLeft, 
								y: touch.clientY - this.canvas.offsetTop };
		});

	}

	run()
	{
		let lastFrameTime = performance.now();
		const loop = (now) =>
		{
			let dt = (now - lastFrameTime) / 1000;
			dt = Math.min(dt, MAX_DELTA_TIME);
			lastFrameTime = now;
			this.input(dt);
			this.update(dt);
			this.draw();
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}
	
	input(dt)
	{
		this.timeSinceLastParticle += dt; // Tracks the time since last particle was spawned
		this.onClick(); // Handles creating particles on click

		// Leave this at end to track mouse clicks
		this.lastMousePos = { ...this.mousePos };
		this.mousePreviouslyClicked = this.mouseLeftPressed;
	}

	update(dt)
	{
		this.despawn();
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
	
	despawn()
	{
		// if particle center coordinate is found outside WINDOW_HEIGHT and WINDOW_WIDTH + buffer, delete particle from this.particles
		const buffer = 500;
		const boundsX = WINDOW_WIDTH + buffer;
		const boundsY = WINDOW_HEIGHT + buffer;

		for (let i = this.particles.length - 1; i >= 0; i--)
		{
			const p = this.particles[i];

			if (Math.abs(p.m_centerCoordinate) > boundsX || Math.abs(p.m_centerCoordinate) > boundsY)
			{
				this.particles.splice(i, 1);	// removes specific particle by its index
			}
		}
	}

	generateParticle(min, max, position)
	{
		// Randomize min to max number of particles spawned
		let numParticles = Math.floor(Math.random() * (max - min + 1)) + min;
		const particles = [];	// separate array from this.particles

		for (let i = 0; i < numParticles; i++)
		{
			// Randomize a star with min to max number of vertices
			let minPoints = 8;	// If min < 8, program will sometimes create triangle particles
			let maxPoints = 20;

			let numPoints = Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints; // randomize number of points per particle
			if (numPoints % 2 == 0) { numPoints++; }	// ensures numPoints is an odd number
			
			// Creates particle
			const p = new Particle(this.canvas, numPoints, position);
			//p.m_ttl = 3.00;		// update to shorter TTL
			particles.push(p);

			// Debug statements
			// console.log("Number of points:", numPoints);
			// console.log("Mouse click at:", position);
			// console.log("Particle created at:", p.m_centerCoordinate);
			// console.log("Particles after click:", this.particles.length);
		}
		return particles;
	}
	
	onClick()
	{
	  const cooldown = 0.05;
	  
	  // Burst click on cooldown
		if (this.mouseLeftPressed && !this.mousePreviouslyClicked) 
		{
		  this.particles.push(...this.generateParticle(5, 8, this.mousePos));		// creates 3-8 particles on click, pushes into this.particles using spread operator
			this.timeSinceLastParticle = 0;
		}	
		
		// Cooldown to limit particle spawn when clicking and holding
		if (this.mouseLeftPressed && this.mousePreviouslyClicked && this.timeSinceLastParticle >= cooldown)
		{
		  if (this.mousePos.x !== this.lastMousePos.x || this.mousePos.y !== this.lastMousePos.y) // spawns particle when mouse moves
		  {
		    this.particles.push(...this.generateParticle(1, 1, this.mousePos));	// creates 1 -3 particles when holding click, pushes into this.particles using spread operator
		  }
		}

	}

	specialEvent()
	{
		// create a box offscreen for particles to spawn from
		const offscreen = document.getElementById("offscreen");
		const rect = offscreen.getBoundingClientRect();
		offscreen.style.transform = "translateY(-200%)";

		// generate 12-21 particles on click
		let minParticles = 12;
		let maxParticles = 32;
		let numParticles = Math.floor(Math.random() * (maxParticles - minParticles + 1)) + minParticles;
		const particles = [];

		for (let i = 0; i < numParticles; i++)
		{
			// create a random position within the spawn box
			let position =
			{
				x: rect.left + Math.random() * rect.width,
				y: rect.top + Math.random() * rect.height
			};	
			particles.push(...this.generateParticle(1, 1, position));
		}	

		for (let p of particles)
		{
			// change the velocity and ttl of each particles before/after pushing to array
			p.m_ttl = Math.random() * (6 - 3 + 1) + 3;	// between 3 and 6
			p.m_vx = 1.0;
			p.m_vy = 5.0;

			// push modified particles into this.particles
			this.particles.push(p);
		}
	}
}
