// Import Matrix class as a module
import { mapPixelToCoords } from "./utils";

// Constants
const M_PI = 3.1415926535897932384626433
const G = 1000;
const TTL = 5.0;
const SCALE = 0.999 

class Particle
{
    constructor(canvas, numPoints, mouseClickPosition)
    {
        // Initialize variables
        this.canvas = canvas;
        this.numPoints = numPoints;
        this.mouseClickPosition = mouseClickPosition;   // holds coords of mouse click position
        this.m_A = new Matrix(2, numPoints);
        this.m_ttl = TTL;
        this.m_initialTTL = TTL;
        
        // Create random values
        this.random = Math.random() // generates a floating point number between 0 and 1
        this.m_radiansPerSec = this.random / M_PI;

        // Starting position of Particle based on mouse click location
        this.m_centerCoordinate = mapPixelToCoords(mouseClickPosition.x, mouseClickPosition.y, canvas);    // to do

        // Initialize velocity in X & Y directions
        this.m_vx = Math.random() * 400 + 100; // Random velocity between 100 and 500
        this.m_vy = Math.random() * 400 + 100; // Random velocity between 100 and 500
        this.m_vx = (Math.random() % 2 === 0) ? this.m_vx : -this.m_vx; // Randomizes m_vx to be positive or negative
    
        // Initialize color scheme
        this.m_color1 = 'rgba(252, 193, 26, 1)';    // fill color
        this.m_color2 = 'rgba(255, 255, 0, 1)';     // outline color

        // Initialize canvas to draw Particle on
        this.ctx = this.canvas.getContext('2d');

        // Logic for drawing Particles
        this.generateShape();
    }

    // Methods
    draw()
    {
        const ctx = this.ctx;
        const { m_centerCoordinate, m_A, numPoints, canvas } = this;

        ctx.beginPath();

        // Center canvas and context
        const center = mapPixelToCoords(m_centerCoordinate.x, m_centerCoordinate.y, canvas);
        ctx.moveTo(center.x, center.y)

        for (let j = 1; j <= numPoints; j++)
        {
            let x = m_A.get(0, j - 1);
            let y = m_A.get(1, j - 1);

            let mapped = mapPixelToCoords(x, y, canvas);
            ctx.lineTo(mapped.x, mapped.y);
        }
        ctx.closePath();

        // Set colors
        ctx.fillStyle = this.m_color1;
        ctx.strokeStyle = this.m_color2;
        ctx.lineWidth = 1;

        ctx.fill();
        ctx.stroke();
    }

    update(dt)
    {  
        const { m_initialTTL, m_radiansPerSec, m_vx, m_vy } = this;

        // Create a lifetime ratio ranging from 0 to 1, using m_ttl and m_initialTTL
        const ratio = Math.max(0, (this.m_ttl / m_initialTTL));
        
        // Calculate a new alpha based on the ratio, this creates a fading effect by gradually decreasing the Particle's opacity
        const alpha = (Math.floor(255 * ratio)) / 255;

        // Updates colors with new opacity (just hardcode rgb for now)
        this.m_color1 = `rgba(252, 193, 26, ${alpha})`;   // fill color
        this.m_color2 = `rgba(255, 255, 0, ${alpha})`;    // outline color

        // Update TTL based on DT
        this.m_ttl -= dt;

        // Update rotation, scaling, translation on Particle every frame
        this.rotate(dt * m_radiansPerSec);
        this.scale(SCALE);

        let dx = m_vx * dt;
        m_vy -= G * dt;
        dy = m_vy * dt;

        this.translate(dx, dy);
    }

    generateShape() // This method generates the positions required to draw a star-like Particle.
    {
        const { m_A, m_centerCoordinate, numPoints } = this;
        
        let random = this.random;     // uses a floating point number between 0 - 1
        let theta = random / M_PI       // divide the random fraction by PI constant
        let dTheta = 2 * M_PI / (numPoints - 1);

        // Logic for making star-like shapes
        let outerRadius = Math.random() * 60 + 10;     // generates a random distance that determines the length of each 'tip' of the star
        let innerRadius = outerRadius * 0.5           // a constant fraction that keeps the depth of each 'dip' of the star to end halfway of the outer radius

        for (let j = 0; j < numPoints; j++)
        {
            let radius = ( j % 2 === 0) ? outerRadius : innerRadius;    // Alternates between drawing the 'tip' then 'dip' of the star points
            let dx = radius * Math.cos(theta);
            let dy = radius * Math.sin(theta);

            m_A.set(0, j, (m_centerCoordinate.x + dx));
            m_A.set(1, j, (m_centerCoordinate.y + dy));
            theta += dTheta;
        }
    }

    // Private Methods

    rotate(theta)   // This method rotates the Particle counter-clockwise by theta radians using a RotationMatrix and matrix multiplication.
    {
        const { m_A, m_centerCoordinate, translate } = this;     // alias

        let temp = { x: m_centerCoordinate.x, y: m_centerCoordinate.y };
        translate(-m_centerCoordinate.x, -m_centerCoordinate.y);
        let rotation = new RotationMatrix(theta);

        m_A.multiply(rotation);     // ex: m_A = R * m_A
        translate(temp.x, temp.y);
    }

    scale(c)    // This method scales the Particle size by a factor of 'c' by using a ScalingMatrix and matrix multiplication.
    {
        const { m_A, m_centerCoordinate, translate } = this;     // alias
        
        let temp = { x: m_centerCoordinate.x, y: m_centerCoordinate.y };
        translate(-m_centerCoordinate.x, -m_centerCoordinate.y);
        let scalar = new ScalingMatrix(c);

        m_A.multiply(scalar);   // ex: m_A = S * m_A
        translate(temp.x, temp.y);
    }

    translate(xShift, yShift)   // This method shifts the Particle by coordinates (xShift, yShift) using a TranslationMatrix and matrix addition.
    {
        const { m_A, m_centerCoordinate } = this;     // alias
        let nCols = m_A.getCols();
        let translation = new TranslationMatrix(xShift, yShift, nCols);
        
        m_A.add(translation);   // ex: m_A = T + m_A
        m_centerCoordinate.x += xShift;
        m_centerCoordinate.y += yShift;

    }
}

// Member variables
/*
this.m_ttl
this.m_initialTTL
this.m_numPoints
this.m_centerCoordinate (Vector of 2 floats)
m_radiansPerSec
m_vx
m_vy
m_cartesianPlane    (View object)
Color m_color1
Color m_color2
Matrix m_A
m_lines (VertexArray object)
*/

