import React from 'react';
import './Piece.css';
import {DATA} from '../../config/enum';

/**
 * Represents game piece
 */
class Piece extends React.Component {
    render() {
        return (
            <span
                className={'figure figure-' + Object.keys(DATA)[this.props.figure].toLowerCase()}
            />
        );
    }
}

export default Piece;