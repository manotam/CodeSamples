let bgSketch = function(p){

  let globalParent;
  let bgManager_coursorTracer;
  let BGMANAGERARRAY = []

  // background element settings
  const el_mt_config =new Map()
  el_mt_config.set("growthparam", 0.1)
  el_mt_config.set("popoutcolour", [187, 247, 208])
  // available shapes: triangle, circle
  el_mt_config.set("shapetype", "circle")
  el_mt_config.set("transparency", 255)

  // background manager settings
  const ma_mt_config = new Map()
  ma_mt_config.set("flip", true)      //flip every second element in same row?
  ma_mt_config.set("displace", true)  //displace every second row by 1/2?
  ma_mt_config.set("size", 6)         //size of element
  ma_mt_config.set("radius", 60)      //radius in which elements will be created


  p.setup = function(){
    // offset navbar (not applicable in this example)
    // globalNavbarDiv = p.select('#navbar');
    // let navbaroffset = globalNavbarDiv.size().height
    ma_mt_config.set("navbaroffset", 0)

    globalMainDivJS = document.getElementById("mainContainer");

    s = wS(0, 0)

    // sizing all the elements on the page
    globalParent = p.select('#backgroundSketch');
    globalParent.size(s[0], s[1])

    p.createCanvas(s[0], s[1]).parent('backgroundSketch');

    // create the manager which follows the mouse coursor
    // can create also other animations 
    bgManager_coursorTracer = new BgElementManager(
                                            p, 
                                            el_mt_config, ma_mt_config)
    BGMANAGERARRAY.push(bgManager_coursorTracer)

  };

  
    // ################################
  // ||                            
  // ||         loop functions            
  // ||                            
  // ################################

  p.draw = function(){
    p.clear();
    updateBgElementManagerDrawLoop()
    // console.log(bgManager_coursorTracer.getBgElementArray().length)
  }

  function updateBgElementManagerDrawLoop() {
    // general update of the element managers
    // includes redrawing and update of the of the mouse pos
    
    for (let i = 0; i < BGMANAGERARRAY.length; i++) {
      BGMANAGERARRAY[i].updateBG()
    }
  }



  // ################################
  // ||                            
  // ||         EventFunctions            
  // ||                            
  // ################################

  function updateMouseElementManagerEvent(mouseX, mouseY, interactionStatus){
    // update the mouse position
    for (let i = 0; i < BGMANAGERARRAY.length; i++) {
      BGMANAGERARRAY[i].mousePosUpdate(mouseX, mouseY, interactionStatus)
    }
  }

  function deleteAllElements(){
    for (let i = 0; i < BGMANAGERARRAY.length; i++) {
      BGMANAGERARRAY[i].deleteAllElements()
    }
  }


  p.windowResized = function(){
    s = wS(0, 0)
    p.resizeCanvas(s[0], s[1]);
    globalParent.size(s[0], s[1])
    
    bgManager_coursorTracer.updateBG()
  }

  document.addEventListener("mousemove", (e) => {
    updateMouseElementManagerEvent(e.clientX, e.clientY, "moving")
  })
  document.addEventListener("touchmove", (e) => {
    updateMouseElementManagerEvent(e.touches[0].clientX, e.touches[0].clientY, "moving")
  })

  document.addEventListener("mousedown", (e) => {
    updateMouseElementManagerEvent(e.clientX, e.clientY, "holding")
  })
 
  // document.addEventListener("touchstart", (e) => {
  //   console.log("touchstart")
  //   updateMouseElementManagerEvent(e.clientX, e.clientY, "holding")
  // })

  document.addEventListener("mouseup", (e) => {
    updateMouseElementManagerEvent(e.clientX, e.clientY, "released")
  })

  document.addEventListener("touchend", (e) => {
    deleteAllElements()
  })
 
  document.addEventListener("wheel", (e) => {
  });
};


  // ################################
  // ||                            
  // ||         Init            
  // ||                            
  // ################################

new p5(bgSketch, 'backgroundSketch');
