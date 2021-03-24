import './App.css';
import Board from '../Board/Board';
import React from 'react';
import {DATA, VIEW, INIT_DATA, BOARD_SIZE} from '../../config/enum';

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

    isBlackPlayer(i, j) {
        return this.state.data[i][j] === DATA.BLACK && !this.state.whiteNext;
    }

    isWhitePlayer(i, j) {
        return this.state.data[i][j] === DATA.WHITE && this.state.whiteNext;
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
        if (this.isWhitePlayer(i, j) || this.isBlackPlayer(i, j)) {

            // calculate view
            const view = this.resetView();
            view[i][j] = VIEW.ACTUAL;
            for (let k = 0; k < BOARD_SIZE; k++) {
                for (let l = 0; l < BOARD_SIZE; l++) {
                    if (this.isMoveDiagonal(i, j, k, l) && this.state.data[k][l] === DATA.EMPTY) {
                        view[k][l] = VIEW.AVAILABLE;
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
        const data = this.state.data.slice();
        data[i][j] = data[di][dj];
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
