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

const signUpSuccess = () => {
  console.log('Sign up success')
  successDisplay('Signed up successfully!<br>Please sign in now.')
  $('#sign-in-panel').tab('show')
}

const signUpFailure = () => {
  console.log('Sign up failed!')
  failureDisplay('Something went wrong.<br>Make sure your password and password confirmation are the same.')
}

const signInSuccess = (data) => {
  successDisplay('Signed in successfully!')
  console.log('Sign in success')
  store.user = data.user
  $('.home').remove()
  // $('#sign-in-up-modal').modal('hide')
  setTimeout(function () { showAccount.onShowReview() }, 0)
  $('.account-buttons').empty()
  $('.account-buttons').append(`<button type="button" class="btn btn-default" data-toggle="modal" data-target="#sign-out-change-pass-modal">Change Password</button>
  <form id="sign-out">
    <input required type="submit" value="Sign Out" class="form-control">
  </form>
  <p>Signed in as: ${data.user.email}</p>`)
}

const signInFailure = () => {
  console.log('Sign in failure')
  failureDisplay('Something went wrong.<br>Try entering your email and password again.')
}

const changePasswordSuccess = (data) => {
  console.log('Change Password success')
  successDisplay('Password changed successfully!')
}

const changePasswordFailure = (data) => {
  console.log('Change Password failure')
  failureDisplay('Something went wrong.')
}

const signOutSuccess = () => {
  console.log('Sign out success')
  successDisplay('Signed out successfully!')
  store.user = null
  $('header').empty()
  $('.user-reviews, #add-review').remove()
  showHome.loader()
  // $('#sign-out-change-pass-modal').modal('hide')
}

const signOutFailure = () => {
  console.log('Sign up success')
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
  signOutFailure
}
