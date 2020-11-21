const {assign} = Object
let body, mousedownTime

const sounds = {
  click: new Audio('mp3/button.mp3'),
  punch: new Audio('mp3/punch.mp3'),
}
sounds.punch.volume = .03

const sides = {left: 'right', right: 'left', up: 'down', down: 'up'}


const fixTitle = () => document.title = 'Naive Users '+document.title

EventTarget.prototype.on = addEventListener


on('load', () => {
  ({body} = document)
  const {darkTheme, sideToComeFrom: side} = localStorage
  if (darkTheme) body.classList.add('dark-theme')

  delete localStorage.sideToComeFrom
  body.classList.add(side)
  setTimeout(() => {
    body.classList.remove(side)
    body.querySelector('[autofocus]')?.focus()
  })
  body.hidden = false
})

on('keydown', ({code, ctrlKey, altKey, shiftKey}) => {
  if (ctrlKey && altKey && code=='KeyD') {
    body.classList.toggle('dark-theme')
    if (body.classList.contains('dark-theme')) localStorage.darkTheme = true
    else delete localStorage.darkTheme
  }
})

on('mousedown', ({timeStamp}) => mousedownTime = timeStamp)

on('mouseup', ({target: {tagName}, timeStamp}) => {
  if (tagName!='BUTTON' && timeStamp-mousedownTime<200) play('punch')
})

on('click', ({target, target: {tagName, dataset: {url, side}}}) => {
  if (tagName=='BUTTON') play('click')

  if (tagName=='BUTTON' && url) setTimeout(goTo, 150, url, side)
})



function play(sound) {
  sound = sounds[sound]
  sound.currentTime = 0
  sound.play()
}

function goTo(url, side) {
  localStorage.sideToComeFrom = side
  side = sides[side]
  body.classList.add(side)
  body.on('transitionend', location.href = url)
}
