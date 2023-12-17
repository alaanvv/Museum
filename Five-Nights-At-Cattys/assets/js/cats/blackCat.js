const blackCat = {
  dom: document.querySelector('.black-cat-jumpscare'),

  areas: ['window', 'cam2-floor', 'cam2-window'],

  _is: 'outside',
  get is() { return this._is },
  set is(value) {
    this._is = value

    // Reset all cams
    url.cam2 = urlBase.cam2
    url.lookingWindow = urlBase.lookingWindow
    // Glitches
    if (camera.index === 2) camera.glitch()

    switch (value) {
      case 'cam2-window':
        url.lookingWindow = url.lookingWindowBlackCat
        url.cam2 = url.cam2blackCatOnWindow
        break

      case 'cam2-floor':
        url.cam2 = url.cam2BlackCatOnFloor
        break

      case 'window':
        url.lookingWindow = url.lookingWindowBlackCatInside
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
    if (this.is === 'window') this.startCounter()
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

setTimeout(e => { blackCat.start() }, blackCatDelay)