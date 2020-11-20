const {assign} = Object
let body

const btnSound = new Audio('button.mp3')
const punchSound = new Audio('punch.mp3')
punchSound.volume = .03

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
    if (body.classList.contains('dark-theme')) {
      localStorage.darkTheme = true
    } else {
      delete localStorage.darkTheme
    }
  }
})

on('click', ({target: {tagName}}) => {
  if (tagName=='BUTTON') {
    btnSound.currentTime = 0
    btnSound.play()
  }
})

let mousedownTime

on('mousedown', ({timeStamp}) => mousedownTime = timeStamp)

on('mouseup', ({target: {tagName}, timeStamp}) => {
  if (tagName!='BUTTON' && timeStamp-mousedownTime<200) {
    punchSound.currentTime = 0
    punchSound.play()
  }
})
