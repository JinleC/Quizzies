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
        question: "Where was Nintendo founded?",
        choice1: "Japan",
        choice2: "China",
        choice3: "South Korea",
        choice4: "Taiwan",
        answer: 1,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "Who is the main character in the Legends of Zelda?",
        choice1: "Link",
        choice2: "Mario",
        choice3: "Samus",
        choice4: "Kirby",
        answer: 1,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "Who is not a playable character in Super Smash Bros?",
        choice1: "Pikachu",
        choice2: "Blastoise",
        choice3: "Steve",
        choice4: "Sonic",
        answer: 2,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "Which of these is not a Nintendo console?",
        choice1: "Gamecube",
        choice2: "Atari",
        choice3: "Wii U",
        choice4: "Gameboy",
        answer: 2,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What is the name of the main character in the Mario series?",
        choice1: "Wario",
        choice2: "Mario",
        choice3: "Luigi",
        choice4: "Peach",
        answer: 2,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "When was Nintendo founded?",
        choice1: "1989",
        choice2: "1926",
        choice3: "1889",
        choice4: "1953",
        answer: 3,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "What did Nintendo originally make?",
        choice1: "Consoles",
        choice2: "Video Games",
        choice3: "Playing Cards",
        choice4: "Toys",
        answer: 3,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "How many Nintendo Switch consoles have been sold?",
        choice1: "142.69 million",
        choice2: "116.23 million",
        choice3: "128.74 million",
        choice4: "118.99 million",
        answer: 4,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "How many employees does Nintendo have(2020)?",
        choice1: "6.500",
        choice2: "6.000",
        choice3: "6.100",
        choice4: "6.200",
        answer: 4,
        imgSrc: "./media/nintendo.jpg",
    },
    {
        question: "How much is Nintendo worth?",
        choice1: "8.10 Trillion Yen",
        choice2: "6.50 Trillion Yen",
        choice3: "7.20 Trillion Yen",
        choice4: "7.25 Trillion Yen",
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

        return window.location.assign('endNintendo.html')
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