
function findPath(object, goalX, goalY) {
 
  //copy mapGrid array to a temp array
  var grid = JSON.parse(JSON.stringify(mapGrid));

  //check if the goal location is a valid location
  for(i = 0; i < object.walkableBlocks.length; i++){
    if (grid[goalX][goalY].block == object.walkableBlocks[i]) {
      grid[goalX][goalY].block = 'GOAL';
      break;
    }
  }
  if(grid[goalX][goalY].block != 'GOAL'){
    return false;
  }

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  var location = {
    distX: object.indexX,
    distY: object.indexY,
    path: [],
    block: 'START'
  };

  // Initialize the queue with the start location already inside
  var queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();

    // Explore North
    var newLocation = exploreInDirection(currentLocation, 'North', grid, object);
    if (newLocation.block === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.block === 'Valid') {
      queue.push(newLocation);
    }

    // Explore East
    var newLocation = exploreInDirection(currentLocation, 'East', grid, object);
    if (newLocation.block === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.block === 'Valid') {
      queue.push(newLocation);
    }

    // Explore South
    var newLocation = exploreInDirection(currentLocation, 'South', grid, object);
    if (newLocation.block === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.block === 'Valid') {
      queue.push(newLocation);
    }

    // Explore West
    var newLocation = exploreInDirection(currentLocation, 'West', grid, object);
    if (newLocation.block === 'GOAL') {
      return newLocation.path;
    } else if (newLocation.block === 'Valid') {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;

};

  // Explore the grid in different directions
  function exploreInDirection(currentLocation, direction, grid, object) {
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
    block: 'Unknown'
  };
  newLocation.block = locationStatus(newLocation, grid, object);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.block === 'Valid') {
    grid[newLocation.distX][newLocation.distY] = 'Visited';
  }

  return newLocation;
};


// This function will check a location's block
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
function locationStatus(location, grid, object) {
  var dft = location.distY;
  var dfl = location.distX;

  // If the location is outside of the grid
  if (location.distX < 0 || location.distX >= WORLD_ROWS ||
      location.distY < 0 || location.distY >= WORLD_COLS) {
    return 'Invalid';
    
    //If the location is our goal object
  } else if (grid[dfl][dft].block === 'GOAL') {
    return 'GOAL';
  }

  //If its a block that the object can walk on
  for(i = 0; i < object.walkableBlocks.length; i++){
    if (grid[dfl][dft].block == object.walkableBlocks[i]) {
      return 'Valid';
    }
  }

  //If the path is blocked
  return 'Blocked';
};
