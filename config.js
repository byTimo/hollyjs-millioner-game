const config = {
    level: "image",
    time: 500000
}

const levels = {
    "image": [{
        src: "./img/react.svg",
        answers: [
            "react",
            "raect",
            "reackt",
            "reakt"
        ],
        rightAnswer: 0,
        factor: 10,
    }, {
        src: "./img/react.svg",
        answers: [
            "raect",
            "reackt",
            "react",
            "reakt"
        ],
        rightAnswer: 2,
        factor: 10,
    }, {
        src: "./img/react.svg",
        answers: [
            "reackt",
            "reakt",
            "raect",
            "react"
        ],
        rightAnswer: 3,
        factor: 10,
    }],
    "another": [{
        task: "Этот вопрос, который нужно использовать для перезентаци",
        answers: [
            "Нупути, непутю",
            "Не точно",
            "Не надо",
            "Точно"
        ],
        rightAnswer: 3,
        factor: 5
    }]
}