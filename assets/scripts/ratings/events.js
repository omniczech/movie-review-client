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

const addHandlers = () => {
  $('#add-review').on('submit', onAddReview)
  $('#edit-review').on('submit', onEditReview)
}

module.exports = {
  addHandlers
}
