enchant();

window.onload = function(){
  var CORE_SIZE = [320, 320];
  var core = new Core(CORE_SIZE[0], CORE_SIZE[1]);
  var MAX_MOVE = 10;
  var IMAGE_SIZE = [20, 20];
  core.preload('ball.png');

  core.onload = function(){
    var ball = new Sprite(IMAGE_SIZE[0], IMAGE_SIZE[1]);
    ball.image = core.assets['ball.png'];
    ball.x = CORE_SIZE[0] / 2;
    ball.y = CORE_SIZE[1] / 2;
    core.rootScene.addChild(ball);

    ball.move_r = Math.random() * MAX_MOVE;
    ball.theta = Math.PI * Math.random();
    ball.move_x = ball.move_r * Math.cos(ball.theta);
    ball.move_y = ball.move_r * Math.sin(ball.theta);
    ball.addEventListener('enterframe', function(){
      this.x += this.move_x;
      this.y += this.move_y;
      if((this.x > CORE_SIZE[0] - IMAGE_SIZE[0] && this.move_x > 0) ||
         (this.x < 0 && this.move_x < 0)) {
        this.move_x *= -1;
      } else if ((this.y > CORE_SIZE[1] - IMAGE_SIZE[1] && this.move_y > 0) ||
        (this.y < 0 && this.move_y < 0)) {
        this.move_y *= -1;
      }
      console.log(this.move_x);
    });
  }
  core.start();
};
