const camera = {
  containerDOM: document.querySelector('#camera'),
  displayDOM: document.querySelector('.display'),
  cam1BtnDOM: document.querySelector('.cam1'),
  cam2BtnDOM: document.querySelector('.cam2'),
  cam3BtnDOM: document.querySelector('.cam3'),
  cam4BtnDOM: document.querySelector('.cam4'),
  cam5BtnDOM: document.querySelector('.cam5'),

  opened: false,
  _index: '',

  set index(value) {
    if (this._index === value) return
    this._index = value

    if ([1, 2].includes(value)) this.animation = anim.camMove
    else this.animation = 'none'

    if (value === 1) this.background = 'cam1'
    else if (value === 2) this.background = 'cam2'
    else if (value === 3) this.background = 'cam3'
    else if (value === 4) this.background = 'cam4'
    else if (value === 5) this.background = 'cam5'
    else this.background = 'glitch'
  },
  get index() { return this._index },

  set background(value) { this.displayDOM.style.backgroundImage = `url(${url[value]})` },
  set animation(anim) { this.displayDOM.style.animation = anim },

  glitch() {
    let current = this.index
  
    this.index = 0
    setTimeout(e => { this.index = current }, 500)
  }
}

// FUNCTION
function switchCam() {
  if (camera.opened) closeCam()
  else openCam()
}

function openCam() {
  camera.opened = true
  camera.index = 0
  noButton()
  animation(anim.openCam, e => {
    attButtons()
    vis(camera.containerDOM)
  })
}
function closeCam() {
  camera.opened = false
  animation(anim.closeCam, e => {
    attButtons()
    changeScreen('room')
    screen.animation = 'none'

    if (blackCat.rushingToAttack) blackCat.jumpScare()
    if (whiteCat.rushingToAttack) whiteCat.jumpScare()
  })
  inv(camera.containerDOM)
  noButton()
}

camera.cam1BtnDOM.addEventListener('click', e => camera.index = 1)
camera.cam2BtnDOM.addEventListener('click', e => camera.index = 2)
camera.cam3BtnDOM.addEventListener('click', e => camera.index = 3)
camera.cam4BtnDOM.addEventListener('click', e => camera.index = 4)
camera.cam5BtnDOM.addEventListener('click', e => camera.index = 5)