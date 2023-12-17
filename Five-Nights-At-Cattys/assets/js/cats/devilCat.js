const devilCat = {
  dom: document.querySelector('.devil-cat-jumpscare'),

  _is: 'outside',
  get is() { return this._is },
  set is(value) {
    if (this._is === value) return
    this._is = value

    // Reset all cams
    url.cam3 = urlBase.cam3
    url.cam4 = urlBase.cam4
    url.cam5 = urlBase.cam5
    // Glitches
    if ([3, 4, 5].includes(camera.index)) camera.glitch()

    switch (value) {
      case 'vent1':
        url.cam3 = url.cam3Cat
        break
        
      case 'vent2':
        url.cam4 = url.cam4Cat
        break
        
      case 'vent3':
        url.cam5 = url.cam5Cat
        break
        
      case 'room':
        url.room = url.roomCat
        setTimeout(e => { this.jumpScare() }, devilCatAttackDelay)
        break

      default: break
    }
  },

  _attackCounter: 0,
  indexOfArea: {
    'room': 'none',
    'vent1': 3,
    'vent2': 4,
    'vent3': 5,
  },

  set attackCounter(value) {
    this._attackCounter = value

    if (value <= 10 - time) this.is = 'vent3'
    else if (value <= 25 - time) this.is = 'vent2'
    else if (value <= 50 - time) this.is = 'vent1'
    else this.is = 'room'
  },
  
  get attackCounter() { return this._attackCounter } ,

  start() {
    this.is = 'vent3'
    this.attackInterval = setInterval(e => { 
      if (camera.opened && camera.index === this.indexOfArea[this.is]) this.attackCounter -= 2
      else this.attackCounter++
    }, 1000)
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
      audio.jumpscareVeryScary.play()
      this.dom.style.animation = anim.scare
    })
  }
}

setTimeout(e => { devilCat.start() }, devilCatDelay)