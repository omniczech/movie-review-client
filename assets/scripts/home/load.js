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
  console.log(data)
  const showReviewsHtml = showReviewsTemplate({ ratings: data.movie_ratings })
  $('.col-md-12').append(showReviewsHtml)
  $('.account-buttons').append('<button type="button" class="btn btn-default" data-toggle="modal" data-target="#sign-in-up-modal">Sign In or Sign Up</button>')
}

const errorReviews = () => {

}

module.exports = {
  loader
}
