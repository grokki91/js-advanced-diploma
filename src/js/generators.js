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
    hero.level = randomLevel();
    return hero;
  };
  yield randomCharacter();
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
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

export function generateRandomPositions(team, num) {
  const positionArr = [];
  const characterArray = [];
  const createPosition = () => Math.floor(Math.random() * num);

  while (positionArr.length < team.length) {
    const position = createPosition();
    if (!positionArr.includes(position)) {
      characterArray.push(new PositionedCharacter(team[positionArr.length], position));
      positionArr.push(position);
    }
  }
  console.log(characterArray);
  return characterArray;
}
