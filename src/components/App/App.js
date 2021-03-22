import logo from '../../images/logo.svg';
import './App.css';
import Board from '../Board/Board';
import React from 'react';

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

    handleClick(i, j) {
        if (this.state.data[i][j] === 0) {
            this.move(i, j, this.state.di, this.state.dj);
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
                    <img src={logo} className="app-logo" alt="logo" />
                </header>
                <main>
                    <Board className="board" data={this.state.data} onClick={(i, j) => this.handleClick(i, j)}/>
                </main>
            </div>
        );
    }
}

export default App;
