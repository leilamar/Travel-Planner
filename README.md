# My Adventure Book: Travel Planner

## Overview
You spend so long dreaming about where you want to go in the world and what you want to do, some things might fall through the cracks. There are too many places to keep track.

Don't worry! My Adventure Book is a web app that allows you to keep track of all your travel plans, past and future. Users can register and log in. Once they've logged in, they can create plans for places they want to visit, and can keep track of places they've already visited by adding a plan to a list of completed trips. And once they've completed a trip on their list of planned trips, they can move it to their list of completed trips.

## Data Model

The application will store Users and Trips
* users can have a list of planned trips and completed trips
* each trip contains information about where the trip will take place and some other optional info, like a description
    * trips are user-specific

An Example User:

```javascript
{
  username: "dreaming_of_paris",
  hash: // a password hash
  planned: // an array of Trip documents
  completed: // an array of Trip documents
  bio: "I love trying new foods and exploring new places all over the world. I speak English and French."
}
```

An Example Trip:
```javascript
{
  user: // a reference to a User object
  place: "Paris, France",
  created: // timestamp
  desc: "A must do. I'll drink wine and eat cheese, visit the Eiffel Tower, and go to the Louvre."
}
```

## [Click Here for Commented First Draft Schema](db.js) 

## Wireframes

Landing page - page to go to when user not registered or  authenticated

![landing page](documentation/landing_page.png)

Login or Registration Page

![login and registration](documentation/login_and_registration.png)

Home page - home page when user authenticated

![home page](documentation/home_page.png)

Planned trips page or completed trips page - view all planned trips or view all completed trips, can filter by place 

![planned trips](documentation/planned_trips.png)

Add trip - add a new trip, either planned or completed
![add trip](documentation/add_trip.png)

Profile - view and edit profile information, can supply a bio
![Profile](documentation/my_profile.png)

## Site map

![sitemap](/documentation/unit_test_results.png)

## User Stories

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add a trip
4. as a user, I can specify whether a trip is completed or planned on creation
3. as a user, I can view all my planned trips
4. as a user, I can view all my completed trips
5. as a user, I can move a trip from planned to completed
6. as a user, I can view my profile
7. as a user, I can update my profile with a biography

## Research Topics

* (5 points) User authentication
    * use passport for user authentication
    * will have login and registration
    * passwords will be salted and hashed
    * can only view personal travel list after authentication
* (3 points) unit testing javascript
    * mocha
    * [See tests here](test/test.js) 
    * ![unit test results images](documentation/unit_test_results.png)
* (2 points) use CSS framework
    * Materialize or Bootstrap
    * may drop this later

10 points total out of 8 required points

## [Click Here for Initial Main Project File](app.js) 

## Annotations / References Used
Authentication - `passport` module
* [official documentation](http://www.passportjs.org/)
* [class notes on authentication](https://cs.nyu.edu/courses/fall18/CSCI-UA.0480-003/_site/slides/16/auth.html?print-pdf#/)

More
* [request module for testing](https://github.com/request/request)