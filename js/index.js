import * as PIXI from "./pixi.mjs";

 // Create the application
 const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    width: 1000,
    height: 1000
 });

 // Add the view to the DOM
 document.body.appendChild(app.view);