import React from 'react';
import './Board.css';
import Piece from '../Piece/Piece';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFigure(item) {
        if (item !== 0) {
            return <Piece player={item} />
        }
    }

    renderItem(item, i, j) {
        const classes = 'board-item' + (((j + i) % 2 === 0) ? ' board-item-white' : ' board-item-black');
        return (
            <div className={classes} key={j} onClick={() => this.props.onClick(i, j)}>
                {this.renderFigure(item)}
            </div>
        );
    }

    renderRow(row, i) {
        return (
            <div className="board-row" key={i}>
                {row.map((item, j) => this.renderItem(item, i, j))}
            </div>
        );
    }

    render() {
        return (
            <div className="board">
                {this.props.data.map((row, i) => this.renderRow(row, i))}
            </div>
        );
    }
}

export default Board;