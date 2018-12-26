function Cell(i,j,w) {
	this.i = i;
	this.j = j;
  this.x = i * w;
  this.y = j * w;  
  this.w = w;
  this.neighbors = 0;
  this.revealed = false;
  this.bee = false;
}

Cell.prototype.show = function() {
	stroke(0);
	noFill();
	rect(this.x, this.y, this.w, this.w);
	if (this.revealed) {
		if (this.bee) {
			stroke(0);
			fill(127);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		} else {
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			if (this.neighbors > 0) {
		    textAlign(CENTER);
	      fill(0);
	      text(this.neighbors, this.x + this.w * 0.5, this.y + this.w - 5)			
			}
		}
	}
}

Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
	this.revealed = true;
	if (this.neighbors === 0) {
		this.floodFill();
	}
}

Cell.prototype.countNeighbors = function() {
	if (this.bee) {
		this.neighbors = -1;
		return;
	}
	var total = 0;
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbor = grid[i][j];
				if (neighbor.bee) {
					total++;
				}   	
      }
		}
	}
  this.neighbors = total;
}

Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbor = grid[i][j];
				if (!neighbor.bee && !neighbor.revealed) {
					neighbor.reveal();
				}   	
      }
		}
	}
}