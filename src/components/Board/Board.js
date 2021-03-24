import React from 'react';
import './Board.css';
import Piece from '../Piece/Piece';

class Board extends React.Component {

    renderFigure(item) {
        if (item !== 0) {
            return <Piece player={item} />
        }
    }

    renderItem(item, i, j) {
        let classes = 'board-item' + ((j + i) % 2 === 0 ? ' board-item-white' : ' board-item-black');
        if (this.props.view[i][j] === 1) {
            classes += ' board-focused';
        } else if (this.props.view[i][j] === 2) {
            classes += ' board-blocked';
        }
        return (
            <div
                className={classes}
                key={j}
                onClick={() => this.props.onClick(i, j)}
            >
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
            <div className={'board ' + this.props.classes}>
                {this.props.data.map((row, i) => this.renderRow(row, i))}
            </div>
        );
    }
}

export default Board;