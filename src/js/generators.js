import PositionedCharacter from './PositionedCharacter';
import Team from './Team';
/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel = 1) {
  // TODO: write logic here
  const randomLevel = () => Math.floor(Math.random() * maxLevel + 1);
  const randomCharacter = () => {
    const hero = allowedTypes[Math.floor(Math.random() * (allowedTypes.length - 1))];
    const currentLevel = randomLevel();
    hero.level = currentLevel > 4 ? 4 : currentLevel;
    return hero;
  };
  yield randomCharacter();
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount ко0личество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const arrTeam = [];
  for (let i = 0; i < characterCount; i += 1) {
    const hero = characterGenerator(allowedTypes, maxLevel).next().value;
    arrTeam.push(hero);
  }
  return new Team(arrTeam);
}

// Определяется месторасположение персонажа в зависимости от игрока ('bot' или игрок)
export function сreatePosition(player) {
  const randomArrMy = [];
  const randomArrBot = [];
  document.querySelectorAll('.cell').forEach((el, index) => {
    const topLeft = el.classList.contains('map-tile-top-left');
    const left = el.classList.contains('map-tile-left');
    const bottomLeft = el.classList.contains('map-tile-bottom-left');
    const topRight = el.classList.contains('map-tile-top-right');
    const right = el.classList.contains('map-tile-right');
    const bottomRight = el.classList.contains('map-tile-bottom-right');

    if (topLeft || left || bottomLeft) {
      randomArrMy.push(index, index + 1);
    } else if (topRight || right || bottomRight) {
      randomArrBot.push(index, index - 1);
    }
  });

  if (player !== 'bot') {
    return randomArrMy[Math.floor(Math.random() * randomArrMy.length)];
  }
  return randomArrBot[Math.floor(Math.random() * randomArrBot.length)];
}

export function generateRandomPositions(team, player) {
  const positionArr = [];
  const characterArray = [];

  while (positionArr.length < team.length) {
    const position = сreatePosition(player);
    if (!positionArr.includes(position)) {
      characterArray.push(new PositionedCharacter(team[positionArr.length], position));
      positionArr.push(position);
    }
  }
  return characterArray;
}
