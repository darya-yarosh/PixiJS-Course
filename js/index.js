import { Application, Graphics, Rectangle, Text, TextStyle } from "./pixi.mjs";
import { TweenManager } from './Tween.js';

import assetsMap from "./assetsMap.js";

import Tank from "./Tank.js";
import { Background } from "./Background.js";

const colors = {
   black: 0x000000,
   gray: 0xc2c2c2,
   red: 0xff0000,
}

const SCREEN_SIZE = {
   width: 800,
   height: 800,
}

// Create the application
const app = new Application({
   width: SCREEN_SIZE.width,
   height: SCREEN_SIZE.height,
   backgroundColor: colors.gray,
   view: document.getElementById("canvas"),
});

const runGame = () => {
   const background = new Background(
      '../assets/parts/map_tiles/A.png',
      {
         width: 100,
         height: 100
      },
      {
         width: SCREEN_SIZE.width,
         height: SCREEN_SIZE.height
      }
   );
   app.stage.addChild(background.view);

   let textStyle = new TextStyle({
      fontFamily: "Arial",
      fontSize: 32,
      fill: "white",
      dropShadow: true,
      dropShadowColor: "black",
   })

   const marker = new Graphics();
   marker.beginFill(colors.red, 1);
   marker.drawCircle(0, 0, 5);
   marker.endFill();

   const tank = new Tank();
   tank.x = 800 / 2;
   tank.y = 800 / 2;

   let instructionText = new Text(
      "Kyeboard: \nMouse button - move the tank.\nNum 1 - change tracks;\nNum 2 - change tower;\nNum 3 - change hull.", 
      textStyle
   );
   instructionText.x = 15;
   instructionText.y = 15;

   app.stage.addChild(tank.view);
   app.stage.addChild(marker);
   app.stage.addChild(instructionText);
   
   window["TANK"] = tank;

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
   app.stage.interactive = true;
   app.stage.interactiveChildren = false;
   app.stage.hitArea = new Rectangle(0, 0, 800, 800);

   const tracksTypes = ["A", "B", "C"];
   let trackTypeInd = 0;

   const towerTypes = ["Small", "Medium", "Heavy"];
   let towerTypeInd = 0;

   const hullTypes = ["Small", "Medium", "Heavy"];
   let hullTypeInd = 0;
   
   function handlerKeyDown(event) {
      switch (event.code) {
         case ("Digit1"): {
            trackTypeInd = trackTypeInd + 1 > 2 ? 0 : trackTypeInd + 1;
            tank.changeTracks(tracksTypes[trackTypeInd]);
            break;
         }
         case ("Digit2"): {
            towerTypeInd = towerTypeInd + 1 > 2 ? 0 : towerTypeInd + 1;
            tank.changeTower(towerTypes[towerTypeInd]);
            break;
         }
         case ("Digit3"): {
            hullTypeInd = hullTypeInd + 1 > 2 ? 0 : hullTypeInd + 1;
            tank.changeHull(hullTypes[hullTypeInd]);
            break;
         }
         default: {
            break;
         }
      }
   }

   addEventListener("keydown", handlerKeyDown);
}

// Loading assets
assetsMap.sprites.forEach(value => app.loader.add(value.name, value.url));
// Start app
app.loader.load(runGame);