const config = require('../config')
const store = require('../store')
const showReviewsTemplate = require('../templates/home.handlebars')
const showReviewTemplateAddMore = require('../templates/home-add-more.handlebars')
const modalsTemplate = require('../templates/modals.handlebars')
const headerTemplate = require('../templates/header.handlebars')

const loader = () => {
  showRecentReviews()
    .then(appendReviews)
    .catch(errorReviews)
}

const showRecentReviews = () => {
  return $.ajax({
    url: config.apiUrl + '/movie_ratings',
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}

const appendReviews = (data) => {
  const dataSorted = data.movie_ratings.sort(function (a, b) {
    return b.id - a.id
  })
  const chunked = []
  const chunkSize = 3

  while (dataSorted.length > 0) {
    chunked.push(dataSorted.splice(0, chunkSize))
  }
  store.chunked = chunked
  store.homeI = 0

  while (dataSorted.length > 3) {
    dataSorted.pop()
  }
  const showReviewsHtml = showReviewsTemplate({ ratings: chunked[store.homeI] })
  const modalsHtml = modalsTemplate()
  const headerHtml = headerTemplate()
  $('.col-md-12').append(showReviewsHtml)
  $('header').append(headerHtml)
  $('.account-buttons').append('<button type="button" class="btn btn-default" data-toggle="modal" data-target="#sign-in-up-modal">Sign In or Sign Up</button>')
  $('body').append(modalsHtml)
  $('.nav-tabs a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
  $('.modal').on('hidden.bs.modal', function (e) {
    $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
  })
}

const addMoreReviews = () => {
  store.homeI++
  const showReviewsHtml = showReviewTemplateAddMore({ ratings: store.chunked[store.homeI] })
  $('.home-reviews').append(showReviewsHtml)
  if (store.chunked.length === store.homeI + 1) {
    $('.show-more').remove()
  }
}

const addHandlers = () => {
  $('body').on('click', '.show-more', addMoreReviews)
}

const errorReviews = () => {

}

module.exports = {
  loader,
  addHandlers
}
