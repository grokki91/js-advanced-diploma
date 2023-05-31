import Character from '../Character';

export default class Daemon extends Character {
  constructor(level) {
    super(level);
    this.attack = 40;
    this.defence = 10;
    this.type = 'daemon';
    this.step = 1;
    this.range = 4;
  }
}
