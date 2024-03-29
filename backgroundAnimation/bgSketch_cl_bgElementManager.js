class BgElementManager {
    constructor(sketchContext, 
        el_mt_config, ma_mt_config) {
            
        this.p = sketchContext

        this.coursorRadius = ma_mt_config.get("radius")
        this.elementSize = ma_mt_config.get("size")
        this.navbarOffset = ma_mt_config.get("navbaroffset")
        this.displacedArray = ma_mt_config.get("displace")
        this.flip = ma_mt_config.get("flip")
        this.el_mt_config = el_mt_config

        this.bgElementArray = []
        this.mouseX = 0;
        this.mouseY = 0;
        this.prevMouseCoordX = 0;
        this.prevMouseCoordY = 0;
    }

    mousePosUpdate(mouseX, mouseY, interactionStatus){

      if (interactionStatus != "moving"){
          this.interactionStatus = interactionStatus
      }

      if(mouseX != NaN && mouseY != NaN){
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        for (let i = 0; i < this.bgElementArray.length; i++) {
          this.bgElementArray[i].updateMousePos(mouseX, mouseY)
        }
        this.updateBgElementsArr(mouseX, mouseY)
      }
    }

    updateBG(){
        for (let i = 0; i < this.bgElementArray.length; i++) {
            this.eliminationCheck(this.bgElementArray[i], i)
        }

        for (let i = 0; i < this.bgElementArray.length; i++) {
            this.bgElementArray[i].drawElement(this.bgElementArray.length, this.sizeCount)
        }
    }

    updateBgElementsArr(mouseX, mouseY){
      // fills up the array with the instances of the background objects
      this.sizeCount = (this.coursorRadius*2)/this.elementSize 

      // calculating the current element position of the mouse
      let widthElementCountMousePos = this.p.round(mouseX/this.elementSize )
      let heightElementCountMousePos =  this.p.round((mouseY - this.navbarOffset)/this.elementSize )
  
      // lets create outward from a circle
      // we know the coords of the mouse and on which element it is on
      // further the size count which serves as the radius 
      // calculating the current element position of the mouse
      let offsetX = 0;
      
      // get the cross range width and height in element size of the event circle
      let xStart = widthElementCountMousePos - this.sizeCount/2
      let xStop = widthElementCountMousePos + this.sizeCount/2

      let yStart = heightElementCountMousePos - this.sizeCount/2
      let yStop = heightElementCountMousePos + this.sizeCount/2
      
      let x = 0

      // console.log(`range is between 
      // ${xStart}, ${xStop}, MP ${widthElementCountMousePos} before ${this.prevMouseCoordX}
      // ${yStart}, ${yStop}, MP ${heightElementCountMousePos} before ${this.prevMouseCoordY}
      // sizeCount is ${this.sizeCount}`)
      
      // gets checked for each element
      let flipElement = false

      // creates the elements and lines them into an array to display
      // 
      if(this.prevMouseCoordX != widthElementCountMousePos || this.prevMouseCoordY != heightElementCountMousePos){
        while (x + xStart < xStop ){
          let y = 0
          while(y + yStart < yStop){ 


            if(this.displacedArray && (y + yStart)%2){
              offsetX = this.elementSize/2
            } else{
              offsetX = 0
            }

            // check if we want to flip the element
            if(this.flip){
              if((y + yStart)%2){
                if((x + xStart)%2){
                  flipElement = true
                } else { 
                  flipElement = false
                }
              }
              else {
                if((x + xStart)%2){
                  flipElement = false
                } else { 
                  flipElement = true
                }
              }
            }
  
            // calc position of current element
            let posX = (widthElementCountMousePos - this.sizeCount/2) * this.elementSize + x * this.elementSize
            let posY = (heightElementCountMousePos - this.sizeCount/2) * this.elementSize   + y * this.elementSize 
  
            let distanceElement = distanceFromCircleCenter(this.coursorRadius, this.coursorRadius, 
                                                          x* this.elementSize, y* this.elementSize,
                                                          0, 0, 
                                                          this.coursorRadius,
                                                          this.p)
            
            let tolerance = 1
            
            if (distanceElement <= tolerance 
              && this.doublicateCheck(posX, posY)
              ){
              this.createBgElement(posX, posY, distanceElement, offsetX, flipElement)
            }
            y++ 
          }
          x++
        }
      }

      // update prevs
      this.prevMouseCoordX = widthElementCountMousePos
      this.prevMouseCoordY = heightElementCountMousePos

    }
    
    createBgElement(posXelement, posYelement, distanceElement, offsetX, flipElement){
      let bgElement = new bgEl( this.el_mt_config,
                                posXelement, posYelement, 
                                offsetX, this.navbarOffset, 
                                this.coursorRadius, flipElement,
                                this.elementSize, this.p)
      this.bgElementArray.push(bgElement)
    }

    doublicateCheck(currentPosX, currentPosY){
      let notExists = true
      for (let i = 0; i < this.bgElementArray.length; i++) {
        if(this.bgElementArray[i].getPosX() == currentPosX 
        && this.bgElementArray[i].getPosY() == currentPosY){
          notExists = false
        }
      } 
      return notExists
    }

    eliminationCheck(bgElement, i){
      if(bgElement.getDeleteInstance() && this.interactionStatus != "holding"){
        this.bgElementArray.splice(i, 1)
      }
    }

    getBgElementArray(){
      return this.bgElementArray
    }

    deleteAllElements(){
        this.bgElementArray = []
    }
 
  }