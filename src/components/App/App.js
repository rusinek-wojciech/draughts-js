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
        const initView = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        this.state = {
            data: initData,
            view: initView,
            whiteNext: true,
            rotated: false,
        };
    }


    isBlackPlayer(i, j) {
        return this.state.data[i][j] === 1 && !this.state.whiteNext;
    }

    isWhitePlayer(i, j) {
        return this.state.data[i][j] === 2 && this.state.whiteNext;
    }

    isMoveDiagonal(i, j, di, dj) {
        return (j + di === dj + i) || (j + i === dj + di);
    }

    resetView() {
        return Array(8).fill(null).map(() => Array(8).fill(0));
    }

    handleClick(i, j) {
        if (this.isWhitePlayer(i, j) || this.isBlackPlayer(i, j)) {

            // calculate view
            const view = this.resetView();
            view[i][j] = 1;
            for (let k = 0; k < 8; k++) {
                for (let l = 0; l < 8; l++) {
                    if (this.isMoveDiagonal(i, j, k, l) && this.state.data[k][l] === 0) {
                        view[k][l] = 2;
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

        } else if (this.state.view[i][j] === 2) {

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
        data[di][dj] = 0;
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
