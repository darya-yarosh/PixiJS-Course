import { Application, Graphics, Rectangle } from "./pixi.mjs";
import { TweenManager } from './Tween.js';

import assetsMap from "./assetsMap.js";

import Tank from "./Tank.js";

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
   app.stage.position.set(800 / 2, 800 / 2);

   const marker = new Graphics();
   marker.beginFill(colors.red, 1);
   marker.drawCircle(0, 0, 5);
   marker.endFill();

   const tank = new Tank();
   app.stage.addChild(tank.view);
   app.stage.addChild(marker);
   
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
   app.stage.hitArea = new Rectangle(-400, -400, 800, 800);

}

// Loading assets
assetsMap.sprites.forEach(value => app.loader.add(value.name, value.url));
// Start app
app.loader.load(runGame);