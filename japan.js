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
        question: "What is the capital of Japan?",
        choice1: "Tokyo",
        choice2: "Osaka",
        choice3: "Kyoto",
        choice4: "Nagoya",
        answer: 1,
        imgSrc: "./media/Japan Media/map.jpg",
    },
    {
        question: "What is not a Japanese dish?",
        choice1: "Karage",
        choice2: "Soba",
        choice3: "Bingsu",
        choice4: "Omurice",
        answer: 3,
        imgSrc: "./media/Japan Media/food.jpg",
    },
    {
        question: "What is the most popular sport in Japan?",
        choice1: "Volleyball",
        choice2: "Baseball",
        choice3: "Soccer",
        choice4: "Sumo",
        answer: 2,
        imgSrc: "./media/Japan Media/favsport.jpg",
    },
    {
        question: "What is the national flower of Japan?",
        choice1: "Cherry Blossom",
        choice2: "Red Camellia",
        choice3: "Wisteria",
        choice4: "Kiku",
        answer: 1,
        imgSrc: "./media/Japan Media/CherryBlossom.jpg",
    },
    {
        question: "What is the national sport of Japan?",
        choice1: "Karate",
        choice2: "Kendo",
        choice3: "Judo",
        choice4: "Sumo",
        answer: 4,
        imgSrc: "./media/Japan Media/sport.jpg",
    },
    {
        question: "What is not a Japanese video game?",
        choice1: "Super Mario",
        choice2: "Persona 5",
        choice3: "Genshin Impact",
        choice4: "Final Fantasy",
        answer: 3,
        imgSrc: "./media/Japan Media/games.jpg",
    },
    {
        question: "Who is the emperor of Japan?",
        choice1: "Shinzo Abe",
        choice2: "Fumio Kishida",
        choice3: "Naruhito",
        choice4: "Hirohito",
        answer: 3,
        imgSrc: "./media/Japan Media/emperor.jpg",
    },
    {
        question: "What is the population of Japan(2021)?",
        choice1: "126.4 million",
        choice2: "125.7 million",
        choice3: "128.8 million",
        choice4: "127.3 million",
        answer: 2,
        imgSrc: "./media/Japan Media/population.jpg",
    },
    {
        question: "Where is Japan located?",
        choice1: "Eastern Asia",
        choice2: "Southern Asia",
        choice3: "Western Asia",
        choice4: "Northern Asia",
        answer: 1,
        imgSrc: "./media/Japan Media/japanmap.jpg",
    },
    {
        question: "What is the currency of Japan?",
        choice1: "Yuan",
        choice2: "Won",
        choice3: "Rupee",
        choice4: "Yen",
        answer: 4,
        imgSrc: "./media/Japan Media/currency.jpg",
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

        return window.location.assign('endJapan.html')
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