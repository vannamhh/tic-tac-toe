import React from "react";

function Square({ value, onSquareClick, isWinCol }) {
    const squareClass = "square" + (isWinCol ? ' highlight' : '');
    return (
        <button className={squareClass} onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;
