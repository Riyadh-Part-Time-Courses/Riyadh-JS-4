# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Advanced APIs (3:00)

### Objectives
*After this lesson, students will be able to:*

- Implement a geolocation API to request a location.
- Process a third-party API response and share location data on your website.
- Search documentation needed to make and customize third-party API requests.

### Preparation
*Before this lesson, students should already be able to:*

- Have a solid grasp on HTTP fundamentals.
- Know how to manipulate the DOM with jQuery.
- Understand what callback functions are and why they're useful.

---

## Introduction, review, and hook (15 min)

---

## Introduction to Advanced APIs (15 min) - [ 6:45 ]

<!-- - API can allow you to do a whole bunch of things
- For some info, the API key is not enough -- the user needs to grant permission for your app to access the user's information, 
and the user needs to log into the service itself
- What this means is that for every time we ping the API it wants to know who we are, and more specifically, that we have the authority to GET/POST/PATCH/DELETE their endpoints. 
- [whiteboard resource, user, and our app]
- One way of doing this is an open standard called OAuth (an open standard for authorization), which involves exchanging tokens
- Today we will work with API authentication concepts by building an app which shows popular landscape photos posted in the vicinity of a user's current location.

[ 1 slide ] -->

---

## LocalLandscapes: Let's Get to Building! (25 min) - [7:00 ]

[ 3 slides ]

On list of Flickr endpoints:
- Ask students to pair up (not for programming, just for this exercise)
- Give class a couple minutes to explore the list, and drill down into at least 2 endpoints
- Then ask them to see if they can locate the one we need today — which will let us find photos based on a user’s location? (flickr.photos.search)

https://www.flickr.com/services/api/flickr.photos.search.html

- We can see that as long as we pass certain query values (latitude, longitude, radius and category) we will be given a response containing the landscape photos we want. 
- Awesome! Now that we know our app idea is doable, let's start setting it up.

#### Get Flickr Credentials

<!-- - The first step in working with a third-party API that requires authentication is to register your application with the API. 
- The purpose of this is so that the API, in this case 500px, can give our app credentials to use in future requests so it can recognize who is asking for what information.  -->
- The first steps is to register your application with the API and get a key
- Does anyone not have a Flickr user account? If not, please sign up for one right now at flickr.com
- Next we're going to go to the App Garden page and register an application. https://www.flickr.com/services/apps/create/
- This will give us an API key.


You should now see the application you created on your Apps By You page. 

https://www.flickr.com/services/apps/by/me


