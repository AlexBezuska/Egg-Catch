var canvas = document.getElementById("canvas");
var assets = {
  "animations":{
    "background": {
      "strip": "http://louisvillemakesgames.org/education/content/background.png",
      "frames": 1
    },
    "player": {
      "strip": "http://louisvillemakesgames.org/education/content/chicken.png",
      "frames": 1
    },
    "egg": {
      "strip": "http://louisvillemakesgames.org/education/content/egg-brown.png",
      "frames": 1
    }
  }
};
var game = new Splat.Game(canvas, assets);
var score = 0;
var gameSeconds = 30;

game.scenes.add("title", new Splat.Scene(canvas, function() {
  // setup

  score = 0;

  var backgroundImage = game.animations.get("background");
  this.background = new Splat.AnimatedEntity( 0, 0, backgroundImage.width, backgroundImage.height, backgroundImage, 0, 0 );

  var playerSprite = game.animations.get("player");
  this.player = new Splat.AnimatedEntity( 450, (canvas.height - playerSprite.height) - 42, playerSprite.width, playerSprite.height, playerSprite, 0, 0 );
  this.player.angle = 0;

  var scene = this;
  scene.egg = [];
  this.eggSprite = game.animations.get("egg");
  this.timers.makeegg = new Splat.Timer(undefined, 1000, function(){
    if (scene.egg.length < 50){
      makeegg(scene.egg, scene.eggSprite);
    }
    this.reset();
    this.start();
  });
  this.timers.makeegg.start();

  //Game Timer
  this.timers.gameTimer = new Splat.Timer(undefined, gameSeconds * 1000, function(){
    game.scenes.switchTo("gameover");
    this.reset();
  });
  this.timers.gameTimer.start();

}, function(time) {
  // simulation

  if(game.keyboard.isPressed("left")){
    this.player.vx = -0.3;
    this.player.move(time);
  }

  if(game.keyboard.isPressed("right")){
    this.player.vx = 0.3;
    this.player.move(time);
  }

  this.player.speed = 0;


  moveForward(this.player, this.player.speed);

  for (var i = 0; i < this.egg.length; i++){

    if(this.player.collides(this.egg[i])){
      this.egg.splice(i,1);
      score += 1;
    }
    //garbage collection
    if(this.egg[i].y > canvas.height){
      this.egg.splice(i,1);
    }

    this.egg[i].y += .8;

  }

  keepOnScreen(this.player);


}, function(context) {
  // draw

  this.background.draw(context);
  drawMultiple(context, this.egg);
  this.player.draw(context);

  context.fillStyle = "black";
  context.font = "32px impact";
  context.fillText("SCORE: " + score, 800, 50);

  context.fillStyle = "black";
  context.font = "32px impact";
  context.fillText("Time: " + parseInt((this.timers.gameTimer.expireMillis - this.timers.gameTimer.time) / 1000), 20, 50);

}));


game.scenes.add("gameover", new Splat.Scene(canvas, function() {
  // setup
}, function(time) {
  // simulation
  if(game.keyboard.isPressed("enter") || game.keyboard.isPressed("space")){
    game.scenes.switchTo("title");
  }
}, function(context) {
  // draw

  context.fillStyle = "black";
  context.fillRect(0,0, canvas.width, canvas.height);

  context.fillStyle = "white";
  context.font = "32px impact";
  centerText(context, "Time's up!", 0, canvas.height/2);

  context.fillStyle = "white";
  context.font = "32px impact";
  centerText(context, "SCORE: " + score, 0, canvas.height - 25);

}));


game.scenes.switchTo("loading");


function makeegg(array, sprite) {
  var eggEntity = new Splat.AnimatedEntity(randomRange(0, canvas.width), 0, sprite.width, sprite.height, sprite, 0, 0);
  array.push(eggEntity);
}
