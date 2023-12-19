
const canvas = document.querySelector('canvas')
const width = 400
canvas.width = width
canvas.height = width

const ctx = canvas.getContext('2d')
ctx.translate(canvas.width / 2, canvas.height / 2)

function dot(x, y, b) {
  ctx.fillStyle = `rgb(${b}, ${b}, ${b})`
  ctx.fillRect(x, y, 1, 1)
}

function clear() {
  ctx.fillStyle = 'black'
  ctx.fillRect(-width / 2, -width / 2, width, width)
}

// ---

let range = 2
let offsetX = 0
let offsetY = 0
const iterations = 50
const tendsToInfinity = 5

function update() {
  clear()

  // Precompute
  const halfWidth = Math.floor(width / 2)
  const doubleRange = range * 2

  for (let x = -halfWidth; x < halfWidth; x++) {
    for (let y = -halfWidth; y < halfWidth; y++) {
      let startA = x / width * doubleRange + offsetX
      let startB = y / width * doubleRange + offsetY

      // Complex value for each calculated point
      let a = startA
      let b = startB
  
      // Generate new points based on the start
      let i = 0
      while (i < iterations) {
        let aa = a * a - b * b
        let bb = 2 * a * b

        // New complex
        a = aa + startA
        b = bb + startB

        if (Math.abs(a) + Math.abs(b) > tendsToInfinity) break
        i++
      }

      if (i === iterations) continue
      dot(x, y, i / iterations * 255)
    }
  }
}

update()

// ---

document.addEventListener('wheel', e => {
  const speed = 0.7
  if (e.deltaY < 0) range *= speed
  else range /= speed

  update()
})

document.addEventListener('keydown', e => {
  speed = range / 3
  if (e.key === 'ArrowUp') offsetY -= speed
  if (e.key === 'ArrowDown') offsetY += speed
  if (e.key === 'ArrowLeft') offsetX -= speed 
  if (e.key === 'ArrowRight') offsetX += speed
  
  update()
})