<!-- - In order to obtain an access token for a user using our app, we must pass the `JavaScript SDK Key` of our app in our access token request to 500px. 
- Once again, the reason 500px wants you to pass this credential with your request, is so that they can track which third-party application (our application) 
is associated with which access token.  -->
<!-- Not necessary as long as our IP is whitelisted
- __HOWEVER__, 500px is understandably nervous when it gets a bunch of requests for different API keys from the same location at the same time.
- In order to avoid getting our traffic throttled tonight and being unable to test our apps, we're all going to use the same API key, which is mine.
- I will send it out in Slack when the time comes to add it to our apps
-->
- Who can remind us why it's not good practice to share API keys? (you're responsible for how other people use your key, and may get your account shut down)
<!-- - [JavaScript SDK](https://github.com/500px/500px-js-sdk) documentation - send link out in Slack so students can refer to it as we go -->

---

## Starter Code Review (5 min) - [ 7:30 ]

Alright, now that all our app configuration is setup, go ahead and open the starter code.

- `index.html`: HTML file with Bootstrap and jQuery libraries made available via CDNs. 
- CSS and JS files connected. 
- The CSS styling gives our app some very basic styling and the `app.js` file doesn't contain any code...yet. 
- The HTML file references a js/keys.js file. Create that now, and create a variable called <code>apiKey</code>, then copy your API key from the Flickr website as the value and save the file.
<!-- - `500px.js` is the SDK/client library for 500px.com. 
- `callback.html` is a file that's part of the client library and that will facilitate cross domain communication with their API. 
- Don't worry, there's no need to modify either of these files.  -->
<!-- 
The body of our HTML file contains:

```html
  <div class="container-fluid sign-in-view">
    <div class="row text-center">
      <h3>Discover how beautiful your surroundings can be</h3>
      <button class="btn btn-default">
        <a href="#" id="login">Login to 500px</a>
      </button>
    </div>
  </div>

  <div class="container-fluid text-center image-results-view">
    <h3>Here are some landscape photos from 500px near you:</h3>
    <div class="images"></div>
  </div>
```

- In a little bit we will be breaking up these two parent div nodes, showing them conditionally. 
- Initially, only the top div, `.sign-in-view`, will show and be used for our user to perform OAuth.
- Upon redirect, only the bottom parent div, `.image-results-view`, will show with a whole bunch of 500px images appended to `.images` (this syntax denotes a div with a class "images"). -->

---
<!-- 
## 500px OAuth (35 min) - [ 7:35 ]

- For testing purposes, we need to run our own HTTP servers on our development computers
- This lets us get a more accurate sense of how our app is working as we develop it
- In addition, browsers block some behavior using the `file://` protocol instead of the `http://` protocol
- First, we will globally install the `http-server` node package on our machine. We only have to do this once ever!

`npm i -g http-server`

***note:*** `i` is short for install. `-g`, option g, will install the package globally, giving us an `http-server` command line tool.

- Next navigate in your terminal to the path of your files for this app
- Then run the command `http-server -p 3000`. 
- This command simply says start up a server on port 3000 for the code that is in the current path. 
- For the purpose of today's lesson, you don't need to understand all the details of how this works, you just need to know that `http-server` is providing us an easy way to create an http server for our app. 
- In your browser, visit http://localhost:3000. You should see:

![app](https://cloud.githubusercontent.com/assets/204420/15410888/f5e9764a-1de1-11e6-8806-2133aaebc27c.png)

Great, now that our app is up and running, let's set up the OAuth so we can get our access token. 

- The first thing we'll need to do is initialize the SDK. 
- The SDK is documented here: https://github.com/500px/500px-js-sdk
- Open this page, scroll down to the init code, and review it, then implement it. -->
- Open `app.js` in your editor 
- We want to wait until the DOM has finished loading before our code is parsed and run.
- How do we do that with jQuery?

```js
// app.js
$(function() {
  // DOM is now ready

  
});
```
<!-- // Not needed as long as we're whitelisted
- Post SDK key to Slack and have everyone use the same key. Stress that this is important, or we may all have our access cut off tonight.
-->
<!-- 
- point out that _500px references the 500px SDK library; it's an alias.
  - what is the alias that references the jQuery library? ($)
  - Handlebars? (handlebars)
- so every time we use _500px in our code, we're referencing a method of the 500px SDK library.
- in this case, what method are we using? (init) -->


<!-- 
- Next, when a user clicks on the _Login with 500px_ button, we'll want to initialize the authentication procedure using the 500px library. 
- Switch to `index.html` and point out that our button has a link with an `id` attribute of `login` that we can leverage.
- Switch back to `app.js` 
- How do we use the SDK to log in a user? See the [documentation](https://github.com/500px/500px-js-sdk#logging-a-user-in) (SDK page, "Logging a user in" heading)
- Add the following click handler that calls the `login` method given to us by the JavaScript SDK:

```js
// app.js
...
$('#login').click(function() {
  _500px.login();
});
```

- The `login()` method will login the current user and where upon authentication, they will be redirected back to our site with an access token. 
- Refer back to OAuth diagram on whiteboard. This is the first process of OAuth.
- Stress that this one method takes care of the entire OAuth process for us. Otherwise, it would be a lot of coding.
- Return to browser, refresh, then click button (make sure to click the link; just clicking the button outside the link won't work).
- A 500px login page will open and after a successful login you'll be redirected back to your app. 
- When redirected, the login window will automatically close. 
- Now we have our access token!

- When the process completes successfully, a custom event named `authorization_obtained` is fired off. 
- See SDK documentation, bottom of page: https://github.com/500px/500px-js-sdk
- We can assign an event handler to listen for this event and execute any code that should run on successful logins. 

```js
  // If the user clicks the login link, log them in
  $('#login').click(function() {
    _500px.login();
  });// NEW FROM HERE DOWN (3 lines)
  // When a successful login to 500px is made, they fire off the 'authorization_obtained' event
  _500px.on('authorization_obtained', function() {
    // Successful OAuth login!
    
  });

});
```
- Your `app.js` file should now look like:

```js
// app.js
$(function() {
  // DOM is now ready
  _500px.init({
    sdk_key: 'YOUR JAVASCRIPT SDK KEY'
  });
  
  // If the user clicks the login link, log them in
  $('#login').click(function() {
    _500px.login();
  });

  // When a successful login to 500px is made, they fire off the 'authorization_obtained' event
  _500px.on('authorization_obtained', function() {
    // Successful OAuth login!
    
  });

});
```

---

## Conditional Views - Independent Practice (5 min) - [ 8:10 ]

- Before we start using our access token to make requests to 500px, let's first take care of our view. 
- We know that once the user logs in and our app has the access token, we no longer need to prompt the user to log in. 
- Try to use jQuery if possible.

__Hint__: This involves DOM manipulation. Remember the two elements we looked at earlier where our content is displayed. Think about which should be displayed at what point.

__Hint__: jQuery includes methods that let you display and hide elements; look up `hide()` and `show()` on `api.jquery.com`.

> Ask for a volunteer to summarize the instructions.

> Have people pair up -- each should write their own code, but they should consult with each other -- ask questions, share insights

#### Conditional Views Review - Demo

You should have something that looks like:

```js
...
_500px.on('authorization_obtained', function() {
    $('.sign-in-view').hide();
    $('.image-results-view').show();
});
...
```

- Point out that we have only have one HTML document, but we're utilizing it to look like two pages depending on what state the application is in.
- This is known as a __single page app (SPA)__
- Ask how this relates to asynchronous programming. 
  - We don't have to reload the page to update content, 
  - and this extends that further, not even needing to reload to change the static view content we're providing when building the app. -->

---

## Get User's Location (20 min) - [ 8:30 ]

<!-- > Ask what we've done so far (initialized the SDK and logged in) -->

- Remember, our app design is to find posted landscape photos based off our user's location. 
- So what information do we need to get? ( user's location )

- Let's go back to the documentation for the endpoint we identified, [photos.search](https://www.flickr.com/services/api/flickr.photos.search.html). 
- location search requires latitude, longitude, and radius
- to specify that we want landscapes, we need to use the `tags` parameter 
- these are the only requirements we've outlined for the Flickr content we want our project
<!-- - The client library (SDK) takes care of sending the access token on its own so we don't need to worry about doing that ourselves.  -->

- Modern browsers offer a [`navigator` object](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)  which we can use to get location data. 
- Google `mdn navigator` then open the documentation and outline it for students
- Let's go ahead and further our conditional logic to grab the user's location after they've successfully logged in.

- Start with `if/else`, then fill in `getCurrentPosition` code

```javascript
...


  // check if navigator geolocation is available from the browser
  if (navigator.geolocation) {
    // if it is use the getCurrentPosition method to retrieve the Window's location
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('lat: ' + position.coords.latitude);
      console.log('lon: ' + position.coords.longitude);

})
  } else {
    $('.images').append('Sorry, the browser does not support geolocation');
  }

...
```

- The first thing we do is check to see if the browser has the `navigator.geolocation` object we need. 
- Then if it does we can go ahead and call on its method `getCurrentPosition`. 
- `getCurrentPostion` takes a callback as an argument which will return a `position` object. 
- `position` contains a `coords` object which will have the latitude and longitude values we're looking for. 

- Reload the page in the browser, click the Login button if necessary
- Point out the Geolocation prompt
- Work with students to troubleshoot if not everyone is seeing the prompt
  - Try a different browser
  - Clear cookies
- Then after you allow the app to know your location, check your console for the `console.log` statements.

---

<a name = "codealong3"></a>
## Call Flickr Endpoint (10 min) - [ 8:50 ]

> What does the code we've written so far do? (get user's lat and long)

- Now that we have the info we need to ping our Flickr endpoint (lat, long), let's make an API request for local photos!
- Open the [endpoint documentation](https://www.flickr.com/services/api/flickr.photos.search.html)
- Open Postman, paste in the base URL, then add properties one by one and test the results
- Examine the format for `geo` then construct the property
- Examine the format for `only` then construct the property
- look at the structure of returned data
- whiteboard the structure
- navigate through together to find the info we want: `photos.photo.length`
- Add the `if/else` statement

```js
...
      console.log('lat: ' + position.coords.latitude);
      console.log('lon: ' + position.coords.longitude);
  
  // All code from here on down is new code, including the closing });

      // Now that we have the user's location, let's search the API for landscape photos nearby
      let url = 'https://api.flickr.com/services/rest/?'; // base URL
      // Object storing each key and value we need in our query.
      // This makes it clear what options we're choosing, and makes it easier
      // to change the values or add/remove options.
      let searchOptions = {
        method: 'flickr.photos.search', // endpoint
        api_key: apiKey, // stored in js/keys.js
        tags: 'landscape',
        media: 'photos',
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        radius: 10,
        radius_units: 'mi',
        format: 'json',
        nojsoncallback: 1,
        extras: 'url_n',
        content_type: 1,
        safe_search: 1,
        sort: 'relevance',
      };
      // loop through the searchOptions object and append each key and value
      // to the url variable to build the full search URL
      for (let key in searchOptions) {
        url += '&' + key + '=' + searchOptions[key];
      }
      console.log(url);

      // Now that we've built our URL, we can send our GET request
      $.get(url).done(function(response) {
        console.log(response);
        if (response.stat === 'fail') {
          console.log(response.message); // point out that for end users, we'll want to use DOM manipulation, but this is a quick and dirty
      // way of seeing if there's an error while we're building the app
        } else if (response.photos.photo.length === 0) {
          console.log('No photos found!'); // same as previous
        } else {
          // Handle the successful response here
          console.log('Request succeeded!');// note that we will replace this with code to handle the data when it's received; this is just
          // to make sure our code is working to this point
        }
      });

...
```

---

## Handle Response: Independent Practice (15 min) - [ 9:00 ]

- Now that we can successfully call upon the Flickr API for resources, it is up to you to define the `handleResponseSuccess` callback function. 
- What's the data type of the data being returned? Check the [Example Response section](https://www.flickr.com/services/api/flickr.photos.search.html)
- What's the structure of the data being returned? If we didn't whiteboard this earlier, open in Postman and do it here
- Your function should iterate through your response data, creating an image element each time with the given image url from the API. 
- Add a class `image` to the image and append it to `.images` which already exists in the HTML. 
- Once again, use as much jQuery as possible.
- Check out [jquery.each()](https://api.jquery.com/jQuery.each/), which is similar to but different from the `.each()` method we used earlier.
- Point out usage of `this` and give an example
- May need to outline/pseudocode this with class, or with individual students

***hint:*** The data you're looking for is somewhere in `response.photos`.

> Ask for a volunteer to summarize the instructions.

#### Handle Response Review

```js
function handleResponseSuccess(response) {
  let allData = response.photos.photo; // not a jQuery object, so we have to use $.each below
  $.each(allData, function() {
    let element = $('<img>').attr('src', this.url_n).addClass('image');
    $('.images').append(element);
  });
}
```

- results may include paintings and other lower quality or repetitive images
- walk through examining data and noticing lack of title attributes for these
- add if clause
- now check results

Your code should look something like the following:

```javascript
function handleResponseSuccess(response) {
  let allData = response.photos.photo; // not a jQuery object, so we have to use $.each below
  $.each(allData, function() {
    // photos without titles may not be carefully tagged, so exclude them 
    if (this.title !== '') {
      let element = $('<img>').attr('src', this.url_n).addClass('image');
      $('.images').append(element);
    }
  });
}
```

- And your app should be rendering the response images!


---

## API Exploration: Independent Practice (20 min)

- IF THERE'S A FEW MINUTES, GO OVER THIS WITH STUDENTS, AND HAVE PEOPLE BRAINSTORM TOGETHER WHERE TO LOOK TO FIGURE OUT HOW TO DO THIS
- THEN LOOK AT THE DOCS TOGETHER

- Let's get some more practice with reading API documentation and customizing our search results. 
- Take a look at the search documentation and modify our API request to also: 

* Return 30 photos instead of the default 100
* Sort results by relevance

#### Bonus

Bonus 1: Return URLs for larger images (Hint: Check out the extras argument at https://www.flickr.com/services/api/flickr.photos.search.html  and look at the Size Suffixes section at https://www.flickr.com/services/api/misc.urls.html).

Bonus 2: Instead of landscapes, return photos from a different category (see popular tags at https://www.flickr.com/photos/tags/)

Bonus 3 (challenging): Implement OAuth and display the current user’s information on the site after a successful login. See authentication documentation at https://www.flickr.com/services/api/auth.oauth.html and the jso library at https://github.com/andreassolberg/jso.

> If OAuth doesn't work, look at extensions. My first stab at this with 500px didn't work because of my extensions.
> It also won't work if third-party cookies are disallowed
> In Chrome, Preferences (scroll to bottom) > Advanced > Privacy & Security > Content Settings > Cookies > turn off "Block third party cookies"

---

## Final questions &amp; exit tickets (10 min) - [ 9:20 ]
