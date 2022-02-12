import { useEffect, useState } from "react";
import { GameStatus } from "../@enums/gameStatus";
import { GameState } from "../@types/states/game";

export const useGameState = (startingState: GameState) => {
    const [state, setState] = useState<GameState>(startingState);

    const setGameState = (gameState: Partial<GameState>) => {
        
        setState(prev => {
            const updatedState: {[key: string]: any} = {};

            let k: keyof GameState;
            for(k in gameState) {
                if (gameState[k]) updatedState[k] = gameState[k];
            }

            return {
                ...prev,
                ...updatedState,
            };
        });
    }

    useEffect(() => {
        switch (state.status) {
            case GameStatus.Lost:
                alert(`Unfortunately you didn't guess correctly. The word was ${state.wordToGuess}.`);
                break;
            case GameStatus.Won:
                alert(`Congratulations. You won in ${state.usedAttempts} attempts!`);
                break;
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.status]);

    return [state, setGameState] as const;
}