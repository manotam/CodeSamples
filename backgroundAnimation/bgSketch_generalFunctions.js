function distanceFromCircleCenter(mouseX, mouseY, posX, posY, offsetX, offsetY, radius, p){
    // general function which calculates the distance from the center of a circle to the point given
    // returns the fraction of that distance 
    let relativeX = mouseX  - posX -offsetX
    let relativeY = mouseY - posY- offsetY
    let currentDistance = p.sqrt(p.sq(relativeX) + p.sq(relativeY))
    let distancePercantage = currentDistance* 2/radius
    return distancePercantage
  }


  function wS(offsetX, offsetY){
    let size = [window.innerWidth + offsetX, window.innerHeight +offsetY]
    return size;
  }
