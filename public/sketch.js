

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var bees = 15;

function setup() {
	createCanvas(201,201);
	cols = floor(width/w);
	rows = floor(height/w);
	grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
  	for (var j = 0; j < rows; j++) {
  		grid[i][j] = new Cell(i,j,w);
  	}
  }

  // Pick bees to add
  var choices = [];
  for (var i = 0; i < cols; i++) {
  	for (var j = 0; j < rows; j++) {
  		choices.push([i,j]);
  	}
  }

  for (var i = 0; i < choices.length-1; i++) {
    let random = getRandom(i, choices.length-1);
    if (random !== i) {
    	let temp = choices[i];
    	choices[i] = choices[random];
    	choices[random] = temp;
    }
  }

  for (var bee = 0; bee < bees; bee++) {
  	let coordinates = choices[bee];
  	let i = coordinates[0];
  	let j = coordinates[1];
  	grid[i][j].bee = true;
  }

  for (var i = 0; i < cols; i++) {
  	for (var j = 0; j < rows; j++) {
  		grid[i][j].countNeighbors();
  	}
  }
}

function getRandom(floor, ceiling) {
	return Math.floor(Math.random() * (ceiling - floor + 1)) + floor
}

function gameOver() {
	for (var i = 0; i < cols; i++) {
  	for (var j = 0; j < rows; j++) {
  		grid[i][j].revealed = true;
  	}
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
  	for (var j = 0; j < rows; j++) {
  		if(grid[i][j].contains(mouseX, mouseY)) {
  			grid[i][j].reveal();
  			if (grid[i][j].bee) {
  				gameOver();
  			}
  		}
  	}
  }
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
  	for (var j = 0; j < rows; j++) {
  		grid[i][j].show();
  	}
  }
}
