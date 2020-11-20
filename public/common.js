const fixTitle = () => document.title = 'Naive Users '+document.title
let body


onload = () => {
  ({body} = document)
  if (localStorage.darkTheme) body.classList.add('dark-theme')
  body.hidden = false
}

onkeydown = ({code, ctrlKey, altKey, shiftKey}) => {
  if (ctrlKey && altKey && code=='KeyD') {
    body.classList.toggle('dark-theme')
    if (body.classList.contains('dark-theme')) {
      localStorage.darkTheme = true
    } else {
      delete localStorage.darkTheme
    }
  }
}
