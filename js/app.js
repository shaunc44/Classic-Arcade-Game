// Shaun Cox
// August 24, 2015
// The app.js file provides functionality to the game:
// Speed, locations, reset, collisions, inputs, updates and rendering.

// Enemies our player must avoid
var Enemy = function(bugStartX, bugStartY, speed) {
    // Variables applied to each of our instances go here; we've provided one for you to get started
    this.x = bugStartX; // bugs starting x axis
    this.y = bugStartY; // bugs starting y axis
    this.speed = speed;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // Bugs starting x-axis position after reach end of screen
    if (this.x > 505) {
        this.x = -90;
        this.randomSpeed();
    }

    // Bugs' collision range
    var collisionLeft = this.x - 75;
    var collisionRight = this.x + 75;
    var collisionTop = this.y - 50;
    var collisionBottom = this.y + 50;

    // This establishes the player & bug collision zone.
    if (player.x > collisionLeft && player.x < collisionRight && player.y > collisionTop && player.y < collisionBottom) {
        player.resetPosition();
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // Resources methods = load(), get(), onReady(), isReady()
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Create random speeds for the updated bugs
Enemy.prototype.randomSpeed = function() {
    var speedChange = Math.floor(Math.random() * 5 + 1);
    this.speed = speedChange * 80;
};


// Now write your own player class -
// This class requires an update(), render() and a handleInput() method.
var Player = function() {
    // Player starting X & Y coordinates
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
};


// Update the player - not sure how to implement 'dt' here?
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    // Player entering the water
    if (this.y < 50) {
        this.resetPosition();
    }
};


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Determine direction and distance moved when each arrow is pressed
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === 'left' && this.x > 50) {
        this.x = this.x - 101;
    }
    if (keyPressed === 'right' && this.x < 400) {
        this.x = this.x + 101;
    }
    if (keyPressed === 'up' && this.y > 0) {
        this.y = this.y - 83;
    }
    if (keyPressed === 'down' && this.y < 400) {
        this.y = this.y + 83;
    }
};


// Establish player starting position when game resets
Player.prototype.resetPosition = function() {
    this.x = 202;
    this.y = 404;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var bugSpeed = 80; // default bug speed
// Initial speeds for bugs 1, 2 and 3
var initSpeed1 = Math.floor(Math.random() * 5 + 1) * bugSpeed;
var initSpeed2 = Math.floor(Math.random() * 5 + 1) * bugSpeed;
var initSpeed3 = Math.floor(Math.random() * 5 + 1) * bugSpeed;
// Instantiate bugs, speeds and locations
var allEnemies = [new Enemy (-100, 60, initSpeed1), new Enemy (-100, 145, initSpeed2), new Enemy(-100, 230, initSpeed3)];

// Combine the previous variables and allEnemies in this loop at later time
/*
for (var i = 0; i < 3; i++) {
    allEnemies.push ();
}
*/

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var keyPressed = allowedKeys[e.keyCode];
    player.handleInput(keyPressed);
});
