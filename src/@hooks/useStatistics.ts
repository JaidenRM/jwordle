import { DateTime } from "luxon";
import { LocalStorageKey } from "../@enums/localStorageKeys";
import { Statistics } from "../@types/states/statistics";
import { DateTimeHelper } from "../utils/helpers/datetime";
import { useLocalStorage } from "./useLocalStorage";

const defaultStats = {
  lastUpdated: undefined,
  gamesPlayed: 0,
  gamesWon: 0,
  currentConsecutiveGames: 0,
  maxConsecutiveGames: 0,
  gamesWonByGuesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
};
export const useStatistics = (initialValue?: Statistics) => {
  const [statistics, setStatistics] = useLocalStorage<Statistics>(
    LocalStorageKey.Statistics,
    initialValue || defaultStats,
    {
      parseJsonToItem: (k, v) =>
        DateTime.fromISO(v).isValid ? new Date(v) : v,
      overwriteExistingItem: () => false,
    }
  );

  const updateStatistics = (didWin: boolean, numberOfGuesses: number) => {
    setStatistics((prev) => {
      const now = new Date();

      if (!prev.lastUpdated) prev.lastUpdated = now;
      else if (DateTimeHelper.isToday(prev.lastUpdated, now)) return prev;

      const currentConsecutiveGames = DateTimeHelper.wasWithinYesterday(
        prev.lastUpdated,
        now
      )
        ? prev.currentConsecutiveGames + 1
        : 1;

      const maxConsecutiveGames =
        currentConsecutiveGames > prev.maxConsecutiveGames
          ? currentConsecutiveGames
          : prev.maxConsecutiveGames;
      const gamesWonByGuesses = prev.gamesWonByGuesses;

      if (didWin)
        gamesWonByGuesses[numberOfGuesses] =
          (gamesWonByGuesses[numberOfGuesses] || 0) + 1;

      return {
        lastUpdated: now,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: didWin ? prev.gamesWon + 1 : prev.gamesWon,
        currentConsecutiveGames,
        maxConsecutiveGames,
        gamesWonByGuesses,
      };
    });
  };

  return [statistics, updateStatistics] as const;
};
