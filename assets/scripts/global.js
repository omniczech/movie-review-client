// Display successful call
const successDisplayGlobal = (message) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
}
// Display unsuccessful call
const failureDisplayGlobal = (message, clear, timer) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append(`<p>${message}</p>`)
  if (clear) {
    $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  }
  setTimeout(function () { $('#error-message').fadeOut() }, timer)
}

module.exports = {
  successDisplayGlobal,
  failureDisplayGlobal
}
