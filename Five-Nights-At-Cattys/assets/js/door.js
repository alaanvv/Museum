// FUNCTION
function lookLeft() {
  noButton()

  if (lookingTo === 'room') {
    animation(anim.left, e => { attButtons(); changeScreen('door') })
    lookingTo = 'door'
  } 
  else if (lookingTo === 'window') {
    animation(anim.rightToRoom, e => { attButtons(); changeScreen('room') })
    lookingTo = 'room'
  }
}

function lookDoor() {
  changeScreen('lookingDoor')
  
  if (whiteCat.is === 'door') {
    whiteCat.waitingToAttack = false
    if (whiteCat.readyToAttack) return whiteCat.jumpScare()
    whiteCat.is = 'cam1-window'
  }
}
function stopLookDoor() { changeScreen('door') }