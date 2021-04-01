/* constants */

export const DATA = Object.freeze({
    'EMPTY': 0,
    'BLACK': 1,
    'WHITE': 2,
    'BLACK_KING': 3,
    'WHITE_KING': 4,
});

export const VIEW = Object.freeze({
    'EMPTY': 0,
    'ACTUAL': 1,
    'AVAILABLE': 2,
    'NECESSARY': 3,
    'KILLABLE': 4,
});

export const GAMEMODE = Object.freeze({
    'VS_PLAYER': 0,
    'VS_AI': 1,
});

export const INIT_DATA = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
];

export const BOARD_SIZE = 8;