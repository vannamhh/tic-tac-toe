import React from "react";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
    const { winner, winLines } = calculateWiner(squares);

    const handleClick = (i) => {
        if (squares[i] || winner) 
            return;
        
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    };

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ` + (xIsNext ? "X" : "O");
    }

    const boardRow = Array(3)
        .fill(null)
        .map((rowItem, row) => {
            const boardCol = Array(3)
                .fill(null)
                .map((colItem, col) => {
                    let i = row * 3 + col;
                    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} key={i} isWinCol={winLines.includes(i)} />;
                });

            return (
                <div className="board-row" key={row}>
                    {boardCol}
                </div>
            );
        });

    return (
        <>
            <div className="status">{status}</div>
            {boardRow}
        </>
    );
}

const calculateWiner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winLines: lines[i],
            };
        }
    }
    return { winner: null, winLines: [] };
};
