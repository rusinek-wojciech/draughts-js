import React from 'react';
import './Board.css';

class Board extends React.Component {

    renderFigure(item) {
        if (item === 2) {
            return (
                <span className="figure figure-white"/>
            );
        } else if (item === 1) {
            return (
                <span className="figure figure-black"/>
            );
        } else {
            return null;
        }
    }

    renderRow(row, i) {
        const result = row.map((item, j) => {
            const classes = 'board-item' + (((j + i) % 2 === 0) ? ' board-item-white' : ' board-item-black');
            return <div className={classes} key={j}>{ this.renderFigure(item) }</div>;
        });
        return <div className="board-row" key={i}>{result}</div>;
    }

    render() {
        return <div className="board">{ this.props.data.map((row, i) => this.renderRow(row, i)) }</div>;
    }
}

export default Board;