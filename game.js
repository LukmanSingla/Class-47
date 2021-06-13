class Game {
  constructor() {}
  getState() {
    database.ref("gamestate").on("value", (data) => {
      gameState = data.val();
    });
  }
  updateState() {
    database.ref("/").update({
      gamestate: gameState,
    });
  }
  start() {
    if (gameState == 0 || gameState == null) {
      form = new Form();
      form.display();
    }
    s1 = createSprite(100, 50, 100, 100);
    s1.addImage("s1", sa1);
    s1.scale = 0.5;
    s1.rotation = 135;

    s2 = createSprite(width - 60, 50, 100, 100);
    s2.addImage("s2", sa2);
    s2.scale = 0.5;
    s2.rotation = -135;

    s3 = createSprite(width - 60, height - 180, 100, 100);
    s3.addImage("s3", sa3);
    s3.scale = 0.5;
    s3.rotation = -45;

    s4 = createSprite(50, height - 180, 100, 100);
    s4.addImage("s4", sa4);
    s4.scale = 0.5;
    s4.rotation = 45;

    background(bgImg1);
    sa = [s1, s2, s3, s4];
  }
  wait() {
    if (gameState == 1) {
      if (playerCount == 4) {
        gameState = 2;
      }
      background(bgImg1);
    }
  }
  play() {
    if (gameState == 2) {
      background(bgImg2);
      Player.playerInfo();
      drawSprites();
      form.wait.hide();
      form.load.hide();
      form.shoot.position(200, 30);
      slider.style.visibility = "visible";

      var index = 0;
      for (var i in allPlayers) {
        index++;
        sa[index - 1].x = x[index - 1];
        sa[index - 1].y = y[index - 1];

        if (player.index == index) {
          if (keyDown("UP_ARROW")) {
            y[index - 1] -= 10;
          }
          if (keyDown("LEFT_ARROW")) {
            x[index - 1] -= 10;
          }
          if (keyDown("DOWN_ARROW")) {
            y[index - 1] += 10;
          }
          if (keyDown("RIGHT_ARROW")) {
            x[index - 1] += 10;
          }
          player.x = x[index - 1];
          player.y = y[index - 1];
          player.rotation = parseInt(slider.value);
          player.newPlayer();
        }
        x[index - 1] = allPlayers[i].x;
        y[index - 1] = allPlayers[i].y;
        sa[index - 1].rotation = allPlayers[i].rotation;
      }
      drawSprites();
    }
    // text(mouseX + "," + mouseY, mouseX, mouseY);
    // var x = 150;
    // var y = 150;
    // stroke("black");
    // strokeWeight(3);
    // line(x, y, x + 1000, y + 1000);
  }
}
