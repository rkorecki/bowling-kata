class Game {

    constructor() {
        this.shots = [];
    }

    roll(pins) {
        if (pins !== parseInt(pins) ||
            pins < 0 || 10 < pins)
            pins = 0;

        const i = this.shots.push(pins);

        if (pins === 10 && i%2 && i < 19) this.shots.push(null);
    }

    score() {
        return this.shots.reduce((score, next, i, arr) => {

            if (i%2 && i < 19 && arr[i-1] + next === 10)
                score += arr[i+1];

            if (next === null)
                score += arr[i+2] === null ? arr[i+3] : arr[i+2];

            return score + next;
        });
    }

}

module.exports = Game;