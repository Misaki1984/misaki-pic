var gameList = [
  {
    gameId: 1,
    gameName: 'CS:GO',
  },
  {
    gameId: 2,
    gameName: 'LOL',
  },
  {
    gameId: 3,
    gameName: '炉石传说',
  },
  {
    gameId: 4,
    gameName: 'APEX',
  },
  {
    gameId: 5,
    gameName: '守望先锋',
  }
]
var gameMap = new Map();
for (let n = 0; n < gameList.length; n++) {
  const element = gameList[n];
  gameMap.set(element.gameId, element.gameName);
}
export default gameMap;