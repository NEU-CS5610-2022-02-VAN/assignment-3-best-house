# assignment-03

You will be working in groups of up to 3 students for this project.

The goal is to develop a "Software as a Service" web application performing CRUD operations based on React, NodeJs and Prisma (Some examples include an online store, food ordering, personal journal, learning management system, social network, ...).

Note: The topic should be different from your application in assignment 2 

Your project must support some functionality for anonymous users and only force users to log in if a user identity is required to fulfill a service. For instance, in an online store, anonymous users should be able to search for products, view product details, read product reviews, etc. If a user would like to bookmark a product, comment on a product, or add a product to a shopping cart, then, and only then, would the website ask the user to identify themselves or register.

# Page Requirements
Your application must have at least these 5 pages:

## Homepage
- The landing page of your web application. It is the first page users should see when they visit your website. 
- Must be mapped to either the root context ("/") or ("/home").
- Must display generic content for anonymous users. The content must be dynamic based on the latest data. For instance, you might display snippets and links to the most recent post, review, or member who recently joined
- Must display specific content for the logged-in user. The content must be dynamic based on the most recent data entered by the logged-in user. For instance, you might display snippets and links to the most recent post or review created by the logged-in user
- Must be clear to what the Web site is about and must look polished and finished
- Log in/Register page
- The login and register page allows users to register (create a new account) with the website and then log in later on
- Must force login only when identity is required. For instance, an anonymous user might search for movies and visit the details page for a particular movie without needing to log in. But if they attempt to like the movie, rate it, comment on it, write a review, or follow someone, the application must request the user to log in. Most of the Web applications must be available without a login 
- Must be mapped to /login if both login and register are implemented on the same page
- The login and register page can be implemented as a single page or as two separate pages. In that case, the login page must be mapped to /login and the registration page must be mapped to /register

## Profile page
- Users can see all the information about themselves. It could have several sections for personal information and links to related content associated with the user.  For instance, display a list of links to all the favorite movies, a  list of links of users they are following, etc.
- Must allow users to change their personal information.  
- Must be mapped to "/profile" for displaying the profile of the currently logged in user
- The profile page may be implemented as several pages (based on how you want to display the information)

## [Optional] Search/Search Results page
- Search and results can be on the same page or in separate pages. (e.g. the search bar can be on the home page and the results on a separate page. Or both in a separate search page). 
- Users must be able to see a summary of the search results and navigate to a detail page that shows a detailed view of the result. 
- Must be mapped to /search when no search has been executed and no results exist
- Must be mapped to /search/{search criteria} or /search?criteria={search criteria} when a search has been executed  

## Details page
- The details page allows users to view a detailed view of the search result. They can see more information when they click on the search result. The details page must fulfill the following requirements.
- Must be mapped to /details/{unique identifier} or /details?identifier={unique identifier} where unique identifier uniquely identies the item being displayed

# Responsive design requirements
- Web application must be usable on a desktop, tablet, or phone
- Web pages must be responsive at any width of the browser
- Elements must never overlap each other unintentionally
- Elements must not wrap unintentionally
- Scrollbars must not appear unintentionally
- Embedded scrollbars must be avoided unless specifically necessary
- Must use scrollbars only when it is absolutely necessary

# User experience requirements
- Navigating between pages must be clearly marked
- Currently logged in user must be clearly marked
- Errors must be clearly marked and options to fix them must be provided
- Navigating to the home page must be clearly marked
- Navigating to the profile must be clearly marked
- The URL must have a meaningful name

# External Web API requirements
- Create an interface to an external Web API such as Google maps, IMDB, YouTube, Yelp, Yahoo, Weather Channel, Yummly, Bestbuy, Amazon, ...  You need to only use the Web API to do read-only operations, e.g. get weather data based on location, get recipe based on the country name,... A good place to start is at https://www.programmableweb.com/category/all/apis (Links to an external site.) 

# Accessibility requirements
- Include accessibility reports from all your pages using https://developers.google.com/web/tools/lighthouse (Links to an external site.) 

# Testing requirements
Your application should have at least one unit test per page. 

# Database requirements
Your application should include at least 3 tables in the database.  
