const question = document.querySelector('#question');
const choices = document.getElementsByClassName("choice-text");
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
        question: "Hoeveel is 2-0?",
        choice1: "2",
        choice2: "3",
        choice3: "22",
        choice4: "0",
        answer: 1,
    },
    {
        question: "Hoeveel is 2+1?",
        choice1: "2",
        choice2: "3",
        choice3: "22",
        choice4: "0",
        answer: 2,
    },
    {
        question: "Hoeveel is 20+2?",
        choice1: "2",
        choice2: "3",
        choice3: "22",
        choice4: "0",
        answer: 3,
    },
    {
        question: "Hoeveel is 1-1?",
        choice1: "2",
        choice2: "3",
        choice3: "22",
        choice4: "0",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = -1
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    for (let i = 0; i < choices.length; i++){
        const num = choices[i].dataset ['number']
        choices[i].innerText = currentQuestion['choice' + num]
    }

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true 
}

let selectedAnswer = 0

function buttonClick(buttonChoice){ 
    if(!acceptingAnswers) return
    
    acceptingAnswers = false    
    selectedAnswer = buttonChoice
    if (selectedAnswer == currentQuestion.answer){
        score++;
        scoreText.innerText = score

    }
    getNewQuestion();
}

startGame()