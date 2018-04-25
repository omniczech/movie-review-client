'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events')
const ratingEvents = require('./ratings/events')
const homeEvents = require('./home/load')

$(() => {
  authEvents.addHandlers()
  ratingEvents.addHandlers()
  homeEvents.loader()
  homeEvents.addHandlers()
})
