import './App.css';
import Board from '../Board/Board';
import React from 'react';
import {DATA, VIEW, INIT_DATA, BOARD_SIZE, GAMEMODE} from '../../config/enum';
import View, {isEnemy} from "../../logic/View";
import {createEmptyMatrix} from "../../logic/View";
import Menu from "../Menu/Menu";

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Main component with game logic
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        const data = JSON.parse(JSON.stringify(INIT_DATA));
        this.views = this.createViews(data, true);
        this.state = {
            data: data,
            isWhiteTurn: true,
            rotated: false,
            view: this.views[0][0],
            isWinner: true,
        };
    }

    isWinner(data, isWhiteTurn) {
        let counter = 0;
        data.forEach(row => row.forEach(elem => {
            if (isEnemy(elem, isWhiteTurn)) {
                counter++;
            }
        }));
        if (counter === 0) {
            this.winner = isWhiteTurn ? 'The winner is WHITE!' : 'The winner is BLACK!';
            return true;
        }
        return false;
    }

    createViews(data, isWhiteTurn) {
        const views = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            views.push([]);
            for (let j = 0; j < BOARD_SIZE; j++) {
                views[i][j] = new View(i, j, data, isWhiteTurn);
            }
        }
        return views;
    }

    move(i, j, data, view, isWhiteTurn) {
        if (isWhiteTurn && i === 0) {
            data[i][j] = DATA.WHITE_KING;
        } else if (!isWhiteTurn && i === (BOARD_SIZE - 1)) {
            data[i][j] = DATA.BLACK_KING;
        } else {
            data[i][j] = data[view.i][view.j];
        }
        data[view.i][view.j] = DATA.EMPTY;
    }

    kill(i, j, data, view) {
        const iIterator = i >= view.i ? 1 : -1;
        const jIterator = j >= view.j ? 1 : -1;
        let [x, y] = [i, j];
        while (x !== view.i || y !== view.j) {
            x -= iIterator;
            y -= jIterator
            if (view.matrix[x][y] === VIEW.KILLABLE) {
                data[x][y] = DATA.EMPTY;
                break;
            }
        }
    }

    changePlayer(data, isWhiteTurn) {
        if (this.state.mode === GAMEMODE.VS_PLAYER) {
            this.views = this.createViews(data, !isWhiteTurn);
            this.setState({
                data: data,
                isWhiteTurn: !isWhiteTurn,
                view: this.views[0][0],
            });
        } else if (this.state.mode === GAMEMODE.VS_AI) {

            isWhiteTurn = !isWhiteTurn;

            const views = this.createViews(data, isWhiteTurn);

            // create tip matrix with required moves
            const killable = [];
            const available = [];

            let requireKill = false;
            views.forEach(row => {
                row.forEach(view => {
                    view.matrix.forEach((row, x) => {
                        row.forEach((elem, y) => {
                            if (elem === VIEW.NECESSARY) {
                                requireKill = true;
                                killable.push({
                                    view: view,
                                    i: x,
                                    j: y,
                                });
                            } else if (elem === VIEW.AVAILABLE) {
                                available.push({
                                    view: view,
                                    i: x,
                                    j: y,
                                });
                            }
                        });
                    });
                });
            });

            if (requireKill) {
                const obj = killable[getRandomInt(0, killable.length - 1)];
                this.kill(obj.i, obj.j, data, obj.view);
                this.move(obj.i, obj.j, data, obj.view, isWhiteTurn);

                // check if minion can kill again
                views[obj.i][obj.j] = new View(obj.i, obj.j, data, isWhiteTurn);
                obj.view = views[obj.i][obj.j];
                views[obj.view.i][obj.view.j] = new View(obj.view.i, obj.view.j, data, isWhiteTurn);
                while (views[obj.i][obj.j].requireKill) {
                    // this.setState({
                    //     data: data,
                    // });

                    views[obj.i][obj.j].matrix.forEach((row, x) => {
                        row.forEach((elem, y) => {
                            if (elem === VIEW.NECESSARY) {
                                obj.i = x;
                                obj.j = y;
                            }
                        });
                    });

                    this.kill(obj.i, obj.j, data, obj.view);
                    this.move(obj.i, obj.j, data, obj.view, isWhiteTurn);

                    views[obj.i][obj.j] = new View(obj.i, obj.j, data, isWhiteTurn);
                    obj.view = views[obj.i][obj.j];
                    views[obj.view.i][obj.view.j] = new View(obj.view.i, obj.view.j, data, isWhiteTurn);
                }

            } else {
                const obj = available[getRandomInt(0, available.length - 1)];
                this.move(obj.i, obj.j, data, obj.view, isWhiteTurn);
            }

            if (this.isWinner(data, isWhiteTurn)) {
                this.setState({isWinner: true});
                return;
            }

            this.views = this.createViews(data, !isWhiteTurn);
            this.setState({
                data: data,
                isWhiteTurn: !isWhiteTurn,
                view: this.views[0][0],
            });

        }
    }

    handleClick(i, j) {

        const view = this.state.view;
        const data = this.state.data;
        const isWhiteTurn = this.state.isWhiteTurn;

        if (view.matrix[i][j] === VIEW.AVAILABLE) { // move ally minion

            // create tip matrix with required moves
            const temp = createEmptyMatrix();
            let requireKill = false;

            this.views.forEach(row => {
               row.forEach(view => {
                   if (view.requireKill) {
                       requireKill = true;
                       view.matrix.forEach((row, x) => {
                          row.forEach((elem, y) => {
                              if (elem === VIEW.ACTUAL || elem === VIEW.KILLABLE) {
                                  temp[x][y] = elem;
                              }
                          });
                       });
                   }
               });
            });

            if (requireKill) {
                const result = view;
                result.matrix = temp;
                this.setState({
                    view: result,
                });
                return;
            }

            this.move(i, j, data, view, isWhiteTurn);

            if (this.isWinner(data, isWhiteTurn)) {
                this.setState({isWinner: true});
                return;
            }

            this.changePlayer(data, isWhiteTurn);

        } else if (view.matrix[i][j] === VIEW.NECESSARY) { // kill enemy minion and move

            this.kill(i, j, data, view);
            this.move(i, j, data, view, isWhiteTurn);

            // check if minion can kill again
            this.views[i][j] = new View(i, j, data, isWhiteTurn);
            this.views[view.i][view.j] = new View(view.i, view.j, data, isWhiteTurn);
            if (this.views[i][j].requireKill) {
                this.setState({
                    data: data,
                    view: this.views[i][j],
                });
            } else {

                if (this.isWinner(data, isWhiteTurn)) {
                    this.setState({isWinner: true});
                    return;
                }

                this.changePlayer(data, isWhiteTurn);
            }

        } else { // change view
            this.setState({view: this.views[i][j]});
        }

    }

    rotate() {
        this.setState({rotated: !this.state.rotated});
    }

    againstPlayer() {
        const data = JSON.parse(JSON.stringify(INIT_DATA));
        this.views = this.createViews(data, true);
        this.setState({
            data: data,
            isWhiteTurn: true,
            rotated: false,
            view: this.views[0][0],
            isWinner: false,
            mode: GAMEMODE.VS_PLAYER,
        });
    }

    againstAI() {
        const data = JSON.parse(JSON.stringify(INIT_DATA));
        this.views = this.createViews(data, true);
        this.setState({
            data: data,
            isWhiteTurn: true,
            rotated: false,
            view: this.views[0][0],
            isWinner: false,
            mode: GAMEMODE.VS_AI,
        });
    }

    render() {
        const isWinner = this.state.isWinner;
        return (
            <div className="app">
                <header className="app-header">
                    <h1>Draughts game!</h1>
                </header>
                <main>
                    <Board
                        onClick={isWinner ? () => {} : (i, j) => this.handleClick(i, j)}
                        data={this.state.data}
                        view={this.state.view.matrix}
                        classes={this.state.rotated ? 'board rotated' : ''}
                    />
                    <p>{this.state.isWhiteTurn ? 'White round' : 'Black round'}</p>
                    <Menu
                        isWinner={isWinner}
                        msg={this.winner}
                        onClick={{
                            againstPlayer: () => this.againstPlayer(),
                            againstAI: () => this.againstAI(),
                        }}
                    />
                    <button onClick={() => this.rotate()} >Rotate board</button>
                </main>
            </div>
        );
    }
}

export default App;
