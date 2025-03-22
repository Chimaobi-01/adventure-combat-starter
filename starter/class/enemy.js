const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom)
    this.cooldown = 3000
    this.attackTarget = null
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    const exitRooms = this.currentRoom.exits
    const directions = this.currentRoom.getExits()
    const randomInt = Math.floor(Math.random() * directions.length)
    const key = directions[randomInt]
    this.currentRoom = exitRooms[key]
    this.cooldown = 3000
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    const player = this.attackTarget
    player.health -= 10
    this.cooldown = 3000
  }

  applyDamage(amount) {
    // Fill this in
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
