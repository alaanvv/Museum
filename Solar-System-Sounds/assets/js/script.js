const audio = {
    init: () => { this.tracks.map(track.loop = true) },
    nowplaying: undefined,

    tracks: {
        'sun': new Audio('./assets/audio/sun.mp4'),
        'mercury': new Audio('./assets/audio/mercury.mp4'),
        'venus': new Audio('./assets/audio/venus.mp4'),
        'earth': new Audio('./assets/audio/earth.mp4'),
        'moon': new Audio('./assets/audio/moon.mp4'),
        'mars': new Audio('./assets/audio/mars.mp4'),
        'jupiter': new Audio('./assets/audio/jupiter.mp4'),
        'saturn': new Audio('./assets/audio/saturn.mp4'),
        'uranus': new Audio('./assets/audio/uranus.mp4'),
        'neptune': new Audio('./assets/audio/neptune.mp4')
    },

    start(track) {
        this.nowplaying = this.tracks[track]
        this.nowplaying.play()
    },
    stop() {
        this.nowplaying.pause()
        this.nowplaying.currentTime = 0
    }
}
audio.init()

function isArea(el) { return el.parentElement == document.querySelector('map') }

document.addEventListener('click', e => {
    el = e.target
    if (isArea(el)) alert(el.alt)
})

document.addEventListener('mouseover', e => {
    el = e.target
    if (isArea(el)) audio.start(el.id)
})

document.addEventListener('mouseout', e => {
    el = e.target
    if (isArea(el)) audio.stop()
})

alert('Welcome to our spaceship!')