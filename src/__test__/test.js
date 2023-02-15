import { calcTileType } from '../js/utils';

describe('Check function calcTileType', () => {
  test('Check top-left', () => {
    expect(calcTileType(0, 8)).toBe('top-left');
  });
});
