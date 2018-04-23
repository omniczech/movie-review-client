'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onAddReview = (e) => {
  e.preventDefault()
  const data = getFormFields(e.target)
  console.log(data)
  api.createReview(data)
    .then(ui.createReviewSuccess)
    .catch(ui.createReviewFailure)
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
  console.log(data)
  api.deleteReview(data)
    .then(ui.deleteReviewSuccess)
    .catch(ui.deleteReviewFailure)
}

const onEditButtonClick = (e) => {
  e.preventDefault()
  const data = $(e.target).attr('data-review-id')
  api.editButtonClick(data)
    .then(ui.editButtonClickSuccess)
    .catch(ui.editButtonClickFailure)
}

const addHandlers = () => {
  $('#add-review').on('submit', onAddReview)
  $('body').on('submit', '#edit-review', onEditReview)
  $('#show-user-reviews').on('submit', onShowReview)
  $('body').on('submit', '.delete-review', onDeleteReview)
  $('body').on('submit', '.start-update', onEditButtonClick)
}

module.exports = {
  addHandlers,
  onShowReview
}
