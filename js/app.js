const math = document.getElementById('math')
const geography = document.getElementById('geography')
const sports = document.getElementById('sports')
const userNameElement = document.getElementById('userName')
const startQuiz = document.getElementById('startQuiz')
const toast = document.getElementById('toast')
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
  console.log(quizType)
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
  }
})

math.addEventListener('click', () => handleSelectedClick(math))
geography.addEventListener('click', () => handleSelectedClick(geography))
sports.addEventListener('click', () => handleSelectedClick(sports))
