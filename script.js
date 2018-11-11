const phrases = [
    "Это полюбому {answer}.",
    "Я вчера об этом думал! Это точно {answer}.",
    "Кончно же это {answer}. Это же все знают!",
    "Вчера говорил с Обамой. Он думает, что это {answer}.",
    "Это сложно, я не знаю ответа.",
    "Когда то давно люди считали, что это {answer}. Наверно ничего не изменилось."
];

function random(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
}

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
            const user = await new RegistrationPage(this.dispatcher).run();
            const result = await new GamePage(this.dispatcher, user, this.config, this.level).run();
            Storage.save(result.name, result.email, result.score);
            await new ResultPage(this.dispatcher, result).run();
        }
    }
}

class RegistrationPage {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
        this.resolver = null;
        this.page = document.querySelector(".registration");
        this.form = document.querySelector(".form");
    }

    run() {
        this.dispatcher.attach("register", this.register.bind(this))
        this.page.classList.remove("invisible");
        return new Promise(resolve => this.resolver = resolve);
    }

    end(user) {
        this.dispatcher.deattach("register");
        this.page.classList.add("invisible")
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

class Timer {
    constructor(time, lostCallback) {
        this.spiner = document.querySelector(".spiner");
        this.inner = document.querySelector(".spinner-inner");
        this.mask = document.querySelector(".spinner-mask");
        this.maskTwo = document.querySelector(".spinner-mask-two");
        this.timer = document.querySelector(".timer");

        this.time = time;
        this.callback = lostCallback;
        this.interval = 0;
    }

    start() {
        clearInterval(this.interval);
        this.state = this.time;
        this.timer.textContent = this.time / 1000;
        this.interval = setInterval(this.tick.bind(this), 1000);
        this.startAnimation();
    }

    startAnimation() {
        this.inner.style.animation = `inner ${this.time / 1000}s linear`;
        this.mask.style.animation = `mask ${this.time / 1000}s linear`;
        this.maskTwo.style.animation = `mask-two ${this.time / 1000}s linear`;
    }

    stop() {
        this.stopAnimation();
        clearInterval(this.interval);
    }

    stopAnimation() {
        this.inner.style.animationPlayState = "paused";
        this.mask.style.animationPlayState = "paused";
        this.maskTwo.style.animationPlayState = "paused";
        setTimeout(() => {
            this.inner.style.animation = undefined;
            this.mask.style.animation = undefined;
            this.maskTwo.style.animation = undefined;
        }, 750)
    }

    tick() {
        this.state -= 1000;
        this.timer.textContent = this.state / 1000;
        if (this.state <= 0) {
            this.stop();
            this.callback();
        }
    }
}


class AnswerButton {
    constructor(dom) {
        this.dom = dom;
        this.reset();
    }

    disable() {
        this.isDisabled = true;
        this.dom.classList.add("disabled");
    }

    setAnswer(index, text, isRight) {
        this.isDisabled = false;
        this.dom.classList.remove("disabled");
        this.index = index;
        this.isRight = isRight;
        this.dom.textContent = text;
    }

    good() {
        this.setState("good");
    }

    bad() {
        this.setState("bad");
    }

    setState(state) {
        this.reset();
        this.dom.classList.add(state);
    }

    reset() {
        this.dom.classList.remove("good");
        this.dom.classList.remove("bad");
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
        this.answers = [1, 2, 3, 4].map(x => new AnswerButton(document.querySelector(`.answer-${x}`)));
        this.help5050Button = document.querySelector(".help5050");
        this.helpPersonButton = document.querySelector(".helpPerson");
        this.persons = [
            document.querySelector("#bill"),
            document.querySelector("#dan"),
            document.querySelector("#elon"),
            document.querySelector("#pavel"),
            document.querySelector("#zuck"),
        ];
        this.personPhrase = document.querySelector(".personPhrase");
        this.timer = new Timer(config.time, this.end.bind(this));
    }

    initializeView() {
        this.help5050Button.classList.remove("invisible");
        this.helpPersonButton.classList.remove("invisible");
        this.dispatcher.attach("5050", this.help5050.bind(this));
        this.dispatcher.attach("person", this.helpPerson.bind(this));
        this.page.classList.remove("invisible");
    }

    run() {
        this.initializeView();
        this.renderRound(0);
        return new Promise(resolve => this.resolver = resolve);
    }

    end() {
        this.timer.stop();
        this.dispatcher.deattach("5050");
        this.dispatcher.deattach("person");
        this.clearTask();
        this.page.classList.add("invisible");
        this.resolver(this.result)
    }

    answer(number) {
        if (this.answers[number].isDisabled) {
            return;
        }
        this.timer.stop();
        this.dispatcher.deattach("answer");
        const round = this.rounds[this.currentRoundIndex];
        round.rightAnswer === number ? this.nextRound(number, round.factor) : this.loose(round.rightAnswer, number);
    }

    nextRound(number, factor) {
        this.answers[number].good();
        this.result.score += factor;
        this.currentRoundIndex++;
        setTimeout(() => {
            this.answers[number].reset();
            if (this.currentRoundIndex === this.rounds.length) {
                return this.end();
            }
            this.renderRound(this.currentRoundIndex);
        }, 1000)
    }

    loose(rightAnswer, number) {
        this.answers[number].bad();
        this.answers[rightAnswer].good();
        setTimeout(() => {
            this.answers[number].reset();
            this.answers[number].reset();
            this.end()
        }, 2000);
    }

    renderRound(number) {
        this.clearTask();
        this.taskContainer.appendChild(this.createTaskTag(this.rounds[number]));
        this.rounds[number].answers.map((x, i) => this.answers[i].setAnswer(i, x, i === this.rounds[number].rightAnswer));
        this.timer.start();
        this.dispatcher.attach("answer", this.answer.bind(this));
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

    help5050() {
        this.help5050Button.classList.add("invisible");
        const firstWrongAnswer = this.answers.filter(x => !x.isRight)[random(0, 3)];
        const secondWrongAnswer = this.answers.filter(x => !x.isRight && x.index !== firstWrongAnswer.index)[random(0, 2)];
        firstWrongAnswer.disable();
        secondWrongAnswer.disable();
    }

    helpPerson() {
        this.helpPersonButton.classList.add("invisible");
        const one = this.persons[random(0, 4)];
        const variants = this.answers.filter(x => !x.isDisabled);
        const answer = variants[random(0, variants.length - 1)];
        this.personPhrase.textContent = phrases[random(0, phrases.length - 1)].replace(/{answer}/, answer.dom.textContent);
        this.personPhrase.classList.add("visit");
        one.classList.add("visit");
        setTimeout(() => {
            one.classList.remove("visit");
            this.personPhrase.classList.remove("visit");
            this.personPhrase.textContent = "";
        }, 4000);
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
        this.page.classList.remove("invisible");
        this.resultContainer.textContent = this.result.score;
        return new Promise(resolve => this.resolver = resolve);
    }

    end() {
        this.dispatcher.deattach("end");
        this.page.classList.add("invisible");
        this.resolver();
    }
}

const game = new Game(config, levels);
game.run();