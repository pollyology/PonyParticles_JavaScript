// Helper functions meant to replicate functionality of SFML methods

export function mapPixelToCoords(pixelX, pixelY, canvas)
{
    return {
        x: pixelX - canvas.width / 2,
        y: canvas.height / 2 - pixelY
    };
}