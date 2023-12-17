const screen = {
  dom: document.querySelector('#screen'),

  set animation(value) {
    if (value === 'none') this.animation = anim.breath
    else this.dom.style.animation = value
  },
  set background(value) { this.dom.style.backgroundImage = value },

  addEventListener(e, f) { this.dom.addEventListener(e, f) }
}

// FUNCTION
function changeScreen(to) {
  if (to !== 'none') to = `url(${url[to]})`
  screen.background = to
}

function animation(anim, callback) {
  if (callback) {
    screen.addEventListener('animationend', function listener(e) { 
      screen.dom.removeEventListener('animationend', listener)
      callback()
    })
  }
  screen.animation = anim
}