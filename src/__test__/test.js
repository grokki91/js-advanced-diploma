import Character from '../js/Character';
import GameController from '../js/GameController';
import GamePlay from '../js/GamePlay';
import Bowman from '../js/characters/Bowman';
import Daemon from '../js/characters/Daemon';
import Swordsman from '../js/characters/Swordsman';
import { characterGenerator, generateTeam } from '../js/generators';
import { calcTileType } from '../js/utils';

describe('Painting board', () => {
  test('Check top-left', () => {
    expect(calcTileType(0, 8)).toBe('top-left');
  });
});

describe('Painting characters', () => {
  test('Throw error after create object Character with operator New', () => {
    expect(() => new Character(1, 'Bowman')).toThrow('Нельзя создать персонажа через базовый класс');
  });
  test('Check correct parameters after create character', () => {
    expect(new Daemon(2)).toEqual({
      level: 2, type: 'daemon', attack: 40, defence: 10, health: 50,
    });
  });
  test('Generate new character infinitely', () => {
    const types = [new Swordsman(1), new Bowman(1)];
    for (let i = 0; i < 4; i += 1) {
      expect(characterGenerator(types, 5).next().done).toBeFalsy();
    }
  });
  test('Check correct generation quantity of characters', () => {
    const team = generateTeam([new Swordsman(5), new Bowman(4)], 5, 10);
    expect(team.members).toHaveLength(10);
  });
  test('Max level of generation characters', () => {
    const team = generateTeam([new Swordsman(5)], 10, 5);
    team.members.forEach((obj) => {
      expect(obj.level).toBeLessThan(5);
    });
  });
});

describe('Show information about character', () => {
  const gamePlay = new GamePlay();
  gamePlay.boardSize = 4;
  gamePlay.cells = Array(4).fill({title: ''})
  const controller = new GameController(gamePlay, '');
  test('ShowInfo haven\'t error', () => {
    console.log(gamePlay.cells);
    expect(controller.onCellEnter(2)).not.toThrowError();
  });
});
