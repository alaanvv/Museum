// DOM
const displayDOM = document.querySelector('.display')
const dotDOM = document.querySelector('.dot')
const antidotDOM = document.querySelector('.antidot')
const pointsDOM = document.querySelector('.points span')
const exorcistaDOM = document.querySelector('.exorcista')
const upgradesDOM = document.querySelector('.upgrade-area')
const up1DOM = document.querySelector('.up1')
const up2DOM = document.querySelector('.up2')

// VARIABLE
let interval = 1000
let timer = 3000
let points = 0
let jsOn = false
dotOn = true

// AUDIO
const scream = new Audio('./assets/audio/scream.mp3')

// FUNCTION
function attDot(points = true) {
    if (points) attPoints()
    visibility(dotDOM, 0)

    if (dotOn) {
        setTimeout(e => {
            let dotX, dotY
            [dotX, dotY] = random()
            dotDOM.style.left = `${dotX}px`
            dotDOM.style.top = `${dotY}px`
            
            jumpscareWait()
            visibility(dotDOM, 1)
        }, interval)
    }
}
    function attAntiDot() {
    let antiX, antiY
    [antiX, antiY] = random()
    antidotDOM.style.left = `${antiX}px`
    antidotDOM.style.top = `${antiY}px`
}
function random() { return [Math.random() * (displayDOM.offsetWidth - dotDOM.offsetWidth), Math.random() * (displayDOM.offsetHeight - dotDOM.offsetWidth)] }


function attPoints() {
    pointsDOM.innerHTML = `${++points}`

    if (points >= 5 && points < 10) {
        jsOn = true
        timer = 2000
        tempo = 500
        dotDOM.classList.add('dot2')
    }
    else if (points >= 10 && points < 25) {
        timer = 1000
        tempo = 300
        dotDOM.classList.add('dot3')
    }
    else if (points == 25) upgrade()
    else if (points == 50) onAntiDot()
    else if (points == 66) pointsDOM.innerHTML = `666`
}
function upgrade() {
    jsOn = false
    dotOn = false
    visibility(upgradesDOM, 1)
    function closeUpgrades() {
        jsOn = true
        dotOn = true
        visibility(upgradesDOM, 0)
        attDot(0)
    }

    up1DOM.addEventListener('click', () => {
        dotDOM.style.width = `${dotDOM.offsetWidth * 1.5}px`
        closeUpgrades()
    })
    up2DOM.addEventListener('click', () => {
        timer = timer * 1.5
        closeUpgrades()
    })
}


function jumpscareWait() {
    let checker = points
    setTimeout(e => { if (checker == points && jsOn) jumpscare() }, timer)
}
function jumpscare() {
    scream.play()
    visibility(exorcistaDOM, 1)
}


function onAntiDot() {
    visibility(antidotDOM, 1)
    antidotDOM.addEventListener('mouseenter', e => { jumpscare() })
    setInterval(e => { attAntiDot() }, 1000);
}


function visibility(dom, bool) { 
    if (bool) dom.classList.remove('inv') 
    else dom.classList.add('inv') 
}

// EVENT LISTENER
dotDOM.addEventListener('mouseenter', () => { attDot() })