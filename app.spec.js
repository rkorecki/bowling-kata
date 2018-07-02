const Game = require('./app.js');

describe('Bowling Game', () => {

    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('return a Number', () => {
        game.roll(0);
        expect(game.score()).toEqual(expect.any(Number));
    });

    ["", true, undefined, NaN, {}, Function]
        .forEach( type => {
            test(`0 points when invalid param type: "${type}"`, () => {
                game.roll(type);
                expect(game.score()).toBe(0);
            })
        });

    test('0 points when incorrect number of points', () => {
        [11,-1].forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(0);
    });

    test('0 points when float', () => {
        game.roll(5.5);
        expect(game.score()).toBe(0);
    });

    test('10 frames 0 points', () => {
        for(let i = 20; i; i--) game.roll(0);
        expect(game.score()).toBe(0);
    });

    test('bonus for spare', () => {
        [5,5, 3].forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(16);
    });

    test('bonus for strike', () => {
        [10, 5,3].forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(26);
    });

    test('max score', () => {
        for(let i = 12; i; i--) game.roll(10);
        expect(game.score()).toBe(300);
    });

    test('spare in the middle', () => {
        [1,2, 3,4, 5,1, 7,3, 1,2, 1,2, 1,2, 1,2, 1,2, 1,2]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(45);
    });

    test('spare in the end', () => {
        [1,2, 3,4, 5,1, 1,2, 1,2, 1,2, 1,2, 1,2, 1,2, 7,3, 1]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(45);
    });

    test('spare in the end & max bonus roll', () => {
        [1,2, 3,4, 5,1, 1,2, 1,2, 1,2, 1,2, 1,2, 1,2, 7,3, 10]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(54);
    });

    test('spare in the middle & in the end', () => {
        [1,2, 3,4, 5,1, 5,5, 1,2, 1,2, 1,2, 1,2, 1,2, 7,3, 10]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(62);
    });

    test('strike in the middle', () => {
        [1,2, 3,4, 5,1, 10, 1,2, 1,2, 1,2, 1,2, 1,2, 1,2]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(47);
    });

    test('strike in the end', () => {
        [1,2, 3,4, 5,1, 1,2, 1,2, 1,2, 1,2, 1,2, 1,2, 10, 4, 5]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(53);
    });

    test('strike in the end & max bonus rolls', () => {
        [1,2, 3,4, 5,1, 1,2, 1,2, 1,2, 1,2, 1,2, 1,2, 10, 10, 10]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(64);
    });

    test('strike in the middle & in the end', () => {
        [1,2, 3,4, 5,1, 10, 1,8, 1,2, 1,2, 1,2, 1,2, 10, 4, 5]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(75);
    });

    test('strikes, spares, 0 points in frames', () => {
        [10, 3,4, 0,0, 10, 0,0, 7,2, 1,9, 10, 10, 10, 8, 3]
            .forEach( shot => game.roll(shot) );
        expect(game.score()).toBe(142);
    });

});
