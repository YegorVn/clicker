
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

(() => {
    const ship = document.getElementById('ship')
    const shipImg = document.getElementById('ship__image')
    const score = document.getElementById('score')
    let clickCounter = 0
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');


    class planetAnimationHandler{
      static frame = 0
      static numberOfPlanets = 30
      static verticalOffset = 0
      static posX = []
      static posY = []
      static radius = []

      static setValues(numberOfPlanets){
        const initializeValues = (min, max, numberOfPlanets) => {
          let posArr = [];
          for (let i = 0; i < numberOfPlanets; i++) {
            posArr.push(getRandom(min, max));
          }
          return posArr;
        };

        this.posX = (initializeValues(1, 10, numberOfPlanets)).map(el => innerWidth * el / 10)
        this.posY = initializeValues(innerHeight * 0.3, innerHeight, numberOfPlanets)
        this.radius = initializeValues(30, innerWidth * 0.1, numberOfPlanets)
        this.verticalOffset = Math.max.apply(null, this.posY)
      }

      static callNextFrame(){
        this.frame += 1 + clickCounter * 0.001
      }
    }

    class shipAnimationHandler{
      static isShipGoing = false
    }

   
    const checkAproximateEquality = (a, b, numComparer) => {
      if(Math.abs(a - b) < numComparer) return true
      else return false
    }

    const getRandom = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min)
    }

    const init = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }

    init()

    ship.addEventListener("click", function shipClick() {
      if(ship.classList.contains('ship-clicked')){
        ship.classList.remove("ship-clicked");
        ship.classList.add("ship-notclicked");
      }
      else if(ship.classList.contains('ship-notclicked')){
        ship.classList.remove("ship-notclicked");
        ship.classList.add("ship-clicked");
      }

      if(!shipAnimationHandler.isShipGoing){
        let arr = [
          "ship-smallest_speed",
          "ship-small_speed",
          "ship-mid_speed",
          "ship-high_speed",
          "ship-highest_speed",
        ]
        
        arr.map((el, index) => {
          setTimeout(() => {
            if(index !== 0){
              shipImg.classList.remove(arr[index-1])
              shipImg.classList.add(el)
            }
            else{
              shipImg.classList.add(el)
            }
          }, index * 1000)
        })
        shipAnimationHandler.isShipGoing = true
      }
      
    
      
      clickCounter+=1
      const getScoreDigits = (score, counterSize) => {
        let scoreArr = score.toString().split("")
        return Array.from(
          { length: counterSize - scoreArr.length },
          (_, i) => (i = 0)
        )
          .concat(scoreArr)
          .map((el, index) =>
            (index + 1) % 3 === 0 && index !== 0 && index !== 8
              ? (el = el + ", ")
              : el
          )
          .join("");
      }
      score.innerHTML = `${getScoreDigits(clickCounter, 9)} m/s`
    });


    

    const draw = (posX, posY, position, radius, verticalOffset) => {
        ctx.shadowColor = "blue"
        ctx.shadowBlur = 30
        ctx.shadowOffsetX = 15
        ctx.shadowOffsetY = -position * 0.01
        ctx.fillStyle = 'blue'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(posX, position + posY - verticalOffset, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }

    const update = () => {
      if(checkAproximateEquality(planetAnimationHandler.frame, innerHeight + planetAnimationHandler.verticalOffset, 1 + clickCounter * 0.001)){
        planetAnimationHandler.frame = 0
        console.log('next')
      }

      if(planetAnimationHandler.frame === 0){
        planetAnimationHandler.setValues(planetAnimationHandler.numberOfPlanets)
      }

      for(let i = 0; i < planetAnimationHandler.numberOfPlanets; i++){
        draw(
          planetAnimationHandler.posX[i],
          planetAnimationHandler.posY[i],
          planetAnimationHandler.frame,
          planetAnimationHandler.radius[i],
          planetAnimationHandler.verticalOffset
        );
      }

      planetAnimationHandler.callNextFrame()
    }

    function loop(){
      canvas.width |= 0
      update()
      requestAnimationFrame(loop)
    }

    loop()

    
    window.addEventListener("resize", init)
})()



