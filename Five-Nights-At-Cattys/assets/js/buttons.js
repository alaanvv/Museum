// DOM
const cameraBtn = document.querySelector('.camera-btn')
const rightBtn = document.querySelector('.right-btn')
const leftBtn = document.querySelector('.left-btn')
const windowLookBtn = document.querySelector('.window-look-btn')
const doorLookBtn = document.querySelector('.door-look-btn')

// FUNCTION
function noButton() { inv([cameraBtn, rightBtn, leftBtn, windowLookBtn, doorLookBtn]) }
function allButtons() { vis([cameraBtn, rightBtn, leftBtn, windowLookBtn, doorLookBtn]) }
function attButtons() {
  if (camera.opened) {
    noButton()
    vis(cameraBtn)

    return
  }

  if (lookingTo === 'room') {
    allButtons()
    inv([windowLookBtn, doorLookBtn])

    return
  }
  else if (lookingTo === 'door') {
    noButton()
    vis([rightBtn, doorLookBtn])

    return
  }
  else if (lookingTo === 'window') {
    noButton()
    vis([leftBtn, windowLookBtn])
    
    return
  }
}

// EVENT LISTENER
cameraBtn.addEventListener('mouseenter', e => { switchCam() })
leftBtn.addEventListener('mouseenter', e => { lookLeft() })
rightBtn.addEventListener('mouseenter', e => { lookRight() })
windowLookBtn.addEventListener('mousedown', e => { lookWindow() })
windowLookBtn.addEventListener('mouseup', e => { stopLookWindow() })
windowLookBtn.addEventListener('mouseout', e => { stopLookWindow() })
doorLookBtn.addEventListener('mousedown', e => { lookDoor() })
doorLookBtn.addEventListener('mouseup', e => { stopLookDoor() })
doorLookBtn.addEventListener('mouseout', e => { stopLookDoor() })