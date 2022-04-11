
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

(() => {
    const ship = document.getElementById('ship')
    const shipImg = document.getElementById('ship__image')
    const score = document.getElementById('score')
    const plusBuff = document.getElementById("plus-buff")
    let clickCounter = 0
    let clickCounterTerm = 1
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');


    class bgAnimationHandler{
      static frame = innerHeight
      static numberOfPlanets = []
      static planetVerticalOffset = 0
      static planetPosX = [[]]
      static planetPosY = [[]]
      static planetRadius = [[5], [5], [5], [5]]
      static numberOfStars = [1, 1, 1, 1]
      static starVerticalOffset = 0
      static starPosX = [[100], [200], [300], [400]]
      static starPosY = [[-innerHeight / 2], [0], [innerHeight / 2], [innerHeight]]
      static starRadius = [[5], [5], [5], [5]]
      static iter = 0

      static setValues(numberOfPlanets, numberOfStars){
        const initializeValues = (min, max, quantity) => {
          let posArr = [];
          for (let i = 0; i < quantity; i++) {
            posArr.push(getRandom(min, max));
          }
          return posArr;
        };

        // this.planetPosX = (initializeValues(1, 10, numberOfPlanets)).map(el => innerWidth * el / 10)
        // this.planetPosY = initializeValues(innerHeight * 0.3, innerHeight, numberOfPlanets)
        // this.planetRadius = initializeValues(30, innerWidth * 0.1, numberOfPlanets)
        // this.planetVerticalOffset = Math.max.apply(null, this.planetPosY)
        this.starPosX.pop()
        this.starPosY.pop()
        this.starRadius.pop()
        this.numberOfStars.pop()
        // this.starVerticalOffset.pop()
        
        this.starPosX.unshift(initializeValues(1, innerWidth, numberOfStars))
        this.starPosY.unshift(
          initializeValues(
            -innerHeight / 2,
            0,
            numberOfStars
          )
        );
        // if(this.iter === 0){
        //   this.starPosY[2] = this.starPosY[2].map((el => {return(el+=innerHeight)}))
        //   this.starPosY[3] = this.starPosY[2].map((el => {return(el+=innerHeight)}))
        //   this.starPosY[3].map((el => {el += innerHeight}))
        //   this.iter += 1
        // }
        // else{
          this.starPosY[1] = this.starPosY[1].map((el => {return(el+=innerHeight / 2)}))
          this.starPosY[2] = this.starPosY[2].map((el => {return(el+=innerHeight / 2)}))
        // }
        // if (this.changePos)
        //   this.starPosY.unshift(
        //     initializeValues(
        //       -bgAnimationHandler.frame,
        //       innerHeight / 2,
        //       this.numberOfStars
        //     )
        //   );
        // else this.starPosY.unshift(
        //   initializeValues(
        //     0,
        //     innerHeight / 2,
        //     this.numberOfStars
        //   ),
        // );
        console.log(this.starPosY)
        this.starRadius.unshift(10)
        this.numberOfStars.unshift(numberOfStars)
        // this.starVerticalOffset.unshift(Math.max.apply(null, this.planetPosY))
        // this.starPosX = initializeValues(1, innerWidth, numberOfStars)
        // this.starPosY = initializeValues(innerHeight * 0.3, innerHeight, numberOfStars)
        // this.starRadius = initializeValues(1, 5, numberOfStars)
        // this.starVerticalOffset = Math.max.apply(null, this.planetPosY)
      }

      static callNextFrame(){
        this.frame += 5 + clickCounter * 0.001
      }
    }

    class shipAnimationHandler{
      static isShipGoing = false
      static isGoingCheck = false
    }

    class gameHandler{
      static plusBuff = false
      static multiplyBuff = false
      static isPlusBufferSpent = true
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

    plusBuff.addEventListener('click', () => {
      plusBuff.classList.remove("active-plus-buff")
      plusBuff.classList.add("inactive-plus-buff")
      if(!gameHandler.isPlusBufferSpent){
        clickCounterTerm += 1
        gameHandler.isPlusBufferSpent = true
      }
    })

    ship.addEventListener("click", function shipClick() {
      if(ship.classList.contains('ship-clicked')){
        ship.classList.remove("ship-clicked");
        ship.classList.add("ship-notclicked");
      }
      else if(ship.classList.contains('ship-notclicked')){
        ship.classList.remove("ship-notclicked");
        ship.classList.add("ship-clicked");
      }

      const changeShipMovement = (moving) => {
        let arr = [
          "ship-smallest_speed",
          "ship-small_speed",
          "ship-mid_speed",
          "ship-high_speed",
          "ship-highest_speed",
        ]
        
        if(!moving){
          arr = arr.reverse()
        }

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
      }

      if(!shipAnimationHandler.isShipGoing){
        changeShipMovement(true)
        shipAnimationHandler.isShipGoing = true
      }

      const lol = () => {
        setTimeout(() => {
          console.log('1')
          if(!shipAnimationHandler.isGoingCheck){
            shipAnimationHandler.isShipGoing = false
            shipAnimationHandler.isGoingCheck = true
          }
        }, 3000)
        
        const timer = setTimeout(() => {
          console.log('3')
          if(!shipAnimationHandler.isShipGoing){
            changeShipMovement(false)
          }
        }, 5000)

        setTimeout(() => {
          console.log('2')
          if(shipAnimationHandler.isShipGoing){
            clearTimeout(timer)
            shipAnimationHandler.isGoingCheck = false
          }
        }, 4000)
      }

      // lol()

      clickCounter+=clickCounterTerm
     
      if(clickCounter % 10 === 0 || clickCounter % 4 === 0){
        plusBuff.classList.remove("inactive-plus-buff")
        plusBuff.classList.add("active-plus-buff")
        gameHandler.isPlusBufferSpent = false
      }

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
      Array.from({length: 13}, (_, i) => (i+=1)).map((el, index) => {
        document.getElementById("score__" + el).innerHTML = getScoreDigits(clickCounter, 9)[index]
      })
    });

    

    const draw = (PosX, PosY, position, radius, VerticalOffset, type) => {
        ctx.shadowColor = type === 'planet' ? 'blue' : 'transparent'
        ctx.shadowBlur = 30
        ctx.shadowOffsetX = 15
        ctx.shadowOffsetY = -position * 0.01
        ctx.fillStyle = type === 'planet' ? 'blue' : 'white'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(PosX, position + PosY - VerticalOffset, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }

    const update = () => {
      // if(checkAproximateEquality(bgAnimationHandler.frame, innerHeight + bgAnimationHandler.planetVerticalOffset, 1 + clickCounter * 0.001)){
      //   bgAnimationHandler.frame = 0
      //   console.log('next')
      // }

      // if(checkAproximateEquality(bgAnimationHandler.frame, innerHeight, 10 + clickCounter * 0.001)){
        // bgAnimationHandler.numberOfPlanets.pop()
        // bgAnimationHandler.numberOfStars.pop()
        // bgAnimationHandler.numberOfPlanets.unshift(getRandom(1, 4)) 
        // bgAnimationHandler.numberOfStars.unshift(getRandom(100, 200))
        // bgAnimationHandler.setValues(0, 30)
      // }

      if(bgAnimationHandler.frame > innerHeight / 2){
        bgAnimationHandler.frame = 0
        bgAnimationHandler.setValues(0, 30)
      }

      for(let p = 0; p < 3; p++){
        for(let k = 0; k < bgAnimationHandler.numberOfStars[p]; k++){
          // console.log(bgAnimationHandler.starPosY)
          // if(bgAnimationHandler.frame > innerHeight) console.log(bgAnimationHandler.starPosY)
          draw(
            bgAnimationHandler.starPosX[p][k],
            bgAnimationHandler.starPosY[p][k],
            bgAnimationHandler.frame,
            10,
            // bgAnimationHandler.starRadius[p][k],
            bgAnimationHandler.starVerticalOffset
          );
        }
      }

      // for(let i = 0; i < bgAnimationHandler.numberOfPlanets; i++){
      //   draw(
      //     bgAnimationHandler.planetPosX[i],
      //     bgAnimationHandler.planetPosY[i],
      //     bgAnimationHandler.frame,
      //     bgAnimationHandler.planetRadius[i],
      //     bgAnimationHandler.planetVerticalOffset,
      //     'planet'
      //   );
      // }

      

      bgAnimationHandler.callNextFrame()
    }

    function loop(){
      canvas.width |= 0
      update()
      requestAnimationFrame(loop)

   
    }

    loop()

    
    window.addEventListener("resize", init)
})()



