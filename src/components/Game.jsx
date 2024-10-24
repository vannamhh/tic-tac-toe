import React, { useState } from "react";
import Board from "./Board";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);
    let displayOrder = isAscending ? 'Ascending' : 'Descending';
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        let isCurentMove = currentMove === move;

        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }

        return (
            <li key={move}>
                {isCurentMove && move > 0 ? (
                    "You are at move #" + move
                ) : (
                    <button onClick={() => jumpTo(move)}>{description}</button>
                )}
            </li>
        );
    });

    function toogleDisplayOrder() {
        setIsAscending(!isAscending);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={toogleDisplayOrder}>{displayOrder}</button>
                <ol>{isAscending ? moves : moves.slice().reverse()}</ol>
            </div>
        </div>
    );
}

export default Game;
