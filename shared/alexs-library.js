
//Alex's Useful tools

function fillScreen(context, color){
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function rotate(entity, direction, speed){
  if(entity instanceof Array){
    for(var i = 0; i < entity.length; i++){
      if(direction == "right"){
        entity[i].angle += speed;
      }else if(direction == "left"){
        entity[i].angle -= speed;
      }
    }
  }else{
    if(direction == "right"){
      entity.angle += speed;
    }else if(direction == "left"){
      entity.angle -= speed;
    }
  }

}

function moveForward(entity, speed){
  entity.vx = speed * Math.cos(entity.angle * (Math.PI /180));
  entity.vy = speed * Math.sin(entity.angle * (Math.PI /180));
}

function drawMultiple(context, array){
  for(var i = 0; i < array.length; i++){
    array[i].draw(context);
  }
}
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function centerText(context, text, offsetX, offsetY) {
  var w = context.measureText(text).width;
  var x = offsetX + (canvas.width / 2) - (w / 2) | 0;
  var y = offsetY | 0;
  context.fillText(text, x, y);
}

function drawOutline(context, entity) {
  context.strokeStyle = "white";
  context.strokeRect(entity.x, entity.y, entity.width, entity.height);
}

function keepOnScreen(entity) {
  if (entity.x < 0) {
    entity.x = 0;
  }
  if (entity.x + entity.width > canvas.width) {
    entity.x = canvas.width - entity.width;
  }
  if (entity.y < 0) {
    entity.y = 0;
  }
  if (entity.y + entity.height > canvas.height) {
    entity.y = canvas.height - entity.height;
  }
}

function center(axis, sprite){
  if(axis == "x"){
    return (canvas.width/2) - (sprite.width/2);
  }else{
    return (canvas.height/2) - (sprite.height/2);
  }
}
