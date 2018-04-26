'use strict'

// const store = require('../store')
const showUserReviewsTemplate = require('../templates/user.handlebars')
const showEditingReviewsTemplate = require('../templates/review-editing.handlebars')
const showEditableReviewsTemplate = require('../templates/review-editable.handlebars')

// Display successful call
const successDisplay = (message) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
}
// Display unsuccessful call
const failureDisplay = (message) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const createReviewSuccess = (data) => {
  successDisplay('Review added successfully!')
  const showNewReview = showEditableReviewsTemplate({ rating: data.movie_rating })
  $('.actual-reviews').prepend(showNewReview)
  $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  $('.empty-reviews').remove()
}

const createReviewFailure = () => {
  failureDisplay('Something went wrong submitting your review')
}

const updateReviewSuccess = (data) => {
  successDisplay('Review Successfully updated!')
  const showEditableReviewHtml = showEditableReviewsTemplate({ rating: data.movie_rating, single: true })
  $('.review#' + data.movie_rating.id).empty()
  $('.review#' + data.movie_rating.id).append(showEditableReviewHtml)
  $('.review#' + data.movie_rating.id).css('background', '#9f9')
  setTimeout(() => { $('.review#' + data.movie_rating.id).css('background', 'transparent') }, 500)
  $('.start-update').show()
}

const updateReviewFailure = () => {
  failureDisplay('Something went wrong updating your review')
}

const showReviewSuccess = (data) => {
  const dataSorted = data.movie_ratings.sort(function (a, b) {
    return b.id - a.id
  })
  // console.log(dataSorted)
  const showReviewsHtml = showUserReviewsTemplate({ ratings: data.movie_ratings })
  $('.col-md-12').append(showReviewsHtml)
}

const showReviewFailure = () => {
  failureDisplay('Something went wrong updating your review')
}
const editButtonClickSuccess = (data) => {
  $('.review#' + data.movie_rating.id).empty()
  const showEditableReviewHtml = showEditingReviewsTemplate({ rating: data.movie_rating })
  setTimeout(function () {
    $('.review#' + data.movie_rating.id).append(showEditableReviewHtml)
  }, 0)
  successDisplay('Now editing your review')
  $('.start-update').hide()
}

const deleteReviewSuccess = (data) => {
  successDisplay('Review Successfully Removed!')
  $('.review#' + data).fadeOut(500, function () { this.remove() })
  setTimeout(function () {
    if ($('.review').length === 1) {
      $('.actual-reviews').append('<p class="empty-reviews">You don\'t seem to have any reviews. You should add some!</p>')
    }
  }, 0)
}

module.exports = {
  createReviewFailure,
  createReviewSuccess,
  updateReviewSuccess,
  updateReviewFailure,
  showReviewSuccess,
  showReviewFailure,
  editButtonClickSuccess,
  deleteReviewSuccess
}
