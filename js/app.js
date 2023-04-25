const math = document.getElementById('math')
const geography = document.getElementById('geography')
const sports = document.getElementById('sports')
const userNameElement = document.getElementById('userName')
const startQuiz = document.getElementById('startQuiz')
const toast = document.getElementById('toast')
const welcome = document.getElementById('welcome')
const landing = document.getElementById('landing')
const currentScreen = document.getElementById('currentScreen')
const questionScreen = document.getElementById('questionScreen')

var quizType = ''
var userName = ''

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
  console.log(quizType, userName)
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
    toast.classList.add('hide')
    questionScreen.classList.remove('hide')
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
const quizContainer = document.getElementById('quiz-container')
const questionContainer = document.getElementById('question-container')
const optionsContainer = document.getElementById('options-container')
const nextQuestion = document.getElementById('submit-answer-btn')
const resultContainer = document.getElementById('result-container')

var currentQuestion = 0
var score = 0

const mathQuiz = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    answer: '4',
  },
  {
    question: 'What is 10 - 5?',
    options: ['2', '3', '4', '5'],
    answer: '5',
  },
  {
    question: 'What is 8 x 3?',
    options: ['21', '24', '25', '28'],
    answer: '24',
  },
]

const p = document.createElement('p')
function showQuestion() {
  const question = mathQuiz[currentQuestion]
  p.innerHTML = question.question
  questionContainer.appendChild(p)
  optionsContainer.innerHTML = ''
  for (let i = 0; i < question.options.length; i++) {
    const option = document.createElement('button')
    option.classList.add('option')
    option.innerHTML = question.options[i]
    option.addEventListener('click', function () {
      const selectedOption = this.innerHTML
      if (selectedOption === question.answer) {
        option.classList.add('correct')
        score++
      } else {
        option.classList.add('incorrect')
      }
      for (let j = 0; j < optionsContainer.children.length; j++) {
        optionsContainer.children[j].removeEventListener(
          'click',
          arguments.callee
        )
      }
    })
    optionsContainer.appendChild(option)
  }
}

function showResult() {
  quizContainer.style.display = 'none'
  resultContainer.innerHTML = `You got ${score} out of ${mathQuiz.length} questions correct!`
}

showQuestion()

nextQuestion.addEventListener('click', function () {
  if (currentQuestion < mathQuiz.length - 1) {
    currentQuestion++
    showQuestion()
  } else {
    showResult()
  }
})
