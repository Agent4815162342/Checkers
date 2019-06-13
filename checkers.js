class Checkers {
    constructor(options) {
        this.checkers = options.checkers;
        this.team = 'w';
        this.draw();
        this.step();
    }
    draw() {
        let counter = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let elem = document.createElement('div');
                elem.classList.add('field');
                elem.setAttribute('data-x', j);
                elem.setAttribute('data-y', i);
                if (counter%2 == 0) {
                    elem.classList.add('black_field');
                    let check = document.createElement('div');
                    if (i < 3) check.classList.add('w');
                    else if (i > 4) check.classList.add('b');
                    else check = null;
                    if (check) elem.appendChild(check);
                }
                this.checkers.appendChild(elem);
                counter++;
            }
            counter++;
        }
    }
    step() {
        let y = 0;
        this.checkers.onclick =  (e) =>  {
            this.clear('active_field');
            let coordX = +e.target.closest('.field').dataset.x;
            let coordY = +e.target.closest('.field').dataset.y;
            if (e.target.closest(`.${this.team}`)) {
                if (this.team == 'w') {
                    coordY += 1; 
                } else {
                    coordY -= 1;
                }
                for (let i = -1; i < 2; i+=2) {
                    if (coordX+i < 0 || coordX+i >7) continue;
                    let activeField = document.querySelector(`div[data-y="${coordY}"][data-x="${coordX+i}"]`);
                    if (activeField.children.length) continue;
                    activeField.classList.add('active_field');
                }
            }
        }
    }
    clear(select) {
        let elems = document.querySelectorAll(`.${select}`);
        elems.forEach((el) => {
            el.classList.remove(select);
        })
    }
}

const myCheckers = new Checkers({
    checkers: document.getElementById('checkers')
})