import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level) {
    super(level);
    this.attack = 10;
    this.defence = 10;
    this.type = 'swordsman';
    this.step = 4;
    this.range = 1;
  }
}
