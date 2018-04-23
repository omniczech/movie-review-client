'use strict'

const store = require('../store')

// Display successful call
const successDisplay = (message) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"]').val('')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
}
// Display unsuccessful call
const failureDisplay = (message) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append(`<p>${message}</p>`)
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const signUpSuccess = () => {
  console.log('Sign up success')
  // successDisplay('Signed up successfully!<br>Please sign in now.')
}

const signUpFailure = () => {
  console.log('Sign up failed!')
  // failureDisplay('Something went wrong.<br>Make sure your password and password confirmation are the same.')
}

const signInSuccess = (data) => {
  // successDisplay('Signed in successfully!')
  console.log('Sign in success')
  store.user = data.user
}

const signInFailure = () => {
  console.log('Sign in failure')
  // failureDisplay('Something went wrong.<br>Try entering your email and password again.')
}

const changePasswordSuccess = (data) => {
  console.log('Change Password success')
  // successDisplay('Password changed successfully!')
}

const changePasswordFailure = (data) => {
  console.log('Change Password failure')
  // failureDisplay('Something went wrong.')
}

const signOutSuccess = () => {
  console.log('Sign out success')
  // successDisplay('Signed out successfully!')
  store.user = null
}

const signOutFailure = () => {
  console.log('Sign up success')
  // failureDisplay('Something went wrong.')
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
