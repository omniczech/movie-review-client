'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const global = require('../global')
const ui = require('./ui')
const Filter = require('bad-words')
const filter = new Filter()

const onAddReview = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  const bannedWord = 'Butt Mansfield'
  console.log(data)
  console.log(filter.clean(data.movie_rating.review))
  if (data.movie_rating.review.includes(bannedWord) || data.movie_rating.movie_title.includes(bannedWord)) {
    $('*').addClass('rainbow')
    $('.main-content').prepend('<div id="party-warning"><h1>Party Mode Enabled</h1><button id="disable-party">Disable Party Mode and promise not to use "Butt Mansfield" in your review</button></div>')
  }
  if (filter.isProfane(data.movie_rating.review) || filter.isProfane(data.movie_rating.movie_title) || filter.isProfane()) {
    global.failureDisplayGlobal('It looks like you\'re trying to use some foul language. <br>Please edit your review fields to not contain any curse words, then resubmit.', false, 5000)
  } else {
    api.createReview(data)
      .then(ui.createReviewSuccess)
      .catch(ui.createReviewFailure)
  }
}

const onEditReview = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log({movie_rating: data.movie_rating})
  api.updateReview(data)
    .then(ui.updateReviewSuccess)
    .catch(ui.updateReviewFailure)
}

const onShowReview = (e) => {
  // e.preventDefault()
  api.showReview()
    .then(ui.showReviewSuccess)
    .catch(ui.showReviewFailure)
}

const onDeleteReview = (e) => {
  e.preventDefault()
  const data = $(e.target).attr('data-review-id')
  const titleDelete = $(e.target).attr('data-review-title')
  // console.log(data)
  if (confirm(`Are you sure you want to remove your review for ${titleDelete}? (This action cannot be reversed)`)) {
    api.deleteReview(data)
      .then(ui.deleteReviewSuccess(data))
      .catch(ui.deleteReviewFailure)
  }
}

const onEditButtonClick = (e) => {
  e.preventDefault()
  const data = $(e.target).attr('data-review-id')
  api.editButtonClick(data)
    .then(ui.editButtonClickSuccess)
    .catch(ui.editButtonClickFailure)
}

const addHandlers = () => {
  $('body').on('submit', '#add-review', onAddReview)
  $('body').on('submit', '#edit-review', onEditReview)
  $('#show-user-reviews').on('submit', onShowReview)
  $('body').on('submit', '.delete-review', onDeleteReview)
  $('body').on('submit', '.start-update', onEditButtonClick)
}

module.exports = {
  addHandlers,
  onShowReview
}
