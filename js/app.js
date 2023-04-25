const math = document.getElementById('math')
const geography = document.getElementById('geography')
const sports = document.getElementById('sports')

function handleSelectedClick(clickedElement) {
  const elements = [math, geography, sports]
  elements.forEach(element => {
    if (element === clickedElement) {
      element.classList.toggle('selected')
    } else {
      element.classList.remove('selected')
    }
  })
}

math.addEventListener('click', () => handleSelectedClick(math))
geography.addEventListener('click', () => handleSelectedClick(geography))
sports.addEventListener('click', () => handleSelectedClick(sports))
