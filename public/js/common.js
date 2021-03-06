const {assign} = Object
let body, mousedownTime

const sounds = {
  click: new Audio('mp3/button.mp3'),
  touch: new Audio('mp3/punch.mp3'),
}
sounds.touch.volume = .1

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
    if (side) body.ontransitionend = () => {
      body.querySelector('[autofocus]')?.focus()
      body.ontransitionend = null
    }
    else body.querySelector('[autofocus]')?.focus()
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
  if (tagName!='BUTTON' && timeStamp-mousedownTime<200) play('touch')
})

on('click', ({target: {tagName, dataset: {url, side}}}) => {
  if (tagName=='BUTTON') play('click')

  if (tagName=='BUTTON' && url) setTimeout(goTo, 150, url, side)
})



function play(sound) {
  sound = sounds[sound]
  sound.currentTime = 0
  sound.play()
  setTimeout(() => sound.pause(), sound.duration*999)
}

function goTo(url, side) {
  ({body} = document)
  localStorage.sideToComeFrom = side
  side = sides[side]
  body.classList.add(side)
  if (!side) location.href = url
  body.on('transitionend', () => location.href = url)
}

async function checkIn() {
  const response = await fetch('/api/checkin')
  if (response.ok && (await response.json()).session) return true
}
