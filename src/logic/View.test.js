import View, {createEmptyMatrix} from './View';
import {DATA, VIEW, BOARD_SIZE} from '../config/enum';

test('should create empty matrix', () => {
    const data = createEmptyMatrix();
    expect(data.length).toEqual(BOARD_SIZE);
    expect(data[BOARD_SIZE - 1].length).toEqual(BOARD_SIZE);
    data.forEach(row => row.forEach(elem => {
        expect(elem).toEqual(DATA.EMPTY);
        expect(elem).toEqual(VIEW.EMPTY);
    }));
});

test('should minion kill view from behind', () => {

    const data = createEmptyMatrix();
    data[0][1] = DATA.WHITE;
    data[1][2] = DATA.BLACK;

    const view = new View(0, 1, data, true);

    const expectation = createEmptyMatrix();
    expectation[0][1] = VIEW.ACTUAL;
    expectation[1][2] = VIEW.KILLABLE;
    expectation[2][3] = VIEW.NECESSARY;

    expect(view.matrix).toEqual(expectation);
    expect(view.requireKill).toEqual(true);
});

test('should king kill view', () => {

    const data = createEmptyMatrix();
    data[0][1] = DATA.WHITE_KING;
    data[3][4] = DATA.BLACK;
    data[6][7] = DATA.BLACK;

    const view = new View(0, 1, data, true);

    const expectation = createEmptyMatrix();
    expectation[0][1] = VIEW.ACTUAL;
    expectation[3][4] = VIEW.KILLABLE;
    expectation[4][5] = VIEW.NECESSARY;
    expectation[5][6] = VIEW.NECESSARY;

    expect(view.matrix).toEqual(expectation);
    expect(view.requireKill).toEqual(true);
});

test('should be green fields for black', () => {

    const data = createEmptyMatrix();
    data[3][4] = DATA.BLACK;

    const view = new View(3, 4, data, false);

    const expectation = createEmptyMatrix();
    expectation[3][4] = VIEW.ACTUAL;
    expectation[4][3] = VIEW.AVAILABLE;
    expectation[4][5] = VIEW.AVAILABLE;

    expect(view.matrix).toEqual(expectation);
    expect(view.requireKill).toEqual(false);
})

test('should be green fields for white', () => {

    const data = createEmptyMatrix();
    data[3][4] = DATA.WHITE;
    data[2][3] = DATA.WHITE_KING;

    const view = new View(3, 4, data, true);

    const expectation = createEmptyMatrix();
    expectation[3][4] = VIEW.ACTUAL;
    expectation[2][5] = VIEW.AVAILABLE;

    expect(view.matrix).toEqual(expectation);
    expect(view.requireKill).toEqual(false);
})