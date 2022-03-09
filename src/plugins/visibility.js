let hidden, visibilityChange
const PageVisibility = {
  hidden: false
}

if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden'
  visibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden'
  visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  visibilityChange = 'webkitvisibilitychange'
}

function handleVisibilityChange () {
  if (document[hidden]) {
    PageVisibility.hidden = true
  } else {
    PageVisibility.hidden = false
  }
}

if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
  console.log('That browser doesn\'t supports the Page Visibility API.')
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false)
}

export default {
  install: (app, options) => {
    app.config.globalProperties.PageVisibility = PageVisibility
    window.PageVisibility = PageVisibility
  }
}
