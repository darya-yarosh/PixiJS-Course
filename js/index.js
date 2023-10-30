import { Application, Graphics, Rectangle } from "./pixi.mjs";
import { TweenManager } from './Tween.js';

import assetsMap from "./assetsMap.js";

import Tank from "./Tank.js";

// Create the application
const app = new Application({
   width: 800,
   height: 800,
   backgroundColor: 0xc2c2c2,
   view: document.getElementById("canvas"),
});

// Add the view to the DOM
//document.body.appendChild(app.view);

const runGame = () => {
   app.stage.position.set(800 / 2, 800 / 2);

   const marker = new Graphics();
   marker.beginFill(0xff0000, 1);
   //marker.drawRect(0,0,10,10);
   marker.drawCircle(0, 0, 5);
   marker.endFill();
   //window["RECTANGLE"] = marker;

   const tank = new Tank();
   //tank.view.visible = false;
   app.stage.addChild(tank.view);
   app.stage.addChild(marker);
   
   window["TANK"] = tank;

   // --- Ticker --- START ---
   // app.ticker.add(()=>{
   //    console.log("Ticker - описание его свойств")
   //    console.log("lastTime - время жизни с момента старта", app.ticker.lastTime);
   //    console.log("deltaTime = lastTime - lastTimePrev", app.ticker.deltaTime)
   //    console.log("deltaMS = (lastTime - lastTimePrev) / (1000 / 60 {1 секунда / 60 кадров в секунду (FPS)} )", app.ticker.deltaMS);
   // })

   // let value = 0;
   // const stepValue = 0.11;
   // const offset = 200;
   // app.ticker.add(()=>{
   //     value += stepValue;
   //     //rectangle.alpha = Math.cos(value);
   //     rectangle.position.x = offset * Math.cos(value);
   // })

   // --- Ticker --- END ---

//    const onPointerDown = ({ data }) => {
//       const positions = data.getLocalPosition(app.stage);
//       console.log(positions)
//       app.stage.addChild(
//           new Graphics()
//           .beginFill(colors.red, 1)
//           .drawCircle(positions.x, positions.y, 5)
//           .endFill()
//       );
//   };

   const tweenManager = new TweenManager(app.ticker);

   const moveTank = ({ data }) => {
      const distanceToCenter = data.getLocalPosition(app.stage);
      const distanceToTank = data.getLocalPosition(tank.view);
      const angle = Math.atan2(distanceToTank.y, distanceToTank.x)

      let callAmount = 1;
      const move = () => {
         callAmount--;
         if (callAmount <= 0) {
            tweenManager.createTween(
               tank,
               3000,
               {
                  x: distanceToCenter.x,
                  y: distanceToCenter.y
               },
               {
                  onStart: () => {
                     tank.startTracks()
                  },
                  onFinish: () => {
                     tank.stopTracks()
                  }
               });
            callAmount = 1;
         }
      }

      tweenManager.createTween(
         tank,
         1000,
         { towerDirection: angle },
         {
            onStart: () => { },
            onFinish: () => { }
         }
      );
      tweenManager.createTween(
         tank,
         2000,
         { bodyDirection: angle },
         {
            onStart: () => {
               tank.startTracks();
            },
            onFinish: () => {
               tank.stopTracks();
               move();
            }
         }
      );
   }

   app.stage.on("pointerdown", moveTank, undefined);
   // для отслеживания нажатий
   app.stage.interactive = true;
   // проводим проверку только в канвас, не нужно проверять все дочерние компоненты 
   app.stage.interactiveChildren = false;
   app.stage.hitArea = new Rectangle(-400, -400, 800, 800);

}

assetsMap.sprites.forEach(value => app.loader.add(value.name, value.url));
app.loader.load(runGame);