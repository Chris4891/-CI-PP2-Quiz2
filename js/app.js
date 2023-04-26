import { mathQuiz, geographyQuiz, sportsQuiz } from '../data/questions.mjs'

const math = document.getElementById('math')
const geography = document.getElementById('geography')
const sports = document.getElementById('sports')
const userNameElement = document.getElementById('user-name')
const startQuiz = document.getElementById('start-quiz')
const toast = document.getElementById('toast')
const welcome = document.getElementById('welcome')
const landing = document.getElementById('landing')
const currentScreen = document.getElementById('current-screen')
const questionScreen = document.getElementById('question-screen')
const playAgain = document.getElementById('play-again')
const progressBar = document.getElementById('progress-bar')
const questionNo = document.getElementById('progress-label')
const progressContainer = document.getElementById('prog-container')
const quizContainer = document.getElementById('quiz-container')
const questionContainer = document.getElementById('question-container')
const optionsContainer = document.getElementById('options-container')
const nextQuestion = document.getElementById('submit-answer-btn')
const resultContainer = document.getElementById('result-container')
const quizResult = document.getElementById('result-container')

var wrongSound = new Audio('./assets/wrong.wav')
var correctSound = new Audio('./assets/correct.wav')
var finishSound = new Audio('./assets/finish.mp3')
var quizType = ''
var userName = ''
var isChoose = false

function handleSelectedClick(clickedQuiz) {
  const quizes = [math, geography, sports]
  quizes.forEach(quiz => {
    if (quiz.children[0].textContent === clickedQuiz.children[0].textContent) {
      quiz.classList.toggle('selected')
      quizType = quiz.classList.contains('selected')
        ? clickedQuiz.children[0].textContent
        : ''
    } else {
      quiz.classList.remove('selected')
    }
  })
}

userNameElement.addEventListener('change', e => {
  userName = e.target.value
})

startQuiz.addEventListener('click', e => {
  if (!userName) {
    toast.textContent = 'Please enter your username'
    toast.classList.remove('hide')
    setTimeout(() => {
      toast.classList.add('hide')
    }, 2000)
  } else if (!quizType) {
    toast.textContent = 'Please choose one quiz'
    toast.classList.remove('hide')
    setTimeout(() => {
      toast.classList.add('hide')
    }, 2000)
  } else {
    showQuestion()
    progressContainer.classList.remove('hide')
    toast.classList.add('hide')
    questionScreen.classList.remove('hide-q')
    if (quizType === 'Math') {
      welcome.textContent = `Welcome to the math quiz, ${userName}`
      landing.classList.add('hide')
      currentScreen.classList.add('math-quiz')
    } else if (quizType === 'Geography') {
      welcome.textContent = `Welcome to the geography quiz, ${userName}`
      landing.classList.add('hide')
      currentScreen.classList.add('geography-quiz')
    } else {
      welcome.textContent = `Welcome to the sports quiz, ${userName}`
      landing.classList.add('hide')
      currentScreen.classList.add('sports-quiz')
    }
  }
})

math.addEventListener('click', () => handleSelectedClick(math))
geography.addEventListener('click', () => handleSelectedClick(geography))
sports.addEventListener('click', () => handleSelectedClick(sports))

// WORK WITH QUESTIONS
var currentQuestion = 0
var score = 0

const p = document.createElement('p')

function showQuestion() {
  const question =
    quizType === 'Math'
      ? mathQuiz[currentQuestion]
      : quizType === 'Geography'
      ? geographyQuiz[currentQuestion]
      : sportsQuiz[currentQuestion]

  p.innerHTML = question.question
  questionContainer.appendChild(p)
  optionsContainer.innerHTML = ''

  for (let i = 0; i < question.options.length; i++) {
    const option = document.createElement('button')
    option.classList.add('option')
    option.innerHTML = question.options[i]
    option.addEventListener(
      'click',
      handleOptionClick.bind(null, option, question)
    )

    optionsContainer.appendChild(option)
  }
}

function handleOptionClick(option, question) {
  const selectedOption = option.innerHTML

  if (selectedOption === question.answer) {
    isChoose = true
    option.classList.add('correct')
    score++
    correctSound.play()
  } else {
    isChoose = true
    wrongSound.play()
    option.classList.add('incorrect')
  }

  const buttons = optionsContainer.querySelectorAll('button')
  for (let y = 0; y < buttons.length; y++) {
    buttons[y].removeEventListener('click', handleOptionClick)
    buttons[y].setAttribute('disabled', 'disabled')
  }
}

function showResult() {
  quizContainer.style.display = 'none'
  resultContainer.innerHTML = `You got ${score} out of ${mathQuiz.length} questions correct!`
  playAgain.classList.add('show')
}

nextQuestion.addEventListener('click', () => {
  if (isChoose) {
    updateProgressBar()
    if (currentQuestion < mathQuiz.length - 1) {
      currentQuestion++
      showQuestion()
    } else {
      showResult()
      celebrate()
    }
    isChoose = false
  }
})

playAgain.addEventListener('click', () => {
  location.reload()
})

// WORK ON PROGRESS

const numberOfQuestion = 10

function updateProgressBar() {
  const percentComplete = ((currentQuestion + 1) / numberOfQuestion) * 100
  progressBar.style.strokeDasharray = `${percentComplete} 100`
  questionNo.textContent = `${currentQuestion + 1}/${numberOfQuestion}`

  if (currentQuestion + 1 <= 9) {
    progressBar.style.stroke = '#f1f1f1'
  } else {
    progressContainer.classList.add('hide')
  }
}

// WORK ON FINAL RESULT

function celebrate() {
  quizResult.classList.add('celebrate')
  finishSound.play()
}
