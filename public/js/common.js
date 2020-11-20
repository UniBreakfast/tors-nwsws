const {assign} = Object
let body, mousedownTime

const sounds = {
  click: new Audio('mp3/button.mp3'),
  punch: new Audio('mp3/punch.mp3'),
}
sounds.punch.volume = .03

const fixTitle = () => document.title = 'Naive Users '+document.title

EventTarget.prototype.on = addEventListener


on('load', () => {
  ({body} = document)
  if (localStorage.darkTheme) body.classList.add('dark-theme')
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

on('click', ({target: {tagName}}) => {
  if (tagName=='BUTTON') play('click')
})


function play(sound) {
  sound = sounds[sound]
  sound.currentTime = 0
  sound.play()
}
