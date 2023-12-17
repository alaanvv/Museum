// DOM
const selectNeg = document.querySelector('.negative')
const selectPos = document.querySelector('.positive')
const obj = document.querySelector('.object')

// Variables
let selected = 0 // 0 = Nothing | > 0 = Positive | < 0 = Negative

// Listen to buttons
selectNeg.addEventListener('click', e => {
  selectPos.classList.remove('selected')
  selectNeg.classList.add('selected')
  selected = -1
  alignPacks(e)
})
selectPos.addEventListener('click', e => {
  selectNeg.classList.remove('selected')
  selectPos.classList.add('selected')
  selected = 1
  alignPacks(e)
})

// Get x and y for a square inside the circle
// To get the biggest square inside a circle,
// you must find a square with the diameter
// equals to the circle diameter.
// Square diameter = Circle diameter / sqrt(2)

const circle = document.querySelector('.object').getBoundingClientRect()
const diameter = circle.right - circle.left
// I'll substract 100 cuz i want a padding inside the circle
const squareLength = diameter / Math.sqrt(2) - 100
const gap = (diameter - squareLength) / 2

let model = document.querySelector('.pack-model')
const PACK_SIZE = model.clientWidth
model.remove()

let GRID_SIZE = Math.min(Math.floor(squareLength / (PACK_SIZE + 20)), 15)
if (GRID_SIZE % 2 === 0) GRID_SIZE--
const GRID_SQUARE_LENGTH = squareLength / GRID_SIZE

for (let x = 0; x <= GRID_SIZE; x++) {
  for (let y = 0; y <= GRID_SIZE; y++) {
    const pack = document.createElement('div')
    pack.classList.add('pack')
    obj.append(pack)

    // The position is the gap + the grid position multiplied by the cell size minus half of the width
    pack.style.left = `${x * GRID_SQUARE_LENGTH + gap - Number(window.getComputedStyle(pack).width.slice(0, -2)) / 2}px`
    pack.style.top = `${y * GRID_SQUARE_LENGTH + gap - Number(window.getComputedStyle(pack).width.slice(0, -2)) / 2}px`
    pack.style.transform = `rotate(${Math.random() * 2 * Math.PI}rad)`
  }
}

// The angle between two points in a cartesian plan is: TAN-1(Y distance / X distance)
function alignPacks(e) {
  if (selected === 0) return
  for (pack of document.querySelectorAll('.pack')) {
    pack.position = {
      x: pack.getBoundingClientRect().left + Number(window.getComputedStyle(pack).width.slice(0, -2)) / 2,
      y: pack.getBoundingClientRect().top + Number(window.getComputedStyle(pack).height.slice(0, -2)) / 2
    }
    
    let mouse_position = {
      x: e.clientX,
      y: e.clientY
    }
    
    let distance = {
      x: Math.abs(pack.position.x) - Math.abs(mouse_position.x),
      y: Math.abs(pack.position.y) - Math.abs(mouse_position.y)
    }
    
    let angle = Math.atan(distance.y / distance.x)
    if (mouse_position.x < pack.position.x) angle += Math.PI
    if (selected > 0) angle += Math.PI
    pack.style.transform = `rotate(${angle}rad)`
  }
}
document.addEventListener('mousemove', alignPacks)

// Prevent to resize window
window.onresize = () => { location.reload() }