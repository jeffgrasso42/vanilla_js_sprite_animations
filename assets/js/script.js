// DEPENDENCIES
let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', e => {
  playerState = e.target.value;
});
// canvas element
const canvas = document.getElementById('canvas1');
// shortcut for contex
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

// Built in Image class constructor, creates HTML image element
const playerImage = new Image();
// path from index.html
playerImage.src = './assets/sprites/shadow_dog.png';
// width of entire file / number of columns in the file = width of 1 frame
// 6876 / 12 = 573 (using 575 because last frame is slightly smaller)
const spriteWidth = 575;
// height of entire file / number of rows in file = 1 frame
// 5230 / 10 = 523
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 8;
const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];

animationStates.forEach((state, idx) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = idx * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // this formula ensures that position will only increment every 5 frames
  // (5/5 = 1) 1 % 6 = 1 (10/5 = 2) 2 % 6 = 2 etc
  //  (30/5 = 6) 6 % 6 = 0 starting resetting the loop
  // position variable will only cycle between 0 and the number after the modulo operator
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // drawImage can take 3, 5, or 9 arguments
  // 9 arguments gives you the most control:
  // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  // the img, the source location (sx, sy), source dimensions (sw, sh), destination location (dx, dy) and destination dimensions (dw, dh)
  ctx.drawImage(
    playerImage,
    // multiplying the frameX index variable by the spriteWidth moves through the frames of the png file horizontally
    frameX,
    // multiplying the frameY index variable by the spriteHeight moves through the frames of the png file vertically
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  // the frameX index will only increase every staggerFrames number of frames (currently 5)
  // this makes the animation loop 5 times slower
  // if (gameFrame % staggerFrames === 0) {
  //   if (frameX < 6) frameX++;
  //   else frameX = 0;
  // }

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
