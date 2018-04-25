'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log(data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = (e) => {
  e.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log(data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('body').on('submit', '#sign-up', onSignUp)
  $('body').on('submit', '#sign-in', onSignIn)
  $('body').on('submit', '#sign-out', onSignOut)
  $('body').on('submit', '#change-pass', onChangePassword)
}

module.exports = {
  addHandlers
}
