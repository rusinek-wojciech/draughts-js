import './App.css';
import Board from '../Board/Board';
import React from 'react';
import {DATA, VIEW, INIT_DATA, BOARD_SIZE} from '../../config/enum';

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

    const directions = [
        (i, j) => [--i, --j],
        (i, j) => [--i, ++j],
        (i, j) => [++i, --j],
        (i, j) => [++i, ++j],
    ];

    // iterate and set view fields
    directions.forEach(dir => {
        let [di, dj] = dir(i, j);
        while (validate(di, dj)) {
            if (isAlly(data[di][dj], isWhiteTurn)) {
                break;
            } else if (isEnemy(data[di][dj], isWhiteTurn)) {

                let [x, y] = dir(di, dj);
                if (validate(x, y) && data[x][y] === DATA.EMPTY) {
                    view[di][dj] = VIEW.KILLABLE;
                    view[x][y] = VIEW.NECESSARY;
                }
                break;

            } else {
                view[di][dj] = VIEW.AVAILABLE;
            }
            [di, dj] = dir(di, dj);
        }
    });

    // clean view
    if (view.some(row => row.includes(VIEW.NECESSARY))) {
        return view.map(row => row.map(elem => {
            if (elem === VIEW.AVAILABLE) {
                elem = VIEW.EMPTY;
            }
            return elem;
        }));
    } else if (isWhiteTurn && isMinion(data[i][j])) {
        return view.map((row, di) => row.map((elem, dj) => {
            if (i < di) {
                elem = VIEW.EMPTY;
            }
            return elem;
        }));
    } else if (!isWhiteTurn && isMinion(data[i][j])) {
        return view.map((row, di) => row.map((elem, dj) => {
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
        const turn = this.state.isWhiteTurn;

        if (view[i][j] === VIEW.AVAILABLE) {

            // TODO: check if there is necessary move available

            this.move(i, j, this.previous.i, this.previous.j);
            this.setState({view: createEmptyView()});

        } else if (view[i][j] === VIEW.NECESSARY) {

            this.move(i, j, this.previous.i, this.previous.j, {
                i: i - (i >= this.previous.i ? 1 : -1),
                j: j - (j >= this.previous.j ? 1 : -1),
            });
            this.setState({view: createEmptyView()});

        } else if (isAlly(data[i][j], turn)) {

            this.previous = {
                i: i,
                j: j,
            };
            this.setState({
                view: createView(i, j, data, turn),
            });

        }
    }

    move(i, j, di, dj, dead) {

        // copy
        const data = this.state.data.slice();

        // check if piece becomes king
        if (this.state.isWhiteTurn && i === 0) {
            data[i][j] = DATA.WHITE_KING;
        } else if (!this.state.isWhiteTurn && i === (BOARD_SIZE - 1)) {
            data[i][j] = DATA.BLACK_KING;
        } else {
            data[i][j] = data[di][dj];
        }

        // kill
        if (dead !== undefined) {
            data[dead.i][dead.j] = DATA.EMPTY;
            // TODO: check if can kill again
        }

        // clear old field after
        data[di][dj] = DATA.EMPTY;

        this.setState({
            data: data,
            isWhiteTurn: !this.state.isWhiteTurn,
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
