const config = require('../config')
const showReviewsTemplate = require('../templates/home.handlebars')
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

  console.log(chunked)

  while (dataSorted.length > 3) {
    dataSorted.pop()
  }
  console.log(dataSorted)
  const showReviewsHtml = showReviewsTemplate({ ratings: chunked[0] })
  const modalsHtml = modalsTemplate()
  const headerHtml = headerTemplate()
  $('.col-md-12').append(showReviewsHtml)
  $('header').append(headerHtml)
  $('.account-buttons').append('<button type="button" class="btn btn-default" data-toggle="modal" data-target="#sign-in-up-modal">Sign In or Sign Up</button>')
  $('body').append(modalsHtml)
}

const errorReviews = () => {

}

module.exports = {
  loader
}
