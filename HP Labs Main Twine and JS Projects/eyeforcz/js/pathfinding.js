// Start location will be in the following format:
// [distY, distX]
var findShortestPath = function(startCoordinates, grid) {
    var distY = startCoordinates[0];
    var distX = startCoordinates[1];
  
    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
      distY: distY,
      distX: distX,
      path: [],
      status: 'Start'
    };
  
    // Initialize the queue with the start location already inside
    var queue = [location];
  
    // Loop through the grid searching for the goal
    while (queue.length > 0) {
      // Take the first location off the queue
      var currentLocation = queue.shift();
  
      // Explore North
      var newLocation = exploreInDirection(currentLocation, 'North', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore East
      var newLocation = exploreInDirection(currentLocation, 'East', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore South
      var newLocation = exploreInDirection(currentLocation, 'South', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore West
      var newLocation = exploreInDirection(currentLocation, 'West', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
    }
  
    // No valid path found
    return false;
  
  };

   // Explore the grid in different directions
   var exploreInDirection = function(currentLocation, direction, grid) {
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
    newLocation.status = locationStatus(newLocation, grid);
  
    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
      grid[newLocation.distY][newLocation.distX] = 'Visited';
    }
  
    return newLocation;
  };
  
  
  // This function will check a location's status
  // (a location is "valid" if it is on the grid, is not an "obstacle",
  // and has not yet been visited by our algorithm)
  // Returns "Valid", "Invalid", "Blocked", or "Goal"
  var locationStatus = function(location, grid) {
    var gridSize = grid.length;
    var dft = location.distY;
    var dfl = location.distX;
  
    // If the location is outside of the grid
    if (location.distX < 0 || location.distX >= gridSize ||
        location.distY < 0 || location.distY >= gridSize) {
      return 'Invalid';
      
      //If the location is our goal object
    } else if (grid[dft][dfl] === 'Goal') {
      return 'Goal';

      //If location is either an obstacle or has been visited
    } else if (grid[dft][dfl] !== 'Empty') {
      return 'Blocked';
      
      //If the path is free 
    } else {
      return 'Valid';
    }
  };
  
  
 
  
  // OK. We have the functions we need--let's run them to get our shortest path!
  
  // Create a 4x4 grid
  // Represent the grid as a 2-dimensional array
  var gridSize = 4;
  var grid = [];
  for (var i=0; i<gridSize; i++) {
    grid[i] = [];
    for (var j=0; j<gridSize; j++) {
      grid[i][j] = 'Empty';
    }
  }
  
  // Think of the first index as "distance from the top row"
  // Think of the second index as "distance from the left-most column"
  
  // This is how we would represent the grid with obstacles above
  grid[0][0] = "Start";
  grid[2][2] = "Goal";
  
  grid[1][1] = "Obstacle";
  grid[1][2] = "Obstacle";
  grid[1][3] = "Obstacle";
  grid[2][1] = "Obstacle";
  
  console.log(findShortestPath([0,0], grid));