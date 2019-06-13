class Checkers {
    constructor(options) {
        this.checkers = options.checkers;

        this.draw();
    }
    draw() {
        let counter = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let elem = document.createElement('div');
                elem.classList.add('field');
                elem.setAttribute('data-x', j);
                elem.setAttribute('data-y', i);
                if (counter%2 == 0) elem.classList.add('black_field');
                this.checkers.appendChild(elem);
                counter++;
            }
            counter++;
        }
    }
}

const myCheckers = new Checkers({
    checkers: document.getElementById('checkers')
})