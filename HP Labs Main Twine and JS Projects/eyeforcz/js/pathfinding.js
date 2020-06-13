// Start location will be in the following format:
// [distY, distX]
var findShortestPath = function(object, goalX, goalY, theGrid) {
  grid = theGrid.slice();
  grid[goalX][goalY] = "GOAL";
  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  var location = {
    distX: object.currentX,
    distY: object.currentY,
    path: [],
    status: 'START'
  };

  // Initialize the queue with the start location already inside
  var queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();

    // Explore North
    var newLocation = exploreInDirection(currentLocation, 'North', grid, object);
    if (newLocation.status === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore East
    var newLocation = exploreInDirection(currentLocation, 'East', grid, object);
    if (newLocation.status === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore South
    var newLocation = exploreInDirection(currentLocation, 'South', grid, object);
    if (newLocation.status === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore West
    var newLocation = exploreInDirection(currentLocation, 'West', grid, object);
    if (newLocation.status === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;

};

  // Explore the grid in different directions
  var exploreInDirection = function(currentLocation, direction, grid, object) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distY;
  var dfl = currentLocation.distX;

  if (direction === 'North') {
    dft -= 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dft += 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }

  var newLocation = {
    distY: dft,
    distX: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation, grid, object);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    grid[newLocation.distX][newLocation.distY] = 'Visited';
  }

  return newLocation;
};


// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function(location, grid, object) {
  var gridSize = grid.length;
  var dft = location.distY;
  var dfl = location.distX;

  // If the location is outside of the grid
  if (location.distX < 0 || location.distX >= gridSize ||
      location.distY < 0 || location.distY >= gridSize) {
    return 'Invalid';
    
    //If the location is our goal object
  } else if (grid[dfl][dft] === 'GOAL') {
    return 'GOAL';
  }

  //If its a block that the object can walk thru
  for(i = 0; i < object.ingoreBlocks.length; i++){
    if (grid[dfl][dft] == object.ingoreBlocks[i]) {
      return 'Valid';
    }
  }

  //If the path is blocked
  return 'Blocked';
};




// OK. We have the functions we need--let's run them to get our shortest path!

// Create a 4x4 grid
// Represent the grid as a 2-dimensional array
var gridSize = 4;
var egrid = [];
for (var i=0; i<gridSize; i++) {
  egrid[i] = [];
  for (var j=0; j<gridSize; j++) {
    egrid[i][j] = 'Empty';
  }
}

// This is how we would represent the grid with obstacles above
//grid[0][0] = "Start";
//grid[2][2] = "Goal";

egrid[1][1] = "Obstacle";
egrid[2][1] = "Obstacle";
egrid[3][1] = "Obstacle";
egrid[1][2] = "Obstacle";
test = {
  currentX: 0,
  currentY: 0,
  ingoreBlocks: ['Empty']
};
console.log(findShortestPath(test,2,2,egrid));