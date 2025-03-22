const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    // Fill this in
    this._switchItem(itemName, this.currentRoom, this)
  }

  dropItem(itemName) {

    // Fill this in
    this._switchItem(itemName, this, this.currentRoom)

  }

  eatItem(itemName) {

    // Fill this in
    const food = this.items.find(item => item.name === itemName)

    if(food instanceof Food)
      this.items = this.items.filter(item => item != food)

  }

  getItemByName(name) {

    // Fill this in
    const item = this.items.find(item => item.name === name)
    return item
  }

  hit(name) {

    // Fill this in
    const enemies = this.currentRoom.getEnemies()
    const enemy = enemies.find(enemy => enemy.name === name)
    enemy.attackTarget = this
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

  _switchItem(itemName, from, to) {
    const switchedItem = from.getItemByName(itemName)
    to.items.push(switchedItem)
    from.items = from.items.filter(item => item != switchedItem)
  }

}

module.exports = {
  Player,
};
