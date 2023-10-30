import { Container } from "./pixi.mjs";

import { createSprite } from "../js/helper.js";

export class Background {
    constructor(textureName, textureSize, screenSize) {
        this._view = new Container();

        this._background = new Container();
        const rowCount = screenSize.width / textureSize.width;
        const columnCount = screenSize.height / textureSize.height;

        for (let row = 0; row < rowCount; row++) {
            for (let column = 0; column < columnCount; column++) {
                const bgSprite = createSprite(
                    textureName,
                    {
                        x: textureSize.width * row,
                        y: textureSize.height * column
                    },
                    {
                        x: 0,
                        y: 0
                    }
                );
                bgSprite.width = textureSize.width;
                bgSprite.height = textureSize.height;

                this._background.addChild(bgSprite);
            }
        }
        this._view.addChild(this._background);
    }

    get view() {
        return this._view;
    }
}