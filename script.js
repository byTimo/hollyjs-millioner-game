class Storage {
    static save(name, email, score) {
        const data = Storage.select();
        data[name] = {
            name,
            email,
            score
        }

        localStorage.setItem("data", JSON.stringify(data));
    }

    static get(name) {
        const data = Storage.select();
        return data[name] || null;
    }

    static select() {
        const data = localStorage.getItem("data")
        return data ? JSON.parse(data) : {};
    }
}

class Dispatcher {
    constructor() {
        this.listeners = {};
    }

    attach(message, callback) {
        this.listeners[message] = callback;
    }

    deattach(message) {
        delete this.listeners[message];
    }

    push(message, parameter) {
        this.listeners[message](parameter);
    }
}

class Timer {
    constructor(time, callback) {
        this.time = time;
        this.callback = callback;
        this.interval = 0;
        this.state = time;
    }

    start() {
        clearInterval(this.interval);
        this.callback(this.state);
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    restart() {
        clearInterval(this.interval);
        this.state = this.time;
        this.callback(this.state);
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.state -= 1000;
        this.callback(this.state);
    }
}

class Game {
    constructor(config, levels) {
        this.config = config;
        this.level = levels[config.level];
        this.dispatcher = new Dispatcher();
    }

    push(message, parameter) {
        this.dispatcher.push(message, parameter);
    }

    async run() {
        while (true) {
            const user = await new RegistraionPage(this.dispatcher).run();
            const result = await new GamePage(this.dispatcher, user, this.config, this.level).run();
            Storage.save(result.name, result.email, result.score);
            await new ResultPage(this.dispatcher, result).run();
        }
    }
}

class RegistraionPage {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
        this.resolver = null;
        this.page = document.querySelector(".registration");
        this.form = document.querySelector(".form");
    }

    run() {
        this.dispatcher.attach("register", this.register.bind(this))
        this.page.style.display = "block";
        return new Promise(resolve => this.resolver = resolve);
    }

    end(user) {
        this.dispatcher.deattach("register");
        this.page.style.display = "none";
        this.form.reset();
        this.resolver(user);
    }

    register() {
        const data = new FormData(this.form);
        const user = {};
        for (let [key, value] of data.entries()) {
            user[key] = value;
        }

        if (user.name && user.email) {
            this.end(user);
        }
    }
}

class GamePage {
    constructor(dispatcher, user, config, tasks) {
        this.resolver = null;
        this.dispatcher = dispatcher;
        this.result = {
            name: user.name,
            email: user.email,
            score: 0
        }
        this.rounds = [...tasks];
        this.currentRoundIndex = 0;

        this.page = document.querySelector(".game");
        this.taskContainer = document.querySelector(".task");
        this.answerContainers = [1, 2, 3, 4].map(x => document.querySelector(`.answer-${x}`));

        this.timer = new Timer(config.time, this.timerTick.bind(this))
        this.timerAnimation = document.querySelector(".timer");
        this.timerNumber = document.querySelector(".timerNumber > div");
    }

    timerTick(time) {
        this.timerNumber.textContent = time / 1000;
        if(time <= 0){
            this.timer.stop();
            this.end();
        }
    }

    run() {
        this.dispatcher.attach("answer", this.answer.bind(this))
        this.page.style.display = "block";
        this.renderRound(0)
        return new Promise(resolve => this.resolver = resolve);
    }

    end() {
        this.dispatcher.deattach("answer");
        this.clearTask();
        this.page.style.display = "none";
        this.resolver(this.result)
    }

    answer(number) {
        this.timer.stop();
        this.stopAnimation();
        const round = this.rounds[this.currentRoundIndex];
        round.rightAnswer === number ? this.nextRound(number, round.factor) : this.loose(round.rightAnswer, number);
    }

    startAnimation() {
        this.timerAnimation.style.display = "block";
    }

    stopAnimation() {
        this.timerAnimation.style.display = "none";
    }

    nextRound(number, factor) {
        this.answerContainers[number].classList.toggle("good");
        this.result.score += factor;
        this.currentRoundIndex++;
        setTimeout(() => {
            this.answerContainers[number].classList.toggle("good");
            if (this.currentRoundIndex === this.rounds.length) {
                return this.end();
            }
            this.renderRound(this.currentRoundIndex);
        }, 1000)
    }

    loose(rightAnswer, number) {
        this.answerContainers[number].classList.toggle("bad");
        this.answerContainers[rightAnswer].classList.toggle("good");
        setTimeout(() => {
            this.answerContainers[number].classList.toggle("bad");
            this.answerContainers[rightAnswer].classList.toggle("good");
            this.end()
        }, 1000);
    }

    renderRound(number) {
        this.clearTask();
        this.taskContainer.appendChild(this.createTaskTag(this.rounds[number]));
        this.rounds[number].answers.map((x, i) => this.answerContainers[i].textContent = x);
        this.timer.restart();
        this.startAnimation();
    }

    clearTask() {
        if (this.taskContainer.firstChild) {
            this.taskContainer.removeChild(this.taskContainer.firstChild);
        }
    }

    createTaskTag(task) {
        if (task.src) {
            const img = document.createElement("img");
            img.src = task.src;
            return img;
        }

        const p = document.createElement("p");
        p.textContent = task.task;
        return p;
    }
}

class ResultPage {
    constructor(dispatcher, result) {
        this.resolver = null;
        this.dispatcher = dispatcher;
        this.result = result;
        this.page = document.querySelector(".gameover");
        this.resultContainer = document.querySelector(".result");
    }

    run() {
        this.dispatcher.attach("end", this.end.bind(this));
        this.page.style.display = "block";
        this.resultContainer.textContent = this.result.score;
        return new Promise(resolve => this.resolver = resolve);
    }

    end() {
        this.dispatcher.deattach("end");
        this.page.style.display = "none";
        this.resolver();
    }
}

const game = new Game(config, levels);
game.run();