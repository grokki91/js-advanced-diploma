/**
 * Entry point of app: don't change this
 */
import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import { generateTeam } from './generators';
import Team from './Team';
import PositionedCharacter from './PositionedCharacter';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();
// const characters = [new Swordsman(2), new Bowman(3), new Magician(1)];
// const team = generateTeam(characters, 3, 4);
// const myTeam = new Team(team);
// console.log(myTeam.characters);
// console.log(myTeam.characters[0]);
// console.log(myTeam.characters[0].level);
// console.log(myTeam.characters[1].level);
// console.log(myTeam.characters[2].level);
// const character = new Bowman(2);
// const position = 8; // для поля 8x8 лучник будет находиться слева на второй строке
// const positionedCharacter = new PositionedCharacter(character, position);
// console.log(positionedCharacter);

// don't write your code here
