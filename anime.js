const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "How many filler episodes does one piece have?",
        choice1: "174",
        choice2: "95",
        choice3: "34",
        choice4: "327",
        answer: 2,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "How many chapters does Attack on Titan have?",
        choice1: "139",
        choice2: "173",
        choice3: "141",
        choice4: "34",
        answer: 1,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What was the most popular anime in 2018?",
        choice1: "Violet Evergarden",
        choice2: "Gintama Silver Soul",
        choice3: "JoJo Bizarre Adventure: Golden Wind",
        choice4: "A place further than the universe",
        answer: 2,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What is the car the main character drives in Initial D?",
        choice1: "Nissan s13",
        choice2: "Nissan 350z",
        choice3: "Mitsubishi Evo VI",
        choice4: "Toyota Ae86",
        answer: 4,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What is the name of Ichigo Kurosaki katana in Bleach?",
        choice1: "Zanpakuto",
        choice2: "Wado Ichimonji",
        choice3: "Zangetsu",
        choice4: "Nichirin",
        answer: 3,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What was Goku's name before he came to Earth as a baby?",
        choice1: "Gohan",
        choice2: "Kakarot",
        choice3: "Saiyan",
        choice4: "Trunks",
        answer: 2,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "Who has the most powerfull stand in JoJo part 3?",
        choice1: "Jotaro Kujo",
        choice2: "Muhammad Avdol",
        choice3: "Dio Brando",
        choice4: "Joseph Joestar",
        answer: 1,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "Which one is not a volleyball team in Haikyuu?",
        choice1: "Karasuno High",
        choice2: "Hapsen High",
        choice3: "Nekoma High",
        choice4: "Inarizaki High",
        answer: 2,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What Greater Spirit takes over Shizue's body in Tensura?",
        choice1: "Benimaru",
        choice2: "Cromwell",
        choice3: "Ifrit",
        choice4: "Charys",
        answer: 3,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What is Tanjiro's goal in Demonslayer",
        choice1: "to become a Hashira",
        choice2: "To travel the world",
        choice3: "To get revenge on the demons",
        choice4: "To save his sister",
        answer: 4,
        imgSrc: "./media/nintendo.jpg",
    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = -1
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('endAnime.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    document.getElementById("img").src = currentQuestion.imgSrc;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()