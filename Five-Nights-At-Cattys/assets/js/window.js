// FUNCTION
function lookRight() {
  noButton()

  if (lookingTo === 'door') {
    animation(anim.leftToRoom, e => { attButtons(); changeScreen('room') })
    lookingTo = 'room'
  }
  else if (lookingTo === 'room') {
    animation(anim.right, e => { attButtons(); changeScreen('window') })
    lookingTo = 'window'
  }
}

function lookWindow() {
  changeScreen('lookingWindow')

  if (blackCat.is === 'window') {
    blackCat.waitingToAttack = false
    if (blackCat.readyToAttack) return blackCat.jumpScare()
    blackCat.is = 'cam2-floor'
  }
}
function stopLookWindow() { changeScreen('window') }