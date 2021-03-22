import React from 'react';
import './Board.css';

class Board extends React.Component {



    renderRow(row, i) {
        return (
            <div className="board-row" key={i}>
                { row.map((item, j) => {
                        const counter = j + i;
                        const classes = 'board-item' + ((counter % 2 === 0) ? ' board-item-black' : ' board-item-white');
                        return <div className={classes} key={j}>{item}</div>;
                })}
            </div>
        );
    }

    render() {
        const data = this.props.data;
        return (
            <div className="board">
                { data.map((row, i) => this.renderRow(row, i)) }
            </div>
        );
    }
}

export default Board;