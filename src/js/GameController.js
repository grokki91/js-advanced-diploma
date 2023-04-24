import { generateRandomPositions, generateTeam } from './generators';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import Daemon from './characters/Daemon';
import themes from './themes';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.characters = [];
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    const myTeam = generateTeam([new Swordsman(1), new Bowman(1), new Magician(1)], 2, 3);
    console.log(myTeam);
    const botTeam = generateTeam([new Undead(1), new Vampire(1), new Daemon(1)], 2, 3);
    console.log(botTeam);
    const player = generateRandomPositions(myTeam.characters, 'i');
    const botPlayer = generateRandomPositions(botTeam.characters, 'bot');
    this.characters = player.concat(botPlayer);
    this.gamePlay.redrawPositions(this.characters);
    this.showTolltip();
    this.chooseCharacter();

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  showTolltip() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
  }

  chooseCharacter() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    const heroes = ['bowman', 'magician', 'swordsman'];
    this.characters.find((hero) => {
      if (heroes.includes(hero.character.type) && hero.position === index) {
        return this.gamePlay.selectCell(index);
      }
      // return GamePlay.showError('Здесь игрока нет!');
    });
    // TODO: react to click
  }

  onCellEnter(index) {
    const currentHero = this.characters.find((hero) => hero.position === index);
    return this.gamePlay.cells.filter((cell, curentIndex) => {
      if ((index === curentIndex) && cell.querySelector('.character')) {
        const { level, attack, defence, health } = currentHero.character;
        const message = `🎖 ${level} ⚔ ${attack} 🛡 ${defence} ❤ ${health}`;
        return this.gamePlay.showCellTooltip(message, curentIndex);
      }
      return this.onCellLeave(curentIndex);
    });
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    // TODO: react to mouse leave
  }
}
