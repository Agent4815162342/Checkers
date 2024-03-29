class Checkers {
    constructor(options) {
        this.checkers = options.checkers;
        this.team = 'w';
        this.currentCheck = 0;
        this.draw();
        this.step(this.team);
    }
    draw() {                            // Метод, рисующий поле
        let counter = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let elem = document.createElement('div');
                elem.classList.add('field');
                elem.setAttribute('data-x', j);
                elem.setAttribute('data-y', i);
                if (counter % 2 == 0) {
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
    step(team) {                        // Метод, задающий обработчик для нажатия на шашку                                                                                                            
        this.checkers.onclick = (e) => {
            this.clear('active_field');
            this.currentCheck = e.target.closest(`.${team}`)
            if (this.currentCheck) {
                this.addActiveField(this.currentCheck);
            }
        }
    }
    confirm() {                         // Метод, перемещающий шашку на возможный ход, в противном случае подсвечивает ходы для другой шашки
        this.checkers.onclick = (e) => {
            if (e.target.closest('.active_field')) {
                e.target.appendChild(this.currentCheck);
                this.clear('active_field');
                this.clear('eat');
                this.toggleTeam();
                this.step(this.team);
            } else if (e.target.closest(`.${this.team}`)) {
                this.clear('active_field');
                this.currentCheck = e.target.closest(`.${this.team}`);
                this.addActiveField(this.currentCheck);
            } else {
                return;
            }
        }
    }
    clear(select) {                     // Метод удаления заданного класса(добавить ввод классов через апятую!)
        let elems = document.querySelectorAll(`.${select}`);
        elems.forEach((el) => {
            el.classList.remove(select);
        })
    }
    toggleTeam() {                      // Метод смены команды (белые/черные)
        if (this.team == 'w') {
            this.team = 'b';
        } else {
            this.team = 'w';
        }
    }
    addActiveField(current) {           // Метод, подссвечивающий активные ходы
        this.clear('eat');
        this.coordX = +current.parentNode.dataset.x;
        this.coordY = +current.parentNode.dataset.y;
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                if (this.coordX + i < 0 || this.coordX + i > 7 || this.coordY + j < 0 || this.coordY + j > 7) continue;
                let potentialField = document.querySelector(`div[data-y="${this.coordY + j}"][data-x="${this.coordX + i}"]`);
                if (potentialField.children.length > 0 && !potentialField.children[0].classList.contains(this.team)) {
                    this.eat.call(this, potentialField);
                } else if (this.team == 'w' && j == -1) {
                    continue;
                } else if (this.team == 'b' && j == 1) {
                    continue;
                } else {
                    if (!document.querySelector('.eat') && potentialField.children.length == 0) {
                        potentialField.classList.add('active_field');
                        this.confirm.call(this);
                    }
                }
            }
        }
    }
    eat(field) {
        this.currentField = this.currentCheck.parentNode;
        let shiftX = +field.dataset.x - +this.currentField.dataset.x;
        let shiftY = +field.dataset.y - +this.currentField.dataset.y;
        if (+field.dataset.y + shiftY < 0 || +field.dataset.y + shiftY > 7 || +field.dataset.x + shiftX < 0 || +field.dataset.x + shiftX > 7) return;
        let eatField = document.querySelector(`div[data-y="${+field.dataset.y + shiftY}"][data-x="${+field.dataset.x + shiftX}"]`);
        if (!eatField.children.length) {
            this.clear('active_field');
            eatField.classList.add('eat');
            eatField.onclick = this.eatConfirm.bind(this, eatField);

        }
    }
    eatConfirm(field) {
        this.clear('eat');
        this.checkers.onclick = null;
        let removedField = document.querySelector(`div[data-y="${(+field.dataset.y + +this.currentField.dataset.y) / 2}"][data-x="${(+field.dataset.x + +this.currentField.dataset.x) / 2}"]`);
        if (removedField != null && removedField.children.length > 0) {
            removedField.removeChild(removedField.children[0]);
            field.appendChild(this.currentCheck);
            this.addActiveField(this.currentCheck);
            this.currentCheck.onclick = null;
            let search = document.querySelectorAll('.eat');
            if (search.length == 0) {
                this.toggleTeam();
                this.step(this.team);
            }
        }

        field.onclick = null;
    }
}

const myCheckers = new Checkers({
    checkers: document.getElementById('checkers')
})

