const config = {
    level: "image",
    time: 500000
}

const levels = {
    "text": [{
        task: "Какая из перечисленных технологий не была разработана в Facebook?",
        answers: [
            "React",
            "Redux",
            "GraphQL",
            "Flow"
        ],
        rightAnswer: 1,
        factor: 1
    }, {
        task: "Какой метод жизненного цикла появился в React 16?",
        answers: [
            "getSnapshotAfterUpdate",
            "getSnapshotBetweenUpdate",
            "getDerivedStateFromProps",
            "getDeliveredStateFromProps"
        ],
        rightAnswer: 2,
        factor: 1
    }, {
        task: "Какого тэга не существует в html?",
        answers: [
            "<rbd>",
            "<kbd>",
            "<dd>",
            "<wbr>"
        ],
        rightAnswer: 0,
        factor: 3
    }, {
        task: "Как расшифровывается CSS?",
        answers: [
            "Cascading Style Sleeves",
            "Cosplaying Style Sheeps",
            "Cascading Style Ships",
            "Cascading Style Sheets"
        ],
        rightAnswer: 3,
        factor: 1
    }, {
        task: "Как вызвать окно с текстовым полем, в которое пользователь может ввести текст?",
        answers: [
            "alert()",
            "promt()",
            "alerts()",
            "prompt()"
        ],
        rightAnswer: 3,
        factor: 1
    }, {
        task: "У какого из селекторов самый большой вес?",
        answers: [
            ".footer :first-child .text",
            ".footer .textBlock > span",
            "div .textBlock span",
            ".footer > p > .text"
        ],
        rightAnswer: 0,
        factor: 3
    }, {
        task: "Какого события не существует?",
        answers: [
            "onmouseover",
            "onmousescroll",
            "onmousemove",
            "onwheel"
        ],
        rightAnswer: 1,
        factor: 2
    }, {
        task: `Сколько дочерних DOM-узлов у элемента <ul> в примере ниже: <ul>
          <li>Привет</li>
            <li>Мир</li>
        </ul>`,
        answers: [
            "4",
            "2",
            "5",
            "1"
        ],
        rightAnswer: 2,
        factor: 3
    }, {
        task: "Чему равно [] + 1 + 2 + 3 ?",
        answers: [
            "NaN",
            "6",
            "undefined",
            "123"
        ],
        rightAnswer: 3,
        factor: 2
    }, {
        task: "Что делает ** ?",
        answers: [
            "Начало многострочного комментария",
            "Умножение на предыдущее значение",
            "Возведение в степень",
            "такого в js нет"
        ],
        rightAnswer: 2,
        factor: 1
    }, {
        task: "Какая из этих операций приведет к ошибке в js?",
        answers: [
            "Никакая",
            "1 / 0",
            "1 * '1'",
            "Math.sqrt(-1.34)"
        ],
        rightAnswer: 0,
        factor: 1
    }, {
        task: "Какое из событий не произойдет если нажать и отпустить клавишу Shift",
        answers: [
            "Произойдут все",
            "keypress",
            "keydown",
            "keyup"
        ],
        rightAnswer: 1,
        factor: 3
    }, {
        task: "Чему равно name = 'danAbramov'.replace('a', 'o')",
        answers: [
            '"donAbromov"',
            '"donObromov"',
            '"donobromov"',
            '"donAbramov"'
        ],
        rightAnswer: 3,
        factor: 2
    }],
    "image": [{
        src: "./assets/logos/react.svg",
        answers: [
            "react",
            "redux",
            "atom",
            "RxJS"
        ],
        rightAnswer: 0,
        factor: 1,
    }, {
        src: "./assets/logos/angular.svg",
        answers: [
            "Aurelia",
            "Angular",
            "Atom",
            "Autoprefixer"
        ],
        rightAnswer: 1,
        factor: 1,
    }, {
        src: "./assets/logos/ember.svg",
        answers: [
            "Grunt",
            "Jest",
            "Ember",
            "Bower"
        ],
        rightAnswer: 2,
        factor: 1,
    }, {
        src: "./assets/logos/js-badge.svg",
        answers: [
            "JavaScript",
            "VanullaJs",
            "Jest",
            "Just"
        ],
        rightAnswer: 0,
        factor: 1,
    }, {
        src: "./assets/logos/vue.svg",
        answers: [
            "VanillaJs",
            "VSCode",
            "Visual Studio",
            "Vue"
        ],
        rightAnswer: 3,
        factor: 1,
    }, {
        src: "./assets/logos/backbone.svg",
        answers: [
            "VSCode",
            "Backbone",
            "Meteor",
            "Polymer"
        ],
        rightAnswer: 1,
        factor: 2,
    }, {
        src: "./assets/logos/bootstrap.png",
        answers: [
            "Backbone",
            "BabylonJs",
            "Bootstrap",
            "Bower"
        ],
        rightAnswer: 2,
        factor: 2,
    }, {
        src: "./assets/logos/bower.png",
        answers: [
            "Bower",
            "BirdJs",
            "Grunt",
            "Stylous"
        ],
        rightAnswer: 0,
        factor: 3,
    }, {
        src: "./assets/logos/cofe-script.png",
        answers: [
            "Chai",
            "Java",
            "Coffescript",
            "Cappuccino"
        ],
        rightAnswer: 2,
        factor: 3,
    }, {
        src: "./assets/logos/eslint.png",
        answers: [
            "webpack",
            "uikit",
            "aurelia",
            "eslint"
        ],
        rightAnswer: 3,
        factor: 2,
    }, {
        src: "./assets/logos/flow.jpg",
        answers: [
            "Firebase",
            "Favico.js",
            "Flow",
            "Flux"
        ],
        rightAnswer: 2,
        factor: 1,
    }, {
        src: "./assets/logos/Grunt.png",
        answers: [
            "Gulp",
            "Grunt",
            "BoarJs",
            "Bower"
        ],
        rightAnswer: 1,
        factor: 1,
    }, {
        src: "./assets/logos/handlebars.png",
        answers: [
            "MustacheJs",
            "Lad",
            "BarbaJs",
            "Handlebars"
        ],
        rightAnswer: 3,
        factor: 2,
    }, {
        src: "./assets/logos/jasmine.png",
        answers: [
            "jasmine",
            "ionic",
            "protractor",
            "requireJs"
        ],
        rightAnswer: 0,
        factor: 3,
    }, {
        src: "./assets/logos/karma.png",
        answers: [
            "Knockout",
            "Karma",
            "Konva.js",
            "Kefir"
        ],
        rightAnswer: 1,
        factor: 3,
    }, {
        src: "./assets/logos/mithril.png",
        answers: [
            "MomentJs",
            "Mithril.js",
            "Famo.us",
            "Socet.io"
        ],
        rightAnswer: 1,
        factor: 3,
    }, {
        src: "./assets/logos/redux-form.jpg",
        answers: [
            "React-Form",
            "React-Final-Form",
            "Redux-Form",
            "React-Fontawsome"
        ],
        rightAnswer: 2,
        factor: 3,
    }, {
        src: "./assets/logos/styled-component.jpg",
        answers: [
            "Polished",
            "Glamorous",
            "Styled Components",
            "BeautifylJs"
        ],
        rightAnswer: 2,
        factor: 2,
    }, {
        src: "./assets/logos/glamorous.png",
        answers: [
            "Stylus",
            "Glamorous",
            "Styled Components",
            "BeautifylJs"
        ],
        rightAnswer: 1,
        factor: 3,
    }, {
        src: "./assets/logos/gulp.png",
        answers: [
            "ColaJs",
            "JuiceJs",
            "Gulp",
            "SmoothieJs"
        ],
        rightAnswer: 2,
        factor: 2,
    }, {
        src: "./assets/logos/kontur.png",
        answers: [
            "Контур",
            "СКБ Контур",
            "СКБ 'Контур'",
            "СПб Контур"
        ],
        rightAnswer: 0,
        factor: 1,
    }, {
        src: "./assets/logos/meteor.png",
        answers: [
            "Comet",
            "Meteor",
            "Space",
            "Fingerprint"
        ],
        rightAnswer: 1,
        factor: 3,
    }, {
        src: "./assets/logos/momentjs.png",
        answers: [
            "DateJs",
            "Clock",
            "StimedJs",
            "MomentJs"
        ],
        rightAnswer: 3,
        factor: 2,
    }, {
        src: "./assets/logos/RequireJs.png",
        answers: [
            "TargetJs",
            "Protractor",
            "Jasmine",
            "RequireJs"
        ],
        rightAnswer: 3,
        factor: 3
    }, {
        src: "./assets/logos/mocha.png",
        answers: [
            "mocha",
            "Chai",
            "CoffeScript",
            "Latte"
        ],
        rightAnswer: 0,
        factor: 2,
    }, {
        src: "./assets/logos/atom.png",
        answers: [
            "React",
            "Atom",
            "Redux",
            "Mithril"
        ],
        rightAnswer: 1,
        factor: 1,
    }, {
        src: "./assets/logos/autoprefixer.png",
        answers: [
            "Aurelia",
            "Atom",
            "Autoprefixer",
            "Angular"
        ],
        rightAnswer: 2,
        factor: 2,
    }, {
        src: "./assets/logos/bem.png",
        answers: [
            "BEM",
            "Bower",
            "Bootstrap",
            "Bember"
        ],
        rightAnswer: 0,
        factor: 2,
    }, {
        src: "./assets/logos/broccoli.png",
        answers: [
            "Broccoli",
            "Cauliflower",
            "Salad",
            "TreeJs"
        ],
        rightAnswer: 0,
        factor: 2,
    }, {
        src: "./assets/logos/docker.png",
        answers: [
            "Whale",
            "Blower",
            "Bower",
            "Docker"
        ],
        rightAnswer: 3,
        factor: 1,
    }, {
        src: "./assets/logos/git.png",
        answers: [
            "Github",
            "Git",
            "Gitlab",
            "NodeJs"
        ],
        rightAnswer: 1,
        factor: 1,
    }, {
        src: "./assets/logos/github.png",
        answers: [
            "Git",
            "Github",
            "Octocat",
            "OctoGit"
        ],
        rightAnswer: 1,
        factor: 1,
    }, {
        src: "./assets/logos/gitlab.png",
        answers: [
            "Firefox",
            "Gitlab",
            "Vector",
            "Brownfox"
        ],
        rightAnswer: 1,
        factor: 2,
    }, {
        src: "./assets/logos/jest.png",
        answers: [
            "Jest",
            "Jester",
            "Clown",
            "Funster"
        ],
        rightAnswer: 0,
        factor: 2,
    }, {
        src: "./assets/logos/mustache_js.png",
        answers: [
            "Handlebars",
            "Lad",
            "MustacheJs",
            "BarbaJs"
        ],
        rightAnswer: 2,
        factor: 2,
    }, {
        src: "./assets/logos/nodejs.png",
        answers: [
            "Hexagon",
            "Js",
            "NodeJs",
            "HTTP/2"
        ],
        rightAnswer: 2,
        factor: 1,
    }, {
        src: "./assets/logos/postcss.png",
        answers: [
            "Autoprefixer",
            "HennaJs",
            "Alcanna",
            "PostCSS"
        ],
        rightAnswer: 3,
        factor: 2,
    }, {
        src: "./assets/logos/rxjs.png",
        answers: [
            "Firefox",
            "Comodo Dragon",
            "RxJs",
            "Lizard"
        ],
        rightAnswer: 2,
        factor: 3,
    }, {
        src: "./assets/logos/sublime.png",
        answers: [
            "Sublime",
            "Styled Components",
            "SymbolJs",
            "Sunrise"
        ],
        rightAnswer: 0,
        factor: 1,
    }, {
        src: "./assets/logos/vscode.png",
        answers: [
            "VSCode",
            "Vusual Studio",
            "Backbone",
            "Infinity"
        ],
        rightAnswer: 0,
        factor: 1,
    }, {
        src: "./assets/logos/webpack.png",
        answers: [
            "Webpack",
            "ESLint",
            "Docker",
            "Rollup"
        ],
        rightAnswer: 0,
        factor: 1,
    }, {
        src: "./assets/logos/webstorm.png",
        answers: [
            "WebStorm",
            "WisualStudio",
            "WSCode",
            "WebStack"
        ],
        rightAnswer: 0,
        factor: 1,
    }, {
        src: "./assets/logos/yt.png",
        answers: [
            "YoTrack",
            "YouTrack",
            "YouTube",
            "Yoptascript"
        ],
        rightAnswer: 1,
        factor: 2,
    }]
}