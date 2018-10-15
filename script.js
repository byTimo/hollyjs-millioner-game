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

class Game {
    constructor(config, levels) {
        this.page = null;
        this.config = config;
        this.level = levels[config.level];
    }

    async run() {
        while (true) {
            this.page = new RegistraionPage();
            const user = await this.page.run();
            this.page = new GamePage(user, this.config, this.level);
            const result = await this.page.run();
            Storage.save(result.name, result.email, result.score);
            this.page = new ResultPage(result);
            await this.page.run();
        }
    }
}

class RegistraionPage {
    constructor() {
        this.resolver = null;
        this.dom = document.querySelector(".registration");
    }

    run() {
        this.dom.style.display = "block";
        return new Promise(resolve => this.resolver = resolve);
    }

    end() {
        const form = document.querySelector(".form");
        const data = new FormData(form);

        const user = {};
        for (let [key, value] of data.entries()) {
            user[key] = value;
        }

        this.dom.style.display = "none";
        this.resolver(user);
    }
}

class GamePage {
    constructor(user, config, tasks) {
        this.resolver = null;
        this.score = 0;
        this.user = user;
        this.config = config;
        this.tasks = [...tasks];
        this.task = 0;
        this.dom = document.querySelector(".game");
        this.taskDom = document.querySelector(".task");
        this.answerDoms = [1, 2, 3, 4].map(x => document.querySelector(`.answer-${x}`));
    }

    run() {
        this.dom.style.display = "block";
        this.renderTask()
        return new Promise(resolve => this.resolver = resolve);
    }

    end() {
        if (this.taskDom.firstChild) {
            this.taskDom.removeChild(this.taskDom.firstChild);
        }
        this.dom.style.display = "none";
        this.resolver({
            name: this.user.name,
            email: this.user.email,
            score: this.score
        })
    }

    renderTask() {
        if (this.taskDom.firstChild) {
            this.taskDom.removeChild(this.taskDom.firstChild);
        }

        if (this.tasks[this.task].src) {
            this.taskDom.appendChild(this.createTaskTag(this.tasks[this.task]));
        }

        this.tasks[this.task].answers.map((x, i) => this.answerDoms[i].textContent = x);
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

    handleAnswerClick(answer) {
        if (this.tasks[this.task].rightAnswer !== answer - 1) {
            return this.end();
        }
        this.score += this.tasks[this.task].factor;
        this.task++;
        if (this.task === this.tasks.length) {
            return this.end();
        }
        this.renderTask();
    }
}

class ResultPage {
    constructor(result) {
        this.resolver = null;
        this.result = result;
        this.dom = document.querySelector(".gameover");
        this.resultDom = document.querySelector(".result");
    }

    run() {
        this.dom.style.display = "block";
        this.resultDom.textContent = this.result.score;
        return new Promise(resolve => this.resolver = resolve);
    }

    end() {
        this.dom.style.display = "none";
        this.resolver();
    }
}

const game = new Game(config, levels);
game.run();