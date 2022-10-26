function createGrid() {
	const gridDiv = document.querySelector(".grid");

	while (gridDiv.hasChildNodes()) {
		gridDiv.lastChild.remove();
	}

	for (let i = 1; i < gridSize[0] +1 ; i++) {
		for (let j = 1; j < gridSize[1] +1 ; j++) {
			const pixel = document.createElement("div")
			pixel.classList.add("pixel");

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = false;
			checkbox.dataset.position = [j,i];

			pixel.append(checkbox);
			gridDiv.append(pixel);
		}
	}
}

function createGridDead() {
	const gridDiv = document.querySelector(".grid");

	while (gridDiv.hasChildNodes()) {
		gridDiv.lastChild.remove();
	}

	for (let i = 1; i < gridSize[0] +1 ; i++) {
		for (let j = 1; j < gridSize[1] +1 ; j++) {
			const pixel = document.createElement("div")
			pixel.classList.add("pixel");

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			
			
			checkbox.dataset.position = [j,i];
			checkbox.checked = true;
			pixel.append(checkbox);
			gridDiv.append(pixel);
			setTimeout(() => {
				checkbox.classList.add("wave");
			}, 20 * j * i);
			setTimeout(() => {
				checkbox.checked = false;
			}, 20 * j * i);
			
		}
	}
}