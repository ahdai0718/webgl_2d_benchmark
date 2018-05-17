const TEXTURE_COUNT = 100;
const SPRITE_COUNT = 2000;
const W_COUNT = 40;
const H_COUNT = 50;
const W_WIDTH = 640;
const H_HEIGHT = 1136;

const game = new Phaser.Game(W_WIDTH, H_HEIGHT, Phaser.WEBGL, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
});

let sprites = [];

function preload() {

    for (let i = 0; i < TEXTURE_COUNT; ++i) {
        game.load.image(`texture${i}`, `../assets/${i}.png`);
    }
}

function create() {

    for (let i = 0; i < SPRITE_COUNT; ++i) {
        let sprite = game.add.sprite(0, 0, `texture${[i % TEXTURE_COUNT]}`);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = sprite.height = 64;
        sprite.x = W_WIDTH / W_COUNT * (i % W_COUNT);
        sprite.y = H_HEIGHT / H_COUNT * (i / W_COUNT | 0);
        sprites.push(sprite);
    }
}

function update() {
    const rotateDelta = Math.PI / 360 * 3;

    for (let i = 0; i < SPRITE_COUNT; ++i) {
        sprites[i].rotation += rotateDelta;
    }
}

let fpsCon = document.createElement('div');
Object.assign(fpsCon.style, {
    position: 'fixed',
    background: '#000',
    color: '#fff',
    top: 0,
    left: 0
})
document.body.appendChild(fpsCon);
let arrFps = new Float64Array(10);
let lastTime = Date.now();
let pos = 0;

function updateFps() {
    let now = Date.now();
    let delta = now - lastTime;
    let fps = 1000 / delta;
    arrFps[pos++] = fps;
    if (pos >= arrFps.length) {
        pos = 0;
    }
    fpsCon.innerHTML = 'FPS: ' + (arrFps.reduce((prev, next) => prev + next) / arrFps.length | 0);
    lastTime = now;
    requestAnimationFrame(updateFps);
}
requestAnimationFrame(updateFps);