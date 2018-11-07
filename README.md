# Adventure Book: Travel Planner

## Overview

(___TODO__: a brief one or two paragraph, high-level description of your project_)

You spend so long dreaming about where you want to go in the world and what you want to do, some things might fall through the cracks. What was that cafe you wanted to go to in Paris? What was that hike you wantted to do in Yosemite? 

Don't worry! Adventure Book is a web app that allows you to keep track of all your travel plans, past and future. Users can register and log in. Once they've logged in, they can create plans for places they want to visit, and can keep track of places they've visited by adding a plan to a list of completed trips. Once they've completed a trip, they can move it to their list of completed trips.

## Data Model

(___TODO__: a description of your application's data and their relationships to each other_) 

The application will store Users and Trips
* users can have a list of planned trips and completed trips
* each trip contains information about where the trip will take place and some other optional info
    * trips are user-specific

(___TODO__: sample documents_)

An Example User:

```javascript
{
  username: "dreaming_of_paris",
  hash: // a password hash,
  planned: // an array of Trip documents
  completed: // an array of Trip documents
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

## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

## User Stories

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add a trip
4. as a user, I can specify whether a trip is completed or planned on creation
3. as a user, I can view all my planned trips
4. as a user, I can view all my completed trips
5. as a user, I can move a trip from planned to completed

## Research Topics

* (5 points) User authentication
    * use passport for user authentication
    * will have login and registration
    * passwords will be salted and hashed
    * can only view personal travel list after authentication
* (3 points) unit testing javascript
    * will use mocha  
* (2 points) will use CSS framework
    * Materialize or Bootstrap
    * may drop this later

10 points total out of 8 required points

## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)