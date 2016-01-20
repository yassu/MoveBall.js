enchant();

window.onload = function(){
  var CORE_SIZE = [320, 320];
  var core = new Core(CORE_SIZE[0], CORE_SIZE[1]);
  var MAX_MOVE = 10;
  var IMAGE_SIZE = [20, 20];
  // var MOVE_DISTANCE_BY_ARROW_KEY = 1000;
  core.preload('balls.png');
  core.fps = 15;

  core.onload = function(){
    var ball = new Sprite(IMAGE_SIZE[0], IMAGE_SIZE[1]);
    ball.image = core.assets['balls.png'];
    ball.x = CORE_SIZE[0] / 2;
    ball.y = CORE_SIZE[1] / 2;
    core.rootScene.addChild(ball);

    ball.move_r = Math.random() * MAX_MOVE;
    ball.theta = Math.PI * Math.random();
    ball.move_x = ball.move_r * Math.cos(ball.theta);
    ball.move_y = ball.move_r * Math.sin(ball.theta);
    hit_cnt = 0;

    ball.addEventListener('enterframe', function(){
      this.x += this.move_x;
      this.y += this.move_y;
      if((this.x > CORE_SIZE[0] - IMAGE_SIZE[0] && this.move_x > 0) ||
         (this.x < 0 && this.move_x < 0)) {
        this.move_x *= -1;
        hit_cnt += 1;
        this.frame = (this.frame + 1) % 3;
      } else if ((this.y > CORE_SIZE[1] - IMAGE_SIZE[1] && this.move_y > 0) ||
        (this.y < 0 && this.move_y < 0)) {
        this.move_y *= -1;
        hit_cnt += 1;
        this.frame = (this.frame + 1) % 3;

        // 何故か動かない
        // if (core.input.left) {
        //   this.x -= MOVE_DISTANCE_BY_ARROW_KEY;
        // } else if(core.input.right){
        //   this.x += MOVE_DISTANCE_BY_ARROW_KEY;
        // } else if(core.input.up){
        //   this.y -= MOVE_DISTANCE_BY_ARROW_KEY;
        // } else if(core.input.down){
        //   this.y += MOVE_DISTANCE_BY_ARROW_KEY;
        // }
      }
    });

    ball.addEventListener('touchstart', function() {
      core.rootScene.removeChild(this);
    });

    core.rootScene.on('touchstart', function(e) {
      ball.x = e.x;
      ball.y = e.y;
    });
  }
  core.start();
};
