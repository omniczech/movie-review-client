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
}

const errorReviews = () => {

}

module.exports = {
  loader
}
