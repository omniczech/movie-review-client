'use strict'

const store = require('../store')
const showAccount = require('../ratings/events')
const showHome = require('../home/load')

// Display successful call
const successDisplay = (message) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
  $('.modal').modal('hide')
}
// Display unsuccessful call
const failureDisplay = (message) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const signUpSuccess = (data) => {
  successDisplay('')
  $('#sign-in-panel').tab('show')
}

const signUpFailure = () => {
  failureDisplay('Something went wrong.<br>Make sure your password and password confirmation are the same.')
}

const signInSuccess = (data) => {
  successDisplay('Signed in successfully!')
  store.user = data.user
  $('.home').remove()
  // $('#sign-in-up-modal').modal('hide')
  setTimeout(function () { showAccount.onShowReview() }, 0)
  $('.account-buttons').empty()
  $('.account-buttons').append(`<button type="button" class="btn btn-default" data-toggle="modal" data-target="#sign-out-change-pass-modal">Change Password</button>
  <form id="sign-out">
    <input required type="submit" value="Sign Out" class="form-control">
  </form>
  <p>Signed in as: ${data.user.email}<br><a href="#" id="my-reviews">View my account</a></p>`)
}

const myAccount = () => {
  console.log('myaccount ran')
  $('.home').remove()
  $('#my-account-page').remove()
  setTimeout(function () { showAccount.onShowReview() }, 0)
  $('.account-buttons').empty()
  $('.account-buttons').append(`<button type="button" class="btn btn-default" data-toggle="modal" data-target="#sign-out-change-pass-modal">Change Password</button>
  <form id="sign-out">
    <input required type="submit" value="Sign Out" class="form-control">
  </form>
  <p>Signed in as: ${store.user.email}<br><a href="#" id="my-reviews">View my account</a></p>`)
}

const signInFailure = () => {
  failureDisplay('Something went wrong.<br>Try entering your email and password again.')
}

const changePasswordSuccess = (data) => {
  successDisplay('Password changed successfully!')
}

const changePasswordFailure = (data) => {
  failureDisplay('Something went wrong.')
}

const signOutSuccess = () => {
  successDisplay('Signed out successfully!')
  store.user = null
  $('.home').remove()
  $('header').empty()
  $('.user-reviews, #add-review').remove()
  showHome.loader()
  // $('#sign-out-change-pass-modal').modal('hide')
}

const signOutFailure = () => {
  failureDisplay('Something went wrong.')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordFailure,
  changePasswordSuccess,
  signOutSuccess,
  signOutFailure,
  myAccount
}
