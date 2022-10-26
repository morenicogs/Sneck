function control(e){
	if(snake?.alive){
		
		//UP
		if(e.keyCode === 38) {
			snake.direction = "up";
			
		}
		
		//DOWN
		if(e.keyCode === 40) {
			snake.direction = "down";
			
		}

		//LEFT
		if(e.keyCode === 37) {
			snake.direction = "left";
			
		}

		//RIGHT
		if(e.keyCode === 39) {
			snake.direction = "right";
			
		}
		renderGame();
	} else {
		startGame();
	}
	
}

document.addEventListener("keyup", control)