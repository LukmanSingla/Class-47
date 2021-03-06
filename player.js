class Player {
  constructor() {
    this.index = null;
    this.name = "";
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
  }
  newPlayer() {
    database.ref("players/player " + this.index).update({
      name: this.name,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
    });
  }
  getCount() {
    database.ref("playercount").on("value", (data) => {
      playerCount = data.val();
    });
  }
  updateCount() {
    database.ref("/").update({
      playercount: playerCount + 1,
    });
  }
  resetPlayer() {
    database.ref("/").update({
      playercount: 0,
    });
  }
  static playerInfo() {
    database.ref("players").on("value", (data) => {
      allPlayers = data.val();
    });
  }
}
