export interface Statistics {
  lastUpdated?: Date;
  gamesPlayed: number;
  gamesWon: number;
  currentConsecutiveGames: number;
  maxConsecutiveGames: number;
  gamesWonByGuesses: { [numberOfGuesses: number]: number };
}
