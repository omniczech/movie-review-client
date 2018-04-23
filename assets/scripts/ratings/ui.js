'use strict'

// const store = require('../store')

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

const createReviewSuccess = () => {
  console.log('Create Review success')
  successDisplay('Review added successfully!')
}

const createReviewFailure = () => {
  console.log('Create Review failed!')
  failureDisplay('Something went wrong submitting your review')
}

const updateReviewSuccess = () => {
  console.log('Create Review success')
  successDisplay('Review Successfully updated!')
}

const updateReviewFailure = () => {
  console.log('Create Review failed!')
  failureDisplay('Something went wrong updating your review')
}

module.exports = {
  createReviewFailure,
  createReviewSuccess,
  updateReviewSuccess,
  updateReviewFailure
}
