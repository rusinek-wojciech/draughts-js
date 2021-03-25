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

    isMoveDiagonal(i, j, di, dj) {
        return (j + di === dj + i) || (j + i === dj + di);
    }

    resetView() {
        return Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill(VIEW.EMPTY));
    }

    checkSize(i, j) {
        return i >= 0 && j >= 0 && i < BOARD_SIZE && j < BOARD_SIZE;
    }

    check(i, j, view, fun) {
        [i, j] = this.checkToBlock(i, j, view, fun);
        this.checkAfter(i, j, view, fun);
    }

    checkToBlock(i, j, view, fun) {
        [i, j] = fun(i, j);
        while (this.checkSize(i, j) && this.state.data[i][j] === DATA.EMPTY) {
            view[i][j] = VIEW.AVAILABLE;
            [i, j] = fun(i, j);
        }
        return [i, j];
    }

    checkAfter(i, j, view, fun) {
        if (this.checkSize(i, j)) {
            let prevI = i;
            let prevJ = j;
            let elem = this.state.data[i][j];
            if (this.state.whiteNext) {
                if (elem === DATA.BLACK || elem === DATA.BLACK_KING) {
                    [i, j] = fun(i, j);
                    if (this.checkSize(i, j)) {
                        elem = this.state.data[i][j];
                        if (elem === DATA.EMPTY) {
                            view[i][j] = VIEW.NECESSARY;
                            view[prevI][prevJ] = VIEW.KILLABLE;
                        }
                    }
                }
            } else {
                if (elem === DATA.WHITE || elem === DATA.WHITE_KING) {
                    [i, j] = fun(i, j);
                    if (this.checkSize(i, j)) {
                        elem = this.state.data[i][j];
                        if (elem === DATA.EMPTY) {
                            view[i][j] = VIEW.NECESSARY;
                            view[prevI][prevJ] = VIEW.KILLABLE;
                        }
                    }
                }
            }
        }
    }

    checker(i, j, functions) {
        // calculate view
        const view = this.resetView();
        view[i][j] = VIEW.ACTUAL;
        // check all directions
        functions.forEach(f => this.check(i, j, view, f));
        // saving as previous
        this.prevI = i;
        this.prevJ = j;
        // update view
        this.setState({
            view: view,
        });
    }

    handleClick(i, j) {
        const elem = this.state.data[i][j];

        const upperLeft = (i, j) => [--i, --j];
        const upperRight = (i, j) => [--i, ++j];
        const bottomLeft = (i, j) => [++i, --j];
        const bottomRight = (i, j) => [++i, ++j];

        switch (elem) {
            case DATA.WHITE:
                if (this.state.whiteNext) {
                    this.checker(i, j, [upperRight, upperLeft]);
                }
                break;
            case DATA.WHITE_KING:
                if (this.state.whiteNext) {
                    this.checker(i, j, [upperRight, upperLeft, bottomRight, bottomLeft]);
                }
                break;
            case DATA.BLACK:
                if (!this.state.whiteNext) {
                    this.checker(i, j, [bottomRight, bottomLeft]);
                }
                break;
            case DATA.BLACK_KING:
                if (!this.state.whiteNext) {
                    this.checker(i, j, [upperRight, upperLeft, bottomRight, bottomLeft]);
                }
                break;
            default:
                if (this.state.view[i][j] === VIEW.AVAILABLE) {
                    this.move(i, j, this.prevI, this.prevJ);
                    this.setState({view: this.resetView()});
                } else if (this.state.view[i][j] === VIEW.NECESSARY) {
                    const obj= {
                        i: i - (i >= this.prevI ? 1 : -1),
                        j: j - (j >= this.prevJ ? 1 : -1),
                    };
                    console.log(obj);
                    this.move(i, j, this.prevI, this.prevJ, obj);
                    this.setState({view: this.resetView()});
                }
                break;
        }
    }

    move(i, j, di, dj, dead) {

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

        // kill
        if (dead !== undefined) {
            data[dead.i][dead.j] = DATA.EMPTY;
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
