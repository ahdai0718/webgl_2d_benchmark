const TEXTURE_COUNT = 100
const SPRITE_COUNT = 2000
const W_COUNT = 40
const H_COUNT = 50
const W_WIDTH = 640
const H_HEIGHT = 1136

const config = {
    type: Phaser.WEBGL,
    width: W_WIDTH,
    height: H_HEIGHT,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const game = new Phaser.Game(config)

let sprites = []

function preload() {
    for (let i = 0; i < TEXTURE_COUNT; ++i) {
        this.load.image(`texture${i}`, `../assets/${i}.png`)
    }
}

function create() {

    for (let i = 0; i < SPRITE_COUNT; ++i) {
        let sprite = this.add.sprite(0, 0, `texture${[i % TEXTURE_COUNT]}`)
        sprite.setDisplaySize(64, 64)
        sprite.x = W_WIDTH / W_COUNT * (i % W_COUNT)
        sprite.y = H_HEIGHT / H_COUNT * (i / W_COUNT | 0)
        sprites.push(sprite)
    }
}

function update() {
    const rotateDelta = Math.PI / 360 * 3

    for (let i = 0; i < SPRITE_COUNT; ++i) {
        sprites[i].rotation += rotateDelta
    }
}

let fpsCon = document.createElement('div')
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