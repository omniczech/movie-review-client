const config = require('../config')
const showReviewsTemplate = require('../templates/home.handlebars')

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
  while (dataSorted.length > 3) {
    dataSorted.pop()
  }
  console.log(dataSorted)
  const showReviewsHtml = showReviewsTemplate({ ratings: dataSorted })
  $('.col-md-12').append(showReviewsHtml)
  $('.account-buttons').append('<button type="button" class="btn btn-default" data-toggle="modal" data-target="#sign-in-up-modal">Sign In or Sign Up</button>')
}

const errorReviews = () => {

}

module.exports = {
  loader
}
