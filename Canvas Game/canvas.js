let c = document.createElement("canvas");
let ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);

var perm = [];
while (perm.length < 255) {
  while (perm.includes((val = Math.floor(Math.random() * 255))));
  perm.push(val);
}
var lerp = (a, b, t) => a + ((b - a) * (1 - Math.cos(t * Math.PI))) / 2;
var noise = (x) => {
  x = (x * 0.01) % 255;
  return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
};
var t = 0;
var player = new (function () {
  this.x = c.width / 2;
  this.y = 0;
  this.ySpeed = 0;
  this.rot = 0;
  this.rSpeed = 0;

  this.img = new Image();
  this.img.src = "motor.png";
  this.draw = function () {
    var p1 = c.height - noise(t + this.x) * 0.25;
    var p2 = c.height - noise(t + 5 + this.x) * 0.25;

    if (p1 - 15 > this.y) {
        var grounded = 0;
      this.ySpeed += 0.1;
    } else {
      this.ySpeed -= this.y - (p1 - 15);
      this.y = p1 - 15;
      grounded = 1;
    }

    var angle = Math.atan2(p2 - 15 - this.y, this.x + 5 - this.x);
    this.y += this.ySpeed;

    // this.rot -= this.rSpeed*0.1;
    if (grounded) {
      this.rot -= (this.rot - angle) * 0.5;
      this.rSpeed = this.rSpeed - (angle - this.rot) - 0.01;
    }
    
    if (grounded &&this.rot>0.3) {
      console.log("you lose");
     
    }
    // console.log((angle > 0 ? angle : (2*Math.PI + angle)) * 360 / (2*Math.PI))
    // console.log((this.rot - angle) * 0.5)
    // console.log(grounded)
    this.rot -= this.rSpeed * 0.1;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.drawImage(this.img, -15, -15, 35, 30);
    ctx.restore();
  };
})();
function loop() {
  t += 5;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, c.height);
  for (let i = 0; i < c.width; i++) {
    ctx.lineTo(i, c.height - noise(t + i) * 0.25);
  }
  ctx.lineTo(c.width, c.height);
  ctx.fill();
  player.draw();
  requestAnimationFrame(loop);
}




    loop();
