const math = document.getElementById('math')
const geography = document.getElementById('geography')
const sports = document.getElementById('sports')
const userNameElement = document.getElementById('user-name')
const startQuiz = document.getElementById('start-quiz')
const toast = document.getElementById('toast')
const welcome = document.getElementById('welcome')
const landing = document.getElementById('landing')
const currentScreen = document.getElementById('current-screen')
const questionScreen = document.getElementById('questionScreen')
const playAgain = document.getElementById('play-again')

var wrongSound = new Audio('./assets/wrong.wav')
var correctSound = new Audio('./assets/correct.wav')
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
    question: 'What is 5 x 8?',
    options: ['32', '40', '45', '50'],
    answer: '40',
  },
  {
    question: 'What is the value of pi (π) rounded to two decimal places?',
    options: ['3.14', '3.12', '3.16', '3.18'],
    answer: '3.14',
  },
  {
    question: 'What is the square root of 64?',
    options: ['8', '6', '4', '2'],
    answer: '8',
  },
  {
    question: 'What is 20% of 75?',
    options: ['10', '15', '20', '25'],
    answer: '15',
  },
  {
    question: 'What is the smallest prime number?',
    options: ['1', '2', '3', '4'],
    answer: '2',
  },
  {
    question: 'What is the formula for the area of a circle?',
    options: ['A = l x w', 'A = bh', 'A = πr²', 'A = (b1 + b2)h/2'],
    answer: 'A = πr²',
  },
  {
    question: 'What is the formula for the volume of a cube?',
    options: ['V = l x w x h', 'V = πr²h', 'V = b x h', 'V = s³'],
    answer: 'V = s³',
  },
  {
    question: 'What is the sum of the angles in a triangle?',
    options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
    answer: '180 degrees',
  },
  {
    question:
      'What is the equation of a straight line in slope-intercept form?',
    options: ['y = mx + c', 'x = my + c', 'y = mx - c', 'x = my - c'],
    answer: 'y = mx + c',
  },
  {
    question: 'What is the value of 2² + 3³?',
    options: ['31', '24', '27', '25'],
    answer: '31',
  },
]

geographyQuiz = [
  {
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    answer: 'Canberra',
  },
  {
    question: 'Which country is both an island and a continent?',
    options: ['New Zealand', 'Indonesia', 'Madagascar', 'Australia'],
    answer: 'Australia',
  },
  {
    question: 'Which country is the largest in area in South America?',
    options: ['Brazil', 'Argentina', 'Peru', 'Colombia'],
    answer: 'Brazil',
  },
  {
    question: 'Which desert is located in Northern Africa?',
    options: [
      'Sahara Desert',
      'Gobi Desert',
      'Kalahari Desert',
      'Arabian Desert',
    ],
    answer: 'Sahara Desert',
  },
  {
    question: 'Which country is known as the "Land of the Rising Sun"?',
    options: ['China', 'Japan', 'Taiwan', 'South Korea'],
    answer: 'Japan',
  },
  {
    question: 'In which European country would you find the city of Barcelona?',
    options: ['Italy', 'Portugal', 'France', 'Spain'],
    answer: 'Spain',
  },
  {
    question: 'What is the highest mountain in Africa?',
    options: [
      'Mount Kilimanjaro',
      'Mount Kenya',
      'Mount Elgon',
      'Mount Stanley',
    ],
    answer: 'Mount Kilimanjaro',
  },
  {
    question: 'Which river is the longest in South America?',
    options: ['Amazon River', 'Paraná River', 'Orinoco River', 'Uruguay River'],
    answer: 'Amazon River',
  },
  {
    question: 'Which country has the longest coastline in the world?',
    options: ['Canada', 'Australia', 'Russia', 'United States'],
    answer: 'Canada',
  },
  {
    question: 'Which ocean lies to the east of Africa?',
    options: [
      'Indian Ocean',
      'Atlantic Ocean',
      'Pacific Ocean',
      'Arctic Ocean',
    ],
    answer: 'Indian Ocean',
  },
]

sportsQuiz = [
  {
    question: 'Which team won the most recent FIFA World Cup in 2018?',
    options: ['Germany', 'Argentina', 'France', 'Spain'],
    answer: 'France',
  },
  {
    question:
      'Who holds the record for the most Olympic gold medals ever won by an athlete?',
    options: [
      'Michael Phelps',
      'Usain Bolt',
      'Simone Biles',
      'Larisa Latynina',
    ],
    answer: 'Larisa Latynina',
  },
  {
    question: 'Which country won the first ever cricket World Cup in 1975?',
    options: ['England', 'Australia', 'West Indies', 'India'],
    answer: 'West Indies',
  },
  {
    question:
      'What is the highest score you can achieve in a single turn in bowling?',
    options: ['10', '50', '100', '300'],
    answer: '300',
  },
  {
    question: 'Who is the all-time leading scorer in the NBA?',
    options: [
      'Michael Jordan',
      'Kareem Abdul-Jabbar',
      'Kobe Bryant',
      'LeBron James',
    ],
    answer: 'Kareem Abdul-Jabbar',
  },
  {
    question: 'Which country won the most medals at the 2021 Tokyo Olympics?',
    options: ['United States', 'China', 'Russia', 'Japan'],
    answer: 'China',
  },
  {
    question: 'Which country won the most recent Rugby World Cup in 2019?',
    options: ['New Zealand', 'England', 'South Africa', 'Australia'],
    answer: 'South Africa',
  },
  {
    question: 'In which sport can you score a "try"?',
    options: ['Soccer', 'Basketball', 'Rugby', 'Tennis'],
    answer: 'Rugby',
  },
  {
    question: 'Which athlete has won the most Olympic medals of all time?',
    options: [
      'Michael Phelps',
      'Usain Bolt',
      'Simone Biles',
      'Larisa Latynina',
    ],
    answer: 'Michael Phelps',
  },
  {
    question: 'In what year were the first modern Olympic Games held?',
    options: ['1886', '1896', '1906', '1916'],
    answer: '1896',
  },
]

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
    option.addEventListener('click', function () {
      const selectedOption = this.innerHTML
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
        buttons[y].removeEventListener('click', arguments.callee)
        buttons[y].setAttribute('disabled', 'disabled')
      }
    })

    optionsContainer.appendChild(option)
  }
}

function showResult() {
  quizContainer.style.display = 'none'
  resultContainer.innerHTML = `You got ${score} out of ${mathQuiz.length} questions correct!`
  playAgain.classList.add('show')
}

nextQuestion.addEventListener('click', () => {
  if (isChoose) {
    if (currentQuestion < mathQuiz.length - 1) {
      currentQuestion++
      showQuestion()
    } else {
      showResult()
    }
    isChoose = false
  }
})

playAgain.addEventListener('click', () => {
  location.reload()
})
