class Checkers {
    constructor(options) {
        this.checkers = options.checkers;
        this.team = 'w';
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
                if (i < 3 && elem.classList.contains('black_field')) {
                    let checker = document.createElement('div');
                    checker.classList.add('w');
                    elem.appendChild(checker);
                } else if (i > 4 && elem.classList.contains('black_field')) {
                    let checker = document.createElement('div');
                    checker.classList.add('b');
                    elem.appendChild(checker);
                }
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