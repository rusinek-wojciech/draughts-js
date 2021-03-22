import React from 'react';
import './Piece.css';

class Piece extends React.Component {
    render() {
        const classes = 'figure ' + (this.props.player === 2 ? 'figure-white' : 'figure-black');
        return (
            <span
                className={classes}
            />
        );
    }
}

export default Piece;