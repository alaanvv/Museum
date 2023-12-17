const clock = document.querySelector('.clock')

time = 0

setInterval(e => {
  time++
  clock.innerText = `0${time}:00`
  if (time >= 6) alert('VOCE VENCEU PODE FECHAR A ABA')
}, 50000)