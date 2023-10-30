import { AnimatedSprite, Texture, Sprite } from "./pixi.mjs";

export const createSprite = (
    textureName,
    position = { x: 0, y: 0 },
    anchor = { x: 0.5, y: 0.5 }
) => {
    const sprite = new Sprite(Texture.from(textureName));
    sprite.position.copyFrom(position);
    sprite.anchor.copyFrom(anchor);
    return sprite;
}

export const createAnimatedSprite = (
    textureNames,
    position = { x: 0, y: 0 },
    anchor = { x: 0.5, y: 0.5 }
) => {
    const textures = textureNames.map(name => Texture.from(name));

    const animatedSprite = new AnimatedSprite(textures);
    animatedSprite.position.copyFrom(position);
    animatedSprite.anchor.copyFrom(anchor);
    return animatedSprite;
}