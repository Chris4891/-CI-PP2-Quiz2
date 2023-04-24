// Select all elements with the "tilt-image" class
const tiltImages = document.querySelectorAll('.quiz-box')

// Initialize Vanilla Tilt for each element
tiltImages.forEach(image => {
  VanillaTilt.init(image)
})
