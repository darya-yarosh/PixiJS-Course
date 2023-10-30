import { Container } from "./pixi.mjs";

import { createAnimatedSprite, createSprite } from "../js/helper.js";

export default class Tank {
    constructor() {
        this._view = new Container();

        this._bodyContainer = new Container();
        this._view.addChild(this._bodyContainer);

        this._tracksLeft = createAnimatedSprite(
            ["TrackCFrame1", "TrackCFrame2"],
            { x: 0, y: -80 },
        );
        this._tracksRight = createAnimatedSprite(
            ["TrackCFrame1", "TrackCFrame2"],
            { x: 0, y: 80 },
        );
        this._tracksLeft.animationSpeed = 0.3;
        this._tracksRight.animationSpeed = 0.3;

        this._hull = createSprite("HeavyHullB");

        this._bodyContainer.addChild(
            this._tracksLeft,
            this._tracksRight,
            this._hull
        );

        this._towerContainer = new Container();
        this._view.addChild(this._towerContainer);

        const gunLeft = createSprite(
            "HeavyGunB",
            { x: 140, y: -27 }
        );
        const gunRight = createSprite(
            "HeavyGunB",
            { x: 160, y: 29 }
        );

        const GunConnectorD = createSprite(
            "GunConnectorD",
            { x: 80, y: 0 }
        );

        const HeavyTowerB = createSprite(
            "HeavyTowerB",
        );

        this._towerContainer.addChild(
            gunLeft,
            gunRight,
            GunConnectorD,
            HeavyTowerB
        );
    }

    get view() {
        return this._view;
    }

    set towerDirection(angle) {
        this._towerContainer.rotation = angle;
    }
    get towerDirection() {
        return this._towerContainer.rotation;
    }

    set bodyDirection(angle) {
        this._bodyContainer.rotation = angle;
    }
    get bodyDirection() {
        return this._bodyContainer.rotation;
    }

    set x(value) {
        this._view.position.x = value;
    }
    get x() {
        return this._view.position.x;
    }

    set y(value) {
        this._view.position.y = value;
    }
    get y() {
        return this._view.position.y;
    }

    startTracks() {
        this._tracksLeft.play();
        this._tracksRight.play();
    }

    stopTracks() {
        this._tracksLeft.stop();
        this._tracksRight.stop();
    }
}