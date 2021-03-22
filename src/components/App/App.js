import './App.css';
import Board from '../Board/Board';
import React from 'react';

/*
white player - 2
black player - 1
empty - 0
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        const initData = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
        ];
        this.state = {
            data: initData,
            whiteNext: true,
            di: 0,
            dj: 0,
        };
    }

    isPlayerLegal() {
        const white = this.state.data[this.state.di][this.state.dj] === 2 && this.state.whiteNext;
        const black = this.state.data[this.state.di][this.state.dj] === 1 && !this.state.whiteNext;
        return white || black;
    }

    isMoveLegal(i, j) {
        const di = this.state.di;
        const dj = this.state.dj;
        return (j + di === dj + i) || (j + i === dj + di);
    }

    handleClick(i, j) {
        if (this.state.data[i][j] === 0) {
            if (this.isPlayerLegal() && this.isMoveLegal(i, j)) {
                this.move(i, j, this.state.di, this.state.dj);
            }
        } else {
            this.setState({
                di: i,
                dj: j,
            });
        }
    }

    move(x, y, dx, dy) {
        const data = this.state.data.slice();
        data[x][y] = data[dx][dy];
        data[dx][dy] = 0;
        this.setState({
            data: data,
            whiteNext: !this.state.whiteNext,
        });
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1>Draughts game!</h1>
                </header>
                <main>
                    <Board
                        className="board"
                        onClick={(i, j) => this.handleClick(i, j)}
                        data={this.state.data}
                    />
                    <p>{this.state.whiteNext ? 'White round' : 'Black round'}</p>
                </main>
            </div>
        );
    }

}

export default App;
