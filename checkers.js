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
    step(team) {                        // Метод, задающий обработчик для нажатия на шашку                                                       
        let y = 0;                                                     
        this.checkers.onclick =  (e) =>  {                             
            this.clear('active_field');                                
            this.currentCheck = e.target.closest(`.${team}`)
            if (this.currentCheck) {
                this.addActiveField(this.currentCheck);
                this.confirm();
            }
        }
    }
    confirm() {                         // Метод, перемещающий шашку на возможный ход, в противном случае подсвечивает ходы для другой шашки
        this.checkers.onclick = (e) => {
            if (e.target.closest('.active_field')) {
                e.target.appendChild(this.currentCheck);
                this.clear('active_field');
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
    clear(select) {                     // Метод удаления заданного класса
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
        this.coordX = +current.closest('.field').dataset.x;
        this.coordY = +current.closest('.field').dataset.y;
            if (this.team == 'w') {
                this.coordY += 1; 
            } else {
                this.coordY -= 1;
            }
            let activeField;
            for (let i = -1; i < 2; i+=2) {
                if (this.coordX+i < 0 || this.coordX+i >7) continue;
                activeField = document.querySelector(`div[data-y="${this.coordY}"][data-x="${this.coordX+i}"]`);
                if (activeField.children.length) continue;
                activeField.classList.add('active_field');
            }
            if (activeField) {
                this.confirm();
            }
    }
}

const myCheckers = new Checkers({
    checkers: document.getElementById('checkers')
})