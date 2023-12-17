// DOM
const dexterDOM = document.querySelector('.dexter img')
const timerDOM = document.querySelector('.timer')
const questDOM = document.querySelector('.quest')
const pointsDOM = document.querySelector('.points')

// VARIABLE
let timer = 10
let lices = 100
let dead = false
let liceOn = true
let pressed = false
let started = false
let timerInt

// FUNCTION
function killLice() {
    lices--
    pointsDOM.innerHTML = lices.toFixed()

    if (lices == 90) questDOM.remove()
    if(lices <= 0) {
        clearInterval(timerInt)
        liceOn = false
        questDOM.remove()
        timerDOM.innerHTML = 'YOU\'VE KILLED THEM ALL'
    }
}
function timerOn() {
    started = true

    timerDOM.innerHTML = timer
    timerInt = setInterval(e => {
        if (timer > 1) { timerDOM.innerHTML = --timer } 
        else {
            dexterDOM.style.visibility = 'hidden'
            dead = true
            timerDOM.innerHTML = 'LICES ATE DEXTER'
        }
    }, 1000)
}

// EVENT LISTENER
document.addEventListener('keydown', e => {
    if (e.key == ' ' && !dead && liceOn && !pressed) {
        if (!started) { timerOn() }
        pressed = true
        killLice()
        dexterDOM.style.animationName = 'none'
        dexterDOM.style.marginLeft = '-104px'   
    }
})
document.addEventListener('keyup', e => {  
    if (e.key == ' ') { 
        dexterDOM.style.animationName = 'idle'
        pressed = false
    }
})