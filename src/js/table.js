import React from "react";
import { render } from "react-dom";
import Dijkstra from "./dijkstra";

function renderTable() {
  var containerArr = [];
    let container = "";
    let storei = 0;

    //count table dimensions
    const rows = Math.floor(window.innerWidth / 25);
    const columns = Math.floor(window.innerHeight / 35);

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
}


export default renderTable
