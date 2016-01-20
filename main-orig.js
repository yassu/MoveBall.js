enchant();

window.onload = function(){
  var CORE_SIZE = [320, 320];
  var core = new Core(CORE_SIZE[0], CORE_SIZE[1]);
  var MAX_MOVE = 10;
  var BALL_SIZE = [20, 20];
  var MOVE_DISTANCE_BY_ARROW_KEY = 5;
  core.preload('balls.png', 'hall.png');
  core.fps = 15;

  core.onload = function(){
    var ball = new Sprite(BALL_SIZE[0], BALL_SIZE[1]);
    var enter_hall = false;
    ball.image = core.assets['balls.png'];
    ball.x = CORE_SIZE[0] / 2;
    ball.y = CORE_SIZE[1] / 2;

    ball.move_r = Math.random() * MAX_MOVE;
    ball.theta = Math.PI * Math.random();
    ball.move_x = ball.move_r * Math.cos(ball.theta);
    ball.move_y = ball.move_r * Math.sin(ball.theta);
    ball.hit_cnt = 0;

    ball.addEventListener('enterframe', function(){
      this.x += this.move_x;
      this.y += this.move_y;
      if((this.x > CORE_SIZE[0] - BALL_SIZE[0] && this.move_x > 0) ||
         (this.x < 0 && this.move_x < 0)) {
        this.move_x *= -1;
        ball.hit_cnt += 1;
        this.frame = (this.frame + 1) % 3;
      } else if ((this.y > CORE_SIZE[1] - BALL_SIZE[1] && this.move_y > 0) ||
        (this.y < 0 && this.move_y < 0)) {
        this.move_y *= -1;
        ball.hit_cnt += 1;
        this.frame = (this.frame + 1) % 3;
      }

      if (core.input.left) {
        this.x -= MOVE_DISTANCE_BY_ARROW_KEY;
      } else if(core.input.right){
        this.x += MOVE_DISTANCE_BY_ARROW_KEY;
      } else if(core.input.up){
        this.y -= MOVE_DISTANCE_BY_ARROW_KEY;
      } else if(core.input.down){
        this.y += MOVE_DISTANCE_BY_ARROW_KEY;
      }
    });

    ball.addEventListener('touchstart', function() {
      core.rootScene.removeChild(this);
    });

    core.rootScene.on('touchstart', function(e) {
      ball.x = e.x;
      ball.y = e.y;
    });

    var hall = new Sprite(BALL_SIZE[0], BALL_SIZE[1]);
    hall.image = core.assets['hall.png'];
    hall.x = 0;
    hall.y = 0;
    hall.addEventListener('enterframe', function() {
      // if (ball.intersect(this)) // 画像のザックリした当たり判定
      if (enter_hall || ball.within(hall, BALL_SIZE[0])) { // 画像の中心からの距離を指定する
        label.text = label.text + "\nBall atached hall."
        enter_hall = true;
      }
    });

    var label = new Label();
    label.x = 30;
    label.y = 5;
    label.color = 'blue';
    label.font = '12px "KhmerOSsys"';
    label.on('enterframe', function() {
      label.text = "hit count: " + ball.hit_cnt
    });

    core.rootScene.addChild(ball);
    core.rootScene.addChild(hall);
    core.rootScene.addChild(label);
  }
  core.start();
};
