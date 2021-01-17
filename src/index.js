import React from "react";
import ReactDOM, { render } from "react-dom";
import Table from "./js/table";
import Dijkstra from "./js/dijkstra"
import RenderNodes from "./js/render_nodes"
import dijkstra from "./js/dijkstra";
import blocks from "./js/blocks"

let grid = document.getElementsByTagName("td")

//create table
Table()
//initialize function
function init(){
  //show the user the start and end node id
  nodeHelp()
  //add blocks to the table if needed
  document.querySelector(".block-btn").addEventListener("click", ()=>{
    blocks(grid)
  })

  //call dijkstra function after clicking start
  document.querySelector(".start").addEventListener("click", ()=>{
     //get start end nodes
    const startendNodes = getData()

    //get the iterated nodes and thet shortest path with dijkstra algorythm and store it in an array
    const dijkstraArr = dijkstra(grid, startendNodes[0], startendNodes[1])
   
    //render nodes
    setTimeout(()=>{
      RenderNodes(dijkstraArr)
    }, 1000)
  })
}


function getData(){
  let pointA = document.querySelector(".text1");
  let pointB = document.querySelector(".text2");

  if(pointA == "" || pointB == ""){
    alert("Please define a start/end nodes.")
  }

  return [pointA.value, pointB.value]
}

function nodeHelp(){
  const td = document.getElementsByTagName("td")

  document.querySelector(".help-text-query").innerHTML = `Last node is: ${td[td.length - 1].id}`
}



window.addEventListener("load", init)
document.querySelector(".clear").addEventListener("click", () => {
  window.location.reload(); 
})
