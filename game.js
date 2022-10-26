const gridSize = [10,10];
let snake;
let currentInterval;





// Class Snake
// The start position is randomly chosen limited by gridSize, and updated based on the "head" of the snake
// The body is an array containing all the coordinates of the body. Starting it will only hold the position declared above
// The length of the body, also the score is 1

class Snake {
	constructor(){
		this.alive = true;

		this._position = [Math.floor(Math.random() * gridSize[0]) + 1, Math.floor(Math.random() * gridSize[1]) + 1];
		this.body = [this._position];
		this._length = 1
		this.speed = 250;
		this._direction = "up";
		this.apple = [Math.floor(Math.random() * gridSize[0]) + 1, Math.floor(Math.random() * gridSize[1]) + 1];
		this._gameplay = [];
		this._moves = [];
	}

	get positionX() {
		return this._position[0];
	}

	get positionY() {
		return this._position[1];
	}

	get position() {
		return this._position;
	}

	get length() {
		return this._length;
	}

	get direction(){
		return this._direction;
	}

	get moves() {
		return this._moves;
	}

	set moves(arr) {
		this._moves = arr;
	}



	set direction(dir){
		if(dir ==  "up" && this.moves[0] !== "down"){
			this._direction = dir;
		}
		if(dir ==  "down" && this.moves[0] !== "up"){
			this._direction = dir;
		}
		if(dir ==  "left" && this.moves[0] !== "right"){
			this._direction = dir;
		}
		if(dir ==  "right" && this.moves[0] !== "left"){
			this._direction = dir;
		}
	}

	set length(number) {
		this._length = number;
	}

	set positionX(x) {
		if(x == 0) {
			x = gridSize[0];
		}

		if(x == gridSize[0]+1) {
			x = 1;
		}

		this.position = [x, this._position[1]];
	}

	set positionY(y) {
		if(y == 0) {
			y = gridSize[1];
		}

		if(y == gridSize[1]+1) {
			y = 1;
		}

		this.position = [this._position[0], y];
	}

	set position(array) {
		this._position = array;
		this.checkBody();
		this.checkApple()
		this.updateBody()
	}

	updateBody(){
		this.body.unshift(this.position);

		if (this.body.length > this.length) {
			this.body.pop();
		}
	}

	checkApple(){
		if(this.position[0] == this.apple[0] && this.position[1] == this.apple[1]) {
			this.length = 1 +this.length;
			this.speed = this.speed * 0.95;
			this.apple = [Math.floor(Math.random() * gridSize[0]) + 1, Math.floor(Math.random() * gridSize[1]) + 1];
			resetInterval();

		}
	}

	checkBody(){
		for (let i = 0; i < this.body.length; i++) {
			if(this.body[i][0] === this.position[0] && this.body[i][1] === this.position[1]){
				this.alive = false;
			}
		}
	}


	updateMoves(move){
		if(this.moves[0] !== move) {
			this.moves.unshift(move)
		}
	}

	move(){
		if(this.direction == "up" && this.moves[0] !== "down"){
			this.updateMoves(this.direction);
			this.up();
		}
		
		if(this.direction == "down" && this.moves[0] !== "up"){
			this.updateMoves(this.direction);
			this.down();
		}
		if(this.direction == "left" && this.moves[0] !== "right"){
			this.updateMoves(this.direction);
			this.left();
		}
		if(this.direction == "right" && this.moves[0] !== "left"){
			this.updateMoves(this.direction);
			this.right();
		}

	}

	// CONTROLS
	up() {
		this.positionY = this.position[1] - 1;
	}

	down() {
		this.positionY = this.position[1] + 1;
	}

	left() {
		this.positionX = this.position[0] - 1;
	}

	right() {
		this.positionX = this.position[0] + 1;
	}


}

//Start Gamef
function startGame(){
	snake = new Snake;
	resetInterval();
	renderInfo("Find the rapple's")
}


function renderSnake(){
	for (let i = 0; i < snake.body.length; i++) {
		const snakePixel = document.querySelector("[data-position='" + snake.body[i] +"']");
		snakePixel.checked = true;
	}
	
}

function renderApple(){
	const applePixel = document.querySelector("[data-position='" + snake.apple +"']");
	applePixel.type = "radio";
	applePixel.checked = true;
}

function renderScore(){
	const textElement = document.getElementById("score");
	textElement.innerText = "Score: " + snake.length;
}

function renderInfo(text){
	const textElement = document.getElementById("info");
	textElement.innerText = text;
}

function renderGame() {
	createGrid();
	renderSnake();
	renderApple();
	renderScore();
	
	if(!snake.alive){
		clearInterval(currentInterval);
		createGridDead();
		renderInfo("Game Over!");
	}
}


function resetInterval() {
	clearInterval(currentInterval);
	currentInterval = setInterval(() => {
		snake.move();
		renderGame();
		
		}, snake.speed);
}