//ADD BLOCKS
const addBlocks = (grid) => {
    let randomIndexArray = [];
    //GENERATE A RELATIVE AMOUNT OF INDEXES
    for (let i = 0; i <= grid.length / 5; i++) {
      randomIndexArray.push(Math.floor(Math.random() * grid.length));
    }

    for (let j = 0; j < grid.length; j++) {
      if (randomIndexArray.indexOf(j) != -1) {
        if (grid[j].classList != "undiscovered") {
          continue;
        }
        grid[j].classList = "wall";
      }
    }

    return randomIndexArray;
  };


export default addBlocks