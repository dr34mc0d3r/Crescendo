# Crescendo Skills Test

## This Repo
This repository contains two applications.

Node REST API -------------------------------------
Although not requested in the request, I have the beginnings of a REST API I was going to use for the backend. 
A Sqlite3 database is being used for data persistance. Functionality to import the data from the Crescendo 
Bitbucket repo into seperact tables.

This is not finished but is a good start.

React front end -----------------------------------
This React application is using Axios to fetch the data but there is commented code to do the same using fetch.
On the Home page, the data is requested and basic Tailwind CSS is used to visually show each recipe. With a 
linked image (medium) to a detail page. On the detail page, the selected recipe uuid is used as a parameter to 
show the useState data aquired on the home page.

