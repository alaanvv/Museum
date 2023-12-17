const whiteCat = {
  dom: document.querySelector('.white-cat-jumpscare'),

  areas: ['door', 'cam1-window', 'cam1-cam'],

  _is: 'outside',
  get is() { return this._is },
  set is(value) {
    this._is = value

    // Reset all cams
    url.cam1 = urlBase.cam1
    url.lookingDoor = urlBase.lookingDoor
    // Glitches    
    if (camera.index === 1) camera.glitch()


    switch (value) {
      case 'cam1-window':
        url.cam1 = url.cam1WhiteCatOnWindow
        break

      case 'cam1-cam':
        url.cam1 = url.cam1WhiteCatOnCam
        break

      case 'door':
        url.lookingDoor = url.lookingDoorWhiteCat
        url.cam1 = url.cam1WhiteCatOnDoor
        break

      default: break
    }
  },

  waitingToAttack: false,
  readyToAttack: false,
  rushingToAttack: false,

  start() {
    this.moveInterval = setInterval(e => { this.move() }, moveTime)
  },
  move() {
    if (this.waitingToAttack || this.readyToAttack || this.rushingToAttack) return

    this.is = this.randomArea()
    if (this.is === 'door') this.startCounter()
  },
  randomArea() {
    return this.areas[Math.floor(Math.random() * this.areas.length)]
  },
  startCounter() {
    this.waitingToAttack = true

    setTimeout(e => {
      if (!this.waitingToAttack) return

      // STOP MOVING
      clearInterval(this.moveInterval)
      this.readyToAttack = true

      setTimeout(e => { 
        this.rushingToAttack = true
        setTimeout(e => { this.jumpScare() }, instaAttackTime)
      }, rushToAttackTime)
    }, waitToAttackTime)
  },
  jumpScare() {
    if (camera.opened) {
      camera.opened = false
      inv(camera.containerDOM)
      noButton()
      animation(anim.closeCam, e => {
        screen.background = 'room'
        this.jumpScare()
      })
      return
    }
    noButton()
    audio.surprise.play()
    vis(this.dom)
    this.dom.style.animation = anim.jump

    this.dom.addEventListener('animationend', e => {
      audio.jumpscare.play()
      this.dom.style.animation = anim.scare
    })
  }
}

setTimeout(e => { whiteCat.start() }, whiteCatDelay)