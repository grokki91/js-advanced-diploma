import { generateRandomPositions, generateTeam } from './generators';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import Daemon from './characters/Daemon';
import themes from './themes';
import cursors from './cursors';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.characters = [];
    this.activeCharacter = {};
    this.isActive = false;
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
    this.randomFirstChosenPlayer()
    this.chooseCharacter();

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  showTolltip() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
  }

  checkCharacterInCell(arr, index) {
    const activeCell = this.gamePlay.cells[index];
    return activeCell.querySelector(`.${arr[0]}`) || activeCell.querySelector(`.${arr[1]}`) || activeCell.querySelector(`.${arr[2]}`);
  }

  showCursor(index) {
    const bot = ['undead', 'vampire', 'daemon'];

    if (this.checkCharacterInCell(bot, index)) {
      this.gamePlay.setCursor(cursors.crosshair);
    } else {
      this.gamePlay.setCursor(cursors.pointer);
    }
    // if (!this.checkCharacterInCell(player, index) && !this.checkCharacterInCell(bot, index)) {
    //   this.gamePlay.setCursor(cursors.notallowed);
    // }
  }

  randomFirstChosenPlayer() {
    const playerHeroes = ['bowman', 'magician', 'swordsman'];
    const randomHero = this.characters.find((hero) => {
      if (playerHeroes.includes(hero.character.type)) {
        return Math.floor(Math.random() * hero.position)
      }
    });
    this.activeCharacter = randomHero;
    return this.gamePlay.selectCell(this.activeCharacter.position);
  }

  chooseCharacter() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  move() {
    if (this.activeCharacter.character.step === 4) {
      console.log('Вы выбрали мечника. Можно сделать 4 шага');
    } if (this.activeCharacter.character.step === 2) {
      console.log('Вы выбрали лучника. Можно сделать два шага');
    } if (this.activeCharacter.character.step === 1) {
      console.log('Вы выбрали мага. Можно сделать один шаг');
    }
  }

  onCellClick(index) {
    const playerHeroes = ['bowman', 'magician', 'swordsman'];
    const botHeroes = ['undead', 'vampire', 'daemon'];
    const currentHero = this.characters.find((hero) => playerHeroes.includes(hero.character.type) && hero.position === index);
    const currentBot = this.characters.find((hero) => botHeroes.includes(hero.character.type) && hero.position === index);

    if (currentHero) {
      this.activeCharacter = currentHero;
      this.gamePlay.selectCell(index);
      this.move();
    }

    if (!currentHero) {
      this.gamePlay.selectCell(index, 'green');
      // GamePlay.showError('Не выбран персонаж!');
    }

    if (currentBot) {
      this.gamePlay.selectCell(index, 'red');
    }

    // снимаем выделение с неактивных ячеек
    this.gamePlay.cells.filter((cell, idx) => {
      if (cell.classList.contains('selected-green') && idx !== index && !currentHero) {
        this.gamePlay.deselectCell(idx);
      } else if (cell.classList.contains('selected-yellow') && idx !== index) {
        this.gamePlay.deselectCell(idx);
      } else if (cell.classList.contains('selected-red') && idx !== index) {
        this.gamePlay.deselectCell(idx);
      }
    });
    // TODO: react to click
  }

  onCellEnter(index) {
    const currentHero = this.characters.find((hero) => hero.position === index);
    this.showCursor(index);
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
