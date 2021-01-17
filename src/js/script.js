import {dijkstra} from "../dijkstra"

const tools = {
  createTable: () => {
    var containerArr = [];
    let container = "";
    let storei = 0;

    //device dimensions
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;

    //count table dimensions
    const rows = Math.floor(deviceWidth / 25);
    const columns = Math.floor(deviceHeight / 35);
    console.log(rows, columns);

    //create table
    for (var i = 0; i <= columns; i++) {
      for (var j = 0; j <= rows; j++) {
        //check if i changed
        if (storei !== i) {
          containerArr.push(`<tr id="${storei}">${container}</tr>`);
          container = "";
        }
        //iteration process
        container += `<td id="${i}-${j}" class="undiscovered" c="${j}" r="${i}"></td>`;
        //store i, default was 0
        storei = i;
      }
    }

    //insert table
    for (let i = 0; i < containerArr.length; i++) {
      document
        .getElementById("table")
        .insertAdjacentHTML("beforeend", containerArr[i]);
    }
  },
};

//FUNCTION TOGGLER
functionController = () => {
  grid = document.getElementsByTagName("td");
  //create table
  tools.createTable();
  let a = dijkstra(grid, "3-10", "5-22");
  console.log(a);
};

functionController();
