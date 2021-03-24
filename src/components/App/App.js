import './App.css';
import Board from '../Board/Board';
import React from 'react';
import {DATA, VIEW, INIT_DATA, BOARD_SIZE} from '../../config/enum';

/**
 * Main component with game logic
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: INIT_DATA,
            view: this.resetView(),
            whiteNext: true,
            rotated: false,
        };
    }

    isBlackPlayer(elem) {
        return (elem === DATA.BLACK || elem === DATA.BLACK_KING) && !this.state.whiteNext;
    }

    isWhitePlayer(elem) {
        return (elem === DATA.WHITE || elem === DATA.WHITE_KING) && this.state.whiteNext;
    }

    isMoveDiagonal(i, j, di, dj) {
        return (j + di === dj + i) || (j + i === dj + di);
    }

    resetView() {
        return Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill(VIEW.EMPTY));
    }

    handleClick(i, j) {
        const elem = this.state.data[i][j];
        if (this.isWhitePlayer(elem) || this.isBlackPlayer(elem)) {

            // calculate view
            const view = this.resetView();
            view[i][j] = VIEW.ACTUAL;
            for (let k = 0; k < BOARD_SIZE; k++) {
                for (let l = 0; l < BOARD_SIZE; l++) {

                    // is move diagonal and field is empty
                    if (((j + k === l + i) || (j + i === l + k)) && this.state.data[k][l] === DATA.EMPTY) {

                        if (this.state.whiteNext) {

                            // is move forward for white or is king
                            if ((elem === DATA.WHITE && k < i) || elem === DATA.WHITE_KING) {
                                view[k][l] = VIEW.AVAILABLE;
                            }

                        } else {

                            // is move forward for black or is king
                            if ((elem === DATA.BLACK && k > i) || elem === DATA.BLACK_KING) {
                                view[k][l] = VIEW.AVAILABLE;
                            }

                        }
                    }
                }
            }

            // update view
            this.setState({
               view: view,
            });

            // saving as previous
            this.prevI= i;
            this.prevJ = j;

        } else if (this.state.view[i][j] === VIEW.AVAILABLE) {

            // is move legal -> move
            this.move(i, j, this.prevI, this.prevJ);
            this.setState({
               view: this.resetView(),
            });
        }
    }

    move(i, j, di, dj) {

        // copy
        const data = this.state.data.slice();

        // check if piece becomes king
        if (this.state.whiteNext && i === 0) {
            data[i][j] = DATA.WHITE_KING;
        } else if (!this.state.whiteNext && i === (BOARD_SIZE - 1)) {
            data[i][j] = DATA.BLACK_KING;
        } else {
            data[i][j] = data[di][dj];
        }

        // clear old field after
        data[di][dj] = DATA.EMPTY;

        this.setState({
            data: data,
            whiteNext: !this.state.whiteNext,
        });
    }

    rotate() {
        this.setState({rotated: !this.state.rotated});
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1>Draughts game!</h1>
                </header>
                <main>
                    <Board
                        onClick={(i, j) => this.handleClick(i, j)}
                        data={this.state.data}
                        view={this.state.view}
                        classes={this.state.rotated ? 'board rotated' : ''}
                    />
                    <p>{this.state.whiteNext ? 'White round' : 'Black round'}</p>
                    <button onClick={() => this.rotate()} >
                        Rotate board
                    </button>
                </main>
            </div>
        );
    }
}

export default App;
