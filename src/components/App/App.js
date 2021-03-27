import './App.css';
import Board from '../Board/Board';
import React from 'react';
import {DATA, VIEW, INIT_DATA, BOARD_SIZE} from '../../config/enum';
import View from "../../logic/View";

/**
 * Main component with game logic
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: INIT_DATA,
            views: this.createViews(INIT_DATA, true),
            isWhiteTurn: true,
            rotated: false,
            i: 0,
            j: 0,
        };
    }

    createViews(data, isWhiteTurn) {
        const views = [];
        data.forEach((row, i) =>
            row.forEach((elem, j) =>
                views[[i, j]] = new View(i, j, data, isWhiteTurn)));
        return views;
    }

    handleClick(i, j) {

        const view = this.state.views[[this.state.i, this.state.j]];
        const data = this.state.data;
        const isWhiteTurn = this.state.isWhiteTurn;

        if (view.matrix[i][j] === VIEW.AVAILABLE) {


            // if (canKillTurn) {
            //     return;
            // }
            // check if piece becomes king
            if (isWhiteTurn && i === 0) {
                data[i][j] = DATA.WHITE_KING;
            } else if (!isWhiteTurn && i === (BOARD_SIZE - 1)) {
                data[i][j] = DATA.BLACK_KING;
            } else {
                data[i][j] = data[this.state.i][this.state.j];
            }
            data[this.state.i][this.state.j] = DATA.EMPTY;
            this.setState({
                data: data,
                isWhiteTurn: !isWhiteTurn,
                views: this.createViews(data, !isWhiteTurn),
                i: 0,
                j: 0,
            });

        } else if (view.matrix[i][j] === VIEW.NECESSARY) {

            let dead;
            const iIterator = i >= this.state.i ? 1 : -1;
            const jIterator = j >= this.state.j ? 1 : -1;
            let x = i;
            let y = j;
            while (x !== this.state.i || y !== this.state.j) {
                x -= iIterator;
                y -= jIterator
                if (view.matrix[x][y] === VIEW.KILLABLE) {
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
                data[i][j] = data[this.state.i][this.state.j];
            }

            // kill
            data[dead.i][dead.j] = DATA.EMPTY;

            // update view after kill
            const views = this.state.views;
            const result = new View(i, j, data, isWhiteTurn);
            views[[i, j]] = result;

            // clear old field after
            data[this.state.i][this.state.j] = DATA.EMPTY;
            if (result.requireKill) {
                this.setState({
                    data: data,
                    views: views,
                });
                return;
            }
            this.setState({
                data: data,
                isWhiteTurn: !isWhiteTurn,
                views: this.createViews(data, !isWhiteTurn),
            });
        } else {
            this.setState({
                i: i,
                j: j,
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
                        view={this.state.views[[this.state.i, this.state.j]].matrix}
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
