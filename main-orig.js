enchant();

window.onload = function  () {
  var CORE_SIZE = [320, 320];
  var core = new Core(CORE_SIZE[0], CORE_SIZE[1]);
  var MAX_MOVE = 10;
  var BALL_SIZE = [20, 20];
  var MOVE_DISTANCE_BY_ARROW_KEY = 5;
  var MAX_NUMBER_OF_BALLS = 10;
  var EXIST_TURTLE = (r = rand(5 - 1) === 0); // 1/5の確率でカメが出現
  var TURTLE_SIZE = [58, 57];
  if (EXIST_TURTLE) {
    EASINGS = [
      ["InSine", enchant.Easing.SINE_EASEIN],
      ["OutSine", enchant.Easing.SINE_EASEOUT],
      ["InOutSine", enchant.Easing.SINE_EASEINOUT],

      ["InQuad", enchant.Easing.QUAD_EASEIN],
      ["OutQuad", enchant.Easing.QUAD_EASEOUT],
      ["InOutQuad", enchant.Easing.QUAD_EASEINOUT],

      ["InCubic", enchant.Easing.CUBIC_EASEIN],
      ["OutCubic", enchant.Easing.CUBIC_EASEOUT],
      ["InOutCubic", enchant.Easing.CUBIC_EASEINOUT],

      ["InQuart", enchant.Easing.QUART_EASEIN],
      ["OutQuart", enchant.Easing.QUART_EASEOUT],
      ["InOutQuart", enchant.Easing.QUART_EASEINOUT],

      ["InQuint", enchant.Easing.QUINT_EASEIN],
      ["OutQuint", enchant.Easing.QUINT_EASEOUT],
      ["InOutQuint", enchant.Easing.QUINT_EASEINOUT],

      ["InExpo", enchant.Easing.EXPO_EASEIN],
      ["OutExpo", enchant.Easing.EXPO_EASEOUT],
      ["InOutExpo", enchant.Easing.EXPO_EASEINOUT],

      ["InCirc", enchant.Easing.CIRC_EASEIN],
      ["OutCirc", enchant.Easing.CIRC_EASEOUT],
      ["InOutCirc", enchant.Easing.CIRC_EASEINOUT],

      ["InBack", enchant.Easing.BACK_EASEIN],
      ["OutBack", enchant.Easing.BACK_EASEOUT],
      ["InOutBack", enchant.Easing.BACK_EASEINOUT],

      ["InElastic", enchant.Easing.ELASTIC_EASEIN],
      ["OutElastic", enchant.Easing.ELASTIC_EASEOUT],
      ["InOutElastic", enchant.Easing.ELASTIC_EASEINOUT],

      ["InBounce", enchant.Easing.BOUNCE_EASEIN],
      ["OutBounce", enchant.Easing.BOUNCE_EASEOUT],
      ["InOutBounce", enchant.Easing.BOUNCE_EASEINOUT]
      ];

    var TURTLE_EASING = EASINGS[rand(EASINGS.length - 1)];
  }
  core.preload('imgs/balls.png', 'imgs/hall.png', 'imgs/turtle.jpg');
  core.fps = 15;

  core.onload = function(){
    // make hall
    var hall = new Sprite(BALL_SIZE[0], BALL_SIZE[1]);
    hall.image = core.assets['imgs/hall.png'];
    hall.x = 0;
    hall.y = 0;

    // ball
    var Ball = Class.create(Sprite, {
        initialize: function(x, y) {
          Sprite.call(this, BALL_SIZE[0], BALL_SIZE[1]);
          this.x = x;
          this.y = y;
          this.image = core.assets['imgs/balls.png'];
          this.move_r = Math.random() * MAX_MOVE;
          this.theta = Math.PI * Math.random();
          this.move_x = this.move_r * Math.cos(this.theta);
          this.move_y = this.move_r * Math.sin(this.theta);
          this.frame = rand(3);

          this.addEventListener('enterframe', function(){
            this.x += this.move_x;
            this.y += this.move_y;
            if((this.x > CORE_SIZE[0] - BALL_SIZE[0] && this.move_x > 0) ||
               (this.x < 0 && this.move_x < 0)) {
              this.move_x *= -1;
              this.frame = (this.frame + 1) % 3;
              gen_new_ball();
            } else if ((this.y > CORE_SIZE[1] - BALL_SIZE[1] && this.move_y > 0) ||
              (this.y < 0 && this.move_y < 0)) {
              this.move_y *= -1;
              this.frame = (this.frame + 1) % 3;
              gen_new_ball();
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

            // if (ball.intersect(this)) // 画像のザックリした当たり判定
            if (this.within(hall, BALL_SIZE[0])) { // 画像の中心からの距離を指定する
              var time = this.age / core.fps;
              gameOverLabel.text = "spent " + time.toFixed(2) + "s";
              core.pushScene(gameOverScene);
              core.stop();
            }
          });
          core.rootScene.addChild(this);
          this.addEventListener('touchstart', function() {
            core.rootScene.removeChild(this);
          });
        }
      });


    // ballの個数がMAX_NUMBER_OF_BALLSより小さければ, 新しいballを作る
    function gen_new_ball() {
      if (balls.length < MAX_NUMBER_OF_BALLS) {
        var new_ball_x = rand(CORE_SIZE[0]);
        var new_ball_y = rand(CORE_SIZE[1]);
        balls.push(new Ball(new_ball_x, new_ball_y));
      }
    }
    var balls = [new Ball(CORE_SIZE[0] / 2, CORE_SIZE[1] / 2)];

    core.rootScene.on('touchstart', function(e) {
      i = rand(balls.length - 1);
      balls[i].x = e.x;
      balls[i].y = e.y;
    });

    var label = new Label();
    label.x = 30;
    label.y = 5;
    label.color = 'blue';
    label.font = '12px "KhmerOSsys"';

    if (EXIST_TURTLE) {
    turtle = new Sprite(TURTLE_SIZE[0], TURTLE_SIZE[1]);
    turtle.x = 0;
    turtle.y = rand(CORE_SIZE[1]);
    turtle.image = core.assets['imgs/turtle.jpg'];
    turtle.tl.moveBy(CORE_SIZE[0] - TURTLE_SIZE[0], 0, 40, TURTLE_EASING[1])
      .moveBy(TURTLE_SIZE[0] - CORE_SIZE[0], 0, 40, TURTLE_EASING[1])
      .loop();
    }

    label.on('enterframe', function() {
      label.text = "time: " + (this.age / core.fps).toFixed(2);
      if (EXIST_TURTLE) {
        label.text += "<br>easing: " + TURTLE_EASING[0];
      }
    });

    core.rootScene.addChild(hall);
    core.rootScene.addChild(label);
    if (EXIST_TURTLE) {
      core.rootScene.addChild(turtle);
    }

    var gameOverScene = new Scene();
    gameOverScene.backgroundColor = 'black';
    var gameOverLabel = new Label();
    gameOverLabel.x = 0;
    gameOverLabel.y = 0;
    gameOverLabel.color = 'red';
    gameOverLabel.font = '24px "KhmerOSsys"';
    gameOverScene.addChild(gameOverLabel);
  };
  core.start();
};

function rand(n) {
  return Math.floor(Math.random() * (n + 1));
}
