import './App.css';
import Board from '../Board/Board';
import React from 'react';
import {DATA, VIEW, INIT_DATA, BOARD_SIZE} from '../../config/enum';

let canKill = false;

const directions = [
    (i, j) => [--i, --j],
    (i, j) => [--i, ++j],
    (i, j) => [++i, --j],
    (i, j) => [++i, ++j],
];

const isEnemy = (elem, isWhiteTurn) => {
    return isWhiteTurn
        ? elem === DATA.BLACK || elem === DATA.BLACK_KING
        : elem === DATA.WHITE || elem === DATA.WHITE_KING;
}

const isAlly = (elem, isWhiteTurn) => {
    return isWhiteTurn
        ? elem === DATA.WHITE || elem === DATA.WHITE_KING
        : elem === DATA.BLACK || elem === DATA.BLACK_KING;
}

const isKing = elem => elem === DATA.WHITE_KING || elem === DATA.BLACK_KING;

const isMinion = elem => (elem === DATA.WHITE || elem === DATA.BLACK);

const validate = (i, j) => i >= 0 && j >= 0 && i < BOARD_SIZE && j < BOARD_SIZE;

const createEmptyView = () => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(VIEW.EMPTY));

const createView = (i, j, data, isWhiteTurn) => {

    const view = createEmptyView();
    view[i][j] = VIEW.ACTUAL;
    canKill = false;

    if (isKing(data[i][j])) {
        directions.forEach(dir => {
            let [di, dj] = dir(i, j);
            while (validate(di, dj)) {
                if (isAlly(data[di][dj], isWhiteTurn)) {
                    break;
                } else if (isEnemy(data[di][dj], isWhiteTurn)) {
                    let [x, y] = dir(di, dj);
                    while (validate(x, y) && data[x][y] === DATA.EMPTY) {
                        view[di][dj] = VIEW.KILLABLE;
                        view[x][y] = VIEW.NECESSARY;
                        [x, y] = dir(x, y);
                    }
                    break;
                } else {
                    view[di][dj] = VIEW.AVAILABLE;
                }
                [di, dj] = dir(di, dj);
            }
        });
    } else {
        directions.forEach(dir => {
            let [di, dj] = dir(i, j);
            if (validate(di, dj)) {
                if (isAlly(data[di][dj], isWhiteTurn)) {
                    // nothing
                } else if (isEnemy(data[di][dj], isWhiteTurn)) {
                    let [x, y] = dir(di, dj);
                    if (validate(x, y) && data[x][y] === DATA.EMPTY) {
                        view[di][dj] = VIEW.KILLABLE;
                        view[x][y] = VIEW.NECESSARY;
                    }
                } else {
                    view[di][dj] = VIEW.AVAILABLE;
                }
            }
        });
    }

    // clean view
    if (view.some(row => row.includes(VIEW.NECESSARY))) {
        canKill = true;
        return view.map(row => row.map(elem => {
            if (elem === VIEW.AVAILABLE) {
                elem = VIEW.EMPTY;
            }
            return elem;
        }));
    } else if (isWhiteTurn && isMinion(data[i][j])) {
        return view.map((row, di) => row.map(elem => {
            if (i < di) {
                elem = VIEW.EMPTY;
            }
            return elem;
        }));
    } else if (!isWhiteTurn && isMinion(data[i][j])) {
        return view.map((row, di) => row.map(elem => {
            if (i > di) {
                elem = VIEW.EMPTY;
            }
            return elem;
        }));
    }

    return view;
}

/**
 * Main component with game logic
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: INIT_DATA,
            view: createEmptyView(),
            isWhiteTurn: true,
            rotated: false,
        };
    }

    handleClick(i, j) {

        const data = this.state.data;
        const view = this.state.view;
        const isWhiteTurn = this.state.isWhiteTurn;

        if (view[i][j] === VIEW.AVAILABLE) {
            // TODO: check if there is necessary move available
            // check if piece becomes king
            if (isWhiteTurn && i === 0) {
                data[i][j] = DATA.WHITE_KING;
            } else if (!isWhiteTurn && i === (BOARD_SIZE - 1)) {
                data[i][j] = DATA.BLACK_KING;
            } else {
                data[i][j] = data[this.previous.i][this.previous.j];
            }
            // clear old field after
            data[this.previous.i][this.previous.j] = DATA.EMPTY;
            this.setState({
                data: data,
                isWhiteTurn: !isWhiteTurn,
                view: createEmptyView(),
            });
        } else if (view[i][j] === VIEW.NECESSARY) {

            let dead;
            const iIterator = i >= this.previous.i ? 1 : -1;
            const jIterator = j >= this.previous.j ? 1 : -1;
            let x = i;
            let y = j;
            while (x !== this.previous.i || y !== this.previous.j) {
                x -= iIterator;
                y -= jIterator
                if (view[x][y] === VIEW.KILLABLE) {
                    dead = {
                        i: x,
                        j: y,
                    };
                    break;
                }
            }

            // check if piece becomes king
            if (isWhiteTurn && i === 0) {
                data[i][j] = DATA.WHITE_KING;
            } else if (!isWhiteTurn && i === (BOARD_SIZE - 1)) {
                data[i][j] = DATA.BLACK_KING;
            } else {
                data[i][j] = data[this.previous.i][this.previous.j];
            }

            // kill
            data[dead.i][dead.j] = DATA.EMPTY;

            const nextView = createView(i, j, data, isWhiteTurn);

            // clear old field after
            data[this.previous.i][this.previous.j] = DATA.EMPTY;
            if (canKill) {
                this.setState({
                    data: data,
                    view: nextView,
                });
                this.previous = {
                    i: i,
                    j: j,
                };
                return;
            }
            this.setState({
                data: data,
                isWhiteTurn: !isWhiteTurn,
                view: createEmptyView(),
            });

        } else if (isAlly(data[i][j], isWhiteTurn)) {
            this.previous = {
                i: i,
                j: j,
            };
            this.setState({
                view: createView(i, j, data, isWhiteTurn),
            });
        }
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
                    <p>{this.state.isWhiteTurn ? 'White round' : 'Black round'}</p>
                    <button onClick={() => this.rotate()} >
                        Rotate board
                    </button>
                </main>
            </div>
        );
    }
}


export default App;
