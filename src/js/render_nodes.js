import dijkstra from "./dijkstra"

//render nodes
async function renderNodes(dijkstraArr){
    if(dijkstraArr === undefined){
      alert("Oops, there is no path, the board will clear after you close this.")
      window.location.reload()
    }

    const timer = (ms) => new Promise(res => setTimeout(res, ms))
    
    for(let i = 1; i < dijkstraArr[0].length; i++){
      if(dijkstraArr[0][i].classList == "b"){
        continue
      } 
      dijkstraArr[0][i].classList.add("yellow")
      await timer(0.1)
    }
  
    async function renderPath(){
      const timer = (ms) => new Promise(res => setTimeout(res, ms))
    
      for(let i = 0; i < dijkstraArr[1].length; i++){
        if(dijkstraArr[1][i].classList == "a"){
          continue
        } 
        dijkstraArr[1][i].classList.add("pink")
        await timer(50)
      }

      alert(`The shortest path length is: ${dijkstraArr[1].length - 1}`)
    }
  
    renderPath()
  }

  export default renderNodes