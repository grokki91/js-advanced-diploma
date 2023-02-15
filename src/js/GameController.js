import { generateRandomPositions, generateTeam } from './generators';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import Daemon from './characters/Daemon';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');
    const myTeam = generateTeam([new Swordsman(1), new Bowman(1), new Magician(1)], 2, 3);
    console.log(myTeam);
    const botTeam = generateTeam([new Undead(1), new Vampire(1), new Daemon(1)], 2, 3);
    console.log(botTeam);
    const my = generateRandomPositions(myTeam.characters, 8);
    console.log(my);
    const bot = generateRandomPositions(botTeam.characters, 8);
    this.gamePlay.redrawPositions(my);
    this.gamePlay.redrawPositions(bot);

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
