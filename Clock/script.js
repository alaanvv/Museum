// DOM
const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')

// FUNCTION
function rotate(el, deg) { el.style.transform = `rotate(${deg}deg)` }
function alignPointers() {
  const date = new Date()
  const totalSeconds = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()

  const minuteDeg = (totalSeconds / (60 * 60)) * 360
  const hourDeg = (totalSeconds / (12 * 60 * 60)) * 360

  rotate(hour, hourDeg)
  rotate(minute, minuteDeg)
}
function changeTabName() {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  document.title = `${hours}:${minutes}`
}

alignPointers()
setInterval(alignPointers, 1e3)
changeTabName()
setInterval(changeTabName, 60e3)
