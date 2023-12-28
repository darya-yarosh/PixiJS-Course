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

        this._gunLeft = createSprite(
            "HeavyGunB",
            { x: 140, y: -27 }
        );
        this._gunRight = createSprite(
            "HeavyGunB",
            { x: 160, y: 29 }
        );
        this._gunConnectorLeft = createSprite(
            "GunConnectorD",
            { x: 80, y: 0 }
        );
        this._gunConnectorRight = createSprite(
            "GunConnectorD",
            { x: 80, y: 0 }
        );
        this._tower = createSprite(
            "HeavyTowerB",
        );
        this._towerContainer.addChild(
            this._gunLeft,
            this._gunRight,
            this._gunConnectorLeft,
            this._gunConnectorRight,
            this._tower
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

    changeTracks(tracksType) {
        const tracksNames = tracksType === "A"
            ? ["TrackAFrame1", "TrackAFrame2"]
            : tracksType === "B"
                ? ["TrackBFrame1", "TrackBFrame2"]
                : tracksType === "C"
                    ? ["TrackCFrame1", "TrackCFrame2"]
                    : ["TrackBFrame1", "TrackBFrame2"]

        this._bodyContainer.removeChild(this._tracksLeft, this._tracksRight)
        this._tracksLeft = createAnimatedSprite(
            tracksNames,
            { x: 0, y: -80 },
        );
        this._tracksRight = createAnimatedSprite(
            tracksNames,
            { x: 0, y: 80 },
        );
        this._tracksLeft.animationSpeed = 0.3;
        this._tracksRight.animationSpeed = 0.3;

        this._bodyContainer.addChild(this._tracksLeft, this._tracksRight);
        this._bodyContainer.swapChildren(this._tracksRight, this._hull)
    }

    changeTower(towerType) {
        let towerName = "HeavyTowerB";
        let gunName = "HeavyGunB";
        let gunLeftPosition = { x: 140, y: -27 };
        let gunRightPosition = { x: 162, y: 29 };
        let gunConnectorName = "GunConnectorD";
        let gunConnectorLeftPosition = { x: 80, y: 0 };
        let gunConnectorRightPosition = { x: 80, y: 0 };

        switch (towerType) {
            case "Small": {
                towerName = "SmallTowerA";
                gunName = "SmallGunA";
                gunLeftPosition = { x: 80, y: -25 };
                gunRightPosition = { x: 80, y: 12 };
                gunConnectorName = "GunConnectorA";
                gunConnectorLeftPosition = { x: 30, y: -25 };
                gunConnectorRightPosition = { x: 30, y: 12 };
                break;
            }
            case "Medium": {
                towerName = "MediumTowerA";
                gunName = "MediumGunA";
                gunLeftPosition = { x: 120, y: -27 };
                gunRightPosition = { x: 130, y: 35 };
                gunConnectorName = "GunConnectorB";
                gunConnectorLeftPosition = { x: 60, y: -27 };
                gunConnectorRightPosition = { x: 70, y: 35 };
                break;
            }
            case "Heavy": {
                towerName = "HeavyTowerB";
                gunName = "HeavyGunB";
                gunLeftPosition = { x: 140, y: -27 };
                gunRightPosition = { x: 162, y: 29 };
                gunConnectorName = "GunConnectorD";
                gunConnectorLeftPosition = { x: 80, y: 0 };
                gunConnectorRightPosition = { x: 80, y: 0 };
                break;
            }
            default: {
                break;
            }
        }

        this._towerContainer.removeChildren();

        this._tower = createSprite(
            towerName,
        );
        this._gunLeft = createSprite(
            gunName,
            gunLeftPosition
        );
        this._gunRight = createSprite(
            gunName,
            gunRightPosition
        );
        this._gunConnectorLeft = createSprite(
            gunConnectorName,
            gunConnectorLeftPosition
        );
        this._gunConnectorRight = createSprite(
            gunConnectorName,
            gunConnectorRightPosition
        );
        this._tower = createSprite(
            towerName,
        );

        this._towerContainer.addChild(
            this._gunLeft,
            this._gunRight,
            this._gunConnectorLeft,
            this._gunConnectorRight,
            this._tower
        );
    }

    changeHull(hullType) {
        let hullName = "HeavyHullB";
        let gunLeftPosition = { x: 140, y: -27 };
        let gunRightPosition = { x: 162, y: 29 };

        switch (hullType) {
            case "Small": {
                hullName = "SmallHullA";
                gunLeftPosition = { x: 80, y: -25 };
                gunRightPosition = { x: 80, y: 12 };
                break;
            }
            case "Medium": {
                hullName = "MediumHullA";
                gunLeftPosition = { x: 80, y: -25 };
                gunRightPosition = { x: 80, y: 12 };
                break;
            }
            case "Heavy": {
                hullName = "HeavyHullB";
                gunLeftPosition = { x: 80, y: -25 };
                gunRightPosition = { x: 80, y: 12 };
                break;
            }
            default: {
                break;
            }
        }

        this._bodyContainer.removeChildren();

        this._hull = createSprite(hullName);

        this._bodyContainer.addChild(
            this._tracksLeft,
            this._tracksRight,
            this._hull
        );
    }
}