
class bgEl {
    constructor(el_mt_config, 
                posX, posY, 
                offsetX, offsetY , 
                radius, flipElement,
                size, p) {
      this.size = size;
      this.posX = posX;
      this.posY = posY;
      this.sizeMulti = 1
      this.growthParam = el_mt_config.get("growthparam")
      this.colour = el_mt_config.get("popoutcolour")
      this.transparency = el_mt_config.get("transparency")

      this.offsetY = offsetY
      this.offsetX = 0
      this.radiusMouse = radius
      this.prevDist = 1
      this.deleteInstance = false

      this.lastMousePosX;
      this.lastMousePosY;
      this.currentMousePosX
      this.currentMousePosY 
      this.prevDist = 1
      this.currentDistance;
      this.p = p
    
      // needs to be set last
      this.shape = this.setShape(el_mt_config.get("shapetype"), posX + offsetX, posY, flipElement)

    }

    setShape(type, posX, posY, flipElement){
      let toReturn
      switch(type) {
        case "circle":
          toReturn = new Circle(this.size, posX, posY, this.p)
        break;
        case "triangle":
          toReturn = new Triangle(this.size, posX, posY, flipElement, this.p)
        break;

        default:
          console.log("bgEl type not yet defined")
      }
      return toReturn
    }


    drawElement(){

        this.updateVars()
        this.p.noStroke();
        this.p.fill(this.colour[0], this.colour[1], this.colour[2], this.transparency * this.sizeMulti)

        this.shape.display(this.sizeMulti)
    }

    updateVars(){
      this.currentDistance = distanceFromCircleCenter(
                            this.currentMousePosX, this.currentMousePosY, 
                            this.posX, this.posY, 
                            this.offsetX, this.offsetY, 
                            this.radiusMouse, this.p)

        if(this.currentDistance < 1 ){
            // check if current element is within the circle
            this.sizeMulti = this.currentDistance
            } 
            else if(this.currentDistance >= 1 ){
            // if element is outside of the circle
            if(this.sizeMulti <= 1){
                this.sizeMulti = this.sizeMulti + this.growthParam
            }
            else if (this.sizeMulti > 1) {
                this.deleteInstance = true
            }
            }
        


      this.prevDist = this.currentDistance
      this.lastMousePosX = this.currentMousePosX;
      this.lastMousePosY = this.currentMousePosY;
    }

    updateMousePos(mouseX, mouseY){
      this.currentMousePosX = mouseX
      this.currentMousePosY = mouseY
    }
    updateInteractionStatus(interactionStatus){
        this.interactionStatus = interactionStatus
    }

    getDeleteInstance(){
      return this.deleteInstance
    }

    getPosX(){
      return this.posX
    }

    getPosY(){
      return this.posY
    }
    getOffsetY(){
      return this.offsetY
    }
    getOffsetX(){
      return this.offsetX
    }

    getSizeMulti(){
      return this.sizeMulti
    }



  }

  class Triangle{
    constructor(radius, posX, posY, flip, p){
      this.radius = radius/2
      this.posX = posX
      this.posY = posY
      this.flip = flip
      this.uP = []
      this.lP  =[]
      this.rP  =[]
      this.calcPoints(1)

      this.vectorUp = []
      this.vectorLp = []
      this.vectorRp = []

      this.p = p
    }

    display(size){
      // include the size to the element
      this.p.triangle(this.uP[0], this.uP[1], this.lP[0], this.lP[1], this.rP[0], this.rP[1])
      this.p.circle(this.posX, this.posY, 1)
    
    }

    calcPoints(size){
      // let sideLength = this.radius * 4 / p.sqrt(3)
      let xCorrection = this.radius * 2
      let yCorrection = this.radius

      if (this.flip){
        this.uP = [this.posX, this.posY - this.radius]
        this.lP  = [this.posX - xCorrection, this.posY + yCorrection] 
        this.rP  = [this.posX + xCorrection, this.posY + yCorrection] 
      } else {
        this.uP = [this.posX, this.posY + this.radius]
        this.lP  = [this.posX - xCorrection, this.posY - yCorrection] 
        this.rP  = [this.posX + xCorrection, this.posY - yCorrection] 
      }
    }

  }

  class TriangleSingle {
    constructor(radius, posX, posY, p){
      this.radius = radius/2
      this.posX = posX
      this.posY = posY

      let sideLength = p.sqrt(3) * this.radius
      this.uP = [this.posX, this.posY + this.radius]
      let yCorrection = p.sqrt(p.sq(this.radius) + p.sq(sideLength/2))
      this.lP  = [this.posX - sideLength/2, this.posY - yCorrection] 
      this.rP  = [this.posX + sideLength/2, this.posY - yCorrection] 

      this.p = p
    }

    display(size){

      this.p.triangle(this.uP[0], this.uP[1], this.lP[0], this.lP[1], this.rP[0], this.rP[1])

    }
  }
    
  class Circle {
    constructor(radius, posX, posY, p){
      this.radius = radius
      this.posX = posX
      this.posY = posY
      this.p = p
    }
    display(size){
      this.p.circle(this.posX, this.posY, this.radius * size)
    }
  }
