'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const home = require('../home/load')
const store = require('../store')

const onSignUp = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .then(() => autoSignIn(data))
    .catch(ui.signUpFailure)
}

const autoSignIn = (data) => {
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignIn = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
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
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onMyReviewsClick = (e) => {
  e.preventDefault()
  console.log('onMyReviewsClick ran')
  ui.myAccount()
}

const onHomeLinkClick = (e) => {
  e.preventDefault()
  console.log('onHomeLinkClick ran')
  if (store.user && $('.home').length === 0) { home.appendReviewsLoggedIn() }
}

const addHandlers = () => {
  $('body').on('submit', '#sign-up', onSignUp)
  $('body').on('submit', '#sign-in', onSignIn)
  $('body').on('submit', '#sign-out', onSignOut)
  $('body').on('submit', '#change-pass', onChangePassword)
  $('body').on('click', '#my-reviews', onMyReviewsClick)
  $('body').on('click', '#home-link', onHomeLinkClick)
}

module.exports = {
  addHandlers
}
