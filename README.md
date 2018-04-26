# Movie Review Client

This is the client side half of a single page application for reviewing movies. Users can sign up for an account, review movies, edit and delete their reviews and see recent reviews.

# Technologies Used

* HTML
* CSS/SASS
* JavaScript
* jQuery
* Handlebars

# Planning/Development Process

The first stage of planning were initial layouts and user stories. The layouts can be viewed [here](https://i.imgur.com/sEgdiYb.jpg) and [here](https://i.imgur.com/mvNWNkz.jpg). User stories are as follows:

* As a new user I want to be able to create an account by entering my email and choosing a password.
* As a returning user I want to be able to use my email and password I've chosen to sign in.
* As a signed in user I want to be able to log a film, the date I saw it, and a rating out of 10 of how much I liked it.
* As a signed in user I want to be able to adjust my rating for the film if I change my mind.
* As a user I want to be able to see all users' ratings of films.

Once intial planning was finished, and the rails API was set up ([See the back end repo]()) I began work on the front end. First I set up a basic html document with forms to interact with the API. These forms are as follows:

* Sign in
* Sign out
* Sign up
* Change password
* Add review
* Update review
* Delete review
* See all reviews
* See only your reviews

Once all forms were working, I began to set up handlebars files with segments of various views. The home view that shows on load originally showed all reviews from all user in a long list. On sign in, the view was updated to the user view where the user's reviews were displayed along with forms for adding editing and deleting reviews.

I next added modals to contain the account forms (sign up, sign in, sign out, change password) and added them to the header. They are removed and added via JavaScript depending if the user is signed in or not.

After these two views and the modals were working, I updated the home page to only show the 3 most recent reviews. From there I set up a button to reveal 3 more reviews each time it's clicked in descending order of recency. I also updated the interface for the user view. I added an edit and delete button to each review. The update function removed the content from that review, and replaced it with a copy of the add review form which on submission updates the review. Once updated, the form is removed and the plain text version of the review is returned.

Next, I began working on the UI. I styled the page using mostly bootstrap elements to give it a nicer appearance and began adding quality of life features like clearing modals when closed, adding additional graphical displays for when a user performs an action, mostly via a div at the top of the page that displays success and error messages, but also things like having an updated review flash green quickly upon updating.

After some time I decided that since user reviews would be forward facing and I would really like the project to be something presentable, I needed some sort of language filter for my reviews. Luckily I found a JavaScript filter for just that on github, [user web-mech's badwords](https://github.com/web-mech/badwords/). I installed this via NPM and set up JavaScript to test the title, genre and review itself for the presence of profanity. If the user has chosen to use vulgarity, on submission instead running the AJAX POST request, a message appears asking them to revise their review.
