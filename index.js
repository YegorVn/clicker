canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

(() => {
  const ship = document.getElementById("ship");
  const shipImg = document.getElementById("ship__image");
  const plusBuff = document.getElementById("plus-buff");
  const canvas = document.getElementById("canvas");
  const vechicleListButton = document.getElementById("vechicle-list-button");
  const vechicleList = document.getElementById("vechicle-list");
  const ctx = canvas.getContext("2d");

  const init = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };

  init();

  // application functions

  const draw = (PosX, PosY, position, radius, type) => {
    var background = new Image();
    background.src =
      "https://kartinkin.net/uploads/posts/2021-07/1626254342_9-kartinkin-com-p-tekstura-neptuna-krasivo-13.png";
    if (type === "planet") {
      background.onload = (function () {
        ctx.shadowColor = "blue";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 15;
        ctx.shadowOffsetY = -position * 0.01;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
      
        ctx.arc(PosX, position + PosY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          background,
          PosX / 2,
          position + PosY - radius,
          innerWidth,
          innerHeight
        );
        ctx.restore();
      })();
    } else {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(PosX, position + PosY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  };

  const drawBuff = (radius) =>{
      // ctx.globalCompositeOperation='destination-over';  
      // ctx.fillStyle = "white";
      ctx.strokeStyle = "#272538";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(innerWidth / 2, innerHeight / 2 + 20, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "#8777ff";
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(innerWidth / 2, innerHeight / 2 + 20, radius - 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
  }

  const drawEarth = (position) =>{
    // ctx.globalCompositeOperation='destination-over';
    // ctx.fillStyle = "white";
    var background = new Image();
    background.src =
      "https://kartinkin.net/uploads/posts/2021-07/1626254342_9-kartinkin-com-p-tekstura-neptuna-krasivo-13.png";
    background.onload = (function () {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        innerWidth / 2,
        innerHeight * 1.4 + position,
        innerWidth / 2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip();
      ctx.stroke()
      ctx.drawImage(
        background,
        0 / 2,
        0 * 1.4 + position,
        1500,
        1000
      );
      ctx.restore();
    })();
  }

  const checkAproximateEquality = (a, b, numComparer) => {
    if (Math.abs(a - b) < numComparer) return true;
    else return false;
  };

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const popArrs = (arrs) => {
    arrs.map((arr) => arr.pop());
  };

  const getScoreDigits = (score, counterSize) => {
    let scoreArr = score.toString().split("");
    return Array.from(
      { length: counterSize - scoreArr.length },
      (_, i) => (i = 0)
    )
      .concat(scoreArr)
      .map((el, index) =>
        (index + 1) % 3 === 0
          ? (el = el + ", ")
          : el
      )
      .join("");
  };

  // handlers
  class animationHandler {
    static frame = innerHeight
    static callNextFrame() {
      this.frame += 5 + counterHandler.clickCounterTerm;
    }

    static updateFrame(){
      if (this.frame > innerHeight / 2) {
        this.frame = 0;
        bgAnimationHandler.setValues();
      }
    }
  }
  class bgAnimationHandler {
    static frame = innerHeight;
    static planetPosX = [[100], [200], [300], [400]];
    static planetPosY = [
      [-innerHeight / 2],
      [0],
      [innerHeight / 2],
      [innerHeight],
    ];
    static planetRadius = [[5], [5], [5], [5]];
    static numberOfStars = [1, 1, 1, 1];
    static numberOfPlanets = [1, 1, 1, 1];
    static starPosX = [[100], [200], [300], [400]];
    static starPosY = [
      [-innerHeight / 2],
      [0],
      [innerHeight / 2],
      [innerHeight],
    ];
    static starRadius = [[5], [5], [5], [5]];
    static iter = 0;

    static setValues() {
      const numberOfStars = getRandom(10, 30);
      const numberOfPlanets = getRandom(3, 5);
      const initializeValues = (min, max, quantity) => {
        let posArr = [];
        for (let i = 0; i < quantity; i++) {
          posArr.push(getRandom(min, max));
        }
        return posArr;
      };

      popArrs([
        this.starPosX,
        this.starPosY,
        this.starRadius,
        this.numberOfStars,
        this.planetPosX,
        this.planetPosY,
        this.planetRadius,
      ]);

      this.planetPosX.unshift(
        initializeValues(1, 10, numberOfPlanets).map(
          (el) => (innerWidth * el) / 10
        )
      );
      this.planetPosY.unshift(
        initializeValues(-innerHeight / 2, 0, numberOfPlanets)
      );
      this.planetRadius.unshift(
        initializeValues(30, innerWidth * 0.1, numberOfPlanets)
      );

      this.starPosX.unshift(initializeValues(1, innerWidth, numberOfStars));
      this.starPosY.unshift(
        initializeValues(-innerHeight / 2, 0, numberOfStars)
      );
      this.starRadius.unshift(initializeValues(1, 5, numberOfStars));
      this.numberOfStars.unshift(numberOfStars);

      this.starPosY[1] = this.starPosY[1].map((el) => {
        return (el += innerHeight / 2);
      });
      this.starPosY[2] = this.starPosY[2].map((el) => {
        return (el += innerHeight / 2);
      });
      this.planetPosY[1] = this.planetPosY[1].map((el) => {
        return (el += innerHeight / 2);
      });
      this.planetPosY[2] = this.planetPosY[2].map((el) => {
        return (el += innerHeight / 2);
      });
    }

    static drawBg(){
      for (let p = 0; p < 3; p++) {
        for (let k = 0; k < this.numberOfStars[p]; k++) {
          draw(
            this.starPosX[p][k],
            this.starPosY[p][k],
            animationHandler.frame,
            this.starRadius[p][k],
            "star"
          );
        }
        for (let i = 0; i < this.numberOfPlanets[p]; i++) {
          draw(
            this.planetPosX[p][i],
            this.planetPosY[p][i],
            animationHandler.frame,
            this.planetRadius[p][i],
            "planet"
          );
        }
      }
    }

    static drawEarth(){
      if(!gameHandler.isDrawnEarth) {
        drawEarth(animationHandler.frame)
        if(animationHandler.frame > 400){
          gameHandler.isDrawnEarth = true
        }
      }
    }

    static drawBuff(){
      if(gameHandler.isSpeedBoosted){
        drawBuff(gameHandler.buffRadius)
      }
      if(gameHandler.isSpeedBoosted){
        if(!gameHandler.buffChangeRadius) {
          gameHandler.buffRadius += 1
        }
        else if(gameHandler.buffChangeRadius) {
          gameHandler.buffRadius -= 1
        }
    
        if(gameHandler.buffRadius === 250 || gameHandler.buffRadius === 150){
          gameHandler.buffChangeRadius = !gameHandler.buffChangeRadius
        }
      }
    }
  }

  class vechicle {
    background = ''
    characteristics = {}
    dataTitle = ""
    constructor(props){
      this.background = props.background ? props.background : ''
      this.characteristics = props.characteristics ? props.characteristics : ''
      this.dataTitle = props.dataTitle ? props.dataTitle : ''
    }
  }

  class gameHandler {
    static plusBuff = false;
    static multiplyBuff = false;
    static isPlusBufferSpent = true;
    static isSpeedBoosted = false;
    static isDrawnEarth = false;
    static buffRadius = 150;
    static buffChangeRadius = false;

    static equipedVechicle = {
      background: "",
      characteristics: { clickCounterTerm: 1 },
      dataTitle: "",
    };
    static activeVechicleIndex = 1;

    static vechicles = [
      {
        background: "url(https://808.media/wp-content/uploads/2020/05/regnum_.jpg)",
        characteristics: { clickCounterTerm: 1 },
        dataTitle: "",
      },
      {
        background: "url(https://i.mycdn.me/videoPreview?id=204003018011&type=47&idx=30&tkn=8kHEtHGrkkM6lducnspyu4XhKKs&i=1&fn=external_8)",
        characteristics: { clickCounterTerm: 1 },
        dataTitle: "",
      },
      {
        background: "url(https://www.buran.ru/images/gif/lok1.gif)",
        characteristics: { clickCounterTerm: 1 },
        dataTitle: "",
      },
    ];

    static appendVechicles(){
      this.vechicles.map((el, index) => {
        document
          .getElementById("vechicle__" + index).style.backgroundImage = el.background
      })
    }

    static addEListener() {
      for (let i = 0; i < 5; i++) {
        document
          .getElementById("vechicle__" + i)
          .addEventListener("click", () => this.equipNewVechicle(i));
      }
    }

    static equipNewVechicle(index) {
      this.equipedVechicle = this.vechicles[index] ? new vechicle(this.vechicles[index]) : "";
      document
        .getElementById("vechicle__" + this.activeVechicleIndex)
        .classList.remove("vechicle-list__vechicle-active");
      document
        .getElementById("vechicle__" + this.activeVechicleIndex)
        .classList.add("vechicle-list__vechicle-inactive");
      document
        .getElementById("vechicle__" + index)
        .classList.remove("vechicle-list__vechicle-inactive");
      document
        .getElementById("vechicle__" + index)
        .classList.add("vechicle-list__vechicle-active");
      this.activeVechicleIndex = index;
      console.log(this.equipedVechicle)
    }
  }

  gameHandler.appendVechicles()
  gameHandler.addEListener()

  class counterHandler{
    static integerCounter = 0
    static clickCounter = 0
    static clickCounterTerm = 1
    static startTime = new Date()

    static updateCounter () {
      if(this.integerCounter % 100 === 0) this.clickCounter +=1
      if(this.integerCounter === 100000000) this.integerCounter = 0
      this.integerCounter += 5
    }

    static fillCells(cellsLength, whatToFill, cellsName){
      let numberCount
      for(let i = 0; i < cellsLength; i++){
        if((cellsLength - i * 3) / 2 === (cellsLength - (cellsLength - i * 3)) / 3 - 1){
          numberCount = (cellsLength - (cellsLength - i * 3))
        } 
      }
      Array.from({ length: cellsLength }, (_, i) => (i += 1)).map((el, index) => {
        document.getElementById(cellsName + "__" + el).innerHTML =
          getScoreDigits(whatToFill, numberCount)[index];
      });
    }

    static fillScore(){
      this.fillCells(13, this.clickCounter, 'score')
    }
    static fillSmallScore(){
      this.fillCells(13, this.integerCounter, 'score-small')
    }
    static fillDistance(){
      this.fillCells(
        23,
        this.clickCounter *
          Math.ceil(Math.abs(this.startTime.getTime() - new Date().getTime()) / 1000)
        ,
        'distance'
      );
    }
  }

  class shipAnimationHandler {
    static isShipAnimated = false;
    static isShipGoing = false;
    static startTimeOfStop = new Date();
    static timeOfStop = 0;

    static changeShipMovement = () => {
      let arr = [
        "ship-smallest_speed",
        "ship-small_speed",
        "ship-mid_speed",
        "ship-high_speed",
        "ship-highest_speed",
      ];
  
      if(this.isShipGoing){
        arr = arr.reverse()
      }
  
      this.isShipGoing = this.isShipGoing ? false : true;
      this.isShipAnimated = true;
      arr.map((el, index) => {
        setTimeout(() => {
          if (index !== 0) {
            shipImg.classList.remove(arr[index - 1]);
            shipImg.classList.add(el);
          } else {
            shipImg.classList.add(el);
          }
          if (index === 4) {
            this.isShipAnimated = false;
          }
        }, index * 1000);
      });
    };

    static checkIfShipShouldStop(){
      if (this.timeOfStop === 10 && this.isShipGoing) {
        this.changeShipMovement();
      } else if (
        Math.floor(
          Math.abs(
            this.startTimeOfStop.getTime() - new Date().getTime()
          ) / 1000
        ) === 1
      ) {
        this.startTimeOfStop = new Date();
        this.timeOfStop += 1;
      }
    }
  }

  plusBuff.addEventListener("click", () => {
    plusBuff.classList.remove("active-plus-buff");
    plusBuff.classList.add("inactive-plus-buff");
    if (!gameHandler.isPlusBufferSpent) {
      gameHandler.isSpeedBoosted = true;
      const oldCCTValue = counterHandler.clickCounterTerm;
      counterHandler.clickCounterTerm += 30;
      console.log(counterHandler.clickCounter);
      const timer = setTimeout(() => {
        counterHandler.clickCounterTerm = oldCCTValue;
        gameHandler.isSpeedBoosted = false;
      }, 5000);
      gameHandler.isPlusBufferSpent = true;
      return () => clearTimeout(timer);
    }
  });

  ship.addEventListener("click", function shipClick() {
    if (ship.classList.contains("ship-clicked")) {
      ship.classList.remove("ship-clicked");
      ship.classList.add("ship-notclicked");
    } else if (ship.classList.contains("ship-notclicked")) {
      ship.classList.remove("ship-notclicked");
      ship.classList.add("ship-clicked");
    }
    if(!shipAnimationHandler.isShipGoing){
      shipAnimationHandler.changeShipMovement();
    }
    shipAnimationHandler.timeOfStop = 0;
    counterHandler.clickCounter += counterHandler.clickCounterTerm;
    if (counterHandler.clickCounter % 1 === 0 && !gameHandler.isSpeedBoosted) {
      plusBuff.classList.remove("inactive-plus-buff");
      plusBuff.classList.add("active-plus-buff");
      gameHandler.isPlusBufferSpent = false;
    }
  });

  vechicleListButton.addEventListener("click", () => {
    if (vechicleListButton.classList.contains("active-vechicle-list-button")) {
      vechicleListButton.classList.remove("active-vechicle-list-button");
      vechicleListButton.classList.add("inactive-vechicle-list-button");

      vechicleList.classList.remove("active-vechicle-list");
      vechicleList.classList.add("inactive-vechicle-list");
    } else if (vechicleListButton.classList.contains("inactive-vechicle-list-button")) {
      vechicleListButton.classList.remove("inactive-vechicle-list-button");
      vechicleListButton.classList.add("active-vechicle-list-button");

      vechicleList.classList.remove("inactive-vechicle-list");
      vechicleList.classList.add("active-vechicle-list");
    }
  })

  const update = () => {
    counterHandler.updateCounter()
    counterHandler.fillScore()
    counterHandler.fillSmallScore()
    counterHandler.fillDistance()
    shipAnimationHandler.checkIfShipShouldStop()
    animationHandler.updateFrame()
    bgAnimationHandler.drawBg()
    bgAnimationHandler.drawEarth()
    bgAnimationHandler.drawBuff()
    animationHandler.callNextFrame();
  };

  function loop() {
    canvas.width |= 0;
    // update();
    requestAnimationFrame(loop);
  }

  loop();

  window.addEventListener("resize", init);
})();
