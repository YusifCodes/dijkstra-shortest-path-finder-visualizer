function dijkstra(grid, startNodeId, endNodeId) {
  //DISTANCES OBJECT AND FUNCTION
  let distance = {};

  const distances = (grid) => {
    for (let node of grid) {
      if (node.classList[0] == "wall") {
        continue;
      }
      if (node.classList[0] == "undiscovered") {
        distance[node.id] = 999999;
      }
      if (node.classList[0] == "b") {
        distance[node.id] = 0;
      }
      if (node.classList[0] == "a") {
        distance[node.id] = 999999;
      }
    }
  };

  distances(grid);


  const dijkstraController = () => {
    //show start end points
    console.log(startNodeId)
    if(document.getElementById(startNodeId).classList == "wall" || document.getElementById(endNodeId).classList == "wall"){
      alert("Start/end points are blocked, the board will clear after you close this")
      window.location.reload()
    }

    let startNode = grid[startNodeId];
    let endNode = grid[endNodeId];
    startNode.classList = "a";
    endNode.classList = "b";



    //initialize storage arr and add the default values which are the neigbors of start node

    var orderedVisitedNodes = [];
    orderedVisitedNodes.push(startNode);

    //the checking loop

    for (let node of orderedVisitedNodes) {
      if (node.classList[0] == "b") {
        orderedVisitedNodes.push(node);
        let backtrackPath = getNodesInShortestPathOrder(endNode);
        console.log(backtrackPath)
        return [orderedVisitedNodes, backtrackPath];
      }
      if (node.classList[0] == "a") {
        orderedVisitedNodes.push(...getUnvisitedNeighbors(node, grid));
      }
      if (node.classList[0] == "block") {
        continue;
      }
      if (node.classList == "undiscovered") {
        orderedVisitedNodes.push(...getUnvisitedNeighbors(node, grid));
        node.classList = "vis";
      }
      updateDistances(node);
    }
  };

  //UPDATE NEIGHBORS
  let previousNodes = {}

  const updateDistances = (node) => {
    let unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    let defaultDistance = distance[node.id];
    //console.log(defaultDistance)
    for (let neighbor of unvisitedNeighbors) {
      distance[neighbor.id] = defaultDistance + 1;
      previousNodes[neighbor.id] = node;
    }
  };


  //GET NEIGHBORS
  const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    //getting the x and y properties
    const col = +node.attributes.c.value;
    const row = +node.attributes.r.value;

    const a = `${row - 1}-${col}`;
    const b = `${row + 1}-${col}`;
    const c = `${row}-${col - 1}`;
    const d = `${row}-${col + 1}`;

    if (grid[a]) {
      if (grid[a].classList == "undiscovered" || grid[a].classList == "b") {
        neighbors.push(grid[a]);
      }
    }
    if (grid[b]) {
      if (grid[b].classList == "undiscovered" || grid[b].classList == "b") {
        neighbors.push(grid[b]);
      }
    }
    if (grid[c]) {
      if (grid[c].classList == "undiscovered" || grid[c].classList == "b") {
        neighbors.push(grid[c]);
      }
    }
    if (grid[d]) {
      if (grid[d].classList == "undiscovered" || grid[d].classList == "b") {
        neighbors.push(grid[d]);
      }
    }

    //return
    return neighbors;
  };
  
  //GET THE SHORTEST PATH
  const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;

    while (currentNode.id !== startNodeId) {
      nodesInShortestPathOrder.push(previousNodes[currentNode.id]);
      currentNode = previousNodes[currentNode.id];
    }

    return nodesInShortestPathOrder;
  };


  //CALL AND RETURN DIJKSTRA CONTROLLER
  let results = dijkstraController();
  return results;
}

export default dijkstra;
